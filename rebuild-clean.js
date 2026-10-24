const fs = require('fs');

// 1. Limpar JSON de notícias
let noticias = JSON.parse(fs.readFileSync('data/noticias.json', 'utf8'));
noticias = noticias.filter(x => {
  const t = ((x.title || '') + ' ' + (x.description || '') + ' ' + (x.link || '')).toLowerCase();
  return !t.includes('bom-jesus-do-itabapoana') && !t.includes('bom jesus do itabapoana');
});
fs.writeFileSync('data/noticias.json', JSON.stringify(noticias, null, 2), 'utf8');

// 2. Regerar o standalone puxando o JSON limpo
const htmlTemplate = fs.readFileSync('public/index.html', 'utf8');
// Remover o script antigo de embedded noticias se houver
let cleanHtml = htmlTemplate.replace(/<script>\s*window\.__EMBEDDED_NOTICIAS__[\s\S]*?<\/script>/g, '');

const css = fs.readFileSync('public/css/style.css', 'utf8');
let js = fs.readFileSync('public/js/app.js', 'utf8');
js = js.replace("async function load() {\n  try {\n    const res = await fetch('/api/noticias');\n    const data = await res.json();\n    ALL = data.noticias || [];", "async function load() {\n  try {\n    const data = { noticias: window.__EMBEDDED_NOTICIAS__ || [] };\n    ALL = data.noticias;");

const finalHtml = cleanHtml
  .replace('<link rel="stylesheet" href="/css/style.css">', '<style>\n' + css + '\n</style>')
  .replace('</body>', '<script>\nwindow.__EMBEDDED_NOTICIAS__ = ' + JSON.stringify(noticias) + ';\n' + js + '\n</script>\n</body>');

fs.writeFileSync('public/index.html', finalHtml, 'utf8');
console.log('Standalone completely rebuilt without Bom Jesus articles!');
