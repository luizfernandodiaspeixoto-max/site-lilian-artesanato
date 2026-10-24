const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Adicionar o link flutuante neon do lado esquerdo se não existir
const floatingAdHtml = `
<a href="https://whatsapp.com/channel/0029VbDZXej1XqucsOo1Bb45" target="_blank" class="floating-neon-ad">
  📢 ANUNCIE AQUI
</a>
`;

if (!html.includes('floating-neon-ad')) {
  html = html.replace('</body>', floatingAdHtml + '\n</body>');
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Link flutuante neon adicionado ao index.html!');
}
