export interface Testimonial {
  id: number;
  name: string;
  city: string;
  state: string;
  since?: string;
  quote: string;
  product?: string;
  avatar?: string;
  initials: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ana Paula Ribeiro',
    city: 'Florianópolis',
    state: 'SC',
    since: 'Cliente desde 2022',
    product: 'Cliente Fiel ⭐',
    avatar:
      'https://img.rocket.new/generatedImages/rocket_gen_img_131b3bb16-1784880253265.png',
    initials: 'AP',
    featured: true,
    quote:
      'Já é minha terceira compra com a Lilian! Cada peça é única e especial. O atendimento pelo WhatsApp é rápido e ela tira todas as dúvidas com muita simpatia. As bolsas são resistentes, lindas e recebo elogios toda vez que uso. Não troco por nada!',
  },
  {
    id: 2,
    name: 'Mariana Oliveira',
    city: 'São Paulo',
    state: 'SP',
    product: 'Bolsa Praia Boho',
    avatar:
      'https://img.rocket.new/generatedImages/rocket_gen_img_1b0e993b5-1768445246624.png',
    initials: 'MO',
    quote:
      'Comprei a bolsa praia e recebi em perfeito estado. A qualidade do crochê é impecável — todo mundo pergunta onde comprei. Já pedi a segunda!',
  },
  {
    id: 3,
    name: 'Camila Ferreira',
    city: 'Rio de Janeiro',
    state: 'RJ',
    product: 'Mini Bag Caramelo',
    avatar:
      'https://img.rocket.new/generatedImages/rocket_gen_img_147fe6c87-1767031135270.png',
    initials: 'CF',
    quote:
      'A mini bag caramelo é perfeita. Pequena, charmosa e muito bem feita. Uso no dia a dia e recebo elogios sempre. Vale cada centavo!',
  },
  {
    id: 4,
    name: 'Fernanda Santos',
    city: 'Belo Horizonte',
    state: 'MG',
    product: 'Evening Bag Prata',
    avatar:
      'https://img.rocket.new/generatedImages/rocket_gen_img_168835c51-1784426330070.png',
    initials: 'FS',
    quote:
      'Presente para minha mãe e ela amou. O acabamento é incrível, parece que cada ponto foi feito com muito cuidado. Entrega rápida também.',
  },
  {
    id: 5,
    name: 'Juliana Costa',
    city: 'Vitória',
    state: 'ES',
    product: 'Encomenda Personalizada',
    avatar:
      'https://img.rocket.new/generatedImages/rocket_gen_img_1bf517805-1773990512446.png',
    initials: 'JC',
    quote:
      'A Lilian é super atenciosa! Fiz uma encomenda personalizada e ela me atualizou em cada etapa. A bolsa ficou exatamente como eu queria. Recomendo demais!',
  },
  {
    id: 6,
    name: 'Patrícia Almeida',
    city: 'Curitiba',
    state: 'PR',
    product: 'Bolsa Festa Nude',
    avatar:
      'https://img.rocket.new/generatedImages/rocket_gen_img_15c43327a-1772856393660.png',
    initials: 'PA',
    quote:
      'Comprei como presente de aniversário e a aniversariante ficou encantada. A bolsa é linda, resistente e com um acabamento que você não encontra em loja nenhuma.',
  },
  {
    id: 7,
    name: 'Renata Moura',
    city: 'Salvador',
    state: 'BA',
    product: 'Coleção Verão',
    avatar:
      'https://img.rocket.new/generatedImages/rocket_gen_img_181dfbcd4-1767883807129.png',
    initials: 'RM',
    quote:
      'Já é minha terceira compra com a Lilian! Cada peça é única e especial. O atendimento pelo WhatsApp é rápido e ela tira todas as dúvidas com muita simpatia.',
  },
];