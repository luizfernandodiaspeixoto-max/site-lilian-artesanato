const fs = require('fs');
const indexPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const startIdx = html.indexOf('for (let i = 0; i < noticias.length; i++)');
const endIdx = html.indexOf('grid.appendChild(btn);', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `for (let i = 0; i < noticias.length; i++) {
    const n = noticias[i];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card card-horizontal card-button';
    let deck = (n.description || '').replace(/<[^>]+>/g, ' ').replace(/\\s+/g, ' ').trim();
    if (deck.length > 200) deck = deck.substring(0, 197) + '...';
    let img = getNewsImage(n);
    if (!img) img = 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=600&q=80';
    btn.innerHTML = \`
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
  
  html = html.substring(0, startIdx) + replacement + html.substring(endIdx);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Render loop successfully replaced.');
}
