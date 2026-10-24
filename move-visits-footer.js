const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const oldFooter = `<div class="footer-inner">
      <div>© <span id="year"></span> Notícias de São José do Calçado</div>
    </div>`;

const newFooter = `<div class="footer-inner">
      <div>© <span id="year"></span> Notícias de São José do Calçado</div>
      <div class="visits visits-footer">Visitas: <strong id="visits">--</strong></div>
    </div>`;

if (html.includes(oldFooter)) {
  html = html.replace(oldFooter, newFooter);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Visits counter added to footer right side!');
} else {
  console.log('Could not find old footer match exactly.');
}
