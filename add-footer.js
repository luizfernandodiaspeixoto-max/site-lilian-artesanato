const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const footerTag = '<footer class="footer">';
if (!html.includes('noticiasdesaojosedocalcado')) {
  html = html.replace(footerTag, '<div style="text-align:center; padding:15px; font-weight:bold; color:#8b1c13; letter-spacing:2px; background:#fff; border-top:1px solid #d7d2c9;">noticiasdesaojosedocalcado</div>\n' + footerTag);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('End fixo adicionado com sucesso!');
}
