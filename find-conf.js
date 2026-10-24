const fs = require('fs');
const os = require('os');
const path = require('path');

// Procurar recursivamente em home por tokens do netlify
function findNetlifyConfig(dir) {
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const f of files) {
      const fullPath = path.join(dir, f.name);
      if (f.isDirectory() && !f.name.startsWith('.') && f.name !== 'node_modules') {
        // procurar
      } else if (f.name === 'config.json' || f.name.includes('netlify')) {
        console.log('Found:', fullPath);
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          console.log(content.slice(0, 300));
        } catch(e) {}
      }
    }
  } catch(e) {}
}

console.log('Homedir:', os.homedir());
findNetlifyConfig(os.homedir());
