const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Remover completamente o <aside class="sidebar-ad"> que estava no topo/corpo principal
html = html.replace(/<aside class="sidebar-ad">[\s\S]*?<\/aside>/gs, '');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Bloco sidebar-ad do topo removido com sucesso!');
