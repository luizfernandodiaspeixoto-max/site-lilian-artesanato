# Lilian Artesanato - Site Oficial

Site de vitrine/e-commerce para artesã de crochê **Lilian Bareli**. Vitrine com catálogo completo de produtos, filtros por categoria e cor, zoom de fotos, depoimentos de clientes, banner de notícias, cadastro de newsletter e botão de WhatsApp para pedidos diretos. Possui área administrativa protegida por senha (pedidos, visitas, logs e newsletter) com persistência de dados em Netlify Blobs.

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
│   │   ├── login/
│   │   │   └── page.tsx                   # Tela de login (/login)
│   │   ├── products/
│   │   │   └── page.tsx                   # Catálogo de produtos (/products)
│   │   ├── api/                           # API routes (persistência)
│   │   │   ├── login/route.ts             # POST autenticação (cria cookie)
│   │   │   ├── logout/route.ts            # POST logout (remove cookie)
│   │   │   ├── newsletter/route.ts        # GET/POST/DELETE de inscritos
│   │   │   ├── orders/route.ts            # GET/POST/PATCH de pedidos
│   │   │   ├── log/route.ts               # POST/GET de eventos (telemetria)
│   │   │   └── visitas/route.ts           # GET contador de visitas
│   │   └── admin/
│   │       ├── layout.tsx                 # AdminProvider + AdminNav
│   │       ├── page.tsx                   # Dashboard (/admin)
│   │       ├── logs/page.tsx              # Logs de eventos (/admin/logs)
│   │       ├── newsletter/page.tsx        # Inscritos na newsletter (/admin/newsletter)
│   │       ├── orders/page.tsx            # Gerenciador de pedidos (/admin/orders)
│   │       └── visitas/page.tsx           # Contador de visitas (/admin/visitas)
│   ├── components/
│   │   ├── AdminContext.tsx               # Provider do header administrativo
│   │   ├── AdminNav.tsx                   # Navegação admin (Pedidos/Visitas/Logs/Newsletter)
│   │   ├── Footer.tsx                     # Rodapé (encomenda, frete, pagamento, newsletter, Admin)
│   │   ├── Header.tsx                     # Pill flutuante com navegação
│   │   ├── ImageZoom.tsx                  # Modal de zoom ao clicar em fotos
│   │   ├── Logger.tsx                     # Captura de eventos/telemetria
│   │   ├── NewsBannerCarousel.tsx         # Carrossel de notícias (homepage)
│   │   ├── ProductCard.tsx                # Card individual de produto (com zoom)
│   │   └── TestimonialCard.tsx            # Card de depoimento
│   ├── lib/
│   │   ├── auth.ts                        # Autenticação HMAC-JWT (login, cookie, verificação)
│   │   ├── newsBanners.ts                 # Banners de notícias (8 itens)
│   │   ├── products.ts                    # Dados dos 28 produtos
│   │   ├── store.ts                       # Camada de armazenamento (fs + Netlify Blobs)
│   │   └── testimonials.ts                # Dados dos 7 depoimentos
│   └── middleware.ts                       # Proteção de rotas /admin/* (redireciona p/ /login)
├── netlify.toml                           # Config de build no Netlify
├── deploy.ps1                             # Script de deploy (git push + monitoramento)
├── next.config.js
├── tailwind.config.ts                     # Design system (cores, fontes)
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Área Administrativa (Protegida por Senha)

A área admin é protegida por autenticação via middleware Next.js. Qualquer acesso a `/admin/*` sem cookie válido redireciona automaticamente para `/login`.

### Credenciais

| Campo | Valor |
|---|---|
| URL | https://lilianartesanato.com.br/admin |
| Usuário | `admin` |
| Senha | `lilian13` |

> As credenciais podem ser alteradas via variáveis de ambiente `ADMIN_USER` e `ADMIN_PASSWORD` no Netlify Dashboard.

### Funcionamento

1. Usuário acessa `/admin/*` → middleware verifica cookie `lilian_admin_auth`
2. Se não autenticado → redireciona para `/login`
3. Se autenticado → acessa normalmente
4. Login cria cookie HTTP-only com validade de 7 dias (HMAC-SHA256)
5. Logout remove o cookie via `/api/logout`

### Rotas administrativas

- `/admin/orders` — Gerenciamento de pedidos (criação, busca, status/rastreio)
- `/admin/visitas` — Contador de visitas (total, visitantes únicos por página)
- `/admin/newsletter` — Inscritos da newsletter (busca, status, exclusão)
- `/admin/logs` — Eventos capturados (page_view, link_click, form_submit, etc.)
- `/admin` — Dashboard com links para todas as seções

---

## Funcionalidades de UI

### Zoom de Fotos

Ao clicar em qualquer imagem de produto (catálogo e seção de destaques da home), a foto abre em um modal em tela cheia. Clicar novamente (ou no botão ✕) volta ao tamanho normal.

Implementado via componente `src/components/ImageZoom.tsx`.

### Produtos

- **28 produtos** cadastrados em `src/lib/products.ts`
- Cada produto possui: `id`, `slug`, `name`, `subtitle` (cor exibida), `description` (texto de marketing), `category`, `badge`, `ratingCount`, `image`, `color` (filtro)
- **10 categorias:** Bolsa, Tote, Hobo, Clutch, Roupa, Tiracolo, Baguete, Bucket, Kit, Acessório
- **3 cores para filtro:** Natural, Colorido, Neutro
- **5 badges:** Mais Vendida, Promoção, Nova, Destaque, Exclusiva

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

1. **Notícias** — Carrossel com 8 banners de novidades do mundo do crochê
2. **Sobre** — História da Lilian, foto da artesã e 4 estatísticas (500+ clientes, 8 anos, 100% feito à mão, 4.9★)
3. **Hero** — Badge "Feitas à mão com amor · Peças por Encomenda", H1 "Lilian Artesanato, única como você.", CTAs, imagem com card "Destaque da Semana" e pill de estatísticas (500+ / 4.9★)
4. **Coleção em Destaque** — Grid bento com 6 produtos mais populares (com zoom ao clicar)
5. **Depoimentos** — 7 avaliações reais (1 destaque + 6 cards)
6. **Nova Coleção** — Bloco com gradiente rosa, estatísticas (500+, R$139, 24h) e CTAs

### `/products` — Catálogo Completo

- **28 produtos** em cards com imagem (com zoom ao clicar), categoria + cor, descrição, avaliações e preço sob encomenda
- **Ordenação:** Mais Recentes / Mais Vendidos
- **Filtros por categoria:** Todos, Bolsa, Tote, Hobo, Clutch, Roupa, Tiracolo, Baguete, Bucket, Kit, Acessório
- **Filtros por cor:** Todas as cores, Natural, Colorido, Neutro
- **Badges:** Mais Vendida, Promoção, Nova, Destaque, Exclusiva

### `/login` — Tela de Login

- Formulário com campos Usuário e Senha
- Chamada POST para `/api/login` que valida credenciais e cria cookie
- Em caso de sucesso, redireciona para `/admin/orders`
- Erro exibe mensagem de falha na tela

---

## Deploy

### Método Correto: Git Push (Continuous Deployment)

O deploy é feito **exclusivamente via git push** para a branch `main`. O Netlify detecta o push, roda `npm run build` e publica o resultado. **Não é possível fazer deploy via upload de arquivos** — o Netlify não roda o build nesse modo e o site não funciona corretamente (middleware, rotas dinâmicas e SSR ficam inativos).

#### Via script deploy.ps1 (recomendado)

```powershell
# Deploy com mensagem personalizada
.\deploy.ps1 -Message "adiciona produto novo"

# Deploy com mensagem padrão
.\deploy.ps1
```

O script faz:
1. Verifica alterações pendentes
2. Roda build local (`npm run build`)
3. Commita e faz push para GitHub
4. Monitora o deploy no Netlify até concluir (ou falhar)

#### Deploy manual via Git

```bash
git add -A
git commit -m "sua mensagem"
git push origin main
```

O Netlify inicia o build automaticamente (~2-5 minutos).

### netlify.toml

```toml
[build]
  command = "CI='' npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

> **Nota importante:** `CI=''` é necessário para evitar que warnings sejam tratados como erros durante o build. O Netlify define `CI=true` por padrão, o que faz com que muitas bibliotecas transformem warnings em falhas fatais.

### Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NETLIFY_API_PAT` | Sim (produção) | Personal Access Token com acesso ao Blob Store (persistência) |
| `ADMIN_USER` | Não | Usuário admin (fallback: `admin`) |
| `ADMIN_PASSWORD` | Não | Senha admin (fallback: `lilian13`) |
| `AUTH_SECRET` | Não | Segredo para assinatura HMAC-JWT (fallback interno) |

**Domínio:** lilianartesanato.com.br  
**Plataforma:** Netlify (plugin `@netlify/plugin-nextjs` v5)  
**Anterior:** Locaweb (HTML estático)

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

## Persistência de Dados

| Dado | Local (dev) | Produção |
|---|---|---|
| Newsletter | `data/newsletter/newsletter.json` | Netlify Blobs (`newsletter`) |
| Pedidos | `data/orders/orders.json` | Netlify Blobs (`orders`) |
| Logs | `data/logs/access.log` | Netlify Blobs (`logs`) |
| Visitas | derivado dos logs | Netlify Blobs (`logs`) |

Camada única em `src/lib/store.ts` que detecta o ambiente (`IS_NETLIFY`) e usa **file system para desenvolvimento** ou **Netlify Blobs para produção**.

> **Importante:** em produção, o acesso ao store usa a **API pública do Netlify** via variável de ambiente `NETLIFY_API_PAT` (com fallback para credenciais de contexto). Não remova ou renomeie essa variável.
