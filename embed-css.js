const fs = require('fs');
const css = fs.readFileSync('G:/noticias calcado/public/css/style.css', 'utf8');
const html = fs.readFileSync('G:/noticias calcado/public/index.html', 'utf8');

const embedded = html.replace('<link rel="stylesheet" href="/css/style.css">', '<style>\n' + css + '\n</style>');
fs.writeFileSync('G:/noticias calcado/public/index.html', embedded, 'utf8');
console.log('Index.html atualizado com todo o CSS embutido!');
