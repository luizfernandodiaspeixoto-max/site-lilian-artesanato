'use client';

import Image from 'next/image';
import { products } from '@/lib/products';
import { testimonials } from '@/lib/testimonials';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestimonialCard from '@/components/TestimonialCard';
import NewsBannerCarousel from '@/components/NewsBannerCarousel';

const WHATSAPP_URL = 'https://wa.me/5528999057982';
const featuredProducts = products.slice(0, 6);

export default function HomePage() {
  const featuredTestimonial = testimonials.find((t) => t.featured);
  const gridTestimonials = testimonials.filter((t) => !t.featured);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ──────── BANNERS NOTÍCIAS CROCHÊ ──────── */}
      <section className="pt-28 pb-8 px-4 md:px-6 md:pb-12">
        <NewsBannerCarousel />
      </section>

      {/* ──────── SOBRE (1st) ──────── */}
      <section className="bg-muted overflow-hidden px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Quem está por trás de cada ponto
            </p>
            <h2 className="font-display text-section-title font-semibold text-foreground">
              Sobre a{' '}
              <span className="font-light italic text-accent">Lilian Artesanato</span>
            </h2>
          </div>

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <Image
                src="/assets/images/WhatsApp_Image_2026-08-14_at_18.28.47-1787234116242.jpeg"
                alt="Lilian, artesã fundadora do Lilian Artesanato"
                width={500}
                height={600}
                unoptimized
                className="w-full rounded-3xl object-cover shadow-warm-md"
              />
              <div className="glass-card absolute -bottom-5 left-6 flex items-center gap-3 rounded-xl px-5 py-3">
                <p className="text-sm font-semibold text-foreground">Lilian</p>
                <p className="text-xs text-muted-foreground">Fundadora & Artesã</p>
              </div>
              <div className="glass-card absolute -bottom-5 right-6 hidden items-center gap-2 rounded-xl px-5 py-3 md:flex">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                <div>
                  <p className="text-[10px] font-semibold text-foreground">Cada ponto, com amor</p>
                  <p className="text-[10px] text-muted-foreground">Artesanato genuíno</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Olá! Sou a <strong className="text-foreground">Lilian</strong>, artesã
                apaixonada pelo crochê há mais de 8 anos. Tudo começou como um
                hobby nas tardes livres e se transformou em uma missão: levar
                beleza, originalidade e carinho para as mãos de mulheres que
                valorizam o feito à mão.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Cada bolsa que crio é única. Escolho pessoalmente os fios —
                priorizando qualidade, textura e cores que combinam com o estilo
                de vida moderno. Trabalho com técnicas tradicionais de crochê,
                adaptadas ao meu jeito especial de criar peças que são ao mesmo
                tempo funcionais e verdadeiras obras de arte.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Aqui no <strong className="text-foreground">Lilian Artesanato</strong>,
                não produzimos em série. Cada encomenda é tratada com atenção
                individual, do primeiro ponto à entrega. Meu maior prazer é saber
                que minha arte está sendo usada e admirada por aí!
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { value: '500+', label: 'Clientes satisfeitas' },
                  { value: '8 anos', label: 'De experiência artesanal' },
                  { value: '100%', label: 'Feito à mão' },
                  { value: '4.9★', label: 'Avaliação média' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
                    <p className="font-display text-2xl font-semibold">{s.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── HERO (2nd) ──────── */}
      <section className="relative overflow-hidden px-6 py-16 md:py-24 min-h-screen flex flex-col items-center justify-center pt-28 pb-16">
        {/* Blobs */}
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full blob-accent" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full blob-primary" aria-hidden="true" />

        {/* Text content */}
        <div className="relative z-10 w-full max-w-5xl text-center">
          <div className="reveal mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/40 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Feitas à mão com amor · Peças por Encomenda
          </div>

          <h1 className="reveal reveal-delay-1 font-display text-hero-xl mb-6 font-semibold text-foreground">
            Lilian Artesanato,<br />
            <span className="font-light italic text-accent">única como você.</span>
          </h1>

          <p className="reveal reveal-delay-2 mx-auto mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
            Cada peça é crochê artesanal, tecida à mão com fios selecionados.
            Produtos feitos por encomenda — 50% de depósito para confirmar o
            pedido.
          </p>

          <div className="reveal reveal-delay-3 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="/products" className="btn-primary group">
              Ver Coleção Completa
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18" className="transition group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L0 24l6.335-1.508A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.213-3.76.895.952-3.653-.234-.374A9.818 9.818 0 1 1 12 21.818z" />
              </svg>
              (28) 99905-7982
            </a>
          </div>
        </div>

        {/* Hero image */}
        <div className="reveal reveal-delay-4 relative z-10 mt-16 h-[420px] w-full max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/50 shadow-warm-xl md:h-[600px]">
          <div className="absolute inset-0">
            <Image
              src="/assets/images/WhatsApp_Image_2026-08-14_at_18.28.43_-_Copia-1787246473243.jpeg"
              alt="Bolsa Azul Royal com Alça de Madeira — peça artesanal única feita à mão em crochê"
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-cover bg-gray-200"
              priority
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />

          {/* Destaque da Semana card */}
          <div className="absolute bottom-8 left-8 z-20 hidden max-w-xs rounded-3xl p-6 shadow-warm-xl md:block" style={{ background: 'rgba(250,247,242,.65)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.5)', color: '#2C1810' }}>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#6B4C3B' }}>
                  Destaque da Semana
                </p>
                <h4 className="font-display text-lg font-semibold" style={{ color: '#2C1810' }}>
                  Bolsa Azul Royal
                </h4>
              </div>
              <span className="badge-handmade">Feita à Mão</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-semibold" style={{ color: '#A0622A' }}>
                Sob encomenda
              </span>
              <a className="flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2" style={{ color: '#A0622A' }} href="/products">
                Ver mais
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="14" height="14">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Stats pill */}
          <div className="absolute bottom-8 right-8 z-20 hidden items-center gap-3 rounded-full px-5 py-3 md:flex" style={{ background: 'rgba(44,24,16,.55)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.1)' }}>
            <div className="text-center">
              <p className="text-lg font-bold leading-none text-white">500+</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/60">Clientes</p>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-lg font-bold leading-none text-white">4.9★</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/60">Avaliação</p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── COLEÇÃO EM DESTAQUE (3rd) ──────── */}
      <section id="featured" className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Coleção em Destaque
              </span>
              <h2 className="font-display text-section-title font-semibold text-foreground">
                Peças que as mulheres<br />
                <span className="font-light italic text-accent">mais amam.</span>
              </h2>
            </div>
            <a href="/products" className="btn-outline flex-shrink-0">
              Ver Todas
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 auto-rows-[280px] md:grid-cols-3">
            {featuredProducts.map((p, i) => {
              const spanClass =
                i === 0 ? 'md:row-span-2' :
                i === 3 || i === 4 ? 'md:col-span-2' : '';

              return (
                <a
                  key={p.id}
                  href="/products"
                  className={`group relative overflow-hidden rounded-3xl border border-border bg-muted transition hover:shadow-warm-md ${spanClass}`}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="relative h-full w-full">
                      <Image
                        src={`/assets/images/${p.image}`}
                        alt={p.name}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="product-card-img bg-gray-200 object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                  {p.badge && (
                    <div className="badge-handmade absolute left-4 top-4 z-10">
                      {p.badge}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                    {p.category !== 'Kit' && (
                      <p className="mb-1 text-xs text-white/70">{p.category}</p>
                    )}
                    <h3 className={`font-display font-semibold text-white ${i === 0 || i === 3 || i === 4 ? 'mb-2 text-xl sm:text-2xl' : ''}`}>
                      {p.name}
                    </h3>
                    <span className="mt-1 inline-block rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-accent/90 backdrop-blur-sm">
                      Sob encomenda
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────── DEPOIMENTOS (4th) ──────── */}
      <section className="bg-muted px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              O que dizem nossas clientes
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Amor real,{' '}
              <span className="font-display italic text-accent">palavras verdadeiras.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredTestimonial && (
              <div className="lg:col-span-3">
                <TestimonialCard testimonial={featuredTestimonial} featured />
              </div>
            )}
            {gridTestimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────── NOVA COLEÇÃO / CTA (5th) ──────── */}
      <section className="px-4 py-12 pb-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-rose-700 via-pink-700 to-rose-900 px-8 py-16 text-center shadow-warm-xl md:py-20">
            {/* Blob radiais */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(196,149,106,0.18) 0%, transparent 70%)' }} />
            </div>

            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                  Nova coleção disponível
                </span>
              </div>

              <h2 className="font-display mb-4 text-3xl font-semibold text-primary-foreground sm:text-4xl lg:text-5xl">
                Encontre sua bolsa<br />
                <span className="font-light italic text-accent">perfeita.</span>
              </h2>

              <p className="mb-10 text-lg leading-relaxed text-white/60">
                Mais de 30 modelos artesanais esperando por você. Cada peça única,
                cada detalhe pensado com carinho.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="/products" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-primary transition hover:opacity-90">
                  Explorar Catálogo
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18" className="transition group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L0 24l6.335-1.508A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.213-3.76.895.952-3.653-.234-.374A9.818 9.818 0 1 1 12 21.818z" />
                  </svg>
                  Falar no WhatsApp
                </a>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-accent/20 bg-white/5 px-5 py-3">
                <span className="text-lg">🧶</span>
                <p className="text-sm text-white/70">
                  <strong className="text-white">Feito por Encomenda</strong> · 50% de depósito para confirmar o pedido
                </p>
              </div>

              <div className="mx-auto mt-12 flex max-w-lg flex-wrap items-center justify-center gap-8 border-t border-white/10 pt-8">
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-primary-foreground">500+</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/40">Clientes</p>
                </div>
                <div className="hidden h-8 w-px bg-white/10 sm:block" />
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-primary-foreground">R$139</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/40">A partir de</p>
                </div>
                <div className="hidden h-8 w-px bg-white/10 sm:block" />
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-primary-foreground">24h</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/40">Envio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}