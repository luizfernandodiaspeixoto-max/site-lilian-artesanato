const fs = require('fs');
let css = fs.readFileSync('public/css/style.css', 'utf8');

const gridCss = `
@media (min-width: 1024px) {
  body {
    display: grid !important;
    grid-template-columns: 260px 1fr !important;
    grid-template-areas:
      "masthead masthead"
      "sidebar container"
      "sidebar footer";
  }
  .masthead {
    grid-area: masthead;
    position: sticky;
    top: 0;
    z-index: 9999;
  }
  .sidebar-ad {
    grid-area: sidebar;
    background: #111111;
    border-right: 2px solid #ff007f;
    padding: 30px 16px;
    min-height: calc(100vh - 120px);
    position: sticky;
    top: 120px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    z-index: 998;
    box-shadow: 0 0 20px rgba(255, 0, 127, 0.4);
    animation: neonPulse 1.5s infinite alternate;
  }
  .container {
    grid-area: container;
  }
  .footer {
    grid-area: footer;
  }
}
`;

// remover qualquer media query anterior de min-width: 1024px
css = css.replace(/@media \(min-width: 1024px\) \{[\s\S]*?\}\s*\}/g, '');
css += '\n' + gridCss;

fs.writeFileSync('public/css/style.css', css, 'utf8');
console.log('CSS grid layout updated!');
