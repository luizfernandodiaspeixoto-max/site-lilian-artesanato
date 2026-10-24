const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Adicionar HTML do modal logo antes de fechar o body se não existir
if (!html.includes('id="news-modal"')) {
  const modalHtml = `
<div id="news-modal" class="modal">
  <div class="modal-panel">
    <div class="modal-header">
      <span style="font-size:11px; text-transform:uppercase; letter-spacing:2px;">Visualizando Matéria (Você pode continuar lendo ou fechar)</span>
      <button id="news-modal-close" class="modal-close">Fechar X</button>
    </div>
    <div class="modal-body">
      <iframe id="news-frame" src="about:blank"></iframe>
    </div>
  </div>
</div>
`;
  html = html.replace('</body>', modalHtml + '\n</body>');
}

// Atualizar função openModal para abrir na janela interna (modal)
const oldOpenModalRegex = /function openModal\(n\) \{[\s\S]*?\}/;
const newOpenModal = `
function openModal(n) {
  const modal = document.getElementById('news-modal');
  const frame = document.getElementById('news-frame');
  if (!modal || !frame) {
    window.open(n.link, '_blank');
    return;
  }
  frame.src = n.link;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
`;

if (oldOpenModalRegex.test(html)) {
  html = html.replace(oldOpenModalRegex, newOpenModal);
} else {
  // se estiver no app.js embutido
  html = html.replace(/function openModal\(n\) \{[\s\S]*?\}/, newOpenModal);
}

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Modal support successfully added to public/index.html!');
