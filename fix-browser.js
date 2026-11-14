const fs = require('fs');

// Garantir que public/_headers tenha cabeçalhos permissivos para todos os navegadores
const headers = `/*
  Access-Control-Allow-Origin: *
  X-Frame-Options: ALLOWALL
  X-Content-Type-Options: nosniff
`;
fs.writeFileSync('public/_headers', headers, 'utf8');

console.log('Headers atualizados para compatibilidade total entre navegadores!');
