const fs = require('fs');
const indexPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Adjust masthead to have padding-left so it doesn't get covered by the 260px sidebar ad on desktop
const mastheadCssTarget = `.masthead {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-bottom: 3px solid var(--accent-2);
  background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,245,241,0.98) 100%);
  backdrop-filter: blur(4px);
}`;

const mastheadCssReplacement = `.masthead {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10001;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-bottom: 3px solid var(--accent-2);
  background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,245,241,0.98) 100%);
  backdrop-filter: blur(4px);
}`;

if (html.includes(mastheadCssTarget)) {
  html = html.replace(mastheadCssTarget, mastheadCssReplacement);
}

// Ensure media query for desktop pushes masthead text/content or adds left margin so sidebar (260px) doesn't overlap the title/logo
const desktopMediaQuery = `@media (min-width: 1024px) {
  body {
    display: grid !important;
    grid-template-columns: 260px 1fr !important;
    grid-template-areas:
      "masthead masthead"
      "sidebar container"
      "sidebar footer";
  }`;

// Let's add padding-left to masthead top when sidebar is present on desktop
const desktopMastheadFix = `@media (min-width: 1024px) {
  .masthead-top, .nav-bar {
    padding-left: 280px !important;
  }
  body {
    display: grid !important;
    grid-template-columns: 260px 1fr !important;
    grid-template-areas:
      "masthead masthead"
      "sidebar container"
      "sidebar footer";
  }`;

if (html.includes(desktopMediaQuery)) {
  html = html.replace(desktopMediaQuery, desktopMastheadFix);
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Masthead layout adjusted so sidebar does not cover site title/logo.');
