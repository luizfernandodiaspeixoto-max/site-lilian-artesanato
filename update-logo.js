const fs = require('fs');
const html = fs.readFileSync('G:/noticias calcado/public/index.html', 'utf8');

// Atualiza a logo para a igreja oficial da prefeitura
const updated = html.replace(
  /<img class="brand-logo" src="[^"]+"/,
  '<img class="brand-logo" src="https://pmsjc.es.gov.br/assets-portal/images/igreja-big.jpeg"'
);

fs.writeFileSync('G:/noticias calcado/public/index.html', updated, 'utf8');
console.log('Logo atualizada com sucesso no arquivo HTML principal!');
