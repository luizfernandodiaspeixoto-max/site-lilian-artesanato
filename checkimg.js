const fs = require('fs');
const j = JSON.parse(fs.readFileSync('data/noticias.json','utf8'));
function getImg(n){
  if(n.image)return n.image;
  if(n.thumbnail)return n.thumbnail;
  if(n.enclosure && n.enclosure.url)return n.enclosure.url;
  if(n.media && n.media.url)return n.media.url;
  const d=n.description||'';
  const m=d.match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/i);
  if(m)return m[1];
  return null;
}
j.slice(0,20).forEach((x,i)=>{
  console.log(i+1, getImg(x)?'SIM':'NAO');
});
console.log('TOTAL', j.length);
