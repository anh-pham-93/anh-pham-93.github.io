import { site, url, canonical, asset, escapeHtml } from './context.mjs';

function navLink(route, label, current) {
  const key = route === '/' ? 'about' : route.replace(/^\/+|\/+$/g, '');
  const currentAttr = key === current ? ' aria-current="page"' : '';
  return `<a href="${url(route)}"${currentAttr}>${escapeHtml(label)}</a>`;
}

function header(current, overlay = false) {
  return `
  <header class="site-header${overlay ? ' is-overlay' : ''}" id="site-header">
    <div class="header-inner">
      <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav">
        <span class="sr-only">Menu</span><span></span><span></span>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="Primary">
        ${navLink('/work/', 'Work', current)}
        ${navLink('/writing/', 'Writing', current)}
        ${navLink('/hobbies/', 'Hobbies', current)}
        ${navLink('/', 'About', current)}
        ${navLink('/contact/', 'Contact', current)}
      </nav>
    </div>
  </header>`;
}

function coffeeControl(className = '') {
  if (site.coffeeUrl) {
    return `<a class="${className}" href="${escapeHtml(site.coffeeUrl)}" target="_blank" rel="noreferrer">${escapeHtml(site.coffeeLabel)}</a>`;
  }
  return `<button class="${className}" type="button" data-coffee>${escapeHtml(site.coffeeLabel)}</button>`;
}

function footer() {
  return `
  <footer class="site-footer">
    <div class="shell footer-inner">
      <div><p class="footer-name">${escapeHtml(site.name)}</p><p>Product, writing and interests.</p></div>
      <div class="footer-links">
        <a href="mailto:${escapeHtml(site.email)}">Email</a>
        <a href="${escapeHtml(site.linkedin)}" target="_blank" rel="noreferrer">LinkedIn</a>
        ${coffeeControl()}
      </div>
      <p>&copy; ${escapeHtml(site.copyrightYear)}</p>
    </div>
  </footer>`;
}

function dialog() {
  if (site.coffeeUrl) return '';
  return `
  <div class="dialog-backdrop" id="dialog-backdrop" aria-hidden="true">
    <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <h2 id="dialog-title">${escapeHtml(site.coffeeLabel)}</h2>
      <p id="dialog-copy">Add a support URL in src/site.json before launch.</p>
      <div class="dialog-actions"><button class="button" type="button" id="dialog-close">Close</button></div>
    </div>
  </div>`;
}

function layout({ title, description, current, content, overlay = false, aboutScript = false, route = '/', bodyClass = '' }) {
  const pageTitle = title === site.name ? site.name : `${title} - ${site.name}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(description || site.description)}">
  <meta name="theme-color" content="#f2eee5">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(description || site.description)}">
  <meta property="og:url" content="${canonical(route)}">
  <link rel="canonical" href="${canonical(route)}">
  <link rel="icon" href="${asset('favicon.svg')}" type="image/svg+xml">
  <link rel="stylesheet" href="${asset('styles.css')}">
  <title>${escapeHtml(pageTitle)}</title>
  <script src="${asset('site.js')}" defer></script>
  ${aboutScript ? `<script src="${asset('about.js')}" defer></script>` : ''}
</head>
<body class="page ${escapeHtml(bodyClass)}">
  <a class="skip-link" href="#main-content">Skip to content</a>
  ${header(current, overlay)}
  ${content}
  ${dialog()}
</body>
</html>`;
}

export { header, coffeeControl, footer, dialog, layout };
