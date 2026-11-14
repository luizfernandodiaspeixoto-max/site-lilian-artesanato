const { execSync } = require('child_process');
try {
  const payload = '{"site_id":"31052427-f1f9-43d3-90df-ce717ceb1d69","name":"noticias-sao-jose-do-calcado"}';
  const cmd = `npx netlify-cli api updateSite --data "${payload.replace(/"/g, '\\"')}"`;
  const res = execSync(cmd, { encoding: 'utf8' });
  console.log(res);
} catch (e) {
  console.log(e.stdout || e.message);
}
