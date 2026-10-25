const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// HTML com exatamente os 4 banners dos clientes e animação neon/flutuante combinadas
const fourBannersNeon = `
<aside class="sidebar-ad" style="position: sticky; top: 120px; z-index: 100; background: #111111; border: 2px solid #ff007f; padding: 16px; border-radius: 8px; box-shadow: 0 0 20px rgba(255,0,127,0.6); animation: neonPulse 1.5s infinite alternate, floatUpDown 4s ease-in-out infinite;">
  <div style="font-family:'Merriweather',serif; font-size:13px; font-weight:900; color:#ff007f; text-transform:uppercase; letter-spacing:3px; text-align:center; border-bottom:1px solid #333; padding-bottom:10px; margin-bottom:12px;">Patrocínio / Anúncio</div>
  <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:14px;">
    <a href="https://wa.me/" target="_blank"><img src="images/grupo da lilian .png" alt="Grupo da Lilian" style="width:100%; border-radius:4px; border:1px solid #333; display:block;"></a>
    <a href="https://instagram.com" target="_blank"><img src="images/instagran da lilian.png" alt="Instagram da Lilian" style="width:100%; border-radius:4px; border:1px solid #333; display:block;"></a>
    <a href="https://wa.me/" target="_blank"><img src="images/lilian artesanato .png" alt="Lilian Artesanato" style="width:100%; border-radius:4px; border:1px solid #333; display:block;"></a>
    <a href="https://wa.me/" target="_blank"><img src="images/luciana bareli.png" alt="Luciana Bareli" style="width:100%; border-radius:4px; border:1px solid #333; display:block;"></a>
  </div>
  <div style="text-align:center;">
    <a href="https://wa.me/" target="_blank" style="display:block; background:#ff007f; color:#fff; padding:10px; font-size:10px; font-weight:bold; text-transform:uppercase; letter-spacing:2px; text-decoration:none; border-radius:4px; box-shadow:0 0 10px rgba(255,0,127,0.7);">Anuncie Conosco</a>
  </div>
</aside>
`;

// Substituir na sidebar
html = html.replace(/<aside class="sidebar-ad">[\s\S]*?<\/aside>/, fourBannersNeon);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('All 4 banners restored with neon pulse + floating animation!');
