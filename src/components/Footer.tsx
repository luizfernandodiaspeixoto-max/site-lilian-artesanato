'use client';

import { useState } from 'react';
import Image from 'next/image';

const WHATSAPP_URL = 'https://wa.me/5528999057982';

export default function Footer() {
  const [freteResult, setFreteResult] = useState(false);
  const [nlName, setNlName] = useState('');
  const [nlEmail, setNlEmail] = useState('');
  const [nlPhone, setNlPhone] = useState('');
  const [nlSending, setNlSending] = useState(false);
  const [nlSuccess, setNlSuccess] = useState(false);
  const [nlError, setNlError] = useState('');

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setNlError('');
    setNlSuccess(false);
    if (nlSending) return;
    setNlSending(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nlName, email: nlEmail, phone: nlPhone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNlError(data.error || 'Erro ao cadastrar');
      } else {
        setNlSuccess(true);
        setNlName('');
        setNlEmail('');
        setNlPhone('');
      }
    } catch {
      setNlError('Erro de conexão');
    }
    setNlSending(false);
  };

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">

        {/* ── Encomenda (full width, horizontal on md) ── */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-accent/20 bg-accent/10 px-6 py-5 md:flex-row">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧶</span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Produtos Feitos por Encomenda
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Todas as peças são produzidas sob encomenda. É necessário um
                depósito de <strong>50%</strong> do valor para confirmar o pedido.
              </p>
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L0 24l6.335-1.508A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.213-3.76.895.952-3.653-.234-.374A9.818 9.818 0 1 1 12 21.818z" />
            </svg>
            (28) 99905-7982
          </a>
        </div>

        {/* ── Calcular Frete (full width) ── */}
        <div className="mb-10 rounded-2xl border border-border bg-card px-6 py-6">
          <div className="mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-accent">
              <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <h3 className="font-display text-base font-semibold text-foreground">
              Calcular Frete (Correios)
            </h3>
          </div>
          <form
            className="space-y-3"
            onSubmit={(e) => { e.preventDefault(); setFreteResult(true); }}
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">CEP de destino</label>
                <input type="text" placeholder="00000-000" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:ring-2 focus:ring-accent/40 focus:outline-none" />
              </div>
              <div className="sm:w-40">
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Peso (kg)</label>
                <input type="text" placeholder="Ex: 0.5" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:ring-2 focus:ring-accent/40 focus:outline-none" />
              </div>
              <div className="sm:self-end">
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  Calcular
                </button>
              </div>
            </div>
            {freteResult && (
              <p className="rounded-xl border border-accent/30 bg-accent/10 p-4 text-xs leading-relaxed text-muted-foreground">
                Em breve você poderá calcular o frete aqui. Enquanto isso, fale com a gente no WhatsApp para saber o valor da entrega para o seu CEP.
              </p>
            )}
          </form>
        </div>

        {/* ── Formas de Pagamento (full width) ── */}
        <div className="mb-10 rounded-2xl border border-border bg-card px-6 py-6">
          <div className="mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-accent">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <h3 className="font-display text-base font-semibold text-foreground">
              Formas de Pagamento
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-background px-4 py-3">
              <span className="mt-0.5 text-xl">⚡</span>
              <div>
                <p className="text-sm font-semibold text-foreground">PIX</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Pagamento instantâneo, sem taxas adicionais.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-background px-4 py-3">
              <span className="mt-0.5 text-xl">🏦</span>
              <div>
                <p className="text-sm font-semibold text-foreground">Transferência Bancária</p>
                <p className="mt-0.5 text-xs text-muted-foreground">TED/DOC direto para a conta, sem taxas adicionais.</p>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.998-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.502-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-amber-700">
              <strong>Cartão de crédito parcelado:</strong> compras parceladas no cartão estão sujeitas ao acréscimo das taxas da operadora de cartão. Consulte as condições via WhatsApp.
            </p>
          </div>
        </div>

        {/* ── Receber Novidades (cadastro newsletter) ── */}
        <div className="mb-10 rounded-2xl border border-accent/20 bg-accent/10 px-6 py-6">
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
            <div className="mb-4 flex flex-shrink-0 flex-col items-center md:mb-0 md:mr-8 md:items-start">
              <span className="text-3xl">✉️</span>
              <h3 className="mt-2 font-display text-base font-semibold text-foreground">
                Receba Novidades
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Cadastre-se para receber ofertas exclusivas, lançamentos e dicas de
                crochê diretamente no seu email.
              </p>
            </div>

            {nlSuccess ? (
              <div className="w-full flex-1 rounded-xl border border-green-500/20 bg-green-500/10 px-5 py-5 text-center">
                <p className="text-sm font-semibold text-green-600">
                  ✓ Cadastro realizado com sucesso!
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Você começará a receber as novidades em seu email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="w-full flex-1">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <input
                    type="text"
                    value={nlName}
                    onChange={(e) => setNlName(e.target.value)}
                    placeholder="Seu nome"
                    required
                    className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-accent"
                  />
                  <input
                    type="email"
                    value={nlEmail}
                    onChange={(e) => setNlEmail(e.target.value)}
                    placeholder="Seu email"
                    required
                    className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-accent"
                  />
                  <input
                    type="tel"
                    value={nlPhone}
                    onChange={(e) => setNlPhone(e.target.value)}
                    placeholder="Celular (00) 00000-0000"
                    className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-accent"
                  />
                </div>
                {nlError && (
                  <p className="mt-2 text-xs text-red-400">{nlError}</p>
                )}
                <button
                  type="submit"
                  disabled={nlSending}
                  className="mt-3 w-full rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-50 sm:w-auto"
                >
                  {nlSending ? 'Cadastrando...' : 'Cadastrar'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <a href="/" className="flex items-center gap-2">
            <Image src="/assets/images/app_logo.png" alt="Logo" width={32} height={32} unoptimized className="flex-shrink-0" />
            <span className="font-display text-base font-semibold text-foreground">Lilian Artesanato</span>
          </a>
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-muted-foreground">
            <a href="/" className="transition-colors hover:text-foreground">Início</a>
            <a href="/products" className="transition-colors hover:text-foreground">Catálogo</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-600 transition-colors hover:text-green-700">WhatsApp</a>
            <a href="/admin" className="transition-colors hover:text-foreground">Admin</a>
          </nav>
          <div className="flex flex-col items-center gap-1 md:items-end">
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-accent">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              São José do Calçado – ES
            </p>
            <p className="text-sm text-muted-foreground">© 2026 Lilian Artesanato</p>
          </div>
        </div>

      </div>
    </footer>
  );
}