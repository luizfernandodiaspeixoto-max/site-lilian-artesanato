const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Corrigir a URL da foto oficial da igreja no topo que estava faltando a barra (assets-portalimages -> assets-portal/images)
html = html.replace('assets-portalimages/igreja-big.jpeg', 'assets-portal/images/igreja-big.jpeg');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Brand logo image URL fixed!');
