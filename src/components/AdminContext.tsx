'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface AdminCtx {
  setAction: (node: ReactNode | null) => void
}

const Ctx = createContext<AdminCtx>({ setAction: () => {} })

export function useAdminAction() {
  return useContext(Ctx)
}

const SECTION_LABELS: Record<string, string> = {
  orders: 'Gestão de Pedidos',
  logs: 'Logs de Acesso',
  visitas: 'Contador de Visitas',
  newsletter: 'Newsletter',
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [action, setAction] = useState<ReactNode | null>(null)
  const pathname = usePathname()
  const section = pathname.split('/admin/')[1]?.split('/')[0] || 'orders'
  const label = SECTION_LABELS[section] || 'Admin'

  return (
    <Ctx.Provider value={{ setAction }}>
      <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-background/95 backdrop-blur supports-[backdrop-filter]:bg-brand-background/80">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <a href="/" className="text-brand-accent font-semibold text-sm hover:underline">Loja</a>
            <span className="text-brand-border">/</span>
            <span className="text-sm font-medium text-brand-foreground">{label}</span>
          </div>

          <div className="flex items-center gap-3">
            {action && <div>{action}</div>}
            <a
              href="/"
              title="Sair da área administrativa"
              className="flex items-center gap-1.5 rounded-lg border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-secondary transition-colors hover:border-brand-accent hover:text-brand-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>
              Sair
            </a>
          </div>
        </div>
      </header>
      <div className="min-h-[calc(100vh-56px)] bg-brand-background text-brand-foreground">
        <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
      </div>
    </Ctx.Provider>
  )
}