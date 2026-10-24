const fs = require('fs');
const indexPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Ensure visits is in footer-inner
if (!html.includes('id="visits"')) {
  html = html.replace(
    '<div class="footer-inner">',
    '<div class="footer-inner">\n      <div>© <span id="year"></span> Notícias de São José do Calçado</div>\n      <div class="visits">Visitas: <strong id="visits">--</strong></div>'
  );
}

// Remove old visits element from masthead if any remains
html = html.replace(/<div class="visits[^"]*">[\s\S]*?<\/div>/g, (match) => {
  if (match.includes('id="visits"')) return '';
  return match;
});

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Visits moved to footer successfully.');
