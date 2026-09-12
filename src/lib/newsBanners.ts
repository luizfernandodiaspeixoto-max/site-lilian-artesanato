export interface NewsBanner {
  id: number
  title: string
  excerpt: string
  source: string
  sourceUrl: string
  image: string
}

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`

export const newsBanners: NewsBanner[] = [
  {
    id: 1,
    title: 'Crochê: A tendência que une conforto, estilo e criatividade',
    excerpt:
      'Mais do que uma tendência, o crochê representa um movimento de valorização do trabalho manual, da criatividade e do consumo consciente.',
    source: 'Capricho — Abril',
    sourceUrl:
      'https://capricho.abril.com.br/coluna/blog-da-galera-capricho/croche-a-tendencia-que-une-conforto-estilo-e-hobby-para-a-nossa-galera/',
    image: px(35155839),
  },
  {
    id: 2,
    title: 'O Poder Terapêutico do Crochê: Criatividade e Bem-estar',
    excerpt:
      'Terapia ocupacional com crochê promove interação social, reduz estresse e aumenta a sensação de pertencimento em grupos comunitários.',
    source: 'O Liberal',
    sourceUrl:
      'https://www.oliberal.com/belem/o-poder-terapeutico-do-croche-e-trico-conectando-criatividade-saude-e-bem-estar-1.1047248',
    image: px(18971489),
  },
  {
    id: 3,
    title: 'Crochê em Alta: Tendências de Moda do Comércio Popular',
    excerpt:
      'O estilo brazilcore segue em alta e o crochê é uma das principais tendências de moda, unindo artesanato e identidade brasileira.',
    source: 'GShow — Globo',
    sourceUrl:
      'https://gshow.globo.com/comportamento/moda/noticia/croche-em-alta-veja-tendencias-de-moda-do-comercio-popular-para-curtir-a-copa-do-mundo.ghtml',
    image: px(29889874),
  },
  {
    id: 4,
    title: 'Crochê: Tradição que se Reinventa na Moda Contemporânea',
    excerpt:
      'O crochê se reinventa e ganha destaque na moda contemporânea, com a valorização das peças feitas à mão. Técnica gera renda e impacta a economia local.',
    source: 'Coletivo F8',
    sourceUrl:
      'https://www.coletivof8.com/post/reportagem-croche-moda-e-empreendedorismo',
    image: px(7585570),
  },
  {
    id: 5,
    title: 'Crochê como Terapia: Benefícios Emocionais e Renda Extra',
    excerpt:
      'Muitas mães relatam que o crochê ajuda especialmente em momentos de sobrecarga emocional. Funciona como um apoio emocional acessível.',
    source: 'Portaltela',
    sourceUrl:
      'https://www.portaltela.com/cotidiano/saude-cotidiano/2026/05/06/croche-como-terapia-ocupacional-traz-beneficios-a-saude/',
    image: px(7585259),
  },
  {
    id: 6,
    title: 'Crochê Moderno: A Arte que Revoluciona Moda e Decoração',
    excerpt:
      'Descubra como o crochê moderno revolucionou a moda e a decoração com tendências, materiais sustentáveis e peças únicas.',
    source: 'Katia Ribeiro',
    sourceUrl:
      'https://katiaribeiro.com.br/croche-moderno-tendencia-moda-decoracao/',
    image: px(3693232),
  },
  {
    id: 7,
    title: 'Crochê Terapêutico: Benefícios Comprovados para a Saúde',
    excerpt:
      'Estudos indicam que o crochê pode promover bem-estar semelhante ao de técnicas de relaxamento. Atividade é descrita como fisioterapia preventiva.',
    source: 'O Liberal',
    sourceUrl:
      'https://www.oliberal.com/belem/o-poder-terapeutico-do-croche-e-trico-conectando-criatividade-saude-e-bem-estar-1.1047248',
    image: px(5806996),
  },
  {
    id: 8,
    title: 'As Maiores Tendências do Crochê que Vão Dominar os Próximos Anos',
    excerpt:
      'O crochê está se reinventando com novas tendências de design, materiais sustentáveis e técnicas modernas. O futuro une tradição e criatividade.',
    source: 'Croche Online',
    sourceUrl:
      'https://crocheonline.com.br/2025/10/08/as-maiores-tendencias-do-croche-que-vao-dominar-os-proximos-anos/',
    image: px(36238478),
  },
]