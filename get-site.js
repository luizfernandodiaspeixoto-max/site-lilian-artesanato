const { execSync } = require('child_process');
try {
  const cmd = 'npx netlify-cli api getSite --data "{\\\"site_id\\\":\\\"e667e0a0-c129-4761-b0ba-48e6ef1f9cb6\\\"}"';
  console.log(execSync(cmd, { encoding: 'utf8' }));
} catch(e) {
  console.log(e.stdout || e.message);
}
