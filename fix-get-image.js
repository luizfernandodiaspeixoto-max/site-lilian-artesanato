const fs = require('fs');
const indexPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const newGetImg = `function getNewsImage(n) {
  if (n.image) return n.image;
  if (n.thumbnail) return n.thumbnail;
  if (n.enclosure && n.enclosure.url) return n.enclosure.url;
  if (n.media && n.media.url) return n.media.url;
  const desc = n.description || '';
  const m = desc.match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/i);
  if (m && m[1]) return m[1];
  return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80';
}`;

html = html.replace(/function getNewsImage\(n\)\s*\{[\s\S]*?\}/, newGetImg);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('getNewsImage function updated successfully.');
