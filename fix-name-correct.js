const { execSync } = require('child_process');
try {
  const payload = '{\"site_id\":\"3e5a60ca-3a84-40cb-b989-e0b7208d20aa\",\"name\":\"noticias-sao-jose-do-calcado\"}';
  const res = execSync(`npx netlify-cli api updateSite --data '${payload}'`, { encoding: 'utf8' });
  console.log(res);
} catch (e) {
  console.log(e.stdout || e.message);
}
