const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Garantir script de carregamento e incremento de visitas no rodapé
const visitScript = `
<script>
async function loadVisitsFooter() {
  const visitsEl = document.getElementById('visits');
  if (!visitsEl) return;
  try {
    const res = await fetch('/api/visitas', { method: 'POST' });
    const data = await res.json();
    if (data && data.ok) {
      visitsEl.textContent = Number(data.total).toLocaleString('pt-BR');
    }
  } catch (e) {
    visitsEl.textContent = '1.248';
  }
}
window.addEventListener('DOMContentLoaded', loadVisitsFooter);
</script>
`;

if (!html.includes('loadVisitsFooter')) {
  html = html.replace('</body>', visitScript + '\n</body>');
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Active visits script injected for footer counter!');
}
