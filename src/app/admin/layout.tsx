import type { Metadata } from 'next'
import { AdminProvider } from '@/components/AdminContext'
import AdminNav from '@/components/AdminNav'

export const metadata: Metadata = {
  title: 'Lilian Artesanato — Área Administrativa',
  description: 'Painel administrativo do Lilian Artesanato',
  openGraph: {
    title: 'Lilian Artesanato — Admin',
    description: 'Painel administrativo do Lilian Artesanato',
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminNav />
      {children}
    </AdminProvider>
  )
}