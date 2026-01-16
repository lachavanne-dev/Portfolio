const { projects = [], skillsInfo = [], structure = {} } = window.portfolioData || {};

const projectGrid = document.querySelector('[data-project-grid]');
const competenceGrid = document.querySelector('[data-competence-grid]');
const overlay = document.querySelector('[data-modal]');
const modalBody = document.querySelector('[data-modal-body]');
const closeModalBtn = document.querySelector('[data-close-modal]');
const navbar = document.querySelector('[data-navbar]');

// Maps pour accès rapide
const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]));

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

  // Construction du chemin : RacineProjet / DossierCompétence / Fichier
  // Ajout de .pdf si non présent (adaptable selon tes vrais fichiers)
  if (!filename.endsWith('.pdf') && !filename.endsWith('.pages') && !filename.endsWith('.html')) {
    filename += '.pdf';
  }

  const resolvedPath = `${project.folderRoot}/${skillData?.folder ?? ''}/${filename}`;
  return encodeURI(resolvedPath);
}

// --- 1. GÉNÉRATION GRID PROJETS ---
projects.forEach((project) => {
  const card = document.createElement('article');
  card.className = 'card project-card';

  let imageContainerHtml = '';
  if (project.depthImage && window.ParallaxImage) {
    imageContainerHtml = `
      <div class="card-image parallax-container" id="parallax-${project.id}" style="position: relative; overflow: hidden;">
        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
      </div>
    `;
  } else {
    imageContainerHtml = `<img src="${project.image}" alt="${project.title}" class="card-image" />`;
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

  // Création des boutons pour le menu au survol
  const buttonsHtml = skillDef.pages.map(page => `
    <button class="hover-btn" data-page-code="${page.code}">
      <span class="btn-code">${page.code}</span>
    </button>
  `).join('');

  card.innerHTML = `
    <div class="skill-content">
      <h3 class="card-title">${skill.name}</h3>
      <p class="card-desc">${skill.summary}</p>
    </div>
    <div class="skill-hover-overlay">
      <p class="hover-title">Choisir une page</p>
      <div class="hover-btn-group">
        ${buttonsHtml}
      </div>
    </div>
  `;

  // Interaction : Click sur une page -> Ouvrir le choix du projet
  card.querySelectorAll('.hover-btn').forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pageDef = skillDef.pages[index];
      openProjectSelectorModal(skill.id, pageDef);
    });
  });

  if (competenceGrid) competenceGrid.appendChild(card);
});

// --- LOGIQUE A : MODALE PROJET (On est dans un projet, on choisit la page) ---
// --- LOGIQUE A : MODALE PROJET (Design "Liste détaillée" restauré) ---
function openProjectModal(project) {
  modalBody.innerHTML = '';
  modalBody.appendChild(createEyebrow(project.context));
  modalBody.appendChild(createTitle(project.title));
  modalBody.appendChild(createSubtitle("Passez la souris sur une compétence pour dévoiler les fichiers."));

  const list = document.createElement('div');
  list.className = 'modal-list';

  // On parcourt toutes les compétences
  Object.entries(structure).forEach(([skillKey, skillData]) => {
    const row = document.createElement('div');
    row.className = 'skill-list-row'; // Classe spécifique pour le design "Liste"

    // Création des boutons (cachés par défaut via CSS)
    const buttonsHtml = skillData.pages.map(page => {
      const url = getFileUrl(project, skillKey, page);
      // target="_blank" pour ouvrir dans un nouvel onglet
      return `<a href="${url}" target="_blank" class="page-mini-btn">${page.code}</a>`;
    }).join('');

    // Structure HTML : Gauche (Infos) + Droite (Zone d'action interactive)
    row.innerHTML = `
      <div class="skill-info-col">
        <strong class="skill-name">${skillData.label}</strong>
        <p class="skill-description">${skillData.description}</p>
      </div>
      
      <div class="skill-action-col">
        <span class="action-hint">Voir les pages &rarr;</span>
        
        <div class="pages-group">
          ${buttonsHtml}
        </div>
      </div>
    `;

    list.appendChild(row);
  });

  modalBody.appendChild(list);
  showModal();
}

// --- LOGIQUE B : MODALE SELECTEUR PROJET (On a la page, on choisit le projet) ---
function openProjectSelectorModal(skillKey, pageDef) {
  modalBody.innerHTML = '';
  modalBody.appendChild(createEyebrow("Accès rapide"));
  modalBody.appendChild(createTitle(`Page ${pageDef.code}`));
  modalBody.appendChild(createSubtitle("Sélectionnez le projet pour ouvrir ce document."));

  const list = document.createElement('div');
  list.className = 'modal-list project-selector-list';

  projects.forEach(project => {
    const url = getFileUrl(project, skillKey, pageDef);

    const item = document.createElement('a');
    item.className = 'project-select-item';
    item.href = url;
    item.target = "_blank";
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

scrollButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.scrollTarget;
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // On désactive temporairement l'observateur pour éviter le conflit
      // lors du scroll rapide, et on force l'activation du bouton cliqué
      navButtons.forEach(b => b.classList.remove('active'));
      if (btn.hasAttribute('data-nav')) btn.classList.add('active');

      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 2. Surligner le bouton actif quand on scrolle (Observer)
const sections = document.querySelectorAll('section[id]');
const navButtons = document.querySelectorAll('[data-nav]');

// Options ajustées pour corriger le bug de l'accueil
const observerOptions = {
  root: null,
  // "margin-top: -80px" dit à l'observateur d'ignorer la zone sous la barre de nav
  // threshold: 0.2 signifie "dès que 20% de la section est visible, active-la"
  rootMargin: '-80px 0px 0px 0px',
  threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // On ne change la classe que si la section ENTRE dans l'écran
    if (entry.isIntersecting) {
      // On retire la classe active de tous les boutons
      navButtons.forEach(btn => btn.classList.remove('active'));

      // On l'ajoute au bouton correspondant à la section visible
      const activeBtn = document.querySelector(`[data-scroll-target="#${entry.target.id}"][data-nav]`);
      if (activeBtn) {
        activeBtn.classList.add('active');
      }
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));
