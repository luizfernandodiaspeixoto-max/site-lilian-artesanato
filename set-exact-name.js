const { execSync } = require('child_process');
try {
  const data = JSON.stringify({
    site_id: "3e5a60ca-3a84-40cb-b989-e0b7208d20aa",
    name: "noticiasdesaojosedocalcado"
  });
  const escaped = data.replace(/"/g, '\\"');
  const res = execSync(`npx netlify-cli api updateSite --data "${escaped}"`, { encoding: 'utf8' });
  console.log(res);
} catch (e) {
  console.log(e.stdout || e.message);
}
