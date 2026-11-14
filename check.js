const fs = require('fs');
const j = JSON.parse(fs.readFileSync('data/noticias.json','utf8'));
console.log(j.slice(0,15).map(x=>({pubDate:x.pubDate,foundAt:x.foundAt,title:x.title.substring(0,40)})));
console.log('TOTAL:', j.length);
