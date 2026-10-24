const fs = require('fs');
const axios = require('axios'); // or http/https

// Vamos criar um script updater avançado que testa se o link responde antes de salvar na base!
const UPDATER_CODE = `const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const DATA_DIR = path.join(__dirname, '..', 'data');
const NEWS_FILE = path.join(DATA_DIR, 'noticias.json');

function checkUrl(url) {
  return new Promise((resolve) => {
    if (!url || !url.startsWith('http')) {
      return resolve(false);
    }
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
      res.destroy();
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

async function run() {
  console.log('Verificando e limpando notícias com links quebrados...');
  if (!fs.existsSync(NEWS_FILE)) return;
  let noticias = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8'));
  
  const validas = [];
  for (const n of noticias) {
    // Se for link do google news rss que costuma expirar ou recusar iframe, podemos filtrar ou testar
    const ok = await checkUrl(n.link);
    if (ok) {
      validas.push(n);
    } else {
      console.log('Removendo link inacessível:', n.title);
    }
  }
  
  fs.writeFileSync(NEWS_FILE, JSON.stringify(validas, null, 2), 'utf8');
  console.log('Notícias atualizadas. Total válidas:', validas.length);
}

run();
`;

fs.writeFileSync('G:/noticias calcado/src/validador.js', UPDATER_CODE, 'utf8');
console.log('Validador criado!');
