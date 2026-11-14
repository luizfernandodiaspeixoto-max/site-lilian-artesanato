const fs = require('fs');
let css = fs.readFileSync('public/css/style.css', 'utf8');

// Garantir que a sidebar tem position: sticky e top adequado
const targetCss = `
  .sidebar-ad {
    grid-area: sidebar;
    background: #111111;
    border-right: 2px solid #ff007f;
    padding: 30px 16px;
    height: calc(100vh - 120px);
    position: sticky;
    top: 100px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    z-index: 998;
    box-shadow: 0 0 20px rgba(255, 0, 127, 0.4);
    animation: neonPulse 1.5s infinite alternate;
    overflow-y: auto;
  }
`;

if (!css.includes('height: calc(100vh')) {
  css = css.replace(/\.sidebar-ad\s*\{[\s\S]*?\}/, targetCss);
  fs.writeFileSync('public/css/style.css', css, 'utf8');
  console.log('style.css updated with fixed height & sticky sidebar!');
}
