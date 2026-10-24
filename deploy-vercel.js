const { execSync } = require('child_process');
try {
  process.chdir('public');
  const res = execSync('npx vercel deploy --prod --yes', { encoding: 'utf8' });
  console.log(res);
} catch(e) {
  console.log(e.stdout || e.message);
}
