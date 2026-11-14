const fs = require('fs');
const indexPath = 'G:/noticias calcado/public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// Ensure masthead z-index is 9999 and sidebar-ad z-index is 10000 so sidebar sits on top correctly
html = html.replace(/z-index:\s*9999;/g, 'z-index: 9999;');
html = html.replace(/z-index:\s*99999;/g, 'z-index: 10000;');

// Also fix mobile or default sidebar rules
html = html.replace(/\.sidebar-ad\s*\{([^}]*)\}/g, (match, p1) => {
  if (!p1.includes('z-index')) {
    return `.sidebar-ad {${p1} z-index: 10000; }`;
  }
  return match.replace(/z-index:\s*\d+;/g, 'z-index: 10000;');
});

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Sidebar z-index ensured higher than masthead.');
