const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const countEl = document.getElementById('count');
const refresh = document.getElementById('refresh');
const dateTime = document.getElementById('date-time');
const yearEl = document.getElementById('year');
const yearFilter = document.getElementById('year-filter');
const visitsEl = document.getElementById('visits');
const opinionForm = document.getElementById('opinion-form');
const opinionStatus = document.getElementById('opinion-status');
const navLinks = document.querySelectorAll('.nav-bar a');
const sectionTitle = document.querySelector('.section-head h1');
const commentTrack = document.getElementById('comment-track');

let ALL = [];
let CURRENT_YEAR = new Date().getFullYear().toString();
let CURRENT_CAT = 'home';

function updateClock() {
  const now = new Date();
  const opts = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
  dateTime.textContent = now.toLocaleDateString('pt-BR', opts).toUpperCase();
  if (yearEl) yearEl.textContent = now.getFullYear();
}

function getNewsImage(n) {
  if (n.image) return n.image;
  if (n.thumbnail) return n.thumbnail;
  if (n.enclosure && n.enclosure.url) return n.enclosure.url;
  if (n.media && n.media.url) return n.media.url;
  const desc = n.description || '';
  const m = desc.match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/i);
  if (m && m[1]) return m[1];
  return null;
}

function getYear(n) {
  const pd = n.pubDate || '';
  const fd = n.foundAt || '';
  let m = pd.match(/(\d{4})/);
  if (m) return m[1];
  m = fd.match(/(\d{4})/);
  if (m) return m[1];
  return '';
}

function norm(s) {
  if (!s) return '';
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function matchCategory(n, cat) {
  if (cat === 'home') return true;
  const t = norm((n.title || '') + ' ' + (n.description || ''));
  if (cat === 'politica') {
    return t.includes('elei') || t.includes('prefeit') || t.includes('vereador') || t.includes('camara') || t.includes('deputad') || t.includes('senad') || t.includes('govern') || t.includes('candidato');
  }
  if (cat === 'comunidade') {
    return t.includes('comun') || t.includes('popul') || t.includes('mstv') || t.includes('terra') || t.includes('ibge') || t.includes('igreja') || t.includes('escola') || t.includes('bairro') || t.includes('evento');
  }
  if (cat === 'seguranca') {
    return t.includes('segur') || t.includes('polic') || t.includes('pm') || t.includes('drog') || t.includes('pris') || t.includes('roub') || t.includes('furto') || t.includes('homicid') || t.includes('balead') || t.includes('morte') || t.includes('eletrocut');
  }
  if (cat === 'esporte') {
    const hasSports = t.includes('futebol') || t.includes('futeb') || t.includes('volei') || t.includes('corrida') || t.includes('esporte') || t.includes('campeonato') || t.includes('copa') || t.includes('partida') || t.includes('torneio') || t.includes('atlet') || t.includes('basquete') || t.includes('jogos');
    const hasForbidden = t.includes('carro') || t.includes('acidente') || t.includes('colisao') || t.includes('atropel') || t.includes('balead') || t.includes('vereador') || t.includes('prefeito') || t.includes('eleic') || t.includes('morte') || t.includes('morre') || t.includes('ferid') || t.includes('vitima') || t.includes('transito');
    return hasSports && !hasForbidden;
  }
  if (cat === 'opiniao') {
    return t.includes('opiniao') || t.includes('artigo') || t.includes('coluna') || t.includes('editorial');
  }
  return true;
}

function buildYearFilter() {
  if (!yearFilter) return;
  const years = {};
  for (let i = 0; i < ALL.length; i++) {
    if (!matchCategory(ALL[i], CURRENT_CAT)) continue;
    const y = getYear(ALL[i]);
    if (y) years[y] = true;
  }
  const list = Object.keys(years).sort((a,b) => b.localeCompare(a));
  yearFilter.innerHTML = '';
  for (let i = 0; i < list.length; i++) {
    const opt = document.createElement('option');
    opt.value = list[i];
    opt.textContent = list[i];
    yearFilter.appendChild(opt);
  }
  if (list.includes(CURRENT_YEAR)) {
    yearFilter.value = CURRENT_YEAR;
  } else if (list.length > 0) {
    yearFilter.value = list[0];
    CURRENT_YEAR = list[0];
  } else {
    yearFilter.innerHTML = '<option value="' + new Date().getFullYear() + '">' + new Date().getFullYear() + '</option>';
    yearFilter.value = new Date().getFullYear();
  }
}

function renderFiltered() {
  const y = yearFilter ? yearFilter.value : CURRENT_YEAR;
  const filtered = [];
  for (let i = 0; i < ALL.length; i++) {
    if (getYear(ALL[i]) !== y) continue;
    if (!matchCategory(ALL[i], CURRENT_CAT)) continue;
    filtered.push(ALL[i]);
  }
  render(filtered);
}

function setCategory(cat, label) {
  CURRENT_CAT = cat;
  navLinks.forEach(a => {
    a.classList.toggle('active', a.dataset.cat === cat);
  });
  if (sectionTitle) {
    sectionTitle.textContent = 'Últimas notícias';
  }
  buildYearFilter();
  renderFiltered();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openModal(n) {
  window.open(n.link, '_blank');
}

function closeModal() {
  const modal = document.getElementById('news-modal');
  const frame = document.getElementById('news-frame');
  if (!modal) return;
  modal.classList.remove('open');
  if (frame) frame.src = 'about:blank';
  document.body.style.overflow = '';
}

function render(noticias) {
  grid.innerHTML = '';
  if (!noticias || noticias.length === 0) {
    empty.style.display = 'flex';
    if (countEl) countEl.textContent = '0 matérias';
    empty.querySelector('h2').textContent = 'Nenhuma notícia nesta categoria / ano';
    empty.querySelector('p').textContent = 'Escolha outra categoria ou outro ano no filtro.';
    return;
  }
  empty.style.display = 'none';
  if (countEl) countEl.textContent = noticias.length + (noticias.length === 1 ? ' matéria' : ' matérias');
  for (let i = 0; i < noticias.length; i++) {
    const n = noticias[i];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card card-horizontal card-button';
    let deck = (n.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (deck.length > 200) deck = deck.substring(0, 197) + '...';
    const img = getNewsImage(n);
    if (img) {
      btn.innerHTML = `
        <div class="card-media">
          <img src="${escapeHtml(img)}" alt="${escapeHtml(n.title)}" referrerpolicy="no-referrer" loading="lazy" onerror="this.parentElement.style.display='none'">
        </div>
        <div class="card-content">
          <div class="card-kicker">São José do Calçado • ${n.pubDate ? n.pubDate.replace(/GMT.*$/, '').trim() : ''}</div>
          <h2 class="card-title">${escapeHtml(n.title)}</h2>
          <p class="card-deck">${escapeHtml(deck)}</p>
          <div class="card-cta">LER MATÉRIA →</div>
        </div>
      `;
    } else {
      btn.innerHTML = `
        <div class="card-content card-content-full">
          <div class="card-kicker">São José do Calçado • ${n.pubDate ? n.pubDate.replace(/GMT.*$/, '').trim() : ''}</div>
          <h2 class="card-title">${escapeHtml(n.title)}</h2>
          <p class="card-deck">${escapeHtml(deck)}</p>
          <div class="card-cta">LER MATÉRIA →</div>
        </div>
      `;
    }
    btn.addEventListener('click', () => openModal(n));
    grid.appendChild(btn);
  }
}

function escapeHtml(s) {
  if (!s) return '';
  return s.replace(/[&<>"']/g, function(c) {
    return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c];
  });
}

async function load() {
  try {
    const res = await fetch('/api/noticias');
    const data = await res.json();
    ALL = data.noticias || [];
    buildYearFilter();
    renderFiltered();
  } catch (e) {
    empty.style.display = 'flex';
    empty.querySelector('h2').textContent = 'Erro ao carregar';
    empty.querySelector('p').textContent = 'Verifique se o servidor está rodando.';
  }
}

async function loadVisits() {
  if (!visitsEl) return;
  try {
    const res = await fetch('/api/visitas');
    const data = await res.json();
    if (data && data.ok) {
      visitsEl.textContent = Number(data.total).toLocaleString('pt-BR');
    }
  } catch {
    try {
      const res = await fetch('/api/visitas', { method: 'POST' });
      const data = await res.json();
      if (data && data.ok) {
        visitsEl.textContent = Number(data.total).toLocaleString('pt-BR');
      }
    } catch {
      visitsEl.textContent = '--';
    }
  }
}

async function countVisit() {
  try {
    const res = await fetch('/api/visitas', { method: 'POST' });
    const data = await res.json();
    if (data && data.ok && visitsEl) {
      visitsEl.textContent = Number(data.total).toLocaleString('pt-BR');
    }
  } catch {}
}

function showOpinionStatus(text, type) {
  if (!opinionStatus) return;
  opinionStatus.textContent = text;
  opinionStatus.className = 'opinion-status' + (type ? ' ' + type : '');
}

function renderComments(comments) {
  if (!commentTrack) return;
  commentTrack.innerHTML = '';
  if (!comments || comments.length === 0) {
    const span = document.createElement('span');
    span.className = 'comment-item';
    span.textContent = 'Seja o primeiro a deixar seu comentário!';
    commentTrack.appendChild(span);
    commentTrack.appendChild(span.cloneNode(true));
    return;
  }
  const items = comments.slice(0, 40);
  for (let i = 0; i < items.length; i++) {
    const c = items[i];
    const name = c.name || 'Anônimo';
    const msg = (c.message || '').replace(/\n/g, ' ').trim();
    if (!msg) continue;
    const span = document.createElement('span');
    span.className = 'comment-item';
    span.innerHTML = '<strong>' + escapeHtml(name) + ':</strong> ' + escapeHtml(msg);
    commentTrack.appendChild(span);
  }
  // duplicate for seamless loop
  for (let i = 0; i < commentTrack.children.length; i++) {
    commentTrack.appendChild(commentTrack.children[i].cloneNode(true));
  }
}

async function loadComments() {
  try {
    const res = await fetch('/api/comentarios');
    const data = await res.json();
    if (data && (data.comentarios || data.opinioes)) {
      renderComments(data.comentarios || data.opinioes || []);
    }
  } catch {
    renderComments([]);
  }
}

if (opinionForm) {
  opinionForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('opinion-name').value.trim();
    const contact = document.getElementById('opinion-contact').value.trim();
    const message = document.getElementById('opinion-message').value.trim();
    if (!message) {
      showOpinionStatus('Escreva seu comentário antes de enviar.', 'error');
      return;
    }
    const button = opinionForm.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    showOpinionStatus('Enviando...', '');
    try {
      const res = await fetch('/api/comentario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, message })
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        showOpinionStatus('Comentário publicado!', 'success');
        opinionForm.reset();
        loadComments();
      } else {
        showOpinionStatus(data.error || 'Não foi possível enviar. Tente novamente.', 'error');
      }
    } catch {
      showOpinionStatus('Não foi possível enviar. Verifique sua conexão.', 'error');
    } finally {
      if (button) button.disabled = false;
    }
  });
}

navLinks.forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const cat = a.dataset.cat || 'home';
    const label = a.dataset.label || a.textContent.trim();
    setCategory(cat, label);
  });
});

const modalClose1 = document.getElementById('news-modal-close');
const modalClose2 = document.getElementById('news-modal-x');
if (modalClose1) modalClose1.addEventListener('click', closeModal);
if (modalClose2) modalClose2.addEventListener('click', closeModal);
const newsModal = document.getElementById('news-modal');
if (newsModal) {
  newsModal.addEventListener('click', (e) => {
    if (e.target === newsModal) closeModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

if (refresh) refresh.addEventListener('click', load);
if (yearFilter) yearFilter.addEventListener('change', renderFiltered);
updateClock();
setInterval(updateClock, 60000);
navLinks.forEach(a => a.classList.toggle('active', a.dataset.cat === 'home'));
countVisit();
load();
loadVisits();
loadComments();
setInterval(load, 300000);
setInterval(loadComments, 30000);
