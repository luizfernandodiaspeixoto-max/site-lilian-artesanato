const { execSync } = require('child_process');
try {
  // Pega o token de acesso salvo pelo netlify CLI
  const configPath = require('path').join(require('os').homedir(), '.config', 'netlify', 'config.json');
  // Em Windows pode estar em AppData/Roaming/netlify/config.json ou similar. Vamos buscar via netlify status
  const status = execSync('npx netlify-cli status', { encoding: 'utf8' });
  console.log(status);
} catch(e) {
  console.log(e.stdout || e.message);
}
