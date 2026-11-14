const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const bannerHtml = `
  <div style="max-width: 800px; margin: 20px auto; padding: 0 15px;">
    <div style="background: #111015; border: 1px solid #d4af37; padding: 20px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 8px;">
        <span style="font-size: 11px; color: #d4af37; letter-spacing: 2px; text-transform: uppercase;">[ ESPAÇO PUBLICITÁRIO - SALÃO & ESTILO ]</span>
        <h3 style="margin: 10px 0 5px 0; font-size: 18px; color: #ffffff;">Luciana Bareli Hair</h3>
        <p style="font-size: 13px; color: #b9b9b9; margin-bottom: 10px;">Especialista em Cabelos | São José do Calçado - ES</p>
        <div style="font-size: 12px; color: #f3e5ab; margin-bottom: 15px; background: rgba(212, 175, 55, 0.15); padding: 6px; border-radius: 4px;">
            Status: @lucianabareli_hair processando a sua melhor versão.
        </div>
        <a href="https://www.instagram.com/lucianabareli_hair/" target="_blank" style="background: #d4af37; color: #111015; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block; font-size: 13px; text-transform: uppercase;">Ver no Instagram _</a>
    </div>
  </div>
`;

// Remove previous banner if any
html = html.replace(/<div style="max-width: 800px; margin: 20px auto; padding: 0 15px;">[\s\S]*?<\/div>\s*<\/div>/g, '');

if (html.includes('</header>')) {
  html = html.replace('</header>', '</header>\n' + bannerHtml);
} else {
  html = bannerHtml + html;
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Luciana Bareli banner inserted successfully!');
