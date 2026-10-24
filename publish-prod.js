const { execSync } = require('child_process');
try {
  const cmd = 'npx netlify-cli api createSiteDeploy --data "{\\\"site_id\\\":\\\"3e5a60ca-3a84-40cb-b989-e0b7208d20aa\\\",\\\"files\\\":{}}"';
  // vamos usar a api publish para promover o ultimo deploy draft para production
  const deploys = execSync('npx netlify-cli api listSiteDeploys --data "{\\\"site_id\\\":\\\"3e5a60ca-3a84-40cb-b989-e0b7208d20aa\\\"}"', { encoding: 'utf8' });
  const list = JSON.parse(deploys);
  if (list && list.length > 0) {
    const deployId = list[0].id;
    const pub = execSync(`npx netlify-cli api restoreSiteDeploy --data "{\\\"site_id\\\":\\\"3e5a60ca-3a84-40cb-b989-e0b7208d20aa\\\",\\\"deploy_id\\\":\\\"${deployId}\\\"}"`, { encoding: 'utf8' });
    console.log('Published successfully:', pub);
  }
} catch(e) {
  console.log(e.stdout || e.message);
}
