const fs = require('fs');
const html = fs.readFileSync('E:/noticias calcado/public/index.html', 'utf8');
const js = fs.readFileSync('E:/noticias calcado/public/js/app.js', 'utf8');
const css = fs.readFileSync('E:/noticias calcado/public/css/style.css', 'utf8');

const embedded = html
  .replace('<link rel="stylesheet" href="/css/style.css">', '<style>\n' + css + '\n</style>')
  .replace('<script src="/js/app.js"></script>', '<script>\n' + js + '\n</script>');

fs.writeFileSync('E:/noticias calcado/public/index.html', embedded, 'utf8');
console.log('Index.html now contains embedded CSS and JS!');
