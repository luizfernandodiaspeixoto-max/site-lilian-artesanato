const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Remover completamente o contador de visitas do topo
html = html.replace(/<div class="visits visits-top">[\s\S]*?<\/div>/g, '');
html = html.replace(/<div class="visits">[\s\S]*?<\/div>/g, '');

// Garantir que os banners apareçam tanto no desktop quanto no celular com display flex e largura total
html = html.replace(
  '<aside class="sidebar-ad">',
  '<aside class="sidebar-ad" style="display:flex !important; visibility:visible !important; opacity:1 !important;">'
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Index.html cleaned of top visits and sidebar forced visible!');
