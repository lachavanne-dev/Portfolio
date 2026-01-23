const { projects = [], skillsInfo = [], structure = {} } = window.portfolioData || {};

const projectGrid = document.querySelector('[data-project-grid]');
const competenceGrid = document.querySelector('[data-competence-grid]');
const overlay = document.querySelector('[data-modal]');
const modalBody = document.querySelector('[data-modal-body]');
const closeModalBtn = document.querySelector('[data-close-modal]');
const navbar = document.querySelector('[data-navbar]');

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Maps pour accès rapide
const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]));
const defaultPageOverrides = new Set(['kah', 'antenne']);

// --- UTILITAIRE : Générateur d'URL ---
function getFileUrl(project, skillKey, pageDef) {
  const skillData = structure[skillKey];
  let filename = pageDef.file;

  // Gestion du cas spécial Rapport SAE où le nom dépend du projet
  if (skillKey === 'rapports' && pageDef.file === 'dynamic') {
    filename = project.reportFile;
  }

  if (pageDef.fileByProject && pageDef.fileByProject[project.id]) {
    filename = pageDef.fileByProject[project.id];
  }

  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }

  // Construction du chemin : RacineProjet / DossierCompétence / Fichier
  // Ajout de .pdf si non présent (adaptable selon tes vrais fichiers)
  if (!filename.endsWith('.pdf') && !filename.endsWith('.pages') && !filename.endsWith('.html')) {
    filename += '.pdf';
  }

  const resolvedPath = `${project.folderRoot}/${skillData?.folder ?? ''}/${filename}`;
  return encodeURI(resolvedPath);
}

function getDefaultPage(skillKey, project) {
  const skillData = structure[skillKey];
  if (!skillData?.pages?.length) return null;

  let page = skillData.pages[0];

  if (skillKey === 'concevoir' || skillKey === 'verifier') {
    page = skillData.pages[0];
  } else if (skillKey === 'maintenir') {
    page = skillData.pages[0];
  } else if (skillKey === 'implanter') {
    page = skillData.pages[0];
  } else if (project && defaultPageOverrides.has(project.id) && skillData.pages[1]) {
    page = skillData.pages[1];
  }

  if (project && page?.fileByProject && !page.fileByProject[project.id]) {
    return null;
  }

  return page;
}

// --- 1. GÉNÉRATION GRID PROJETS ---
let professionalSeparatorInserted = false;
const createProfessionalSeparator = () => {
  const separator = document.createElement('div');
  separator.className = 'project-separator';
  separator.innerHTML = `
    <h3 class="project-separator__title">Expériences professionnelles</h3>
    <p class="project-separator__desc">Projet réalisé en contexte d'entreprise.</p>
  `;
  return separator;
};

projects.forEach((project) => {
  if (!professionalSeparatorInserted && project.category === 'professional') {
    if (projectGrid) projectGrid.appendChild(createProfessionalSeparator());
    professionalSeparatorInserted = true;
  }

  const card = document.createElement('article');
  card.className = 'card project-card';

  let imageContainerHtml = '';
  const hasImage = typeof project.image === 'string' && project.image.trim() !== '';
  if (hasImage && project.depthImage && window.ParallaxImage) {
    imageContainerHtml = `
      <div class="card-image parallax-container" id="parallax-${project.id}" style="position: relative; overflow: hidden;">
        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
      </div>
    `;
  } else if (hasImage) {
    imageContainerHtml = `<img src="${project.image}" alt="${project.title}" class="card-image" />`;
  } else {
    imageContainerHtml = `
      <div class="card-image card-image--placeholder" role="img" aria-label="Image a venir">
        Image a venir
      </div>
    `;
  }

  card.innerHTML = `
    ${imageContainerHtml}
    <div class="card-content">
      <p class="card-eyebrow">${project.context} / ${project.year}</p>
      <h3 class="card-title">${project.title}</h3>
      <p class="card-desc">${project.tagline}</p>
      <div class="tag-list">${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
  `;

  card.addEventListener('click', () => openProjectModal(project));
  if (projectGrid) projectGrid.appendChild(card);

  // Initialize Parallax if applicable
  if (project.depthImage && window.ParallaxImage) {
    const container = card.querySelector(`#parallax-${project.id}`);
    if (container) {
      new ParallaxImage(container, project.image, project.depthImage);
    }
  }
});

// --- 2. GÉNÉRATION GRID COMPÉTENCES ---
skillsInfo.forEach((skill) => {
  const skillDef = structure[skill.id];
  if (!skillDef) return;

  const card = document.createElement('article');
  card.className = 'card skill-card';

  const tooltipId = `skill-tooltip-${skill.id}`;

  card.innerHTML = `
    <div class="skill-content">
      <h3 class="card-title">${skill.name}</h3>
      <p class="card-desc">${skill.summary}</p>
    </div>
    <div class="skill-tooltip" role="tooltip" id="${tooltipId}">
      <p class="skill-tooltip__text">${skillDef.description}</p>
    </div>
  `;

  const defaultPage = getDefaultPage(skill.id, null);
  if (defaultPage) {
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-describedby', tooltipId);
    card.addEventListener('click', () => openProjectSelectorModal(skill.id));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectSelectorModal(skill.id);
      }
    });
  }

  if (competenceGrid) competenceGrid.appendChild(card);
});

// --- LOGIQUE A : MODALE PROJET (On est dans un projet, on choisit la page) ---
// --- LOGIQUE A : MODALE PROJET (Design "Liste détaillée" restauré) ---
function openProjectModal(project) {
  modalBody.innerHTML = '';
  modalBody.appendChild(createEyebrow(project.context));
  modalBody.appendChild(createTitle(project.title));
  modalBody.appendChild(createSubtitle("Cliquez sur une competence pour ouvrir la page d'entree."));

  const list = document.createElement('div');
  list.className = 'modal-list';

  // Ordre voulu pour l'affichage des compétences dans la modale projet
  const modalSkillOrder = ['concevoir', 'verifier', 'maintenir', 'implanter', 'rapports'];
  const hiddenSkillsByProject = {
    kah: new Set(['maintenir', 'implanter']),
    robot: new Set(['maintenir', 'implanter', 'rapports'])
  };
  const hiddenSkills = hiddenSkillsByProject[project.id] ?? new Set();

  modalSkillOrder.forEach((skillKey) => {
    if (hiddenSkills.has(skillKey)) return;
    const skillData = structure[skillKey];
    if (!skillData) return;
    const defaultPage = getDefaultPage(skillKey, project);
    if (!defaultPage) return;

    const url = getFileUrl(project, skillKey, defaultPage);
    const row = document.createElement('a');
    row.className = 'skill-list-row skill-list-row--cta';
    row.href = url;
    row.target = '_blank';
    row.rel = 'noopener';

    // Structure HTML : Gauche (Infos) + Droite (Zone d'action interactive)
    row.innerHTML = `
      <div class="skill-info-col">
        <strong class="skill-name">${skillData.label}</strong>
      </div>
    `;

    list.appendChild(row);
  });

  const useIntroLayout = Boolean(project.introSummary || project.introDetails || project.introTitle);
  if (useIntroLayout) {
    const layout = document.createElement('div');
    layout.className = 'modal-project-layout';

    const intro = document.createElement('div');
    intro.className = 'modal-project-intro';
    const introTitle = project.introTitle ? `<h3>${project.introTitle}</h3>` : '';
    const introSummary = project.introSummary ? `<p>${project.introSummary}</p>` : '';
    const introDetails = Array.isArray(project.introDetails)
      ? project.introDetails.map((text) => `<p>${text}</p>`).join('')
      : '';
    intro.innerHTML = `${introTitle}${introSummary}${introDetails}`;

    const skillsCol = document.createElement('div');
    skillsCol.className = 'modal-project-skills';
    skillsCol.appendChild(list);

    layout.appendChild(intro);
    layout.appendChild(skillsCol);
    modalBody.appendChild(layout);
  } else {
    modalBody.appendChild(list);
  }
  showModal();
}

// --- LOGIQUE B : MODALE SELECTEUR PROJET (On a la page, on choisit le projet) ---
function openProjectSelectorModal(skillKey) {
  const skillData = structure[skillKey];
  modalBody.innerHTML = '';
  modalBody.appendChild(createEyebrow("Accès rapide"));
  modalBody.appendChild(createTitle(skillData?.label ?? "Compétence"));
  modalBody.appendChild(createSubtitle("Sélectionnez le projet pour ouvrir la page d'entrée."));

  const list = document.createElement('div');
  list.className = 'modal-list project-selector-list';

  projects.forEach(project => {
    const defaultPage = getDefaultPage(skillKey, project);
    if (!defaultPage) return;
    const url = getFileUrl(project, skillKey, defaultPage);

    const item = document.createElement('a');
    item.className = 'project-select-item';
    item.href = url;
    item.target = "_blank";
    item.rel = "noopener";
    item.innerHTML = `
      <span class="project-name">${project.title}</span>
      <span class="icon-arrow">→</span>
    `;
    list.appendChild(item);
  });

  modalBody.appendChild(list);
  showModal();
}

// --- UTILS UI ---
function showModal() {
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function hideModal() {
  overlay.hidden = true;
  document.body.style.overflow = '';
}

// Helpers DOM
function createEyebrow(text) {
  const p = document.createElement('p');
  p.className = 'eyebrow';
  p.textContent = text;
  return p;
}
function createTitle(text) {
  const h3 = document.createElement('h3');
  h3.className = 'modal-title';
  h3.textContent = text;
  return h3;
}
function createSubtitle(text) {
  const p = document.createElement('p');
  p.className = 'modal-subtitle';
  p.textContent = text;
  return p;
}

// Event Listeners génériques
if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) hideModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideModal(); });

// --- GESTION DE LA NAVIGATION ET DU SCROLL ---

// 1. Faire fonctionner les boutons (Click)
const scrollButtons = document.querySelectorAll('[data-scroll-target]');
const sections = document.querySelectorAll('section[id]');
const navButtons = document.querySelectorAll('[data-nav]');

function scrollToTarget(targetId, behavior = 'smooth') {
  const targetSection = document.querySelector(targetId);
  if (!targetSection) return;

  navButtons.forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`[data-scroll-target="${targetId}"][data-nav]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  targetSection.scrollIntoView({ behavior });
}

scrollButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.scrollTarget;
    scrollToTarget(targetId, 'smooth');
  });
});

// 2. Surligner le bouton actif quand on scrolle
const navOffset = 80;

function updateActiveSection() {
  if (!sections.length) return;
  let activeSection = sections[0];

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top - navOffset <= 0 && rect.bottom - navOffset > 0) {
      activeSection = section;
    }
  });

  navButtons.forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`[data-scroll-target="#${activeSection.id}"][data-nav]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

let isTicking = false;
window.addEventListener('scroll', () => {
  if (isTicking) return;
  isTicking = true;
  window.requestAnimationFrame(() => {
    updateActiveSection();
    isTicking = false;
  });
}, { passive: true });

window.addEventListener('load', () => {
  const targetId = window.location.hash || '#hero';
  scrollToTarget(targetId, 'auto');
  updateActiveSection();
});
