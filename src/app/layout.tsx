import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Logger from '@/components/Logger'

const SITE_URL = 'https://lilianartesanato.com.br'
const OG_IMAGE =
  'https://images.pexels.com/photos/35155839/pexels-photo-35155839.jpeg?auto=compress&cs=tinysrgb&w=1200'
const LOGO_URL = `${SITE_URL}/assets/images/app_logo.png`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Lílian Artesanato — Bolsas de Crochê Artesanais | São José do Calçado - ES',
  description:
    'Bolsas de crochê feitas à mão com exclusividade e carinho. Peças únicas feitas por encomenda. São José do Calçado - ES. Peça pelo WhatsApp (28) 99905-7982.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Lílian Artesanato',
    title: 'Lílian Artesanato — Bolsas de Crochê Artesanais | São José do Calçado - ES',
    description:
      'Peças únicas de crochê feitas à mão. Peça por encomenda no WhatsApp (28) 99905-7982.',
    url: '/',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 800,
        alt: 'Bolsa de crochê artesanal Lílian Artesanato',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lílian Artesanato — Bolsas de Crochê Artesanais',
    description:
      'Peças únicas de crochê feitas à mão. Peça por encomenda no WhatsApp.',
    images: [OG_IMAGE],
  },
  other: {
    'geo.region': 'BR-ES',
    'geo.placename': 'São José do Calçado',
    'geo.position': '-21.0317913;-41.6539740',
    ICBM: '-21.0317913, -41.6539740',
  },
}

const businessSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Store', 'Organization'],
  '@id': `${SITE_URL}/#negocio`,
  name: 'Lílian Artesanato',
  alternateName: 'Lilian Artesanato e Crochê',
  description:
    'Bolsas e peças de crochê artesanais, feitas à mão por encomenda, com exclusividade e carinho. Loja física em São José do Calçado, Espírito Santo.',
  url: `${SITE_URL}/`,
  logo: LOGO_URL,
  image: [OG_IMAGE, LOGO_URL],
  telephone: '+55-28-99905-7982',
  email: 'contato@lilianartesanato.com.br',
  priceRange: '$$',
  currenciesAccepted: 'BRL',
  paymentAccepted: 'Pix, Cartão de crédito, Cartão de débito, Boleto',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Domingos Martins',
    addressLocality: 'São José do Calçado',
    addressRegion: 'ES',
    postalCode: '29470-000',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -21.0317913,
    longitude: -41.653974,
  },
  hasMap:
    'https://www.google.com/maps/search/?api=1&query=-21.0317913,-41.6539740',
  areaServed: [
    { '@type': 'City', name: 'São José do Calçado' },
    { '@type': 'State', name: 'Espírito Santo' },
    { '@type': 'Country', name: 'Brasil' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '13:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/lilianartesanato13/',
    'https://www.facebook.com/lilianartesanatoecroche',
    'https://x.com/LilianCroche',
    'https://br.pinterest.com/liliamdomingues/',
    'https://medium.com/@llianbareli',
    'https://wa.me/5528999057982',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+55-28-99905-7982',
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: ['Portuguese'],
    },
  ],
  knowsAbout: [
    'Crochê',
    'Bolsas artesanais',
    'Peças únicas',
    'Artesanato',
    'Bolsas de crochê',
  ],
})

const hudBlockerScript = `
(function(){
  if(typeof document==='undefined') return;
  var removed=false;
  function isHud(el){
    if(!el||el.nodeType!==1) return false;
    if(el.tagName==='SCRIPT'&&/\\.netlify\\/scripts\\/hud/.test(el.getAttribute('src')||'')) return true;
    if(el.getAttribute&&(
      el.getAttribute('data-netlify-site-id')||
      el.getAttribute('data-nf-variant')||
      /^nz-/.test(el.id||'')||
      /(^|\\s)(nz|netlify-hud|netlify-badge)(\\s|$)/.test(el.className||'')
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: businessSchema }}
        />
      </head>
      <body>
        <Logger>{children}</Logger>
      </body>
    </html>
  )
}
