const fs = require('fs');
const path = require('path');

const publicIndex = 'G:/noticias calcado/public/index.html';
const serverJs = 'G:/noticias calcado/src/server.js';

let html = fs.readFileSync(publicIndex, 'utf8');

// 1. Injetar os 4 banners reais dos clientes na barra lateral do index.html se não existirem
const bannersHtml = `
<div style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px;">
  <a href="https://whatsapp.com" target="_blank"><img src="images/grupo da lilian .png" alt="Grupo da Lilian" style="width:100%; border-radius:4px; border:1px solid #333;"></a>
  <a href="https://instagram.com" target="_blank"><img src="images/instagran da lilian.png" alt="Instagram da Lilian" style="width:100%; border-radius:4px; border:1px solid #333;"></a>
  <a href="https://whatsapp.com" target="_blank"><img src="images/lilian artesanato .png" alt="Lilian Artesanato" style="width:100%; border-radius:4px; border:1px solid #333;"></a>
  <a href="https://whatsapp.com" target="_blank"><img src="images/luciana bareli.png" alt="Luciana Bareli" style="width:100%; border-radius:4px; border:1px solid #333;"></a>
</div>
`;

if (!html.includes('grupo da lilian')) {
  // Injetar na sidebar
  html = html.replace(/<aside class="sidebar-ad">[\s\S]*?<\/aside>/, `<aside class="sidebar-ad">
  <div style="font-family:'Merriweather',serif; font-size:14px; font-weight:900; color:#ff007f; text-transform:uppercase; letter-spacing:4px; text-align:center; border-bottom:1px solid #333; padding-bottom:12px;">Patrocínio / Anúncio</div>
  ${bannersHtml}
  <div style="text-align:center;">
    <a href="https://wa.me/" target="_blank" style="display:block; background:#ff007f; color:#fff; padding:10px; font-size:10px; font-weight:bold; text-transform:uppercase; letter-spacing:2px; text-decoration:none; border-radius:4px;">Anuncie Conosco</a>
  </div>
</aside>`);
}

// 2. Garantir que o contador de visitas do topo seja removido e fique apenas no rodapé (direito)
html = html.replace(/<div class="visits visits-top">[\s\S]*?<\/div>/g, '');
html = html.replace(/<div class="visits">[\s\S]*?<\/div>/g, '');

if (!html.includes('visits-footer')) {
  html = html.replace(
    '<div class="footer-inner">\n      <div>© <span id="year"></span> Notícias de São José do Calçado</div>\n    </div>',
    '<div class="footer-inner">\n      <div>© <span id="year"></span> Notícias de São José do Calçado</div>\n      <div class="visits visits-footer">Visitas: <strong id="visits">--</strong></div>\n    </div>'
  );
}

// 3. Garantir caminhos relativos nas imagens para abrir via file:/// ou servidor
html = html.replace(/\/images\//g, 'images/');
html = html.replace(/\/css\//g, 'css/');
html = html.replace(/\/js\//g, 'js/');

fs.writeFileSync(publicIndex, html, 'utf8');
console.log('Public index.html fully synchronized and relative paths fixed for file:// protocol!');
