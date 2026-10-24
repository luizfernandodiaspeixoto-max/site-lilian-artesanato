const fs = require('fs');

let noticias = JSON.parse(fs.readFileSync('data/noticias.json', 'utf8'));

// Substituir links do Google News RSS por links reais ou links limpos de busca do Google para evitar "refused to connect"
noticias = noticias.map(n => {
  let link = n.link || '';
  if (link.includes('news.google.com/rss/articles/')) {
    // Transformar o link para pesquisa direta do Google para garantir abertura limpa
    const query = encodeURIComponent(n.title + ' São José do Calçado');
    n.link = `https://www.google.com/search?q=${query}`;
  }
  return n;
});

fs.writeFileSync('data/noticias.json', JSON.stringify(noticias, null, 2), 'utf8');
console.log('Links corrigidos com sucesso!');
