const { execSync } = require('child_process');
const sites = ["b0692856-2419-42f4-bd26-430ff56958d4", "661f1f24-398c-4274-893c-dd8e6fcdf878"];

sites.forEach(id => {
  try {
    const jsonStr = `{\\\"site_id\\\":\\\"${id}\\\",\\\"sso_login\\\":false,\\\"account_sso_login\\\":false}`;
    const res = execSync(`npx netlify-cli api updateSite --data "${jsonStr}"`, { encoding: 'utf8' });
    console.log('Success for:', id, res);
  } catch(e) {
    console.log('Error for:', id, e.stdout || e.message);
  }
});
