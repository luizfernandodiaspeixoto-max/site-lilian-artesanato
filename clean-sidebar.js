const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');
html = html.replace(/<aside class="sidebar-ad">([\s\S]*?)<\/aside>/g, '');
fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Removed all sidebars');
