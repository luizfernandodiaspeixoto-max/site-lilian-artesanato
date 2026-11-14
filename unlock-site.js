const { execSync } = require('child_process');
try {
  const payload = '{"site_id":"40e5e9a4-03f1-4191-9b11-5284231e1429","password":""}';
  const cmd = `npx netlify-cli api updateSite --data "${payload.replace(/"/g, '\\"')}"`;
  const res = execSync(cmd, { encoding: 'utf8' });
  console.log(res);
} catch (e) {
  console.log(e.stdout || e.message);
}
