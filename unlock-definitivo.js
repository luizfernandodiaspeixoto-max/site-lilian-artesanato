const { execSync } = require('child_process');
try {
  const cmd = 'npx netlify-cli api updateSite --data "{\\\"site_id\\\":\\\"985b9a13-3871-4241-94c9-ac31280e7542\\\",\\\"sso_login\\\":false}"';
  console.log(execSync(cmd, { encoding: 'utf8' }));
} catch(e) {
  console.log(e.stdout || e.message);
}
