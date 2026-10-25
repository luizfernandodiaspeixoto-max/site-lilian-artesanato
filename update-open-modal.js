const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const oldFunc = `function openModal(n) {
  if (n && n.link) {
    window.open(n.link, '_blank');
  }
}`;

const newFunc = `function openModal(n) {
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

if (html.includes(oldFunc)) {
  html = html.replace(oldFunc, newFunc);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('openModal function successfully replaced with direct click action!');
} else {
  console.log('Old function signature not found precisely.');
}
