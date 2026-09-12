'use client'

import { usePathname } from 'next/navigation'

const ITEMS = [
  { href: '/admin/orders', label: 'Pedidos' },
  { href: '/admin/visitas', label: 'Visitas' },
  { href: '/admin/logs', label: 'Logs' },
  { href: '/admin/newsletter', label: 'Newsletter' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2">
      {ITEMS.map((item) => {
        const active = pathname === item.href
        return (
          <a
            key={item.href}
            href={item.href}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? 'bg-brand-accent text-white'
                : 'bg-brand-muted text-brand-secondary hover:bg-brand-muted/60 hover:text-brand-foreground'
            }`}
          >
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}