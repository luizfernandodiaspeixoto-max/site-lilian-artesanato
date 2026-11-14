const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Remover estilos antigos do floating-neon-ad e classes flutuantes
html = html.replace(/<a[^>]*class="floating-neon-ad"[^>]*>[\s\S]*?<\/a>/g, '');
html = html.replace(/\.floating-neon-ad[\s\S]*?}/g, '');
html = html.replace(/@keyframes neonPulse[\s\S]*?}/g, '');

const css = fs.readFileSync('public/css/style.css', 'utf8');
const noticias = JSON.parse(fs.readFileSync('data/noticias.json', 'utf8'));
let js = fs.readFileSync('public/js/app.js', 'utf8');
js = js.replace("async function load() {\n  try {\n    const res = await fetch('/api/noticias');\n    const data = await res.json();\n    ALL = data.noticias || [];", "async function load() {\n  try {\n    const data = { noticias: window.__EMBEDDED_NOTICIAS__ || [] };\n    ALL = data.noticias;");

// 2. Definir o CSS da barra lateral esquerda fixa com efeito neon
const sidebarCss = `
@keyframes neonPulse {
  0% { box-shadow: 0 0 5px #ff007f, 0 0 10px #ff007f; border-color: #ff007f; }
  50% { box-shadow: 0 0 2px #ff007f, 0 0 5px #ff007f; border-color: #fff; }
  100% { box-shadow: 0 0 5px #ff007f, 0 0 10px #ff007f; border-color: #ff007f; }
}

@media (min-width: 1024px) {
  body {
    display: grid !important;
    grid-template-columns: 260px 1fr !important;
    grid-template-areas:
      "masthead masthead"
      "sidebar container"
      "sidebar footer";
  }
  .masthead {
    grid-area: masthead;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
  }
  .sidebar-ad {
    grid-area: sidebar;
    background: #111111;
    border-right: 2px solid #ff007f;
    padding: 30px 16px;
    min-height: calc(100vh - 120px);
    position: sticky;
    top: 120px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    z-index: 998;
    box-shadow: 0 0 20px rgba(255, 0, 127, 0.4);
    animation: neonPulse 1.5s infinite alternate;
  }
  .container {
    grid-area: container;
    margin-top: 120px;
  }
  .footer {
    grid-area: footer;
  }
}

@media (max-width: 1023px) {
  .masthead {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
  }
  .container {
    margin-top: 120px;
  }
  .sidebar-ad {
    background: #111111;
    border: 2px solid #ff007f;
    padding: 20px;
    margin: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 0 15px rgba(255, 0, 127, 0.4);
    animation: neonPulse 1.5s infinite alternate;
  }
}
`;

// 3. HTML do Banner Lateral Esquerdo
const sidebarHtml = `
<aside class="sidebar-ad">
  <div style="font-family:'Merriweather',serif; font-size:14px; font-weight:900; color:#ff007f; text-transform:uppercase; letter-spacing:4px; text-align:center; border-bottom:1px solid #333; padding-bottom:12px;">Patrocínio / Anúncio</div>
  <div style="background:#1a1a1a; border:1px solid #333; padding:16px; text-align:center; color:#fff; font-size:12px; line-height:1.5;">
    <p style="margin-bottom:10px; color:#ff007f; font-weight:bold; text-transform:uppercase; letter-spacing:2px;">Espaço Publicitário</p>
    <p style="color:#ccc; font-size:11px;">Anuncie aqui no Jornal Digital de São José do Calçado e região!</p>
  </div>
  <div style="margin-top:auto; text-align:center;">
    <a href="https://wa.me/" target="_blank" style="display:block; background:#ff007f; color:#fff; padding:10px; font-size:10px; font-weight:bold; text-transform:uppercase; letter-spacing:2px; text-decoration:none; border-radius:4px; box-shadow:0 0 10px rgba(255,0,127,0.5);">Anuncie Conosco</a>
  </div>
</aside>
`;

// Limpar asides antigos e inserir antes de <main class="container">
html = html.replace(/<aside class="sidebar-ad">[\s\S]*?<\/aside>/g, '');
html = html.replace('<main class="container">', sidebarHtml + '\n<main class="container">');

// Inserir CSS atualizado no head
const fullCss = css + '\n' + sidebarCss;
html = html.replace(/<style>[\s\S]*?<\/style>/, '<style>\n' + fullCss + '\n</style>');

// Inserir script no final
html = html.replace(/<script>[\s\S]*?<\/script>/g, '');
html = html.replace('</body>', '<script>\nwindow.__EMBEDDED_NOTICIAS__ = ' + JSON.stringify(noticias) + ';\n' + js + '\n</script>\n</body>');

fs.writeFileSync('public/index.html', html, 'utf8');
fs.writeFileSync('public/css/style.css', fullCss, 'utf8');
console.log('Fixed: Left neon sidebar ad + fixed sticky masthead!');
