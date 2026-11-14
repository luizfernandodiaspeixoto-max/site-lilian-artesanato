const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const target = `function openModal(n) {
  if (n && n.link) {
    window.open(n.link, '_blank');
  }
}`;

const replacement = `function openModal(n) {
  if (n && n.link) {
    const a = document.createElement('a');
    a.href = n.link;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('openModal function successfully updated with direct anchor click!');
} else {
  // Tentar substituição por regex flexível
  html = html.replace(/function openModal\(n\) \{[\s\S]*?\}/, replacement);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('openModal replaced via regex fallback!');
}
