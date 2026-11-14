const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Remover qualquer tag <style> existente e tag aside sidebar-ad
html = html.replace(/<style>[\s\S]*?<\/style>/g, '');
html = html.replace(/<aside class="sidebar-ad">[\s\S]*?<\/aside>/g, '');

const css = fs.readFileSync('public/css/style.css', 'utf8');
const noticias = JSON.parse(fs.readFileSync('data/noticias.json', 'utf8'));
let js = fs.readFileSync('public/js/app.js', 'utf8');
js = js.replace("async function load() {\n  try {\n    const res = await fetch('/api/noticias');\n    const data = await res.json();\n    ALL = data.noticias || [];", "async function load() {\n  try {\n    const data = { noticias: window.__EMBEDDED_NOTICIAS__ || [] };\n    ALL = data.noticias;");

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

// Inserir a sidebar antes de <main class="container">
html = html.replace('<main class="container">', sidebarHtml + '\n<main class="container">');

// Inserir o style no head
html = html.replace('</head>', '<style>\n' + css + '\n</style>\n</head>');

// Inserir script no final
html = html.replace('</body>', '<script>\nwindow.__EMBEDDED_NOTICIAS__ = ' + JSON.stringify(noticias) + ';\n' + js + '\n</script>\n</body>');

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Clean standalone built successfully!');
