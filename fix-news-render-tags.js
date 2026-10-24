const fs = require('fs');
const indexPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// Replace the render card creation with a standard <a> tag instead of <button> so it natively opens n.link in a new tab without any JS blocker or modal conflict!
const oldRenderLoop = `  for (let i = 0; i < noticias.length; i++) {
    const n = noticias[i];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card card-horizontal card-button';
    let deck = (n.description || '').replace(/<[^>]+>/g, ' ').replace(/\\s+/g, ' ').trim();
    if (deck.length > 200) deck = deck.substring(0, 197) + '...';
    const img = getNewsImage(n);
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
    }
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (n.link) {
        window.open(n.link, '_blank');
      }
    });
    grid.appendChild(btn);
  }`;

const newRenderLoop = `  for (let i = 0; i < noticias.length; i++) {
    const n = noticias[i];
    const a = document.createElement('a');
    a.href = n.link || '#';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'card card-horizontal';
    let deck = (n.description || '').replace(/<[^>]+>/g, ' ').replace(/\\s+/g, ' ').trim();
    if (deck.length > 200) deck = deck.substring(0, 197) + '...';
    const img = getNewsImage(n);
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
    }
    grid.appendChild(a);
  }`;

if (html.includes('const btn = document.createElement(\'button\');')) {
  html = html.replace(oldRenderLoop, newRenderLoop);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('News cards successfully changed to native <a> tags for direct link opening.');
} else {
  console.log('Could not find exact button creation block.');
}
