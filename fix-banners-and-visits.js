const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Garantir os 4 banners reais com links ativos na sidebar
const fourBannersHtml = `
<div style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px;">
  <a href="https://wa.me/" target="_blank"><img src="images/grupo da lilian .png" alt="Grupo da Lilian" style="width:100%; border-radius:4px; border:1px solid #333; display:block;"></a>
  <a href="https://instagram.com" target="_blank"><img src="images/instagran da lilian.png" alt="Instagram da Lilian" style="width:100%; border-radius:4px; border:1px solid #333; display:block;"></a>
  <a href="https://wa.me/" target="_blank"><img src="images/lilian artesanato .png" alt="Lilian Artesanato" style="width:100%; border-radius:4px; border:1px solid #333; display:block;"></a>
  <a href="https://wa.me/" target="_blank"><img src="images/luciana bareli.png" alt="Luciana Bareli" style="width:100%; border-radius:4px; border:1px solid #333; display:block;"></a>
</div>
`;

// Substituir qualquer bloco de anúncios na sidebar pelos 4 banners garantidos
html = html.replace(/<aside class="sidebar-ad">[\s\S]*?<\/aside>/, `<aside class="sidebar-ad">
  <div style="font-family:'Merriweather',serif; font-size:14px; font-weight:900; color:#ff007f; text-transform:uppercase; letter-spacing:4px; text-align:center; border-bottom:1px solid #333; padding-bottom:12px;">Patrocínio / Anúncio</div>
  ${fourBannersHtml}
  <div style="text-align:center;">
    <a href="https://wa.me/" target="_blank" style="display:block; background:#ff007f; color:#fff; padding:10px; font-size:10px; font-weight:bold; text-transform:uppercase; letter-spacing:2px; text-decoration:none; border-radius:4px;">Anuncie Conosco</a>
  </div>
</aside>`);

// 2. Garantir o contador de visitas ativo no rodapé (lado direito)
const footerTarget = `<div class="footer-inner">
      <div>© <span id="year"></span> Notícias de São José do Calçado</div>
    </div>`;

const footerReplacement = `<div class="footer-inner">
      <div>© <span id="year"></span> Notícias de São José do Calçado</div>
      <div class="visits visits-footer">Visitas: <strong id="visits">--</strong></div>
    </div>`;

if (html.includes(footerTarget)) {
  html = html.replace(footerTarget, footerReplacement);
} else if (!html.includes('visits-footer')) {
  // Inserir no footer caso o formato varie um pouco
  html = html.replace('</footer>', '  <div class="visits visits-footer" style="padding: 10px 24px; text-align: right;">Visitas: <strong id="visits">--</strong></div>\n</footer>');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('4 banners and footer visits counter fully restored and fixed in index.html!');
