const fs = require('fs');
const indexPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const newSidebar = `<aside class="sidebar-ad" style="display: flex; flex-direction: column; justify-content: space-between; padding: 10px; gap: 8px;">
  <div style="font-family:'Merriweather',serif; font-size:11px; font-weight:900; color:#ff007f; text-transform:uppercase; letter-spacing:2px; text-align:center; border-bottom:1px solid #333; padding-bottom:4px; margin-bottom:2px; background: rgba(0,0,0,0.8); border-radius: 4px;">Patrocínio / Anúncios</div>

  <!-- ANÚNCIO 1: Luciana Bareli Hair -->
  <a href="https://www.instagram.com/lucianabareli_hair/" target="_blank" style="text-decoration: none; display: block; flex: 1;">
    <div style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/luciana bareli.png') center/cover no-repeat; border: 2px solid #d4af37; padding: 10px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 6px; cursor: pointer; animation: neonPulse 1.5s infinite alternate; height: 100%; display: flex; flex-direction: column; justify-content: center; text-shadow: 1px 1px 3px #000;">
        <span style="font-size: 8px; color: #d4af37; letter-spacing: 1px; text-transform: uppercase; font-weight: bold;">[ SALÃO &amp; ESTILO ]</span>
        <h3 style="margin: 3px 0 2px 0; font-size: 13px; color: #ffffff; font-weight: 900;">Luciana Bareli Hair</h3>
        <span style="background: #d4af37; color: #111015; padding: 3px 8px; font-weight: bold; border-radius: 3px; display: inline-block; font-size: 9px; text-transform: uppercase; margin-top: 2px;">Ver Instagram _</span>
    </div>
  </a>

  <!-- ANÚNCIO 2: CANAL DE VENDAS DA LILIAN -->
  <a href="https://chat.whatsapp.com/HnzmTwyHUEG3KQhJOUNqVI" target="_blank" style="text-decoration: none; display: block; flex: 1;">
    <div style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/grupo da lilian .png') center/cover no-repeat; border: 2px solid #25d366; padding: 10px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 6px; cursor: pointer; animation: neonPulse 1.5s infinite alternate; height: 100%; display: flex; flex-direction: column; justify-content: center; text-shadow: 1px 1px 3px #000;">
        <span style="font-size: 8px; color: #25d366; letter-spacing: 1px; text-transform: uppercase; font-weight: bold;">[ COMUNIDADE ]</span>
        <h3 style="margin: 3px 0 2px 0; font-size: 11px; color: #ffffff; font-weight: 900;">CANAL DE VENDAS DA LILIAN</h3>
        <span style="background: #25d366; color: #0f1b13; padding: 3px 8px; font-weight: bold; border-radius: 3px; display: inline-block; font-size: 9px; text-transform: uppercase; margin-top: 2px;">Entrar no Grupo _</span>
    </div>
  </a>

  <!-- ANÚNCIO 3: Lílian Artesanato (Instagram) -->
  <a href="https://www.instagram.com/lilianartesanato13/" target="_blank" style="text-decoration: none; display: block; flex: 1;">
    <div style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/instagran da lilian.png') center/cover no-repeat; border: 2px solid #d62976; padding: 10px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 6px; cursor: pointer; animation: neonPulse 1.5s infinite alternate; height: 100%; display: flex; flex-direction: column; justify-content: center; text-shadow: 1px 1px 3px #000;">
        <span style="font-size: 8px; color: #d62976; letter-spacing: 1px; text-transform: uppercase; font-weight: bold;">[ DESTAQUE ]</span>
        <h3 style="margin: 3px 0 2px 0; font-size: 13px; color: #ffffff; font-weight: 900;">Lílian Artesanato</h3>
        <span style="background: #d62976; color: #ffffff; padding: 3px 8px; font-weight: bold; border-radius: 3px; display: inline-block; font-size: 9px; text-transform: uppercase; margin-top: 2px;">Ver Instagram _</span>
    </div>
  </a>

  <!-- ANÚNCIO 4: Lílian Artesanato (Site / Loja Virtual) -->
  <a href="https://www.instagram.com/lilianartesanato13/" target="_blank" style="text-decoration: none; display: block; flex: 1;">
    <div style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/lilian artesanato .png') center/cover no-repeat; border: 2px solid #9933ff; padding: 10px; font-family: 'Courier New', Courier, monospace; color: #ffffff; text-align: center; border-radius: 6px; cursor: pointer; animation: neonPulse 1.5s infinite alternate; height: 100%; display: flex; flex-direction: column; justify-content: center; text-shadow: 1px 1px 3px #000;">
        <span style="font-size: 8px; color: #9933ff; letter-spacing: 1px; text-transform: uppercase; font-weight: bold;">[ LOJA VIRTUAL ]</span>
        <h3 style="margin: 3px 0 2px 0; font-size: 13px; color: #ffffff; font-weight: 900;">Lílian Artesanato Site</h3>
        <span style="background: #9933ff; color: #ffffff; padding: 3px 8px; font-weight: bold; border-radius: 3px; display: inline-block; font-size: 9px; text-transform: uppercase; margin-top: 2px;">Acessar Site _</span>
    </div>
  </a>

  <div style="text-align: center; padding-top: 2px;">
    <a href="https://wa.me/" target="_blank" style="display: block; background: #ff007f; color: #fff; padding: 6px; font-size: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 4px; box-shadow: 0 0 8px rgba(255,0,127,0.5);">Anuncie Conosco</a>
  </div>
</aside>`;

// Remove old sidebars
html = html.replace(/<aside class="sidebar-ad">[\s\S]*?<\/aside>/g, '');

if (html.includes('<main class="container">')) {
  html = html.replace('<main class="container">', newSidebar + '\n<main class="container">');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Sidebar with background images successfully applied.');
