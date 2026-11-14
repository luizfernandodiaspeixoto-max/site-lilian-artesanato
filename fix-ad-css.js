const fs = require('fs');
const cssPath = 'G:/noticias calcado/public/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

const adCss = `
.sidebar-ad {
  display: block !important;
  width: 220px;
  background: #ffffff;
  border-right: 1px solid var(--rule);
  padding: 24px 12px;
  margin-right: 20px;
  flex-shrink: 0;
}
@media (min-width: 900px) {
  body {
    display: flex !important;
    flex-direction: row !important;
    align-items: flex-start;
  }
  .container {
    flex: 1;
    max-width: 960px !important;
    margin: 0 auto;
  }
}
@media (max-width: 899px) {
  .sidebar-ad {
    width: 100%;
    margin: 0 0 20px 0;
    border-right: none;
    border-bottom: 1px solid var(--rule);
  }
}
`;

if (!css.includes('sidebar-ad')) {
  css += '\n' + adCss;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('CSS da publicidade adicionado!');
}
