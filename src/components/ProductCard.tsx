'use client';

import Image from 'next/image';
import ImageZoom from '@/components/ImageZoom';
import type { Product } from '@/lib/products';

const WHATSAPP_NUMBER = '5528999057982';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de saber mais sobre: ${product.name}`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="product-card group rounded-2xl overflow-hidden bg-card border border-border shadow-warm-sm hover:shadow-warm-md transition-all duration-300">
      <div className="relative w-full bg-[#F5F0EA]" style={{ aspectRatio: '1 / 1' }}>
        <Image
          src={`/assets/images/${product.image}`}
          alt={`${product.name} — ${product.description}`}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="absolute inset-0 h-full w-full object-contain p-2"
        />
        {product.badge && (
          <div className="badge-handmade absolute top-3 left-3 z-10">
            {product.badge}
          </div>
        )}
        <ImageZoom
          imageSrc={`/assets/images/${product.image}`}
          alt={`${product.name} — ${product.description}`}
        />
      </div>

      <div className="p-4">
        <p className="mb-1 text-xs font-medium text-muted-foreground">
          {product.category} · {product.subtitle}
        </p>

        <h3 className="font-display mb-2 text-base font-semibold leading-tight text-foreground">
          {product.name}
        </h3>

        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mb-3 flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[0, 1, 2, 3].map((i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="12" height="12" className="text-accent">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
            ))}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="12" height="12" className="text-border">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
            </svg>
          </div>
          <button className="cursor-pointer text-xs text-accent underline-offset-2 transition-colors hover:underline">
            ({product.ratingCount} avaliações)
          </button>
        </div>

        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            Preço sob encomenda
          </span>
        </div>

        <div className="border-t border-border pt-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-green-900/30 py-2 text-xs font-semibold text-green-400 transition-colors hover:bg-green-800/40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            Pedir via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}