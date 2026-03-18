const { projects = [], skillsInfo = [], structure = {} } = window.portfolioData || {};

const projectGrid = document.querySelector('[data-project-grid]');
const competenceGrid = document.querySelector('[data-competence-grid]');
const overlay = document.querySelector('[data-modal]');
const modalBody = document.querySelector('[data-modal-body]');
const closeModalBtn = document.querySelector('[data-close-modal]');
const navbar = document.querySelector('[data-navbar]');
const videoLightbox = createVideoLightbox();

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
const insertedSeparators = new Set();

function createProjectSeparator(title, description, modifier = '') {
  const separator = document.createElement('div');
  separator.className = `project-separator ${modifier}`.trim();
  separator.innerHTML = `
    <h3 class="project-separator__title">${title}</h3>
    <p class="project-separator__desc">${description}</p>
  `;
  return separator;
}

projects.forEach((project) => {
  if (!project.category && !insertedSeparators.has('academic')) {
    if (projectGrid) {
      projectGrid.appendChild(
        createProjectSeparator(
          'Académique',
          'Réalisations menées dans le cadre du BUT GEII.'
        )
      );
    }
    insertedSeparators.add('academic');
  }

  if (project.category === 'personal' && !insertedSeparators.has('personal')) {
    if (projectGrid) {
      projectGrid.appendChild(
        createProjectSeparator(
          'Personnel',
          'Produit conçu et développé de bout en bout hors cadre académique.',
          'project-separator--personal'
        )
      );
    }
    insertedSeparators.add('personal');
  }

  if (project.category === 'tutored' && !insertedSeparators.has('tutored')) {
    if (projectGrid) {
      projectGrid.appendChild(
        createProjectSeparator(
          'Projet tutoré',
          'Projet mené en équipe autour d’une chaîne complète de radiodétection et d’analyse.',
          'project-separator--tutored'
        )
      );
    }
    insertedSeparators.add('tutored');
  }

  if (project.category === 'professional' && !insertedSeparators.has('professional')) {
    if (projectGrid) {
      projectGrid.appendChild(
        createProjectSeparator(
          'Professionnel',
          "Projet réalisé en contexte d'entreprise.",
          'project-separator--professional'
        )
      );
    }
    insertedSeparators.add('professional');
  }

  const card = document.createElement('article');
  card.className = 'card project-card';
  card.classList.add(`project-card--${project.id}`);
  if (project.category === 'personal' || project.category === 'tutored' || project.category === 'professional') {
    card.classList.add('project-card--featured');
  }

  let imageContainerHtml = '';
  const hasVideoPreview = typeof project.videoPreview === 'string' && project.videoPreview.trim() !== '';
  const hasCardBackground = Boolean(project.cardBackground?.src);
  const hasImage = typeof project.image === 'string' && project.image.trim() !== '';
  if (hasVideoPreview) {
    imageContainerHtml = `
      <video class="card-image card-video" autoplay muted loop playsinline preload="metadata" aria-hidden="true">
        <source src="${project.videoPreview}" type="video/mp4">
      </video>
    `;
  } else if (hasCardBackground) {
    imageContainerHtml = `
      <div
        class="card-image card-image--background"
        role="img"
        aria-label="${project.title}"
        style="--card-bg-size: ${project.cardBackground.size || '100%'}; --card-bg-position: ${project.cardBackground.position || 'center'}; --card-bg-offset-x: ${project.cardBackground.offsetX || '0px'}; --card-bg-offset-y: ${project.cardBackground.offsetY || '0px'};"
      >
        <img src="${project.cardBackground.src}" alt="${project.title}">
      </div>
    `;
  } else if (hasImage && project.depthImage && window.ParallaxImage) {
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

  if (project.caseStudy) {
    modalBody.appendChild(createSubtitle(project.caseStudy.subtitle || "Vue d'ensemble du projet."));
    modalBody.appendChild(createCaseStudyLayout(project));
    showModal();
    return;
  }

  modalBody.appendChild(createSubtitle("Cliquez sur une compétence pour ouvrir la page d'entrée."));

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
    const displayLabel = skillKey === 'rapports'
      ? (project.id === 'stage-geii' ? 'Rapport STAGE' : 'Rapports SAE')
      : skillData.label;

    const row = document.createElement('a');
    row.className = 'skill-list-row skill-list-row--cta';
    row.href = url;
    row.target = '_blank';
    row.rel = 'noopener';

    // Structure HTML : Gauche (Infos) + Droite (Zone d'action interactive)
    row.innerHTML = `
      <div class="skill-info-col">
        <strong class="skill-name">${displayLabel}</strong>
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

function createCaseStudyLayout(project) {
  const layout = document.createElement('div');
  layout.className = 'case-study-layout';

  const main = document.createElement('div');
  main.className = 'case-study-main';

  const intro = document.createElement('div');
  intro.className = 'modal-project-intro';
  const introTitle = project.introTitle ? `<h3>${project.introTitle}</h3>` : '';
  const introSummary = project.introSummary ? `<p>${project.introSummary}</p>` : '';
  const introDetails = Array.isArray(project.introDetails)
    ? project.introDetails.map((text) => `<p>${text}</p>`).join('')
    : '';
  intro.innerHTML = `${introTitle}${introSummary}${introDetails}`;

  const media = project.caseStudy?.media;
  if (media?.src) {
    const mediaCard = document.createElement('article');
    const mediaType = media.type || 'video';
    mediaCard.className = `case-study-media ${mediaType === 'video' ? 'case-study-media--interactive' : 'case-study-media--static'}`;

    if (mediaType === 'video') {
      mediaCard.setAttribute('role', 'button');
      mediaCard.setAttribute('tabindex', '0');
      mediaCard.setAttribute('aria-label', `Agrandir la vidéo ${media.title || 'de démonstration'}`);
      mediaCard.innerHTML = `
        <div class="case-study-media__header">
          <p class="eyebrow">${media.title || 'Démonstration'}</p>
          <span class="case-study-media__hint">Cliquer pour agrandir</span>
        </div>
        <video class="case-study-video" autoplay muted loop playsinline preload="metadata" aria-hidden="true">
          <source src="${media.src}" type="video/mp4">
          Votre navigateur ne prend pas en charge la lecture de cette vidéo.
        </video>
        ${media.caption ? `<p class="case-study-media__caption">${media.caption}</p>` : ''}
      `;
      mediaCard.addEventListener('click', () => openVideoLightbox(media));
      mediaCard.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openVideoLightbox(media);
        }
      });
    } else {
      mediaCard.innerHTML = `
        <div class="case-study-media__header">
          <p class="eyebrow">${media.title || 'Visuel'}</p>
        </div>
        <img class="case-study-image" src="${media.src}" alt="${media.alt || media.title || project.title}">
        ${media.caption ? `<p class="case-study-media__caption">${media.caption}</p>` : ''}
      `;
    }
    main.appendChild(mediaCard);
  }

  const site = project.caseStudy?.site;
  if (site?.href) {
    const linksCard = document.createElement('article');
    linksCard.className = 'case-study-links-card';
    linksCard.innerHTML = `
      <p class="eyebrow">Accès</p>
      <div class="case-study-links">
        <a class="case-study-link case-study-link--primary" href="${site.href}" target="_blank" rel="noopener">${site.label || 'Voir le site'}<span aria-hidden="true">↗</span></a>
      </div>
      ${site.meta ? `<p class="case-study-links__meta">${site.meta}</p>` : ''}
    `;
    main.appendChild(linksCard);
  }

  main.appendChild(intro);

  const gallery = project.caseStudy?.gallery || [];
  if (gallery.length) {
    const galleryCard = document.createElement('article');
    galleryCard.className = 'case-study-gallery-card';
    galleryCard.innerHTML = `
      <p class="eyebrow">Extraits du projet</p>
      <div class="case-study-gallery">
        ${gallery.map((item) => `
          <figure class="case-study-gallery-item">
            <img src="${item.src}" alt="${item.alt || item.title || project.title}">
            <figcaption>
              ${item.title ? `<strong>${item.title}</strong>` : ''}
              ${item.caption ? `<span>${item.caption}</span>` : ''}
            </figcaption>
          </figure>
        `).join('')}
      </div>
    `;
    main.appendChild(galleryCard);
  }

  const sections = document.createElement('div');
  sections.className = 'case-study-sections';

  (project.caseStudy?.sections || []).forEach((section) => {
    const card = document.createElement('article');
    card.className = 'case-study-section';

    const title = document.createElement('h4');
    title.textContent = section.title;
    card.appendChild(title);

    (section.paragraphs || []).forEach((text) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      card.appendChild(paragraph);
    });

    sections.appendChild(card);
  });

  if (sections.childElementCount) {
    main.appendChild(sections);
  }

  const sidebar = document.createElement('aside');
  sidebar.className = 'case-study-sidebar';

  const stats = project.caseStudy?.stats || [];
  if (stats.length) {
    const statsCard = document.createElement('article');
    statsCard.className = 'case-study-sidecard';
    statsCard.innerHTML = `
      <p class="eyebrow">Périmètre</p>
      <div class="case-study-stats">
        ${stats.map((item) => `
          <div class="case-study-stat">
            <span class="case-study-stat__label">${item.label}</span>
            <strong class="case-study-stat__value">${item.value}</strong>
          </div>
        `).join('')}
      </div>
    `;
    sidebar.appendChild(statsCard);
  }

  const highlights = project.caseStudy?.highlights || [];
  if (highlights.length) {
    const highlightsCard = document.createElement('article');
    highlightsCard.className = 'case-study-sidecard';
    highlightsCard.innerHTML = `
      <p class="eyebrow">Points forts</p>
      <ul class="case-study-list">
        ${highlights.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    `;
    sidebar.appendChild(highlightsCard);
  }

  if (project.caseStudy?.closing) {
    const closingCard = document.createElement('article');
    closingCard.className = 'case-study-sidecard case-study-sidecard--accent';
    closingCard.innerHTML = `
      <p class="eyebrow">Positionnement</p>
      <p class="case-study-closing">${project.caseStudy.closing}</p>
    `;
    sidebar.appendChild(closingCard);
  }

  layout.appendChild(main);
  layout.appendChild(sidebar);
  return layout;
}

function createVideoLightbox() {
  const lightbox = document.createElement('div');
  lightbox.className = 'video-lightbox';
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="video-lightbox__backdrop" data-video-close></div>
    <div class="video-lightbox__dialog" role="dialog" aria-modal="true" aria-label="Vidéo en grand format">
      <button class="video-lightbox__close" type="button" data-video-close aria-label="Fermer la vidéo">&times;</button>
      <video class="video-lightbox__video" loop playsinline preload="metadata"></video>
    </div>
  `;

  lightbox.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute('data-video-close')) {
      closeVideoLightbox();
    }
  });

  document.body.appendChild(lightbox);
  return lightbox;
}

function openVideoLightbox(media) {
  const video = videoLightbox.querySelector('.video-lightbox__video');
  if (!(video instanceof HTMLVideoElement)) return;

  video.innerHTML = '';
  const source = document.createElement('source');
  source.src = media.src;
  source.type = 'video/mp4';
  video.appendChild(source);
  video.muted = true;
  video.currentTime = 0;
  video.load();

  videoLightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  void video.play().catch(() => {});
}

function closeVideoLightbox() {
  const video = videoLightbox.querySelector('.video-lightbox__video');
  if (video instanceof HTMLVideoElement) {
    video.pause();
    video.innerHTML = '';
    video.load();
  }

  videoLightbox.hidden = true;
  document.body.style.overflow = overlay.hidden ? '' : 'hidden';
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
  if (!videoLightbox.hidden) {
    closeVideoLightbox();
  }
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
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!videoLightbox.hidden) {
    closeVideoLightbox();
    return;
  }
  hideModal();
});

// --- GESTION DE LA NAVIGATION ET DU SCROLL ---

// 1. Faire fonctionner les boutons (Click)
const scrollButtons = document.querySelectorAll('[data-scroll-target]');
const sections = document.querySelectorAll('section[id], [data-section]');
const navButtons = document.querySelectorAll('[data-nav]');

function scrollToTarget(targetId, behavior = 'smooth') {
  const targetSection = document.querySelector(targetId);
  if (!targetSection) return;

  navButtons.forEach(btn => btn.classList.remove('active'));
  const activeButtons = document.querySelectorAll(`[data-scroll-target="${targetId}"][data-nav]`);
  activeButtons.forEach((btn) => btn.classList.add('active'));

  const targetOffset = targetId === '#hero' ? 40 : 0;
  if (targetOffset) {
    const y = targetSection.getBoundingClientRect().top + window.scrollY - targetOffset;
    window.scrollTo({ top: y, behavior });
  } else {
    targetSection.scrollIntoView({ behavior });
  }
}

scrollButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const targetId = btn.dataset.scrollTarget;
    if (!targetId) return;
    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;
    event.preventDefault();
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
  const activeButtons = document.querySelectorAll(`[data-scroll-target="#${activeSection.id}"][data-nav]`);
  activeButtons.forEach((btn) => btn.classList.add('active'));
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
