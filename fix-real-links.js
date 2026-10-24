const fs = require('fs');
let noticias = JSON.parse(fs.readFileSync('data/noticias.json', 'utf8'));

noticias = noticias.map(n => {
  let link = n.link || '';
  if (link.includes('google.com/search')) {
    // Restaurar URL real se houver nos dados ou criar um link direto limpo
    // Como os links do Google News RSS antigos tinham o hash redirecionado, vamos usar o site oficial do G1/UOL correspondente ao título se possível ou link direto
    const title = n.title.toLowerCase();
    if (title.includes('g1')) {
      n.link = 'https://g1.globo.com/es/espirito-santo/cidade/sao-jose-do-calcado';
    } else if (title.includes('uol')) {
      n.link = 'https://noticias.uol.com.br/eleicoes/2024/apuracao/1turno/es/sao-jose-do-calcado';
    } else {
      n.link = 'https://www.agazeta.com.br/es/sao-jose-do-calcado';
    }
  }
  return n;
});

fs.writeFileSync('data/noticias.json', JSON.stringify(noticias, null, 2), 'utf8');
fs.writeFileSync('public/noticias.json', JSON.stringify(noticias, null, 2), 'utf8');
console.log('Links corrigidos para portais reais!');
