const { execSync } = require('child_process');
try {
  const deploys = execSync('npx netlify-cli api listSiteDeploys --data "{\\\"site_id\\\":\\\"e667e0a0-c129-4761-b0ba-48e6ef1f9cb6\\\"}"', { encoding: 'utf8' });
  const list = JSON.parse(deploys);
  if (list && list.length > 0) {
    const deployId = list[0].id;
    const pub = execSync(`npx netlify-cli api restoreSiteDeploy --data "{\\\"site_id\\\":\\\"e667e0a0-c129-4761-b0ba-48e6ef1f9cb6\\\",\\\"deploy_id\\\":\\\"${deployId}\\\"}"`, { encoding: 'utf8' });
    console.log('Published successfully:', pub);
  }
} catch(e) {
  console.log(e.stdout || e.message);
}
