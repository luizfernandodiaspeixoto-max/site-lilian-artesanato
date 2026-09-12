'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import {
  products,
  categories,
  colors,
  type ProductCategory,
  type ProductColor,
} from '@/lib/products';

type CategoryFilter = ProductCategory | 'Todos';
type ColorFilter = ProductColor | 'Todos';
type SortOption = 'recent' | 'popular';

const COLOR_DOT: Record<ProductColor, string> = {
  Natural: '#D4B896',
  Colorido: '#C4956A',
  Neutro: '#8D7B72',
};

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>('Todos');
  const [activeColor, setActiveColor] = useState<ColorFilter>('Todos');
  const [sort, setSort] = useState<SortOption>('recent');

  const filteredProducts = useMemo(() => {
    let list = products.filter(
      (p) =>
        (activeCategory === 'Todos' || p.category === activeCategory) &&
        (activeColor === 'Todos' || p.color === activeColor)
    );
    if (sort === 'popular') {
      list = [...list].sort((a, b) => b.ratingCount - a.ratingCount);
    }
    return list;
  }, [activeCategory, activeColor, sort]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="px-6 pt-36 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="transition hover:text-accent">
              Início
            </a>
            <span>›</span>
            <span className="font-medium text-foreground">Catálogo</span>
          </nav>

          <div className="mt-6">
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Toda a{' '}
              <span className="font-display italic text-accent">Coleção</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {filteredProducts.length} peças encontradas
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Categoria
              </p>
              {(['Todos', ...categories] as CategoryFilter[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <p className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Cor
              </p>
              {(['Todos', ...colors] as ColorFilter[]).map((color) => (
                <button
                  key={color}
                  onClick={() => setActiveColor(color)}
                  className={`filter-chip ${activeColor === color ? 'active' : ''}`}
                >
                  {color !== 'Todos' && (
                    <span
                      className="mr-1.5 inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLOR_DOT[color as ProductColor] }}
                    />
                  )}
                  {color === 'Todos' ? 'Todas as cores' : color}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                  <path d="M3 6h18M6 12h12M9 18h6" />
                </svg>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
                >
                  <option value="recent">Mais Recentes</option>
                  <option value="popular">Mais Vendidos</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product, i) => (
                  <div key={product.id} style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-12 text-center">
                <p className="font-display text-xl font-semibold">
                  Nenhuma peça encontrada
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tente ajustar os filtros de categoria ou cor.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('Todos');
                    setActiveColor('Todos');
                  }}
                  className="mt-6 btn-primary"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}