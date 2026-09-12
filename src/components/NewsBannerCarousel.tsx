'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { newsBanners } from '@/lib/newsBanners'

const INTERVAL = 6000

export default function NewsBannerCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = newsBanners.length

  const go = useCallback(
    (dir: number) => setCurrent((prev) => (prev + dir + total) % total),
    [total],
  )

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => go(1), INTERVAL)
    return () => clearInterval(timer)
  }, [paused, go])

  const banner = newsBanners[current]

  return (
    <section
      className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-white/5 bg-brand-card shadow-warm-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex flex-col md:flex-row">
        {/* Imagem */}
        <div className="relative h-52 w-full flex-shrink-0 overflow-hidden md:h-64 md:w-1/2 lg:h-72">
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover bg-brand-muted transition-opacity duration-500"
            key={banner.id}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-card md:bg-gradient-to-l md:from-brand-card md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent md:hidden" />

          <span className="absolute left-4 top-4 rounded-full bg-brand-accent/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            Notícias Crochê
          </span>
        </div>

        {/* Conteúdo */}
        <div className="relative flex flex-1 flex-col justify-center p-5 sm:p-6 md:p-8">
          <h3 className="font-display text-lg font-semibold leading-snug text-brand-foreground sm:text-xl lg:text-2xl">
            {banner.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-brand-secondary sm:text-base">
            {banner.excerpt}
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={banner.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent transition-colors hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3.5 w-3.5"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              Fonte: {banner.source}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>

            {/* Navegação */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => go(-1)}
                aria-label="Banner anterior"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-brand-muted text-brand-secondary transition-colors hover:border-brand-accent hover:text-brand-accent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <div className="flex items-center gap-1.5">
                {newsBanners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Ir para banner ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === current
                        ? 'w-5 bg-brand-accent'
                        : 'w-1.5 bg-brand-border hover:bg-brand-secondary'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => go(1)}
                aria-label="Próximo banner"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-brand-muted text-brand-secondary transition-colors hover:border-brand-accent hover:text-brand-accent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}