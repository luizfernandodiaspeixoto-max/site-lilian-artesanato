const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Remover completamente o elemento floating-neon-ad do código HTML
html = html.replace(/<a[^>]*class="floating-neon-ad"[^>]*>[\s\S]*?<\/a>/gs, '');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Botão de anúncio/whatsapp removido permanentemente do HTML!');
