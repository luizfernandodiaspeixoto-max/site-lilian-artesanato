const { execSync } = require('child_process');
try {
  const cmd = 'npx netlify-cli api updateSite --data "{\\\"site_id\\\":\\\"b0692856-2419-42f4-bd26-430ff56958d4\\\",\\\"sso_login\\\":false}"';
  console.log(execSync(cmd, { encoding: 'utf8' }));
} catch(e) {
  console.log(e.stdout || e.message);
}
