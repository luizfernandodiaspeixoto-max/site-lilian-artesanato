const fs = require('fs');
const css = fs.readFileSync('G:/noticias calcado/public/css/style.css', 'utf8');
const html = fs.readFileSync('G:/noticias calcado/public/index.html', 'utf8');

// Atualizar o CSS para garantir menu sticky e logo grande
let newCss = css
  .replace('.masthead {', '.masthead {\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.1);')
  .replace('.brand-logo {\n  height: 58px;', '.brand-logo {\n  height: 320px;');

fs.writeFileSync('G:/noticias calcado/public/css/style.css', newCss, 'utf8');

const embedded = html.replace(/<style>[\s\S]*?<\/style>/, '<style>\n' + newCss + '\n</style>');
fs.writeFileSync('G:/noticias calcado/public/index.html', embedded, 'utf8');
console.log('CSS atualizado e embutido com sucesso!');
