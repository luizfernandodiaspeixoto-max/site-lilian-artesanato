const fs = require('fs');
let noticias = JSON.parse(fs.readFileSync('data/noticias.json', 'utf8'));

// Substituir links estáticos genéricos por links reais dos artigos salvos se disponíveis, ou manter link limpo
noticias = noticias.map(n => {
  if (n.link && n.link.includes('google.com/search')) {
    n.link = 'https://g1.globo.com/es/espirito-santo/cidade/sao-jose-do-calcado';
  }
  return n;
});

fs.writeFileSync('data/noticias.json', JSON.stringify(noticias, null, 2), 'utf8');

let html = fs.readFileSync('public/index.html', 'utf8');
// Atualizar o JSON embutido com os links limpos
const embeddedRegex = /window\.__EMBEDDED_NOTICIAS__\s*=\s*\[[\s\S]*?\];/;
const newEmbedded = `window.__EMBEDDED_NOTICIAS__ = ${JSON.stringify(noticias)};`;
if (embeddedRegex.test(html)) {
  html = html.replace(embeddedRegex, newEmbedded);
  fs.writeFileSync('public/index.html', html, 'utf8');
  console.log('Embedded noticias updated in public/index.html!');
}
