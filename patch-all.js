const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Garantir que a barra lateral de anúncio está presente logo no início do body
const bodyOpen = '<body>';
const adHtml = `
<aside class="sidebar-ad">
  <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #777; margin-bottom: 10px; text-align: center;">Patrocínio / Anúncio</div>
  <div style="background: #fdfbf7; border: 2px dashed #d7d2c9; padding: 20px 10px; text-align: center; border-radius: 6px;">
    <p style="font-size: 13px; font-weight: bold; color: #8b1c13; margin-bottom: 8px;">ESPAÇO PUBLICITÁRIO</p>
    <p style="font-size: 11px; color: #444; line-height: 1.4; margin-bottom: 12px;">Divulgue sua marca ou negócio aqui para toda São José do Calçado!</p>
    <a href="https://whatsapp.com/channel/0029VbDZXej1XqucsOo1Bb45" target="_blank" style="display:inline-block; background:#25d366; color:#fff; padding:8px 12px; font-size:11px; text-decoration:none; font-weight:bold; border-radius:4px;">ANUNCIE / WHATSAPP</a>
  </div>
</aside>
`;

if (!html.includes('sidebar-ad')) {
  html = html.replace(bodyOpen, bodyOpen + '\n' + adHtml);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Anúncio inserido no index.html!');
}

// Rodapé fixo
const footerTag = '<footer class="footer">';
if (!html.includes('noticiasdesaojosedocalcado')) {
  html = html.replace(footerTag, '<div style="text-align:center; padding:15px; font-weight:bold; color:#8b1c13; letter-spacing:2px; background:#fff; border-top:1px solid #d7d2c9;">noticiasdesaojosedocalcado</div>\n' + footerTag);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Rodapé fixo inserido!');
}
