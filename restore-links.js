const fs = require('fs');
let noticias = JSON.parse(fs.readFileSync('data/noticias.json', 'utf8'));

// Restaurar links limpos diretos para as notícias originais (com fallback para busca inteligente se necessário, mas mantendo a URL real)
noticias = noticias.map(n => {
  let link = n.link || '';
  if (link.includes('google.com/search')) {
    // Tentar extrair o link original ou reconstruir URL oficial baseada no título / source se houver
    if (n.originalLink) {
      n.link = n.originalLink;
    } else {
      // Remover os termos repetidos de busca do Google para virar um link de busca limpo ou url real
      const clean = link.replace(/%20S%C3%A3o%20Jos%C3%A9%20do%20Cal%C3%A7ado.*$/, '');
      n.link = clean.replace('https://www.google.com/search?q=', 'https://www.google.com/search?q=');
    }
  }
  return n;
});

fs.writeFileSync('data/noticias.json', JSON.stringify(noticias, null, 2), 'utf8');
console.log('Noticias links restaurados!');
