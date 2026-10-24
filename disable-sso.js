const { execSync } = require('child_process');
try {
  const fs = require('fs');
  const payload = JSON.stringify({
    site_id: "40e5e9a4-03f1-4191-9b11-5284231e1429",
    sso_login: false
  });
  fs.writeFileSync('payload.json', payload);
  // No Windows PowerShell, passamos o arquivo json diretamente sem o @ se aceitar ou via node script
  const res = execSync('npx netlify-cli api updateSite --data "{\"site_id\":\"40e5e9a4-03f1-4191-9b11-5284231e1429\",\"sso_login\":false}"', { encoding: 'utf8' });
  console.log(res);
  fs.unlinkSync('payload.json');
} catch (e) {
  console.log(e.stdout || e.message);
}
