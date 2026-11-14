const { execSync } = require('child_process');
try {
  const cmd = 'npx netlify-cli api updateSite --data "{\\\"site_id\\\":\\\"7468f903-c972-4832-a3d7-f30a5f542152\\\",\\\"sso_login\\\":false}"';
  console.log(execSync(cmd, { encoding: 'utf8' }));
} catch(e) {
  console.log(e.stdout || e.message);
}
