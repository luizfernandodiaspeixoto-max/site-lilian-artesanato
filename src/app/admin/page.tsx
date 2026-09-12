import Link from 'next/link'

const SECTIONS = [
  {
    href: '/admin/orders',
    label: 'Pedidos',
    description: 'Crie e gerencie pedidos recebidos, status e rastreio',
  },
  {
    href: '/admin/visitas',
    label: 'Visitas',
    description: 'Acompanhe o contador de visitas e visitantes únicos',
  },
  {
    href: '/admin/newsletter',
    label: 'Newsletter',
    description: 'Veja os inscritos da newsletter e gerencie o cadastro',
  },
  {
    href: '/admin/logs',
    label: 'Logs',
    description: 'Visualize os eventos capturados no site',
  },
]

export const metadata = {
  title: 'Lilian Artesanato — Dashboard',
  description: 'Área administrativa do Lilian Artesanato',
}

export default function AdminPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-brand-foreground">Dashboard</h1>
      <p className="mb-6 text-sm text-brand-secondary">Escolha uma seção para gerenciar.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group rounded-2xl border border-brand-border bg-brand-card p-5 transition-colors hover:border-brand-accent"
          >
            <h2 className="mb-1 text-lg font-semibold text-brand-foreground group-hover:text-brand-accent">
              {section.label}
            </h2>
            <p className="text-sm text-brand-secondary">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}