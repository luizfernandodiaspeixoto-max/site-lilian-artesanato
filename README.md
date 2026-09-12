# Lilian Artesanato - Site Oficial

Site de vitrine/e-commerce para artesã de crochê **Lilian Bareli**. Vitrine com catálogo completo de produtos, filtros por categoria e cor, depoimentos de clientes, banner de notícias, cadastro de newsletter e botão de WhatsApp para pedidos diretos. Possui área administrativa (pedidos, visitas, logs e newsletter) com persistência de dados em Netlify Blobs.

**URL:** [lilianartesanato.com.br](https://lilianartesanato.com.br)  
**Netlify:** [lilianartesanato.netlify.app](https://lilianartesanato.netlify.app)  
**Repositório:** [github.com/luizfernandodiaspeixoto-max/site-lilian-artesanato](https://github.com/luizfernandodiaspeixoto-max/site-lilian-artesanato)

---

## Stack Tecnológica

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 14 (App Router) | Framework React |
| React | 18 | Biblioteca UI |
| TypeScript | 5.3 | Tipagem estática |
| Tailwind CSS | 3.4 | Estilização |

---

## Estrutura do Projeto

```
site Lilian Artesanato/
├── public/
│   └── assets/
│       └── images/                        # Imagens de produtos + app_logo.png
├── src/
│   ├── app/
│   │   ├── globals.css                    # Estilos globais + Tailwind
│   │   ├── layout.tsx                     # Layout raiz (fonts, metadata, Logger)
│   │   ├── page.tsx                       # Página inicial (/)
│   │   ├── products/
│   │   │   └── page.tsx                   # Catálogo de produtos (/products)
│   │   ├── api/                           # API routes (persistência)
│   │   │   ├── newsletter/route.ts        # GET/POST/DELETE de inscritos
│   │   │   ├── orders/route.ts            # GET/POST/PATCH de pedidos
│   │   │   ├── log/route.ts               # POST/GET de eventos (telemetria)
│   │   │   └── visitas/route.ts           # GET contador de visitas
│   │   └── admin/
│   │       ├── layout.tsx                 # AdminProvider + AdminNav + Header/Footer
│   │       ├── page.tsx                   # Dashboard (/admin)
│   │       ├── logs/page.tsx              # Logs de eventos (/admin/logs)
│   │       ├── newsletter/page.tsx        # Inscritos na newsletter (/admin/newsletter)
│   │       ├── orders/page.tsx            # Gerenciador de pedidos (/admin/orders)
│   │       └── visitas/page.tsx           # Contador de visitas (/admin/visitas)
│   ├── components/
│   │   ├── AdminContext.tsx               # Provider do header administrativo
│   │   ├── AdminNav.tsx                   # Navegação admin (Pedidos/Visitas/Logs/Newsletter)
│   │   ├── Footer.tsx                     # Rodapé (encomenda, frete, pagamento, newsletter)
│   │   ├── Header.tsx                     # Pill flutuante com navegação
│   │   ├── Logger.tsx                     # Captura de eventos/telemetria
│   │   ├── NewsBannerCarousel.tsx         # Carrossel de notícias (homepage)
│   │   ├── ProductCard.tsx                # Card individual de produto
│   │   └── TestimonialCard.tsx            # Card de depoimento
│   └── lib/
│       ├── newsBanners.ts                 # Banners de notícias (8 itens)
│       ├── products.ts                    # Dados dos 26 produtos (nome, subtitle, description)
│       ├── store.ts                       # Camada de armazenamento (fs + Netlify Blobs)
│       └── testimonials.ts                # Dados dos 7 depoimentos
├── netlify.toml                           # Config de build no Netlify
├── next.config.js
├── tailwind.config.ts                     # Design system (cores, fontes)
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Como Rodar Localmente

```bash
cd "G:\site Lilian Artesanato"
npm install
npm run dev
```

Acesse: **http://localhost:3000**

### Outros scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção (após build) |
| `npm run lint` | Verificação de código (ESLint) |

> **Importante:** o site local é uma cópia do ambiente de produção. Qualquer
> ajuste deve ser feito localmente e depois publicado.

---

## Páginas

### `/` — Página Inicial

Ordem das seções (idêntica ao site em produção):

1. **Sobre** — História da Lilian, foto da artesã e 4 estatísticas (500+ clientes, 8 anos, 100% feito à mão, 4.9★)
2. **Notícias** — Carrossel com 8 banners de novidades do mundo do crochê (Notícias da Moda / Novidades Lilian)
3. **Hero** — Badge "Feitas à mão com amor · Peças por Encomenda", H1 "Lilian Artesanato, única como você.", CTAs, imagem com card "Destaque da Semana" e pill de estatísticas (500+ / 4.9★)
4. **Coleção em Destaque** — Grid bento com 6 produtos mais populares
5. **Depoimentos** — 7 avaliações reais (1 destaque + 6 cards)
6. **Nova Coleção** — Bloco com gradiente rosa, estatísticas (500+, R$139, 24h) e CTAs

### `/products` — Catálogo Completo

- **26 produtos** em cards com imagem, categoria + cor, descrição, avaliações e preço sob encomenda
- **Ordenação:** Mais Recentes / Mais Vendidos
- **Filtros por categoria:** Todos, Bolsa, Tote, Hobo, Clutch, Roupa, Tiracolo, Baguete, Bucket, Kit, Acessório
- **Filtros por cor:** Todas as cores, Natural, Colorido, Neutro
- **Badges:** Mais Vendida, Promoção, Nova, Destaque, Exclusiva

### `/admin` — Área Administrativa

Área administrativa (link "Admin" no rodapé) com header próprio (breadcrumb, link "Loja" e botão "Sair") e navegação:

- `/admin/newsletter` — Inscritos na newsletter (busca, status e exclusão)
- `/admin/visitas` — Contador de visitas (total, visitantes únicos e detalhes por página)
- `/admin/orders` — Pedidos recebidos (criação, busca e atualização de status/rastreio)
- `/admin/logs` — Eventos capturados (page_view, link_click, form_submit, etc.)

---

## Design System

### Paleta de Cores (tema escuro — igual ao site em produção)

| Token | Cor | Uso |
|---|---|---|
| `background` | `#2E2420` | Fundo principal |
| `foreground` / `primary` | `#FAF7F2` | Texto principal e fundo claro (botões) |
| `primary-foreground` | `#2C1810` | Texto sobre fundo claro |
| `secondary` | `#D4B896` | Elementos secundários |
| `accent` | `#C4956A` | Destaques, badges e chips |
| `muted` | `#3D2E28` | Fundo de seções (Sobre, Depoimentos) |
| `muted-foreground` | `#C4A882` | Texto secundário |
| `card` | `#3A2A24` | Cards |
| `border` | `#4A3530` | Bordas |

### Tipografia

| Fonte | Tipo | Uso |
|---|---|---|
| **DM Sans** | Sans-serif | Texto corrido, UI |
| **Fraunces** | Serif | Títulos, destaque editorial (`font-display`) |

### Classes utilitárias customizadas

| Classe | Efeito |
|---|---|
| `.btn-primary` | Botão sólido claro (fundo `#FAF7F2`, texto `#2C1810`) |
| `.btn-outline` | Botão outline com borda do `primary` |
| `.badge-handmade` | Badge com gradiente caramelo (`#C4956A → #A67850`) |
| `.filter-chip` | Chip de filtro (cards, borda, ativo em accent) |
| `.glass-card` | Card translúcido claro com blur (pill header, cards flutuantes) |
| `.glass-card-dark` | Pill escuro translúcido com blur (estatísticas do hero) |
| `.product-card` | Card de produto (catálogo) |
| `.blob-accent` / `.blob-primary` | Blobs radiais decorativos (hero) |
| `.text-hero-xl` | Título gigante do hero (`clamp(3rem, 8vw, 7rem)`) |
| `.text-section-title` | Título de seção (`clamp(2rem, 4vw, 3.5rem)`) |
| `.shadow-warm-sm/md/lg/xl` | Sombras quentes |

---

## Dados dos Produtos

- **26 produtos** cadastrados em `src/lib/products.ts`
- Cada produto possui: `id`, `slug`, `name`, `subtitle` (cor exibida), `description` (texto de marketing), `category`, `badge`, `ratingCount`, `image`, `color` (filtro)
- **10 categorias:** Bolsa, Tote, Hobo, Clutch, Roupa, Tiracolo, Baguete, Bucket, Kit, Acessório
- **3 cores para filtro:** Natural, Colorido, Neutro
- **5 badges:** Mais Vendida, Promoção, Nova, Destaque, Exclusiva
- **26 imagens** em `public/assets/images/`

### Exemplos de Produtos

| # | Produto | Categoria | Badge |
|---|---|---|---|
| 1 | Bolsa Azul Royal com Alça de Madeira | Bolsa | Mais Vendida |
| 2 | Kit Cestinhas de Crochê Trio Candy | Kit | Promoção |
| 4 | Bolsa Bucket Verde Escuro com Corrente Prata | Bucket | Destaque |
| 8 | Bolsa Tote Areia com Textura em Relevo | Tote | Mais Vendida |
| 12 | Chinelo Customizado com Flores de Crochê | Acessório | Destaque |
| 16 | Vestido Longo de Crochê Off-White Rendado Boho | Roupa | Exclusiva |
| 26 | Bolsa Tote Rose/Nude com Flores em Crochê | Tote | Mais Vendida |

---

## Dados dos Depoimentos

7 depoimentos cadastrados em `src/lib/testimonials.ts`:

| Cliente | Cidade/UF | Produto/Tag |
|---|---|---|
| Ana Paula Ribeiro | Florianópolis/SC | Cliente Fiel ⭐ (destaque) |
| Mariana Oliveira | São Paulo/SP | Bolsa Praia Boho |
| Camila Ferreira | Rio de Janeiro/RJ | Mini Bag Caramelo |
| Fernanda Santos | Belo Horizonte/MG | Evening Bag Prata |
| Juliana Costa | Vitória/ES | Encomenda Personalizada |
| Patrícia Almeida | Curitiba/PR | Bolsa Festa Nude |
| Renata Moura | Salvador/BA | Coleção Verão |

Cada depoimento possui `avatar` (URL com fallback para iniciais), `initials`, `product` e `featured`.

---

## Persistência de Dados

| Dado | Local (dev) | Produção |
|---|---|---|
| Newsletter | `data/newsletter/newsletter.json` | Netlify Blobs (`newsletter`) |
| Pedidos | `data/orders/orders.json` | Netlify Blobs (`orders`) |
| Logs | `data/logs/access.log` | Netlify Blobs (`logs`) |
| Visitas | derivado dos logs | Netlify Blobs (`logs`) |

Camada única em `src/lib/store.ts` que detecta o ambiente (`IS_NETLIFY`) e usa **file system para desenvolvimento** ou **Netlify Blobs para produção**.

> **Importante:** em produção, o acesso ao store usa a **API pública do Netlify** via variável de ambiente `NETLIFY_API_PAT` (com fallback para credenciais de contexto). Não remova ou renomeie essa variável.

---

## Deploy

### Netlify (hospedagem atual) — via GitHub

O site é implantado automaticamente a cada `git push` na branch `main` do repositório [site-lilian-artesanato](https://github.com/luizfernandodiaspeixoto-max/site-lilian-artesanato).

Build configurado em `netlify.toml` usando o plugin `@netlify/plugin-nextjs` (comando: `npm run build`, publish dir: `.`).

```bash
# Deploy manual via CLI (alternativa)
netlify deploy --prod

# Requer variáveis de ambiente:
# NETLIFY_AUTH_TOKEN
# NETLIFY_SITE_ID
```

### Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NETLIFY_API_PAT` | Sim (produção) | Personal Access Token com acesso ao Blob Store (persistência) |

**Domínio:** lilianartesanato.com.br  
**Plataforma:** Netlify  
**Anterior:** Locaweb (HTML estático)