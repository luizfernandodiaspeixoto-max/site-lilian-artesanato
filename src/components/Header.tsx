'use client';

import { useState } from 'react';
import Image from 'next/image';

const WHATSAPP_URL = 'https://wa.me/5528999057982';

const NAV_CLASS =
  'text-sm text-black transition-colors hover:text-black/70';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[92%] max-w-5xl -translate-x-1/2 transition-all duration-500">
      <div className="glass-card flex items-center justify-between rounded-full py-2 px-3">
        <a href="/" className="group flex items-center gap-2">
          <div className="h-9 w-9 flex-shrink-0">
            <Image
              src="/assets/images/lilian-artesanato-logo.svg"
              alt="Lilian Artesanato logo — novelo de lã com crochê"
              width={36}
              height={36}
              unoptimized
              className="h-full w-full"
            />
          </div>
          <span className="font-display hidden text-lg font-semibold tracking-tight text-foreground sm:block">
            Lilian Artesanato
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          <a href="/" className={NAV_CLASS}>
            Início
          </a>
          <a href="/products" className={NAV_CLASS}>
            Catálogo
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${NAV_CLASS} flex items-center gap-1`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="16" height="16" className="text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
            WhatsApp
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 sm:flex"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L0 24l6.335-1.508A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.213-3.76.895.952-3.653-.234-.374A9.818 9.818 0 1 1 12 21.818z" />
            </svg>
            Fazer Pedido
          </a>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Abrir menu"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-muted md:hidden"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22" className="text-foreground">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22" className="text-foreground">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="glass-card mt-2 flex flex-col gap-1 rounded-3xl p-3 md:hidden">
          <a href="/" className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Início
          </a>
          <a href="/products" className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Catálogo
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Fazer Pedido
          </a>
        </nav>
      )}
    </header>
  );
}