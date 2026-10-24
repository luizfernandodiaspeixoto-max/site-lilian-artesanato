const fs = require('fs');
let noticias = JSON.parse(fs.readFileSync('data/noticias.json', 'utf8'));

noticias = noticias.map(n => {
  let link = n.link || '';
  // Se for link de pesquisa do Google que criamos anteriormente, voltar para um link inteligente ou pesquisa direta sem sufixo duplicado
  if (link.includes('google.com/search')) {
    // Pegar o título original sem o termo duplicado
    let cleanTitle = n.title.replace(/ - (UOL|G1|CBN|Gazeta|Ache|Tribuna|Estadão).*$/i, '');
    const query = encodeURIComponent(cleanTitle + ' São José do Calçado');
    n.link = `https://www.google.com/search?q=${query}`;
  }
  return n;
});

fs.writeFileSync('data/noticias.json', JSON.stringify(noticias, null, 2), 'utf8');
console.log('Links limpos!');
