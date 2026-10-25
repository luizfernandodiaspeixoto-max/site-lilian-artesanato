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
    slug: 'bolsa-bege-forro-alcas-couro',
    name: 'Bolsa Bege com Forro e Alças de Couro',
    subtitle: 'Bege',
    description:
      'Prática, elegante e muito espaçosa! Bolsa de crochê na cor bege com forro, bolso interno e alças de couro — a combinação perfeita para o dia a dia.',
    category: 'Bolsa',
    badge: 'Nova',
    ratingCount: 1,
    image: 'bolsa-bege-forro-alcas-couro.jpeg',
    color: 'Natural',
  },
  {
    id: 2,
    slug: 'bolsa-pratica-versatil-dia-a-dia',
    name: 'Bolsa Prática e Versátil',
    subtitle: 'Versátil',
    description:
      'Modelo prático e versátil! Ideal para o dia a dia — bolsa de crochê feita à mão com muito estilo.',
    category: 'Bolsa',
    badge: 'Nova',
    ratingCount: 1,
    image: 'bolsa-pratica-versatil-dia-a-dia.jpeg',
    color: 'Natural',
  },
  {
    id: 3,
    slug: 'bolsa-lili-cinza-sofisticada-delicada',
    name: 'Bolsa Lili Cinza',
    subtitle: 'Cinza',
    description:
      'Sofisticada e delicada! Bolsa de crochê na cor cinza com acabamento artesanal — elegância em cada ponto.',
    category: 'Bolsa',
    badge: 'Nova',
    ratingCount: 1,
    image: 'bolsa-lili-cinza.sofisticada-e-delicada.jpeg',
    color: 'Neutro',
  },
  {
    id: 4,
    slug: 'bolsa-lili-lilas-duas-alcas',
    name: 'Bolsa Lili Lilás com Duas Alças',
    subtitle: 'Lilás',
    description:
      'Delicadeza e charme! Bolsa de crochê na cor lilás com duas alças — perfeita para mulheres com estilo.',
    category: 'Bolsa',
    badge: 'Nova',
    ratingCount: 1,
    image: 'bolsa-lili-lilas-duas-alcas.jpeg',
    color: 'Colorido',
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
    slug: 'bolsa-boho-vinho-detalhes-couro',
    name: 'Bolsa Boho Vinho com Detalhes em Couro',
    subtitle: 'Vinho',
    description:
      'Elegância que se carrega no ombro! Bolsa boho em crochê vinho com detalhes em couro.',
    category: 'Hobo',
    ratingCount: 28,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.40_-_Copia-1787234370036.jpeg',
    color: 'Colorido',
  },
  {
    id: 8,
    slug: 'bolsa-bucket-verde-escuro-corrente-prata',
    name: 'Bolsa Bucket Verde Escuro com Corrente Prata',
    subtitle: 'Verde Escuro',
    description:
      'Atitude e sofisticação em cada detalhe! Bolsa bucket em crochê verde escuro com corrente prata.',
    category: 'Bucket',
    badge: 'Destaque',
    ratingCount: 22,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.42-1787234470292.jpeg',
    color: 'Colorido',
  },
  {
    id: 9,
    slug: 'bolsa-azul-marinho-palha-italiana',
    name: 'Bolsa Azul Marinho com Palha Italiana',
    subtitle: 'Azul Marinho',
    description:
      'Muita elegância em uma só peça!',
    category: 'Bolsa',
    badge: 'Nova',
    ratingCount: 18,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.43__1_-1787234601865.jpeg',
    color: 'Colorido',
  },
  {
    id: 10,
    slug: 'bolsa-boho-cinza-grafite-detalhes-couro',
    name: 'Bolsa Boho Cinza Grafite com Detalhes em Couro',
    subtitle: 'Cinza Grafite',
    description:
      'Minimalismo poderoso! Bolsa Boho em crochê cinza grafite com acabamentos em couro.',
    category: 'Hobo',
    badge: 'Exclusiva',
    ratingCount: 15,
    image: 'WhatsApp_Image_2026-08-14_at_18.28.44__1_-1787234618405.jpeg',
    color: 'Neutro',
  },
  {
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
    id: 16,
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
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
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
    id: 21,
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
    id: 22,
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
    id: 23,
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
    id: 24,
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
    id: 25,
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
    id: 26,
    slug: 'bolsa-tote-verde-militar-folha-off-white-alca-madeira',
    name: 'Bolsa Tote Verde Militar com Folha Off-White e Alça de Madeira',
    subtitle: 'Verde Militar',
    description:
      'Estilo e atitude! Uma bolsa prática e versátil!',
    category: 'Tote',
    badge: 'Nova',
    ratingCount: 14,
    image: 'WhatsApp_Image_2026-08-20_at_16.01.25__2_-1787253846013.jpeg',
    color: 'Colorido',
  },
  {
    id: 27,
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
    id: 28,
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
    id: 29,
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
    id: 30,
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
  {
    id: 31,
    slug: 'bolsa-quadrada-marrom-verde-duas-alcas',
    name: 'Bolsa Quadrada Marrom com Verde e Duas Alças',
    subtitle: 'Marrom/Verde',
    description:
      '🍃 Equilíbrio perfeito entre natureza e sofisticação! Nova bolsa quadrada de crochê no tom marrom com centro verde vibrante — uma combinação inédita que transmite elegância e frescor. Com suas duas alças resistentes, é prática, confortável e perfeita para o dia a dia. Cada ponto feito à mão pela Lilian garante uma peça única, cheia de personalidade e pronta para acompanhar você em qualquer ocasião. Peça exclusiva da nova coleção — encomende a sua!',
    category: 'Bolsa',
    badge: 'Nova',
    ratingCount: 3,
    image: 'bolsa_nova_1.jpeg',
    color: 'Colorido',
  },
  {
    id: 32,
    slug: 'bolsa-marrom-franjas-alca-tiracolo',
    name: 'Bolsa Marrom com Franjas e Alça Tiracolo',
    subtitle: 'Marrom',
    description:
      'Puro estilo! Bolsa de crochê na cor marrom com franjas.',
    category: 'Bolsa',
    badge: 'Nova',
    ratingCount: 2,
    image: 'bolsa_nova_2.jpeg',
    color: 'Neutro',
  },
  {
    id: 33,
    slug: 'brinco-cinza-conjunto',
    name: 'Brinco Cinza Conjunto',
    subtitle: 'Cinza',
    description:
      '✨ Elegância e sofisticação em cada detalhe! Conjunto de brincos de crochê na cor cinza — delicados, versáteis e perfeitos para complementar qualquer look. Feitos à mão com fios de alta qualidade, trazem um toque artesanal único que encanta. Ideais para o dia a dia ou ocasiões especiais, são a peça que toda mulher de bom gosto precisa ter.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 1,
    image: 'brinco-cinza-conjunto.png',
    color: 'Neutro',
  },
  {
    id: 34,
    slug: 'brinco-cinza',
    name: 'Brinco Cinza',
    subtitle: 'Cinza',
    description:
      '🕊️ Minimalismo artesanal que encanta! Brinco de crochê na cor cinza — delicado, leve e versátil. Feito à mão com fios de alta qualidade, este brinco adiciona um toque de sofisticação discreta a qualquer visual. Perfeito para quem busca elegância com personalidade artesanal.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 1,
    image: 'brinco-cinza.png',
    color: 'Neutro',
  },
  {
    id: 35,
    slug: 'brinco-cor-de-abobora',
    name: 'Brinco Cor de Abóbora',
    subtitle: 'Abóbora',
    description:
      '🎃 Cor e charme em cada ponto! Brinco de crochê na cor abóbora vibrante — uma peça artesanal que traz calor e personalidade ao seu visual. Feito à mão com fios de alta qualidade, é perfeito para quem ama tons terrosos e quer se destacar com estilo e originalidade.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 1,
    image: 'brinco-cor-de-abobora.png',
    color: 'Colorido',
  },
  {
    id: 36,
    slug: 'brinco-estrela',
    name: 'Brinco Estrela',
    subtitle: 'Estrela',
    description:
      '⭐ Brilhe como uma estrela! Brinco de crochê em formato estrela — uma peça artesanal única que traz luminosidade e personalidade ao seu look. Feito à mão com fios de alta qualidade, é perfeito para quem quer se destacar com elegância e criatividade. Acessório indispensável para quem ama arte vestível.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 1,
    image: 'brinco-estrela.png',
    color: 'Colorido',
  },
  {
    id: 37,
    slug: 'brinco-vermelho',
    name: 'Brinco Vermelho',
    subtitle: 'Vermelho',
    description:
      '❤️ Paixão em cada fio! Brinco de crochê na cor vermelho vibrante — uma peça artesanal que traz energia e sofisticação ao seu visual. Feito à mão com fios de alta qualidade, é perfeito para quem ama se expressar through cores e quer um acessório que conte uma história de amor pelo artesanato.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 1,
    image: 'brinco-vermelho.png',
    color: 'Colorido',
  },
  {
    id: 38,
    slug: 'cordao-azul',
    name: 'Cordão Azul',
    subtitle: 'Azul',
    description:
      '🌊 Sofisticação que se veste! Cordão de crochê na cor azul — uma peça artesanal versátil que pode ser usada como colar, cinto ou detalhe em looks diferentes. Feito à mão com fios de alta qualidade, traz um toque de cor e personalidade a qualquer ensemble. Acessório indispensável para quem ama arte vestível.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 1,
    image: 'cordao-azul.png',
    color: 'Colorido',
  },
  {
    id: 39,
    slug: 'cordao-maron',
    name: 'Cordão Marrom',
    subtitle: 'Marrom',
    description:
      '🍂 Calor e tradição em cada ponto! Cordão de crochê na cor marrom — uma peça artesanal atemporal que combina com tudo e traz elegância discreta ao visual. Feito à mão com fios de alta qualidade, é perfeito para quem busca um acessório versátil e cheio de personalidade.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 1,
    image: 'cordao-maron.png',
    color: 'Natural',
  },
  {
    id: 40,
    slug: 'cordao-pedra-azul',
    name: 'Cordão Pedra Azul',
    subtitle: 'Pedra Azul',
    description:
      '💎 Arte e natureza em harmonia! Cordão de crochê com detalhes em pedra azul — uma peça artesanal única que combina a suavidade do fio com a elegância da pedra natural. Feito à mão, é perfeito para quem busca um acessório exclusivo que conte uma história de conexão com a natureza.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 1,
    image: 'cordao-pedra-azul.png',
    color: 'Colorido',
  },
  {
    id: 41,
    slug: 'cordao-pedra-maron',
    name: 'Cordão Pedra Marrom',
    subtitle: 'Pedra Marrom',
    description:
      '🌿 Tradição e sofisticação! Cordão de crochê com detalhes em pedra marrom — uma peça artesanal que une o calor do tom terroso com a elegância da pedra natural. Feito à mão com capricho, é o acessório perfeito para quem ama peças únicas com personalidade e estilo.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 1,
    image: 'cordao-pedra-maron.png',
    color: 'Natural',
  },
  {
    id: 42,
    slug: 'cordao-pedra-maron-claro',
    name: 'Cordão Pedra Marrom Claro',
    subtitle: 'Pedra Marrom Claro',
    description:
      '☀️ Leveza e elegância! Cordão de crochê com detalhes em pedra marrom claro — uma peça artesanal delicada que traz suavidade e sofisticação ao visual. Feito à mão com fios de alta qualidade, é ideal para quem busca um acessório versátil que combine com diversas ocasiões.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 1,
    image: 'cordao-pedra-maron-claro.png',
    color: 'Natural',
  },
  {
    id: 43,
    slug: 'cordao-preto',
    name: 'Cordão Preto',
    subtitle: 'Preto',
    description:
      '🖤 Clássico atemporal! Cordão de crochê na cor preta — um acessório artesanal versátil que combina com tudo e nunca sai de moda. Feito à mão com fios de alta qualidade, traz sofisticação e elegância discreta a qualquer look. Peça indispensável para quem valoriza o artesanato de qualidade.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 1,
    image: 'cordao-preto.png',
    color: 'Neutro',
  },
  {
    id: 44,
    slug: 'cordao-vermelho',
    name: 'Cordão Vermelho',
    subtitle: 'Vermelho',
    description:
      '❤️ Paixão e energia! Cordão de crochê na cor vermelho vibrante — uma peça artesanal que traz vida e personalidade ao seu visual. Feito à mão com fios de alta qualidade, é perfeito para quem ama se expressar through cores e quer um acessório que seja uma declaração de amor ao artesanato.',
    category: 'Acessório',
    badge: 'Nova',
    ratingCount: 1,
    image: 'cordao-vermelho.png',
    color: 'Colorido',
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