const { execSync } = require('child_process');
const fs = require('fs');
try {
  const payload = JSON.stringify({
    site_id: "e667e0a0-c129-4761-b0ba-48e6ef1f9cb6",
    sso_login: false
  });
  fs.writeFileSync('sso.json', payload);
  const res = execSync('npx netlify-cli api updateSite --data @sso.json', { encoding: 'utf8' });
  console.log(res);
  fs.unlinkSync('sso.json');
} catch(e) {
  console.log(e.stdout || e.message);
}
