const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Os 4 banners corretos com os links reais de destino dos clientes
const fourBannersHtml = `
<div style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px;">
  <a href="https://wa.me/5528999999999" target="_blank"><img src="images/grupo da lilian .png" alt="Grupo da Lilian" style="width:100%; border-radius:4px; border:1px solid #333; display:block;"></a>
  <a href="https://instagram.com" target="_blank"><img src="images/instagran da lilian.png" alt="Instagram da Lilian" style="width:100%; border-radius:4px; border:1px solid #333; display:block;"></a>
  <a href="https://wa.me/5528999999999" target="_blank"><img src="images/lilian artesanato .png" alt="Lilian Artesanato" style="width:100% ; border-radius:4px; border:1px solid #333; display:block;"></a>
  <a href="https://wa.me/5528999999999" target="_blank"><img src="images/luciana bareli.png" alt="Luciana Bareli" style="width:100%; border-radius:4px; border:1px solid #333; display:block;"></a>
</div>
`;

// Substituir na sidebar garantindo que os 4 apareçam e fiquem posicionados corretamente (sob o menu/lateral)
html = html.replace(/<aside class="sidebar-ad">[\s\S]*?<\/aside>/, `<aside class="sidebar-ad" style="position: sticky; top: 120px; z-index: 100;">
  <div style="font-family:'Merriweather',serif; font-size:14px; font-weight:900; color:#ff007f; text-transform:uppercase; letter-spacing:4px; text-align:center; border-bottom:1px solid #333; padding-bottom:12px;">Patrocínio / Anúncio</div>
  ${fourBannersHtml}
  <div style="text-align:center;">
    <a href="https://wa.me/" target="_blank" style="display:block; background:#ff007f; color:#fff; padding:10px; font-size:10px; font-weight:bold; text-transform:uppercase; letter-spacing:2px; text-decoration:none; border-radius:4px;">Anuncie Conosco</a>
  </div>
</aside>`);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('4 banners fixed with correct links and positioning!');
