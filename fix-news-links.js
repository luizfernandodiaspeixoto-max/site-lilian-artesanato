const fs = require('fs');
const indexPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Fix news click to use a real <a> tag or direct window.open reliably on click
const targetRender = `    btn.addEventListener('click', () => openModal(n));
    grid.appendChild(btn);`;

const replacementRender = `    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (n.link) {
        window.open(n.link, '_blank');
      }
    });
    grid.appendChild(btn);`;

if (html.includes(targetRender)) {
  html = html.replace(targetRender, replacementRender);
  console.log('News card click handler updated.');
}

// 2. Also ensure openModal itself uses window.open directly
const targetOpenModal = `function openModal(n) {
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

const replacementOpenModal = `function openModal(n) {
  if (n && n.link) {
    window.open(n.link, '_blank');
  }
}`;

if (html.includes(targetOpenModal)) {
  html = html.replace(targetOpenModal, replacementOpenModal);
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('index.html updated for reliable news link opening.');
