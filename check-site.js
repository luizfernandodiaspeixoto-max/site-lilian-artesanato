const { execSync } = require('child_process');
try {
  const cmd = 'npx netlify-cli api getSite --data "{\\\"site_id\\\":\\\"40e5e9a4-03f1-4191-9b11-5284231e1429\\\"}"';
  const res = execSync(cmd, { encoding: 'utf8' });
  console.log(res);
} catch(e) {
  console.log(e.stdout || e.message);
}
