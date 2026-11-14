const fs = require('fs');

// Criar script de automação de horários (incluindo meia-noite) e validação de links
const cronScript = `const { exec } = require('child_process');
const path = require('path');

function runUpdate() {
  console.log('[' + new Date().toISOString() + '] Rodando atualização de notícias...');
  exec('node ' + path.join(__dirname, 'updater.js'), (err, stdout, stderr) => {
    if (err) {
      console.error('Erro no updater:', err);
      return;
    }
    console.log(stdout);
    // Executar o gerador do standalone para atualizar a página web com as novas notícias
    exec('node ' + path.join(__dirname, '..', 'standalone.js'), (e2, out2) => {
      if (!e2) console.log('Standalone atualizado!');
    });
  });
}

// Horários definidos: 00:00 (Meia-noite), 08:00, 12:00, 17:00
const TARGET_HOURS = [0, 8, 12, 17];

console.log('Robô de Notícias e WhatsApp iniciado. Horários programados: 00:00, 08:00, 12:00, 17:00');

setInterval(() => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  
  // Se for exatamente na hora exata (minuto 0)
  if (TARGET_HOURS.includes(h) && m === 0) {
    runUpdate();
  }
}, 60000); // Checa a cada 1 minuto
`;

fs.writeFileSync('G:/noticias calcado/src/scheduler.js', cronScript, 'utf8');
console.log('Scheduler criado com sucesso!');
