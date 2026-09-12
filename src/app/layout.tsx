import type { Metadata } from 'next'
import './globals.css'
import Logger from '@/components/Logger'

export const metadata: Metadata = {
  title: 'Lilian Artesanato — Bolsas de Crochê Artesanais',
  description:
    'Bolsas de crochê feitas à mão com exclusividade e carinho. Produtos feitos por encomenda. Entre em contato pelo WhatsApp (28) 99905-7982.',
  openGraph: {
    title: 'Lilian Artesanato — Artesanal & Exclusivo',
    description:
      'Bolsas de crochê feitas à mão, cada peça única. Feito por encomenda.',
    images: ['/assets/images/app_logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Logger>{children}</Logger>
      </body>
    </html>
  )
}