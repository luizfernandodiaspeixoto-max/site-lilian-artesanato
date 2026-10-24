const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');
// Substituir todas as ocorrências de google.com/search nos links embutidos
html = html.replace(/https:\/\/www\.google\.com\/search\?[^"']+/g, 'https://g1.globo.com/es/espirito-santo/cidade/sao-jose-do-calcado');
fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Todos os links de busca do Google foram substituídos no HTML embutido!');
