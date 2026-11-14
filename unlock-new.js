const { execSync } = require('child_process');
try {
  const cmd = 'npx netlify-cli api updateSite --data "{\\\"site_id\\\":\\\"661f1f24-398c-4274-893c-dd8e6fcdf878\\\",\\\"password\\\":\\\"\\\"}"';
  const res = execSync(cmd, { encoding: 'utf8' });
  console.log(res);
} catch(e) {
  console.log(e.stdout || e.message);
}
