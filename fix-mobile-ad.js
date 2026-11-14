const fs = require('fs');
const cssPath = 'G:/noticias calcado/public/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Forçar .sidebar-ad a ficar visível e empilhado no topo ou logo acima das notícias em telas menores (celular)
const mobileAdFix = `
@media (max-width: 1023px) {
  body {
    display: flex;
    flex-direction: column;
  }
  .sidebar-ad {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    position: relative !important;
    width: 100% !important;
    max-width: 100% !important;
    margin: 15px 0 !important;
    order: -1; /* Aparece logo no topo abaixo do menu no celular */
    background: #111111;
    border: 2px solid #ff007f;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 0 15px rgba(255, 0, 127, 0.4);
    z-index: 10;
  }
  .container {
    margin-top: 10px !important;
  }
}
`;

// Substituir o media query max-width: 1023px existente
if (css.includes('@media (max-width: 1023px)')) {
  // Remover bloco antigo e adicionar o novo completo
  css = css.replace(/@media \(max-width: 1023px\) \{[\s\S]*?\}(?=\s*\/\*|$)/, mobileAdFix);
} else {
  css += '\n' + mobileAdFix;
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Mobile sidebar ad CSS updated successfully!');
