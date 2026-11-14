const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Adicionar HTML da janela modal elegante na frente da página se não existir
if (!html.includes('id="news-modal"')) {
  const modalHtml = `
<div id="news-modal" class="modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:999999; justify-content:center; align-items:center;">
  <div style="background:#111; width:92%; height:92%; max-width:1200px; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; border:2px solid #ffcc00; box-shadow: 0 0 30px rgba(255,204,0,0.4);">
    <div style="background:#1a1a1a; padding:12px 20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #333;">
      <span style="color:#ffcc00; font-family:'Cinzel',serif; font-size:14px; font-weight:bold; letter-spacing:1px;">VISUALIZANDO MATÉRIA (Você pode continuar lendo o jornal ou fechar)</span>
      <button id="news-modal-close" style="background:#ffcc00; color:#000; border:none; padding:8px 16px; font-weight:bold; cursor:pointer; border-radius:4px; font-size:13px;">FECHAR X</button>
    </div>
    <div style="flex:1; background:#fff; position:relative;">
      <iframe id="news-frame" src="about:blank" style="width:100%; height:100%; border:none;"></iframe>
    </div>
  </div>
</div>
<style>
.modal.open { display: flex !important; }
</style>
`;
  html = html.replace('</body>', modalHtml + '\n</body>');
}

// Atualizar função openModal para abrir no modal interno em vez de window.open
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

function closeModal() {
  const modal = document.getElementById('news-modal');
  const frame = document.getElementById('news-frame');
  if (modal) modal.classList.remove('open');
  if (frame) frame.src = 'about:blank';
  document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('news-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  const modal = document.getElementById('news-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
});
`;

// Substituir função antiga openModal
html = html.replace(/function openModal\(n\) \{[\s\S]*?\}/, newOpenModal);

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Modal embutido configurado com sucesso!');
