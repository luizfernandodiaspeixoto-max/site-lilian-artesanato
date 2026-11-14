const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Atualizar a função openModal para abrir uma aba/janela limpa e direta ou um overlay sem iframe bloqueado
const newOpenModal = `
function openModal(n) {
  // Como portais de notícias (G1, UOL, etc.) bloqueiam iframes externos por política de segurança de navegador,
  // abrimos a reportagem diretamente em uma nova aba/janela rápida do navegador mantendo o site principal intacto e aberto atrás.
  window.open(n.link, '_blank');
}
`;

html = html.replace(/function openModal\(n\) \{[\s\S]*?\}/, newOpenModal);

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Modal updated to direct window.open!');
