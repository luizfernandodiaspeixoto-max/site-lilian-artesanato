const fs = require('fs');
const indexPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// Replace openModal function cleanly
const target = `function openModal(n) {
  if (n && n.link) {
    window.open(n.link, '_blank');
  }
}`;

const replacement = `function openModal(n) {
  if (n && n.link) {
    const url = n.link;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('openModal function successfully updated to reliable click handler.');
} else {
  console.log('Target openModal not found.');
}
