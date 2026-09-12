'use client'

import { useState, useCallback, useEffect } from 'react'
import { useAdminAction } from '@/components/AdminContext'

interface Order {
  id: string
  customer: string
  date: string
  tracking?: string
  total: number
  status: string
}

const STATUSES = ['Novo', 'Confirmado', 'Em Produção', 'Enviado', 'Entregue', 'Cancelado']

const STATUS_STYLES: Record<string, string> = {
  Novo: 'bg-blue-100 text-blue-800',
  Confirmado: 'bg-yellow-100 text-yellow-800',
  'Em Produção': 'bg-purple-100 text-purple-800',
  Enviado: 'bg-green-100 text-green-800',
  Entregue: 'bg-emerald-100 text-emerald-800',
  Cancelado: 'bg-red-100 text-red-800',
}

export default function OrdersPage() {
  const { setAction } = useAdminAction()
  const [orders, setOrders] = useState<Order[]>([])
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [customer, setCustomer] = useState('')
  const [total, setTotal] = useState('')
  const [tracking, setTracking] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setAction(
      <button
        onClick={() => setShowForm((v) => !v)}
        className="bg-brand-accent text-white rounded-lg px-3.5 py-1.5 text-xs font-semibold hover:opacity-90"
      >
        {showForm ? 'Fechar' : '+ Novo Pedido'}
      </button>,
    )
    return () => setAction(null)
  }, [setAction, showForm])

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(Array.isArray(data.orders) ? data.orders : [])
    } catch {
      setOrders([])
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  const counts: Record<string, number> = {}
  STATUSES.forEach((s) => { counts[s] = orders.filter((o) => o.status === s).length })

  const filtered = orders
    .filter((o) => (statusFilter ? o.status === statusFilter : true))
    .filter((o) => {
      const q = search.trim().toLowerCase()
      if (!q) return true
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q)
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

  const formatMoney = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const handleNewOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customer.trim() || saving) return
    setSaving(true)
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: customer.trim(),
          total: parseFloat(total.replace(',', '.')) || 0,
          tracking: tracking.trim(),
        }),
      })
      setCustomer('')
      setTotal('')
      setTracking('')
      setShowForm(false)
      await fetchOrders()
    } finally {
      setSaving(false)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
    } catch {}
  }

  return (
    <>
      {showForm && (
        <form
          onSubmit={handleNewOrder}
          className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-brand-border bg-brand-card p-6 md:grid-cols-4"
        >
          <div>
            <label className="mb-1 block text-xs text-brand-secondary">Cliente</label>
            <input
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="Nome do cliente"
              required
              className="w-full bg-brand-muted border border-brand-border rounded-lg px-3 py-2 text-sm text-brand-foreground outline-none focus:border-brand-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-brand-secondary">Valor (R$)</label>
            <input
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="189,00"
              inputMode="decimal"
              className="w-full bg-brand-muted border border-brand-border rounded-lg px-3 py-2 text-sm text-brand-foreground outline-none focus:border-brand-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-brand-secondary">Código de rastreio</label>
            <input
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="BR123456789BR"
              className="w-full bg-brand-muted border border-brand-border rounded-lg px-3 py-2 text-sm text-brand-foreground outline-none focus:border-brand-accent"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-brand-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {saving ? 'Criando...' : 'Criar Pedido'}
            </button>
          </div>
        </form>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setStatusFilter('')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            statusFilter === ''
              ? 'bg-brand-accent text-white'
              : 'bg-brand-muted text-brand-secondary hover:text-brand-foreground'
          }`}
        >
          Todos ({orders.length})
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(statusFilter === s ? '' : s)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              statusFilter === s
                ? 'bg-brand-accent text-white'
                : 'bg-brand-muted text-brand-secondary hover:text-brand-foreground'
            }`}
          >
            {s} ({counts[s]})
          </button>
        ))}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por número do pedido ou cliente..."
          className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-2.5 text-sm text-brand-foreground placeholder-brand-secondary/60 outline-none focus:border-brand-accent"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-2.5 text-sm text-brand-foreground outline-none focus:border-brand-accent"
        >
          <option value="">Todos os status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-brand-border bg-brand-card p-10 text-center text-brand-secondary text-sm">
          Carregando pedidos...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-brand-border bg-brand-card p-10 text-center text-brand-secondary text-sm">
          Nenhum pedido encontrado.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((o) => (
            <div
              key={o.id}
              className="rounded-2xl border border-brand-border bg-brand-card p-5 transition-colors hover:border-brand-accent/40"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-bold text-brand-accent">
                      {o.id}
                    </span>
                    <span className="text-brand-foreground font-medium">
                      {o.customer}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-secondary">
                    <span>{formatDate(o.date)}</span>
                    {o.tracking && (
                      <span className="flex items-center gap-1">
                        <span>📦</span>
                        <span className="font-mono">{o.tracking}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-lg font-bold tabular-nums text-brand-foreground">
                    {formatMoney(o.total)}
                  </span>
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none cursor-pointer focus:ring-2 focus:ring-brand-accent/40 ${
                      STATUS_STYLES[o.status] || STATUS_STYLES.Novo
                    }`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}