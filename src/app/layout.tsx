import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Logger from '@/components/Logger'

export const metadata: Metadata = {
  title: 'Lilian Artesanato — Bolsas de Crochê Artesanais',
  description:
    'Bolsas de crochê feitas à mão com exclusividade e carinho. Produtos feitos por encomenda. Entre em contato pelo WhatsApp (28) 99905-7982.',
  openGraph: {
    title: 'Lilian Artesanato — Artesanal & Exclusivo',
    description:
      'Bolsas de crochê feitas à mão, cada peça única. Feito por encomenda.',
    images: ['/assets/images/app_logo.png'],
  },
}

const hudBlockerScript = `
(function(){
  if(typeof document==='undefined') return;
  var removed=false;
  function isHud(el){
    if(!el||el.nodeType!==1) return false;
    if(el.tagName==='SCRIPT'&&/\.netlify\/scripts\/hud/.test(el.getAttribute('src')||'')) return true;
    if(el.getAttribute&&(
      el.getAttribute('data-netlify-site-id')||
      el.getAttribute('data-nf-variant')||
      /^nz-/.test(el.id||'')||
      /(^|\s)(nz|netlify-hud|netlify-badge)(\s|$)/.test(el.className||'')
    )) return true;
    return false;
  }
  function kill(){
    var all=document.querySelectorAll('script[src*=".netlify/scripts/hud"],[data-netlify-site-id],[data-nf-variant],[id^="nz-"],[class~="netlify-hud"],[class~="nz"],[class~="netlify-badge"]');
    for(var i=0;i<all.length;i++){all[i].remove();removed=true;}
    var shadow=document.querySelectorAll('[class*="netlify"],#netlify-badge');
    for(var j=0;j<shadow.length;j++){ if(/hud|badge|powered/i.test(shadow[j].className||'')||/hud|badge|netlify/i.test(shadow[j].id||'')){shadow[j].remove();removed=true;} }
  }
  kill();
  if(typeof MutationObserver!=='undefined'){
    new MutationObserver(function(muts){
      for(var k=0;k<muts.length;k++){
        var added=muts[k].addedNodes;
        for(var l=0;l<added.length;l++){ if(isHud(added[l])){added[l].remove();removed=true;} }
      }
    }).observe(document,{childList:true,subtree:true});
  }
  window.addEventListener('load',function(){
    setTimeout(kill,100);
    setTimeout(kill,500);
    setTimeout(kill,1500);
  });
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <Script id="netlify-hud-blocker" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: hudBlockerScript }} />
      </head>
      <body>
        <Logger>{children}</Logger>
      </body>
    </html>
  )
}