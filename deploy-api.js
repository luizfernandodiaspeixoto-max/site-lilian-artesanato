const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');
const crypto = require('crypto');

const p = path.join(os.homedir(), 'AppData', 'Roaming', 'netlify', 'Config', 'config.json');
const content = fs.readFileSync(p, 'utf8');
const data = JSON.parse(content);
const keys = Object.keys(data.users || {});
const token = keys.length > 0 ? data.users[keys[0]].auth.token : null;

// Ler G:/noticias calcado/public/index.html e fazer upload direto via API do Netlify
const htmlPath = 'G:/noticias calcado/public/index.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const sha1 = crypto.createHash('sha1').update(htmlContent).digest('hex');

const siteId = 'e667e0a0-c129-4761-b0ba-48e6ef1f9cb6'; // https://noticiasdesaojosedocalcado.netlify.app

const reqData = JSON.stringify({
  files: {
    "/index.html": sha1
  }
});

const req = https.request({
  hostname: 'api.netlify.com',
  path: `/api/v1/sites/${siteId}/deploys`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Content-Length': reqData.length
  }
}, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Deploy API Response status:', res.statusCode);
    console.log('Body:', body);
    try {
      const json = JSON.parse(body);
      const deployId = json.id;
      
      const uploadReq = https.request({
        hostname: 'api.netlify.com',
        path: `/api/v1/deploys/${deployId}/files/index.html`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/octet-stream',
          'Content-Length': Buffer.byteLength(htmlContent)
        }
      }, uploadRes => {
        let uploadBody = '';
        uploadRes.on('data', chunk => uploadBody += chunk);
        uploadRes.on('end', () => {
          console.log('Upload Status:', uploadRes.statusCode);
          console.log('Upload Body:', uploadBody);
        });
      });
      uploadReq.write(htmlContent);
      uploadReq.end();
      
    } catch(e) {
      console.log('Parse error:', e);
    }
  });
});

req.write(reqData);
req.end();
