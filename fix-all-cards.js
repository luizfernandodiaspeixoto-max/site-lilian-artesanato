const fs = require('fs');
const indexPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Force getNewsImage to always return a valid image URL (never null) so every card has a photo
const newGetNewsImage = `function getNewsImage(n) {
  if (n && n.image && n.image.startsWith('http')) return n.image;
  if (n && n.thumbnail && n.thumbnail.startsWith('http')) return n.thumbnail;
  if (n && n.enclosure && n.enclosure.url) return n.enclosure.url;
  if (n && n.media && n.media.url) return n.media.url;
  const desc = (n && n.description) || '';
  const m = desc.match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/i);
  if (m && m[1]) return m[1];
  // Guaranteed fallback image so photo is always displayed
  return 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=600&q=80';
}`;

html = html.replace(/function getNewsImage\(n\)\s*\{[\s\S]*?\}/, newGetNewsImage);

// 2. Ensure render function ALWAYS enters the `if (img)` branch so the .card-media <img> element is always rendered
const oldRenderBlock = `    const img = getNewsImage(n);
    if (img) {
      a.innerHTML = \`
        <div class="card-media">
          <img src="\${escapeHtml(img)}" alt="\${escapeHtml(n.title)}" referrerpolicy="no-referrer" loading="lazy" onerror="this.parentElement.style.display='none'">
        </div>
        <div class="card-content">
          <div class="card-kicker">São José do Calçado • \${n.pubDate ? n.pubDate.replace(/GMT.*$/, '').trim() : ''}</div>
          <h2 class="card-title">\${escapeHtml(n.title)}</h2>
          <p class="card-deck">\${escapeHtml(deck)}</p>
          <div class="card-cta">LER MATÉRIA →</div>
        </div>
      \`;
    } else {
      a.innerHTML = \`
        <div class="card-content card-content-full">
          <div class="card-kicker">São José do Calçado • \${n.pubDate ? n.pubDate.replace(/GMT.*$/, '').trim() : ''}</div>
          <h2 class="card-title">\${escapeHtml(n.title)}</h2>
          <p class="card-deck">\${escapeHtml(deck)}</p>
          <div class="card-cta">LER MATÉRIA →</div>
        </div>
      \`;
    }`;

const newRenderBlock = `    const img = getNewsImage(n);
    a.innerHTML = \`
      <div class="card-media">
        <img src="\${escapeHtml(img)}" alt="\${escapeHtml(n.title)}" referrerpolicy="no-referrer" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=600&q=80'">
      </div>
      <div class="card-content">
        <div class="card-kicker">São José do Calçado • \${n.pubDate ? n.pubDate.replace(/GMT.*$/, '').trim() : ''}</div>
        <h2 class="card-title">\${escapeHtml(n.title)}</h2>
        <p class="card-deck">\${escapeHtml(deck)}</p>
        <div class="card-cta">LER MATÉRIA →</div>
      </div>
    \`;`;

if (html.includes(oldRenderBlock) || html.includes('const img = getNewsImage(n);')) {
  html = html.replace(/const img = getNewsImage\(n\);\s*if \(img\) \{[\s\S]*?\} else \{[\s\S]*?\}/, newRenderBlock);
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Forced all news cards to render photos and valid links.');
