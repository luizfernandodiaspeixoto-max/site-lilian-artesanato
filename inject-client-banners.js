const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const bannersHtml = `
<div style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px;">
  <a href="#" target="_blank"><img src="/images/grupo da lilian .png" alt="Grupo da Lilian" style="width:100%; border-radius:4px; border:1px solid #333;"></a>
  <a href="#" target="_blank"><img src="/images/instagran da lilian.png" alt="Instagram da Lilian" style="width:100%; border-radius:4px; border:1px solid #333;"></a>
  <a href="#" target="_blank"><img src="/images/lilian artesanato .png" alt="Lilian Artesanato" style="width:100%; border-radius:4px; border:1px solid #333;"></a>
  <a href="#" target="_blank"><img src="/images/luciana bareli.png" alt="Luciana Bareli" style="width:100%; border-radius:4px; border:1px solid #333;"></a>
</div>
`;

// Substituir a caixa de anúncio genérica pelos 4 banners reais dos clientes
const oldBox = `<div style="background:#1a1a1a; border:1px solid #333; padding:16px; text-align:center; color:#fff; font-size:12px; line-height:1.5;">
    <p style="margin-bottom:10px; color:#ff007f; font-weight:bold; text-transform:uppercase; letter-spacing:2px;">Espaço Publicitário</p>
    <p style="color:#ccc; font-size:11px;">Anuncie aqui no Jornal Digital de São José do Calçado e região!</p>
  </div>`;

if (html.includes(oldBox)) {
  html = html.replace(oldBox, bannersHtml);
} else {
  // Caso exato ou similar
  html = html.replace(/<div style="background:#1a1a1a;[\s\S]*?<\/div>/, bannersHtml);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('4 banners dos clientes injetados com sucesso na barra lateral!');
