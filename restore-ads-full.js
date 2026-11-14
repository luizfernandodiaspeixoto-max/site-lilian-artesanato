const fs = require('fs');
const indexPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const newSidebar = `<aside class="sidebar-ad" style="display: flex; flex-direction: column; justify-content: space-between; padding: 14px 12px; gap: 10px;">
  <div style="font-family:'Merriweather',serif; font-size:12px; font-weight:900; color:#ff007f; text-transform:uppercase; letter-spacing:2px; text-align:center; border-bottom:1px solid #333; padding-bottom:6px; margin-bottom:4px;">Patrocínio / Anúncios</div>

  <!-- ANÚNCIO 1: Luciana Bareli Hair -->
  <a href="https://www.instagram.com/lucianabareli_hair/" target="_blank" style="text-decoration: none; display: block;">
    <div style="background: #111015; border: 2px solid #d4af37; padding: 12px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 8px; cursor: pointer; animation: neonPulse 1.5s infinite alternate;">
        <span style="font-size: 9px; color: #d4af37; letter-spacing: 2px; text-transform: uppercase;">[ SALÃO &amp; ESTILO ]</span>
        <h3 style="margin: 4px 0 2px 0; font-size: 14px; color: #ffffff;">Luciana Bareli Hair</h3>
        <p style="font-size: 11px; color: #b9b9b9; margin-bottom: 6px;">Especialista em Cabelos | SJ Calçado</p>
        <span style="background: #d4af37; color: #111015; padding: 6px 12px; font-weight: bold; border-radius: 4px; display: inline-block; font-size: 10px; text-transform: uppercase;">Ver no Instagram _</span>
    </div>
  </a>

  <!-- ANÚNCIO 2: CANAL DE VENDAS DA LILIAN -->
  <a href="https://chat.whatsapp.com/HnzmTwyHUEG3KQhJOUNqVI" target="_blank" style="text-decoration: none; display: block;">
    <div style="background: #0f1b13; border: 2px solid #25d366; padding: 12px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 8px; cursor: pointer; animation: neonPulse 1.5s infinite alternate;">
        <span style="font-size: 9px; color: #25d366; letter-spacing: 2px; text-transform: uppercase;">[ COMUNIDADE AO VIVO ]</span>
        <h3 style="margin: 4px 0 2px 0; font-size: 13px; color: #ffffff;">CANAL DE VENDAS DA LILIAN</h3>
        <p style="font-size: 11px; color: #b9b9b9; margin-bottom: 6px;">São José do Calçado - ES e Região</p>
        <span style="background: #25d366; color: #0f1b13; padding: 6px 12px; font-weight: bold; border-radius: 4px; display: inline-block; font-size: 10px; text-transform: uppercase;">Entrar no Grupo _</span>
    </div>
  </a>

  <!-- ANÚNCIO 3: Lílian Artesanato (Instagram) -->
  <a href="https://www.instagram.com/lilianartesanato13/" target="_blank" style="text-decoration: none; display: block;">
    <div style="background: #0f111a; border: 2px solid #d62976; padding: 12px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 8px; cursor: pointer; animation: neonPulse 1.5s infinite alternate;">
        <span style="font-size: 9px; color: #d62976; letter-spacing: 2px; text-transform: uppercase;">[ DESTAQUE DIGITAL ]</span>
        <h3 style="margin: 4px 0 2px 0; font-size: 14px; color: #ffffff;">Lílian Artesanato</h3>
        <p style="font-size: 11px; color: #b9b9b9; margin-bottom: 6px;">Bolsas de Crochê Artesanais</p>
        <span style="background: #d62976; color: #ffffff; padding: 6px 12px; font-weight: bold; border-radius: 4px; display: inline-block; font-size: 10px; text-transform: uppercase;">Ver no Instagram _</span>
    </div>
  </a>

  <!-- ANÚNCIO 4: Lílian Artesanato (Site / Loja Virtual) -->
  <a href="https://www.instagram.com/lilianartesanato13/" target="_blank" style="text-decoration: none; display: block;">
    <div style="background: #121019; border: 2px solid #9933ff; padding: 12px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 8px; cursor: pointer; animation: neonPulse 1.5s infinite alternate;">
        <span style="font-size: 9px; color: #9933ff; letter-spacing: 2px; text-transform: uppercase;">[ LOJA VIRTUAL - SITE ]</span>
        <h3 style="margin: 4px 0 2px 0; font-size: 14px; color: #ffffff;">Lílian Artesanato - Site</h3>
        <p style="font-size: 11px; color: #b9b9b9; margin-bottom: 6px;">Catálogo Oficial e Encomendas Online</p>
        <span style="background: #9933ff; color: #ffffff; padding: 6px 12px; font-weight: bold; border-radius: 4px; display: inline-block; font-size: 10px; text-transform: uppercase;">Acessar o Site _</span>
    </div>
  </a>

  <div style="text-align: center; padding-top: 6px;">
    <a href="https://wa.me/" target="_blank" style="display: block; background: #ff007f; color: #fff; padding: 8px; font-size: 9px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; border-radius: 4px; box-shadow: 0 0 10px rgba(255,0,127,0.5);">Anuncie Conosco</a>
  </div>
</aside>`;

if (html.includes('<aside class="sidebar-ad">')) {
  html = html.replace(/<aside class="sidebar-ad">[\s\S]*?<\/aside>/, newSidebar);
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Restored full size for all 4 ads successfully.');
