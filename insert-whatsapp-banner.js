const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const bannerHtml = `
  <div style="width: 100%; max-width: 100%; box-sizing: border-box; margin: 15px 0; padding: 0;">
    <a href="https://chat.whatsapp.com/HnzmTwyHUEG3KQhJOUNqVI" target="_blank" style="text-decoration: none; display: block; width: 100%;">
      <div style="background: #0f1b13; border: 1px solid #25d366; padding: 20px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 8px; width: 100%; box-sizing: border-box; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='scale(1.01)';this.style.boxShadow='0 4px 15px rgba(37,211,102,0.3)';" onmouseout="this.style.transform='scale(1)';this.style.boxShadow='none';">
          <span style="font-size: 11px; color: #25d366; letter-spacing: 2px; text-transform: uppercase;">[ ESPAÇO PUBLICITÁRIO - COMUNIDADE AO VIVO ]</span>
          <h3 style="margin: 10px 0 5px 0; font-size: 18px; color: #ffffff;">Canal de Comunicação Direta</h3>
          <p style="font-size: 13px; color: #b9b9b9; margin-bottom: 10px;">São José do Calçado - ES e Região</p>
          <div style="font-size: 12px; color: #75fb9d; margin-bottom: 15px; background: rgba(37, 211, 102, 0.15); padding: 6px; border-radius: 4px; display: inline-block;">
              Status: Canal aberto para novas conexões e atualizações.
          </div>
          <div>
              <span style="background: #25d366; color: #0f1b13; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block; font-size: 13px; text-transform: uppercase;">Entrar no Grupo _</span>
          </div>
      </div>
    </a>
  </div>
`;

// Remove previous banner if any
html = html.replace(/<div style="width: 100%; max-width: 100%;[\s\S]*?<\/a>\s*<\/div>/g, '');
html = html.replace(/<div style="max-width: 800px; margin: 20px auto;[\s\S]*?<\/div>\s*<\/div>/g, '');

if (html.includes('</header>')) {
  html = html.replace('</header>', '</header>\n' + bannerHtml);
} else {
  html = bannerHtml + html;
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('WhatsApp banner inserted and fitted successfully!');
