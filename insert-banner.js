const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const bannerHtml = `
  <div style="max-width: 800px; margin: 20px auto; padding: 0 15px;">
    <div style="background: #0f111a; border: 1px solid #d62976; padding: 20px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 8px;">
        <span style="font-size: 11px; color: #d62976; letter-spacing: 2px; text-transform: uppercase;">[ ESPAÇO PUBLICITÁRIO - DESTAQUE DIGITAL ]</span>
        <h3 style="margin: 10px 0 5px 0; font-size: 18px; color: #ffffff;">Lílian Artesanato</h3>
        <p style="font-size: 13px; color: #b9b9b9; margin-bottom: 10px;">Bolsas de Crochê Artesanais | São José do Calçado - ES</p>
        <div style="font-size: 12px; color: #ff77a9; margin-bottom: 15px; background: rgba(214, 41, 118, 0.15); padding: 6px; border-radius: 4px;">
            Status: @lilianartesanato13 sincronizado com elegância e exclusividade.
        </div>
        <a href="https://www.instagram.com/lilianartesanato13/" target="_blank" style="background: #d62976; color: #ffffff; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block; font-size: 13px; text-transform: uppercase;">Ver no Instagram _</a>
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
console.log('Banner inserted successfully!');
