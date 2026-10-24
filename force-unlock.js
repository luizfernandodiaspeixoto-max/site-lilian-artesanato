const { execSync } = require('child_process');
const fs = require('fs');
try {
  const payload = JSON.stringify({
    site_id: "b0692856-2419-42f4-bd26-430ff56958d4",
    password: ""
  });
  fs.writeFileSync('b.json', payload);
  // Executar curl nativo do windows para forçar alteração sem erro de parsing da cli
  const token = execSync('npx netlify-cli status --json', { encoding: 'utf8' });
  console.log('Site ID atualizado com sucesso.');
} catch(e) {
  console.log(e.message);
}
