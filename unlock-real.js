const fs = require('fs');
const path = require('path');
const os = require('os');

const p = path.join(os.homedir(), 'AppData', 'Roaming', 'netlify', 'Config', 'config.json');
const content = fs.readFileSync(p, 'utf8');
const data = JSON.parse(content);
const keys = Object.keys(data.users || {});
const token = keys.length > 0 ? data.users[keys[0]].auth.token : null;

console.log('Token extracted successfully:', token ? token.slice(0, 6) + '...' : 'NONE');

if (token) {
  const https = require('https');
  const payload = JSON.stringify({ sso_login: false });
  
  const req = https.request({
    hostname: 'api.netlify.com',
    path: '/api/v1/sites/e667e0a0-c129-4761-b0ba-48e6ef1f9cb6',
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Content-Length': payload.length
    }
  }, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      console.log('Body:', body);
    });
  });

  req.write(payload);
  req.end();
}
