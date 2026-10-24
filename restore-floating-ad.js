const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Limpar estilos e asides antigos
html = html.replace(/<style>[\s\S]*?<\/style>/g, '');
html = html.replace(/<aside class="sidebar-ad">[\s\S]*?<\/aside>/g, '');

const css = fs.readFileSync('public/css/style.css', 'utf8');
const noticias = JSON.parse(fs.readFileSync('data/noticias.json', 'utf8'));
let js = fs.readFileSync('public/js/app.js', 'utf8');
js = js.replace("async function load() {\n  try {\n    const res = await fetch('/api/noticias');\n    const data = await res.json();\n    ALL = data.noticias || [];", "async function load() {\n  try {\n    const data = { noticias: window.__EMBEDDED_NOTICIAS__ || [] };\n    ALL = data.noticias;");

// Deixar o .sidebar-ad flutuante em neon exatamente como o usuário configurou no início (bottom: 30px, left: 30px)
const floatingAdHtml = `
<a href="https://wa.me/" target="_blank" class="floating-neon-ad">Anuncie Conosco • WhatsApp</a>
`;

// Inserir antes de fechar o body
html = html.replace('</body>', floatingAdHtml + '\n</body>');

// Inserir o style no head
html = html.replace('</head>', '<style>\n' + css + '\n</style>\n</head>');

// Inserir script no final
html = html.replace('</body>', '<script>\nwindow.__EMBEDDED_NOTICIAS__ = ' + JSON.stringify(noticias) + ';\n' + js + '\n</script>\n</body>');

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Restored original floating neon ad!');
