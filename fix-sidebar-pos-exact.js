const fs = require('fs');
const indexPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const newSidebar = `<aside class="sidebar-ad" style="display: flex; flex-direction: column; justify-content: space-between; padding: 10px 8px; gap: 6px;">
  <div style="font-family:'Merriweather',serif; font-size:10px; font-weight:900; color:#ff007f; text-transform:uppercase; letter-spacing:2px; text-align:center; border-bottom:1px solid #333; padding-bottom:3px; margin-bottom:2px;">Patrocínio / Anúncios</div>

  <!-- ANÚNCIO 1: Luciana Bareli Hair -->
  <a href="https://www.instagram.com/lucianabareli_hair/" target="_blank" style="text-decoration: none; display: block; flex: 1;">
    <div style="background: #111015; border: 2px solid #d4af37; padding: 6px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 5px; cursor: pointer; animation: neonPulse 1.5s infinite alternate; height: 100%; display: flex; flex-direction: column; justify-content: center;">
        <span style="font-size: 7px; color: #d4af37; letter-spacing: 1px; text-transform: uppercase;">[ SALÃO &amp; ESTILO ]</span>
        <h3 style="margin: 2px 0 1px 0; font-size: 11px; color: #ffffff;">Luciana Bareli Hair</h3>
        <span style="background: #d4af37; color: #111015; padding: 2px 6px; font-weight: bold; border-radius: 3px; display: inline-block; font-size: 8px; text-transform: uppercase; margin-top: 2px;">Ver Instagram _</span>
    </div>
  </a>

  <!-- ANÚNCIO 2: CANAL DE VENDAS DA LILIAN -->
  <a href="https://chat.whatsapp.com/HnzmTwyHUEG3KQhJOUNqVI" target="_blank" style="text-decoration: none; display: block; flex: 1;">
    <div style="background: #0f1b13; border: 2px solid #25d366; padding: 6px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 5px; cursor: pointer; animation: neonPulse 1.5s infinite alternate; height: 100%; display: flex; flex-direction: column; justify-content: center;">
        <span style="font-size: 7px; color: #25d366; letter-spacing: 1px; text-transform: uppercase;">[ COMUNIDADE ]</span>
        <h3 style="margin: 2px 0 1px 0; font-size: 10px; color: #ffffff;">CANAL DE VENDAS DA LILIAN</h3>
        <span style="background: #25d366; color: #0f1b13; padding: 2px 6px; font-weight: bold; border-radius: 3px; display: inline-block; font-size: 8px; text-transform: uppercase; margin-top: 2px;">Entrar no Grupo _</span>
    </div>
  </a>

  <!-- ANÚNCIO 3: Lílian Artesanato (Instagram) -->
  <a href="https://www.instagram.com/lilianartesanato13/" target="_blank" style="text-decoration: none; display: block; flex: 1;">
    <div style="background: #0f111a; border: 2px solid #d62976; padding: 6px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 5px; cursor: pointer; animation: neonPulse 1.5s infinite alternate; height: 100%; display: flex; flex-direction: column; justify-content: center;">
        <span style="font-size: 7px; color: #d62976; letter-spacing: 1px; text-transform: uppercase;">[ DESTAQUE ]</span>
        <h3 style="margin: 2px 0 1px 0; font-size: 11px; color: #ffffff;">Lílian Artesanato</h3>
        <span style="background: #d62976; color: #ffffff; padding: 2px 6px; font-weight: bold; border-radius: 3px; display: inline-block; font-size: 8px; text-transform: uppercase; margin-top: 2px;">Ver Instagram _</span>
    </div>
  </a>

  <!-- ANÚNCIO 4: Lílian Artesanato (Site / Loja Virtual) -->
  <a href="https://www.instagram.com/lilianartesanato13/" target="_blank" style="text-decoration: none; display: block; flex: 1;">
    <div style="background: #121019; border: 2px solid #9933ff; padding: 6px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 5px; cursor: pointer; animation: neonPulse 1.5s infinite alternate; height: 100%; display: flex; flex-direction: column; justify-content: center;">
        <span style="font-size: 7px; color: #9933ff; letter-spacing: 1px; text-transform: uppercase;">[ LOJA VIRTUAL ]</span>
        <h3 style="margin: 2px 0 1px 0; font-size: 11px; color: #ffffff;">Lílian Artesanato Site</h3>
        <span style="background: #9933ff; color: #ffffff; padding: 2px 6px; font-weight: bold; border-radius: 3px; display: inline-block; font-size: 8px; text-transform: uppercase; margin-top: 2px;">Acessar Site _</span>
    </div>
  </a>

  <div style="text-align: center; padding-top: 2px;">
    <a href="https://wa.me/" target="_blank" style="display: block; background: #ff007f; color: #fff; padding: 5px; font-size: 7px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 3px; box-shadow: 0 0 6px rgba(255,0,127,0.5);">Anuncie Conosco</a>
  </div>
</aside>`;

if (html.includes('<aside class="sidebar-ad">')) {
  html = html.replace(/<aside class="sidebar-ad">[\s\S]*?<\/aside>/, newSidebar);
} else {
  html = html.replace('<main class="container">', newSidebar + '\n<main class="container">');
}

// Adjust top offset in CSS so sidebar starts right below masthead (no overlap/space under menu)
html = html.replace(/top:\s*100px;/g, 'top: 135px;');
html = html.replace(/min-height:\s*calc\(100vh\s*-\s*120px\);/g, 'height: calc(100vh - 145px);');

// Reduce top margin/padding on container so it starts right below masthead without big gap
html = html.replace(/\.container\s*\{\s*grid-area:\s*container;\s*margin-top:\s*120px;\s*\}/g, '.container { grid-area: container; margin-top: 15px; padding-top: 10px; }');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Sidebar top offset adjusted to sit right below the masthead header.');
