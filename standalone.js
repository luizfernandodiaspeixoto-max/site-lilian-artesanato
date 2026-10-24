const fs = require('fs');
const html = fs.readFileSync('G:/noticias calcado/public/index.html', 'utf8');
const noticias = JSON.parse(fs.readFileSync('G:/noticias calcado/data/noticias.json', 'utf8'));

let js = fs.readFileSync('G:/noticias calcado/public/js/app.js', 'utf8');
js = js.replace('async function load() {\n  try {\n    const res = await fetch(\'/api/noticias\');\n    const data = await res.json();\n    ALL = data.noticias || [];', 'async function load() {\n  try {\n    const data = { noticias: window.__EMBEDDED_NOTICIAS__ || [] };\n    ALL = data.noticias;');

const css = fs.readFileSync('G:/noticias calcado/public/css/style.css', 'utf8');

const finalHtml = html
  .replace('<link rel="stylesheet" href="/css/style.css">', '<style>\n' + css + '\n</style>')
  .replace('<script src="/js/app.js"></script>', '<script>\nwindow.__EMBEDDED_NOTICIAS__ = ' + JSON.stringify(noticias) + ';\n' + js + '\n</script>');

fs.writeFileSync('G:/noticias calcado/public/index.html', finalHtml, 'utf8');
console.log('Fully standalone HTML generated in G:!');
