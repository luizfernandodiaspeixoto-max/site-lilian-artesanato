const http = require('http');
const https = require('https');
const { URL } = require('url');

function fetch(url, timeoutMs = 25000) {
  return new Promise((resolve, reject) => {
    try {
      const parsed = new URL(url);
      const mod = parsed.protocol === 'https:' ? https : http;
      const req = mod.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
          'Cache-Control': 'no-cache'
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const loc = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).href;
          res.resume();
          fetch(loc, timeoutMs).then(resolve).catch(reject);
          return;
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 400) {
            return reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
          }
          resolve(data);
        });
      });
      req.on('error', reject);
      req.setTimeout(timeoutMs, () => {
        req.destroy(new Error('Timeout for ' + url));
      });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = { fetch };
