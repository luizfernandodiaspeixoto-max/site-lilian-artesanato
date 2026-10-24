const fs = require('fs');

// 1. Criar arquivo _headers na pasta public para desativar qualquer restrição de iframe/segurança e permitir CORS/acesso público total
const headersContent = `/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer-when-downgrade
`;
fs.writeFileSync('public/_headers', headersContent, 'utf8');

// 2. Criar arquivo _redirects para garantir roteamento limpo
const redirectsContent = `/*    /index.html   200
`;
fs.writeFileSync('public/_redirects', redirectsContent, 'utf8');

console.log('Arquivos de configuração de headers criados!');
