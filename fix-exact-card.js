const fs = require('fs');
const indexPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// Target exact snippet
const target = `    const img = getNewsImage(n);
    if (img) {
      btn.innerHTML = \`
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
      btn.innerHTML = \`
        <div class="card-content card-content-full">
          <div class="card-kicker">São José do Calçado • \${n.pubDate ? n.pubDate.replace(/GMT.*$/, '').trim() : ''}</div>
          <h2 class="card-title">\${escapeHtml(n.title)}</h2>
          <p class="card-deck">\${escapeHtml(deck)}</p>
          <div class="card-cta">LER MATÉRIA →</div>
        </div>
      \`;
    }`;

const replacement = `    let img = getNewsImage(n);
    if (!img) {
      img = 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=600&q=80';
    }
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

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Successfully updated card rendering to always show images.');
} else {
  console.log('Target snippet not found exactly.');
}
