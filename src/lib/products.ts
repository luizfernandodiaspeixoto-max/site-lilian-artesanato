export type BadgeType =
  | 'Mais Vendida'
  | 'Promoção'
  | 'Nova'
  | 'Destaque'
  | 'Exclusiva';

export type ProductColor = 'Natural' | 'Colorido' | 'Neutro';

export type ProductCategory =
  | 'Bolsa'
  | 'Tote'
  | 'Hobo'
  | 'Clutch'
  | 'Roupa'
  | 'Tiracolo'
  | 'Baguete'
  | 'Bucket'
  | 'Kit'
  | 'Acessório';

export interface Product {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  category: ProductCategory;
  badge?: BadgeType;
  ratingCount: number;
  image: string;
  color: ProductColor;
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'bolsa-azul-royal-alca-madeira',
    name: 'Bolsa Azul Royal com Alça de Madeira',
    subtitle: 'Azul Royal',
    description:
      'Sofisticação e charme em cada ponto! Bolsa de crochê em azul royal vibrante com alça de madeira e tiracolo removível — a peça que transforma qualquer look do dia a dia em um statement de estilo artesanal único.',
    category: 'Bolsa',
    badge: 'Mais Vendida',
    ratingCount: 47,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.43_-_Copia-1787246473243.jpeg',
    color: 'Colorido',
  },
  {
    id: 2,
    slug: 'kit-cestinhas-croche-trio-candy',
    name: 'Kit Cestinhas de Crochê Trio Candy',
    subtitle: 'Rosa/Tiffany/Cinza',
    description:
      'Organização com muito estilo! Kit com 3 cestinhas de crochê nas cores rosa, tiffany e cinza — perfeitas para organizar bijuterias, maquiagem ou decorar qualquer cantinho da sua casa com delicadeza artesanal.',
    category: 'Kit',
    badge: 'Promoção',
    ratingCount: 32,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.38_-_Copia-1787234370016.jpeg',
    color: 'Colorido',
  },
  {
    id: 3,
    slug: 'bolsa-hobo-vinho-detalhes-couro',
    name: 'Bolsa Hobo Vinho com Detalhes em Couro',
    subtitle: 'Vinho',
    description:
      'Elegância que se carrega no ombro! Bolsa hobo em crochê vinho profundo com detalhes em couro que elevam o acabamento artesanal a outro nível — espaçosa, sofisticada e feita com amor para mulheres que têm estilo.',
    category: 'Hobo',
    ratingCount: 28,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.40_-_Copia-1787234370036.jpeg',
    color: 'Colorido',
  },
  {
    id: 4,
    slug: 'bolsa-bucket-verde-escuro-corrente-prata',
    name: 'Bolsa Bucket Verde Escuro com Corrente Prata',
    subtitle: 'Verde Escuro',
    description:
      'Atitude e sofisticação em cada detalhe! Bolsa bucket em crochê verde escuro com corrente prata dourada e contas de madeira que adicionam um toque boho-chic irresistível — a peça que eleva qualquer look ao próximo nível.',
    category: 'Bucket',
    badge: 'Destaque',
    ratingCount: 22,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.42-1787234470292.jpeg',
    color: 'Colorido',
  },
  {
    id: 5,
    slug: 'bolsa-azul-marinho-painel-palha',
    name: 'Bolsa Azul Marinho com Painel de Palha',
    subtitle: 'Azul Marinho',
    description:
      'Mar e elegância em uma só peça! Bolsa em azul marinho profundo com painel de palha natural e alça de madeira — uma combinação única que mistura o rústico e o refinado para criar um acessório verdadeiramente especial.',
    category: 'Bolsa',
    badge: 'Nova',
    ratingCount: 18,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.43__1_-1787234601865.jpeg',
    color: 'Colorido',
  },
  {
    id: 6,
    slug: 'bolsa-hobo-cinza-grafite-detalhes-couro',
    name: 'Bolsa Hobo Cinza Grafite com Detalhes em Couro',
    subtitle: 'Cinza Grafite',
    description:
      'Minimalismo poderoso! Bolsa hobo em crochê cinza grafite com acabamentos em couro que transmitem modernidade e requinte — versátil para o trabalho, passeio ou jantar especial, sempre com aquele toque artesanal único.',
    category: 'Hobo',
    badge: 'Exclusiva',
    ratingCount: 15,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.44__1_-1787234618405.jpeg',
    color: 'Neutro',
  },
  {
    id: 7,
    slug: 'bolsa-baguete-preta-alca-trancada',
    name: 'Bolsa Baguete Preta com Alça Trançada',
    subtitle: 'Preto',
    description:
      'O clássico reinventado! Bolsa baguete em crochê preto com alça trançada artesanal e argolas prateadas — elegante, compacta e cheia de personalidade para quem quer um acessório que conta uma história.',
    category: 'Baguete',
    ratingCount: 31,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.44__2_-1787234631420.jpeg',
    color: 'Neutro',
  },
  {
    id: 8,
    slug: 'bolsa-tote-areia-textura-relevo',
    name: 'Bolsa Tote Areia com Textura em Relevo',
    subtitle: 'Areia/Bege',
    description:
      'Leveza e sofisticação para o dia a dia! Bolsa tote em crochê areia/bege com textura em relevo e alça dupla resistente — espaçosa o suficiente para carregar tudo que você precisa com muito estilo e delicadeza artesanal.',
    category: 'Tote',
    badge: 'Mais Vendida',
    ratingCount: 39,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.44__3_-1787234646622.jpeg',
    color: 'Natural',
  },
  {
    id: 9,
    slug: 'bolsa-redonda-azul-alca-caramelo-tassel',
    name: 'Bolsa Redonda Azul com Alça Caramelo e Tassel',
    subtitle: 'Azul/Caramelo',
    description:
      'Redonda, charmosa e irresistível! Bolsa de crochê em azul vibrante com alças de couro caramelo e pingente tassel artesanal — uma peça circular que foge do comum e transforma qualquer look em obra de arte. Feita à mão com amor e muito estilo.',
    category: 'Bolsa',
    badge: 'Nova',
    ratingCount: 12,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.44-1787234790136.jpeg',
    color: 'Colorido',
  },
  {
    id: 10,
    slug: 'destaque-editorial-elegante-atemporal',
    name: 'Destaque Editorial — Elegante e Atemporal',
    subtitle: 'Exclusiva',
    description:
      'A peça que toda mulher merece! Criação exclusiva da Lilian Artesanato — elegante, atemporal e feita com os melhores fios. Uma bolsa que conta a história de quem a carrega e nunca sai de moda. Encomende a sua e seja única.',
    category: 'Bolsa',
    badge: 'Exclusiva',
    ratingCount: 8,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.45__1_-1787234803981.jpeg',
    color: 'Neutro',
  },
  {
    id: 11,
    slug: 'bolsa-quadrada-granny-square-alca-bambu',
    name: 'Bolsa Quadrada Granny Square com Alça de Bambu',
    subtitle: 'Multicolorida',
    description:
      'Alegria em cada quadradinho! Bolsa quadrada em crochê granny square multicolorido com alça de bambu natural e corrente dourada — uma explosão de cor e personalidade para quem ama o estilo boho-chic. Cada peça é única, assim como você!',
    category: 'Bolsa',
    badge: 'Promoção',
    ratingCount: 21,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.45__2_-1787234815625.jpeg',
    color: 'Colorido',
  },
  {
    id: 12,
    slug: 'chinelo-customizado-flores-croche',
    name: 'Chinelo Customizado com Flores de Crochê',
    subtitle: 'Colorido',
    description:
      'Seus pés merecem arte! Chinelo customizado com flores de crochê feitas à mão — delicadas, coloridas e cheias de charme. Perfeito para o dia a dia, praia ou presentear alguém especial. Conforto e beleza artesanal do jeito que só a Lilian faz!',
    category: 'Acessório',
    badge: 'Destaque',
    ratingCount: 35,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.45__3_-1787234832651.jpeg',
    color: 'Colorido',
  },
  {
    id: 13,
    slug: 'bolsa-tote-geometrica-pingentes-madeira',
    name: 'Bolsa Tote Geométrica com Pingentes de Madeira',
    subtitle: 'Multicolorida',
    description:
      'Arte geométrica que você carrega! Bolsa tote multicolorida com padrão geométrico em crochê e pingentes de madeira artesanais — espaçosa, resistente e cheia de personalidade. Uma peça que mistura tradição e modernidade com maestria única.',
    category: 'Tote',
    badge: 'Nova',
    ratingCount: 14,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.45__4_-1787234844776.jpeg',
    color: 'Natural',
  },
  {
    id: 14,
    slug: 'conjunto-colar-multicamadas-perolas-brincos-grafite',
    name: 'Conjunto Colar Multicamadas com Pérolas & Brincos Grafite',
    subtitle: 'Dourado/Bronze/Branco',
    description:
      'Elegância em camadas! Conjunto exclusivo com colar multicamadas em crochê com pérolas douradas, bronze e branco — sofisticado e versátil — acompanhado de brincos de crochê grafite que equilibram o look com modernidade. Perfeito para ocasiões especiais ou para elevar o dia a dia com arte feita à mão.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 18,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.45-1787234996588.jpeg',
    color: 'Neutro',
  },
  {
    id: 15,
    slug: 'conjunto-vinho-uva-colar-agata-brincos-flor-pulseiras',
    name: 'Conjunto Vinho/Uva — Colar com Ágata, Brincos Flor & Pulseiras',
    subtitle: 'Vinho/Uva',
    description:
      'O conjunto que toda mulher apaixonada por crochê precisa! Colar artesanal em tons vinho e uva com pedra de ágata natural no centro — poderosa e elegante — acompanhado de brincos flor delicados e pulseiras largas que completam o visual com muito charme boho. Uma coleção completa de joias de crochê feitas com amor.',
    category: 'Acessório',
    badge: 'Promoção',
    ratingCount: 24,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.46__1_-1787235008310.jpeg',
    color: 'Colorido',
  },
  {
    id: 16,
    slug: 'vestido-longo-croche-off-white-rendado-boho',
    name: 'Vestido Longo de Crochê Off-White Rendado Boho',
    subtitle: 'Off-White',
    description:
      'A peça dos sonhos para quem ama o estilo boho! Vestido longo de crochê off-white com rendado artesanal delicado — elegante, feminino e atemporal. Cada ponto é feito à mão com fios de alta qualidade, criando uma textura única que valoriza a silhueta. Ideal para casamentos na praia, festas ao ar livre ou para quem quer se sentir uma deusa todos os dias.',
    category: 'Roupa',
    badge: 'Exclusiva',
    ratingCount: 11,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.46__2_-1787235020452.jpeg',
    color: 'Natural',
  },
  {
    id: 17,
    slug: 'bolsa-clutch-rose-gold-alca-bambu-corrente-dourada',
    name: 'Bolsa Clutch Rose Gold com Alça de Bambu e Corrente Dourada',
    subtitle: 'Rose Gold',
    description:
      'Glamour artesanal na palma da mão! Clutch de crochê em rose gold com alça de bambu natural e corrente dourada removível — a combinação perfeita de delicadeza e sofisticação. Compacta e estilosa, é a bolsa ideal para festas, jantares e eventos especiais onde você quer arrasar com um toque único e exclusivo.',
    category: 'Clutch',
    badge: 'Destaque',
    ratingCount: 27,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.46__3_-1787235032682.jpeg',
    color: 'Neutro',
  },
  {
    id: 18,
    slug: 'bolsa-tiracolo-caramelo-cobre-alca-madeira-corrente-dourada',
    name: 'Bolsa Tiracolo Caramelo/Cobre com Alça de Madeira e Corrente Dourada',
    subtitle: 'Caramelo/Cobre',
    description:
      'Calor e elegância em cada detalhe! Bolsa tiracolo em crochê nas tonalidades caramelo e cobre com alça de madeira amarela artesanal e corrente dourada — uma peça que aquece o visual e traz sofisticação natural ao look. Versátil para o dia a dia ou para ocasiões especiais, é o acessório que toda mulher de bom gosto precisa ter.',
    category: 'Tiracolo',
    badge: 'Nova',
    ratingCount: 16,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.46-1787235045998.jpeg',
    color: 'Natural',
  },
  {
    id: 19,
    slug: 'chapeu-praia-croche-caramelo',
    name: 'Chapéu de Praia de Crochê Caramelo',
    subtitle: 'Caramelo',
    description:
      'Verão com muito estilo e charme artesanal! Chapéu de praia de crochê na cor caramelo quente — elegante, leve e feito à mão com fios de alta qualidade. A aba generosa protege do sol enquanto você arrasa no look praiano. Uma peça única que combina com tudo e transforma qualquer visual em um statement de moda artesanal irresistível.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 20,
    image: 'WhatsApp_Image_2026-08-20_at_16.01.22__1_-1787253786669.jpeg',
    color: 'Natural',
  },
  {
    id: 20,
    slug: 'vestido-longo-granny-square-multicolorido',
    name: 'Vestido Longo Granny Square Multicolorido',
    subtitle: 'Multicolorido',
    description:
      'Uma explosão de cor e arte em cada quadradinho! Vestido longo de crochê em ponto granny square multicolorido — vibrante, único e cheio de personalidade. Cada quadrado é feito à mão com fios coloridos que criam um mosaico de alegria e estilo boho-chic. Caimento fluido e elegante que valoriza a silhueta. A peça que toda mulher apaixonada por crochê sonha em ter!',
    category: 'Roupa',
    badge: 'Exclusiva',
    ratingCount: 18,
    image: 'WhatsApp_Image_2026-08-20_at_16.01.22__2_-1787253799934.jpeg',
    color: 'Colorido',
  },
  {
    id: 21,
    slug: 'bolsa-quadrada-granny-square-laranja-alca-madeira',
    name: 'Bolsa Quadrada Granny Square Laranja com Alça de Madeira',
    subtitle: 'Laranja/Multicolorido',
    description:
      'Alegria, cor e artesanato em uma só peça! Bolsa quadrada de crochê em ponto granny square com fundo laranja vibrante e flores coloridas que encantam à primeira vista. A alça de madeira natural dá um toque boho-chic sofisticado e artesanal. Espaçosa, resistente e completamente única — porque cada flor é feita à mão com muito amor e capricho.',
    category: 'Bolsa',
    badge: 'Destaque',
    ratingCount: 16,
    image: 'WhatsApp_Image_2026-08-20_at_16.01.25__1_-1787253829539.jpeg',
    color: 'Colorido',
  },
  {
    id: 22,
    slug: 'bolsa-tote-verde-militar-estrela-off-white-alca-madeira',
    name: 'Bolsa Tote Verde Militar com Estrela Off-White e Alça de Madeira',
    subtitle: 'Verde Militar',
    description:
      'Estilo, atitude e artesanato em uma bolsa incrível! Tote de crochê em verde militar com estrela off-white bordada à mão no centro — uma combinação moderna e cheia de personalidade. A alça de madeira natural eleva o acabamento artesanal e garante resistência para o dia a dia. Espaçosa e versátil, é a bolsa perfeita para quem quer se destacar com originalidade.',
    category: 'Tote',
    badge: 'Nova',
    ratingCount: 14,
    image: 'WhatsApp_Image_2026-08-20_at_16.01.25__2_-1787253846013.jpeg',
    color: 'Colorido',
  },
  {
    id: 23,
    slug: 'vestido-longo-granny-square-multicolorido-vestindo',
    name: 'Vestido Longo Granny Square Multicolorido — Foto Vestindo',
    subtitle: 'Multicolorido',
    description:
      '✨ A peça que para o tempo! Vestido longo de crochê em ponto granny square multicolorido — cada quadradinho feito à mão com fios vibrantes que criam um mosaico de cor e alegria. Caimento fluido e elegante que valoriza a silhueta em qualquer ocasião. Do casual ao especial, este vestido é uma declaração de amor ao artesanato. Peça única, feita com alma!',
    category: 'Roupa',
    badge: 'Exclusiva',
    ratingCount: 12,
    image: 'WhatsApp_Image_2026-08-20_at_16.01.22-1787254164278.jpeg',
    color: 'Colorido',
  },
  {
    id: 24,
    slug: 'vestido-midi-listrado-tons-terrosos-alca-unica',
    name: 'Vestido Midi Listrado Tons Terrosos com Alça Única',
    subtitle: 'Tons Terrosos',
    description:
      '🌿 Sofisticação boho em cada fio! Vestido midi de crochê listrado em tons terrosos quentes — caramelo, areia e marrom que harmonizam com a natureza e com o seu estilo. A alça única assimétrica dá um toque moderno e sensual ao design artesanal. Leve, elegante e completamente feito à mão. Para a mulher que carrega arte onde quer que vá!',
    category: 'Roupa',
    badge: 'Nova',
    ratingCount: 9,
    image: 'WhatsApp_Image_2026-08-20_at_16.01.25-1787254176832.jpeg',
    color: 'Natural',
  },
  {
    id: 25,
    slug: 'bolsa-meia-lua-branca-corrente-dourada-perolas',
    name: 'Bolsa Meia-Lua Branca com Corrente Dourada e Pérolas',
    subtitle: 'Branco/Dourado',
    description:
      '💎 Elegância pura em formato de meia-lua! Bolsa de crochê branca com corrente dourada e detalhes de pérolas que elevam o acabamento artesanal ao luxo. O formato meia-lua é tendência e a combinação branco + dourado + pérolas é atemporal e sofisticada. Perfeita para festas, jantares ou para transformar qualquer look do dia em algo especial. Arte que se carrega!',
    category: 'Bolsa',
    badge: 'Destaque',
    ratingCount: 15,
    image: 'Captura_de_tela_2026-08-20_162115-1787254189859.png',
    color: 'Natural',
  },
  {
    id: 26,
    slug: 'bolsa-tote-rose-nude-flores-croche-alcas-duplas',
    name: 'Bolsa Tote Rose/Nude com Flores em Crochê e Alças Duplas',
    subtitle: 'Rose/Nude',
    description:
      '🌸 Delicadeza e charme em cada florzinha! Bolsa tote de crochê em tons rose e nude com flores artesanais aplicadas à mão — um jardim que você carrega com você. As alças duplas garantem conforto e praticidade para o dia a dia. Espaçosa, resistente e irresistivelmente feminina. Para quem ama o artesanato com toda a sua delicadeza e personalidade única!',
    category: 'Tote',
    badge: 'Mais Vendida',
    ratingCount: 22,
    image: 'Captura_de_tela_2026-08-20_162134-1787254199079.png',
    color: 'Natural',
  },
];

export const categories: ProductCategory[] = [
  'Bolsa',
  'Tote',
  'Hobo',
  'Clutch',
  'Roupa',
  'Tiracolo',
  'Baguete',
  'Bucket',
  'Kit',
  'Acessório',
];

export const colors: ProductColor[] = ['Natural', 'Colorido', 'Neutro'];