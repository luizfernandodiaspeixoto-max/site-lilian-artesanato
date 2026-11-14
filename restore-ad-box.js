const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const adBoxHtml = `
<aside class="sidebar-ad">
  <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #777; margin-bottom: 10px; text-align: center;">Patrocínio / Anúncio</div>
  <div style="background: #fdfbf7; border: 2px dashed #d7d2c9; padding: 20px 10px; text-align: center; border-radius: 6px;">
    <p style="font-size: 13px; font-weight: bold; color: #8b1c13; margin-bottom: 8px;">ESPAÇO PUBLICITÁRIO</p>
    <p style="font-size: 11px; color: #444; line-height: 1.4;">Divulgue sua marca ou negócio aqui para toda São José do Calçado!</p>
  </div>
</aside>
`;

// Se já não tiver sidebar-ad, vamos injetá-la corretamente na estrutura flex/grid
if (!html.includes('sidebar-ad')) {
  // Encontrar onde começa o container ou main
  html = html.replace('<main class="container">', '<div class="main-layout">' + adBoxHtml + '\n<main class="container">');
  html = html.replace('</main>', '</main>\n</div>');
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Caixa de anúncio inserida corretamente na lateral!');
}
