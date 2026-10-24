const { fetch } = require('./fetch');
const { parseRss } = require('./parser');
const { ensureDirs, loadJSON, saveJSON, NEWS_FILE, SEEN_FILE } = require('./utils');

const KEYWORDS = ['são josé do calcado', 'sao jose do calcado', 'são josé do calçado', 'sao jose do calçado', 'sao jose do calcado es', 'são josé do calçado es'];

const SOURCES = [
  // Google News (PT-BR)
  'https://news.google.com/rss/search?q=%22S%C3%A3o%20Jos%C3%A9%20do%20Cal%C3%A7ado%22&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  // Bing News RSS
  'https://www.bing.com/news/search?q=%22S%C3%A3o%20Jos%C3%A9%20do%20Cal%C3%A7ado%22&format=RSS&setlang=pt-br&cc=BR',
  // Capixabas & Regionais
  'https://www.agazeta.com.br/rss',
  'https://www.aquinoticias.com/feed/',
  'https://www.folhadoes.com/feed/',
  'https://esbrasil.com.br/feed/',
  'https://www.jornalfato.com.br/feed/'
];

function normalize(s) {
  if (!s) return '';
  return s.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleKey(s) {
  if (!s) return '';
  return normalize(s)
    .replace(/\b(es|rj|mg|sp|br)\b/g, ' ')
    .replace(/\beleicoes?\b/g, ' ')
    .replace(/\b202[0-9]\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function containsKeyword(text) {
  const n = normalize(text);
  return KEYWORDS.some(k => n.includes(normalize(k)));
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 131542391 + str.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
}

async function collect() {
  ensureDirs();
  const seen = loadJSON(SEEN_FILE, {});
  const existing = loadJSON(NEWS_FILE, []);
  const news = [];
  const existingTitleKeys = new Set();

  for (let e = 0; e < existing.length; e++) {
    const tk = titleKey(existing[e].title);
    if (tk) existingTitleKeys.add(tk);
    const id = hash(existing[e].link || existing[e].title);
    seen[id] = seen[id] || Date.now();
  }

  for (let i = 0; i < SOURCES.length; i++) {
    const url = SOURCES[i];
    try {
      const xml = await fetch(url, 30000);
      const items = parseRss(xml);
      for (let j = 0; j < items.length; j++) {
        const it = items[j];
        const combined = it.title + ' ' + (it.description || '');
        if (!containsKeyword(combined)) continue;
        const tkey = titleKey(it.title);
        if (tkey && existingTitleKeys.has(tkey)) continue;
        const id = hash(it.link || it.title);
        if (seen[id]) continue;
        seen[id] = Date.now();
        existingTitleKeys.add(tkey);
        news.push({
          id,
          title: it.title,
          link: it.link,
          description: (it.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
          pubDate: it.pubDate || '',
          source: url,
          foundAt: new Date().toISOString(),
          image: it.image || '',
          thumbnail: it.image || '',
          enclosure: it.image ? { url: it.image } : undefined,
          media: it.image ? { url: it.image } : undefined
        });
      }
    } catch (e) {
      // skip source on error
    }
  }

  news.sort((a, b) => (a.foundAt < b.foundAt ? 1 : -1));

  saveJSON(SEEN_FILE, seen);
  const keys = Object.keys(seen);
  if (keys.length > 4000) {
    const sorted = keys.map(k => ({ k, v: seen[k] })).sort((a,b) => b.v - a.v);
    const kept = {};
    for (let x = 0; x < 4000; x++) kept[sorted[x].k] = sorted[x].v;
    saveJSON(SEEN_FILE, kept);
  }

  const map = {};
  for (let i = 0; i < news.length; i++) map[news[i].id] = news[i];
  for (let i = 0; i < existing.length; i++) if (!map[existing[i].id]) map[existing[i].id] = existing[i];
  const merged = Object.values(map);
  merged.sort((a,b) => (a.foundAt < b.foundAt ? 1 : -1));
  saveJSON(NEWS_FILE, merged.slice(0, 800));

  console.log('Novas:', news.length);
}

collect().catch(e => {
  console.error(e);
  process.exit(1);
});
