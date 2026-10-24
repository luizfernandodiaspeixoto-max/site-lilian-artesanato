const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Remover qualquer bloco de visitas antigo do topo
html = html.replace(/<div class="visits visits-top">[\s\S]*?<\/div>/g, '');

// Inserir no footer
html = html.replace(
  '<div class="footer-inner">\n      <div>© <span id="year"></span> Notícias de São José do Calçado</div>\n    </div>',
  '<div class="footer-inner">\n      <div>© <span id="year"></span> Notícias de São José do Calçado</div>\n      <div class="visits visits-footer">Visitas: <strong id="visits">--</strong></div>\n    </div>'
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Visits counter cleaned from top and placed active in footer!');
