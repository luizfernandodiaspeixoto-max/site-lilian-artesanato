const { execSync } = require('child_process');
const fs = require('fs');

try {
  // Vamos deletar os sites antigos duplicados para manter apenas UM site limpo
  const sites = [
    "40e5e9a4-03f1-4191-9b11-5284231e1429",
    "31052427-f1f9-43d3-90df-ce717ceb1d69",
    "66fee335-f5fe-443e-af81-e4477daae9fb"
  ];
  
  sites.forEach(id => {
    try {
      execSync(`npx netlify-cli api deleteSite --data "{\\\"site_id\\\":\\\"${id}\\\"}"`, { encoding: 'utf8' });
      console.log('Deletado site:', id);
    } catch(err) {}
  });

} catch(e) {
  console.log(e.message);
}
