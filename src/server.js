const http = require('http');
const path = require('path');
const fs = require('fs');
const { ensureDirs, loadJSON, saveJSON, NEWS_FILE } = require('./utils');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const DATA_DIR = path.join(__dirname, '..', 'data');
const VISITS_FILE = path.join(DATA_DIR, 'visitas.json');
const COMMENTS_FILE = path.join(DATA_DIR, 'comentarios.json');
const OPINIONS_FILE = path.join(DATA_DIR, 'opinioes.json');

ensureDirs();
if (!fs.existsSync(NEWS_FILE)) fs.writeFileSync(NEWS_FILE, '[]', 'utf8');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

function serveJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}

function readBody(req, limit = 32 * 1024) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', chunk => {
      body += chunk;
      if (body.length > limit) {
        reject(new Error('Payload muito grande'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function registerVisit() {
  const data = loadJSON(VISITS_FILE, { total: 0 });
  let total = Number(data.total);
  if (!Number.isFinite(total) || total < 0) total = 0;
  const updated = { total: total + 1, updatedAt: new Date().toISOString() };
  saveJSON(VISITS_FILE, updated);
  return updated.total;
}

const server = http.createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);

  if (url === '/api/noticias') {
    const news = loadJSON(NEWS_FILE, []);
    return serveJson(res, 200, { ok: true, count: news.length, updatedAt: new Date().toISOString(), noticias: news });
  }

  if (url === '/api/visitas') {
    if (req.method === 'POST') {
      return serveJson(res, 200, { ok: true, total: registerVisit() });
    }
    if (req.method === 'GET') {
      const data = loadJSON(VISITS_FILE, { total: 0 });
      let total = Number(data.total);
      if (!Number.isFinite(total) || total < 0) total = 0;
      return serveJson(res, 200, { ok: true, total });
    }
    return serveJson(res, 200, { ok: true, total: registerVisit() });
  }

  if ((url === '/api/opiniao' || url === '/api/comentario') && req.method === 'POST') {
    try {
      const raw = await readBody(req);
      let payload;
      try {
        payload = JSON.parse(raw || '{}');
      } catch {
        return serveJson(res, 400, { ok: false, error: 'JSON inválido.' });
      }
      const message = String(payload.message || payload.opiniao || payload.comentario || '').trim();
      const name = String(payload.name || payload.nome || '').trim().slice(0, 80);
      const contact = String(payload.contact || payload.contato || payload.telefone || '').trim().slice(0, 120);
      if (!message) {
        return serveJson(res, 400, { ok: false, error: 'Escreva seu comentário.' });
      }
      if (message.length > 2000) {
        return serveJson(res, 400, { ok: false, error: 'O comentário deve ter no máximo 2000 caracteres.' });
      }
      const comments = loadJSON(COMMENTS_FILE, []);
      comments.unshift({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        name: name || 'Anônimo',
        contact,
        message,
        createdAt: new Date().toISOString(),
        ip: req.socket.remoteAddress || ''
      });
      saveJSON(COMMENTS_FILE, comments.slice(0, 3000));
      return serveJson(res, 201, { ok: true, comment: comments[0] });
    } catch (e) {
      return serveJson(res, 400, { ok: false, error: e.message });
    }
  }

  if (url === '/api/comentarios' || url === '/api/opinioes') {
    const comments = loadJSON(COMMENTS_FILE, []);
    if (comments.length === 0) {
      const opinions = loadJSON(OPINIONS_FILE, []);
      return serveJson(res, 200, { ok: true, count: opinions.length, comentarios: opinions.slice(0, 200).map(o => ({ ...o, message: o.message })), opinioes: opinions.slice(0, 200) });
    }
    return serveJson(res, 200, { ok: true, count: comments.length, comentarios: comments.slice(0, 200) });
  }

  if (url === '/' || url === '/index.html') {
    return sendFile(res, path.join(PUBLIC_DIR, 'index.html'));
  }

  if (url.startsWith('/css/') || url.startsWith('/js/') || url.startsWith('/img/')) {
    const filePath = path.resolve(PUBLIC_DIR, '.' + url);
    if (!filePath.startsWith(PUBLIC_DIR + path.sep)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    return sendFile(res, filePath);
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT);
  console.log('Bloco: Notícias de São José do Calçado');
  console.log('Para atualizar: node src/updater.js (ou agendar 08:00, 12:00, 17:00)');
});
