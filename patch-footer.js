const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const target = `<div class="footer-inner">
      <div>© <span id="year"></span> Notícias de São José do Calçado</div>
    </div>`;

const replacement = `<div class="footer-inner">
      <div>© <span id="year"></span> Notícias de São José do Calçado</div>
      <div class="visits visits-footer">Visitas: <strong id="visits">--</strong></div>
    </div>`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Successfully added visits counter to footer!');
} else {
  console.log('Target footer not found with exact string.');
}
