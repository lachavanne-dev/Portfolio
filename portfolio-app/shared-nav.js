(() => {
  const header = document.querySelector('header.navbar');
  if (!header) return;

  const basePath = header.dataset.navBase || '';
  const normalizedBase = basePath && !basePath.endsWith('/') ? `${basePath}/` : basePath;
  const currentPath = window.location.pathname || '';
  const isFormationPage = currentPath.endsWith('/about.html') || currentPath.endsWith('about.html');

  const navItems = [
    { label: 'Accueil', href: `${normalizedBase}index.html#hero`, target: '#hero', nav: true },
    { label: 'Formation', href: `${normalizedBase}about.html`, active: isFormationPage },
    { label: 'Projets', href: `${normalizedBase}index.html#projects`, target: '#projects', nav: true },
    { label: 'Compétences', href: `${normalizedBase}index.html#skills`, target: '#skills', nav: true }
  ];

  header.innerHTML = `
    <a class="logo" href="${normalizedBase}index.html#hero">Paul Lachavanne</a>
    <nav class="nav-links" aria-label="Navigation principale">
      ${navItems
        .map((item) => {
          const attrs = [];
          if (item.target) {
            attrs.push(`data-scroll-target="${item.target}"`);
          }
          if (item.nav) {
            attrs.push('data-nav');
          }
          if (item.active) {
            attrs.push('class="nav-link active"');
          } else {
            attrs.push('class="nav-link"');
          }
          return `<a ${attrs.join(' ')} href="${item.href}">${item.label}</a>`;
        })
        .join('')}
    </nav>
  `;

  if (!document.getElementById('shared-nav-styles')) {
    const style = document.createElement('style');
    style.id = 'shared-nav-styles';
    style.textContent = `
      .navbar .logo {
        text-decoration: none;
      }

      .navbar .nav-links a {
        background: none;
        border: none;
        color: var(--muted, var(--text-secondary, #5a554e));
        font-weight: 600;
        font-size: 0.95rem;
        padding: 0.3rem 0;
        cursor: pointer;
        position: relative;
        text-decoration: none;
      }

      .navbar .nav-links a:hover,
      .navbar .nav-links a.active {
        color: var(--ink, var(--text-main, #1b1a17));
      }

      .navbar .nav-links a.active::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -4px;
        width: 100%;
        height: 2px;
        background: var(--accent, var(--primary-color, #c25a38));
        border-radius: 999px;
      }
    `;
    document.head.appendChild(style);
  }
})();
