const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Simplificar openModal para abrir diretamente na nova aba de forma limpa e garantida sem bloqueio de iframe de portais externos
const newOpenModal = `
function openModal(n) {
  if (n && n.link) {
    window.open(n.link, '_blank');
  }
}
`;

html = html.replace(/function openModal\(n\) \{[\s\S]*?\n\}/, newOpenModal);

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('openModal updated to direct window.open reliably!');
