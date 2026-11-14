const { execSync } = require('child_process');
try {
  const cmd = 'npx netlify-cli api updateSite --data "{\\\"site_id\\\":\\\"3e5a60ca-3a84-40cb-b989-e0b7208d20aa\\\",\\\"name\\\":\\\"noticias-sao-jose-do-calcado\\\"}"';
  console.log(execSync(cmd, { encoding: 'utf8' }));
} catch(e) {
  console.log(e.stdout || e.message);
}
