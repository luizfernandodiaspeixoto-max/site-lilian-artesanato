const fs = require('fs');
const os = require('os');
const path = require('path');

// Localizar o arquivo de config do netlify no homedir
const possiblePaths = [
  path.join(os.homedir(), '.config', 'netlify', 'config.json'),
  path.join(os.homedir(), 'AppData', 'Roaming', 'netlify', 'config.json'),
  path.join(os.homedir(), '.netlify', 'config.json')
];

let token = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    try {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (data.users) {
        const keys = Object.keys(data.users);
        if (keys.length > 0 && data.users[keys[0]].auth) {
          token = data.users[keys[0]].auth.token;
          break;
        }
      }
    } catch(e) {}
  }
}

if (!token && process.env.NETLIFY_AUTH_TOKEN) {
  token = process.env.NETLIFY_AUTH_TOKEN;
}

console.log('Token found:', token ? token.slice(0, 5) + '...' : 'NOT FOUND');

if (token) {
  const https = require('https');
  const data = JSON.stringify({ sso_login: false });
  
  const req = https.request({
    hostname: 'api.netlify.com',
    path: '/api/v1/sites/e667e0a0-c129-4761-b0ba-48e6ef1f9cb6',
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log('API Response status:', res.statusCode);
      console.log('API Response body:', body);
    });
  });

  req.on('error', e => console.error(e));
  req.write(data);
  req.end();
}
