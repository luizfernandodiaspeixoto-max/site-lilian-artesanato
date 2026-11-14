const { execSync } = require('child_process');
try {
  const res = execSync('npx netlify-cli sites:create --name noticias-sao-jose-do-calcado', { encoding: 'utf8' });
  console.log(res);
} catch (e) {
  console.log(e.stdout || e.message);
}
