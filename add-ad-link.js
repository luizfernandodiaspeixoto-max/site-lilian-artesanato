const fs = require('fs');
const htmlPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const target = 'Divulgue sua marca ou negócio aqui para toda São José do Calçado!</p>';
const replacement = 'Divulgue sua marca ou negócio aqui para toda São José do Calçado!</p><a href="https://whatsapp.com/channel/0029VbDZXej1XqucsOo1Bb45" target="_blank" style="display:inline-block; margin-top:12px; background:#25d366; color:#fff; padding:8px 12px; font-size:11px; text-decoration:none; font-weight:bold; border-radius:4px;">ANUNCIE / WHATSAPP</a>';

if (html.includes(target) && !html.includes('whatsapp.com/channel')) {
  html = html.replace(target, replacement);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Link do WhatsApp adicionado ao anúncio lateral!');
}
