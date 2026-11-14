const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Remover o botão/link do WhatsApp do anúncio lateral, mantendo a caixa do anúncio na lateral esquerda
html = html.replace(/<a href="https:\/\/whatsapp\.com\/channel\/[^"]+"[^>]*>.*?<\/a>/gs, '');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Link do WhatsApp removido com sucesso!');
