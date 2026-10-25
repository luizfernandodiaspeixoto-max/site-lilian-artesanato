const fs = require('fs');
const cssPath = 'G:/noticias calcado/public/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Adicionar animação de flutuação vertical para os banners da sidebar
const floatingBannersCss = `
@keyframes floatUpDown {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}

.sidebar-ad {
  animation: floatUpDown 4s ease-in-out infinite !important;
  position: sticky !important;
  top: 20px !important;
  z-index: 990;
}
`;

if (!css.includes('floatUpDown')) {
  css += '\n' + floatingBannersCss;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Floating animation added to sidebar banners!');
}
