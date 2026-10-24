const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Remover a regra do grid que coloca a barra lateral branca (sidebar-ad) no lado esquerdo
html = html.replace(/@media \(min-width: 1024px\) \{ body \{ display: grid; grid-template-columns: 220px 1fr; \} \.sidebar-ad \{.*?\} \.container, \.masthead, \.footer \{ grid-column: 2; \} \}/gs, '');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Barra lateral branca removida com sucesso!');
