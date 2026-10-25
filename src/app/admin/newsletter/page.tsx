'use client'

import { useState, useEffect } from 'react'
import { useAdminAction } from '@/components/AdminContext'

interface Subscriber {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: string
}

export default function NewsletterPage() {
  const { setAction } = useAdminAction()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setAction(null)
    return () => setAction(null)
  }, [setAction])

  const fetchSubscribers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter')
      const data = await res.json()
      setSubscribers(Array.isArray(data.subscribers) ? data.subscribers : [])
      setTotal(data.total || 0)
    } catch {
      setSubscribers([])
    }
    setLoading(false)
  }

  useEffect(() => { fetchSubscribers() }, [])

  const removeSubscriber = async (id: string) => {
    try {
      await fetch('/api/newsletter', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      await fetchSubscribers()
    } catch {}
  }

  const filtered = subscribers.filter((s) => {
    const q = search.trim().toLowerCase()
    if (!q) return true
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      (s.phone || '').toLowerCase().includes(q)
    )
  })

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        dateStyle: 'short',
        timeStyle: 'short',
      })
    } catch {
      return iso
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-brand-foreground">Newsletter</h1>
          <p className="text-brand-secondary mt-1">{total} cadastrados recebendo novidades</p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome, email ou telefone..."
          className="w-full md:w-80 bg-brand-card border border-brand-border rounded-xl px-4 py-2.5 text-sm text-brand-foreground placeholder-brand-secondary/60 outline-none focus:border-brand-accent"
        />
      </div>

      {loading ? (
        <div className="rounded-2xl border border-brand-border bg-brand-card p-10 text-center text-brand-secondary text-sm">
          Carregando cadastros...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-brand-border bg-brand-card p-10 text-center text-brand-secondary text-sm">
          Nenhum cadastro encontrado.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-brand-border bg-brand-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="text-left py-3 px-4 text-brand-secondary font-medium">Nome</th>
                <th className="text-left py-3 px-4 text-brand-secondary font-medium">Email</th>
                <th className="text-left py-3 px-4 text-brand-secondary font-medium">Celular</th>
                <th className="text-left py-3 px-4 text-brand-secondary font-medium">Data do Cadastro</th>
                <th className="text-left py-3 px-4 text-brand-secondary font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-brand-border/50 hover:bg-brand-muted/30">
                  <td className="py-3 px-4 text-brand-foreground">{s.name}</td>
                  <td className="py-3 px-4 text-brand-secondary">
                    <a href={`mailto:${s.email}`} className="hover:text-brand-accent">{s.email}</a>
                  </td>
                  <td className="py-3 px-4 text-brand-secondary">{s.phone || '-'}</td>
                  <td className="py-3 px-4 text-brand-secondary text-xs">{formatDate(s.createdAt)}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => removeSubscriber(s.id)}
                      title="Remover cadastro"
                      className="text-brand-secondary hover:text-red-400 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}