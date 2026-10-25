'use client'

import { useState, useEffect } from 'react'

interface LogEntry {
  timestamp: string
  action: string
  page?: string
  ip?: string
  userAgent?: string
  href?: string
  text?: string
  duration_seconds?: number
  referrer?: string
  viewport?: string
  screen?: string
  lang?: string
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const url = filter ? `/api/log?limit=500&page=${filter}` : '/api/log?limit=500'
      const res = await fetch(url)
      const data = await res.json()
      setLogs(data.logs || [])
      setTotal(data.totalAll || 0)
    } catch { setLogs([]) }
    setLoading(false)
  }

  useEffect(() => { fetchLogs() }, [filter])

  const formatTime = (ts: string) => {
    try {
      return new Date(ts).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    } catch { return ts }
  }

  const actionIcon = (action: string) => {
    switch (action) {
      case 'page_view': return '👁️'
      case 'page_leave': return '🚪'
      case 'link_click': return '🔗'
      case 'button_click': return '🔘'
      default: return '📌'
    }
  }

  const actionColor = (action: string) => {
    switch (action) {
      case 'page_view': return 'bg-blue-100 text-blue-800'
      case 'page_leave': return 'bg-gray-100 text-gray-800'
      case 'link_click': return 'bg-green-100 text-green-800'
      case 'button_click': return 'bg-purple-100 text-purple-800'
      default: return 'bg-orange-100 text-orange-800'
    }
  }

  const uniquePages = Array.from(new Set(logs.map(l => l.page).filter(Boolean))).sort() as string[]

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-brand-secondary text-sm">{total} registros totais</p>
      </div>
      <div className="flex gap-3">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="bg-brand-muted text-brand-foreground border border-brand-border rounded-lg px-4 py-2 text-sm"
        >
          <option value="">Todas as páginas</option>
          {uniquePages.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button
          onClick={fetchLogs}
          className="bg-brand-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
        >
          Atualizar
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-brand-secondary w-full">Carregando...</div>
      ) : logs.length === 0 ? (
        <div className="text-center py-20 text-brand-secondary w-full">Nenhum log encontrado</div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="text-left py-3 px-4 text-brand-secondary font-medium">Data/Hora</th>
                <th className="text-left py-3 px-4 text-brand-secondary font-medium">Ação</th>
                <th className="text-left py-3 px-4 text-brand-secondary font-medium">Página</th>
                <th className="text-left py-3 px-4 text-brand-secondary font-medium">Detalhes</th>
                <th className="text-left py-3 px-4 text-brand-secondary font-medium">Duração</th>
                <th className="text-left py-3 px-4 text-brand-secondary font-medium">IP</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i} className="border-b border-brand-border/50 hover:bg-brand-muted/30">
                  <td className="py-3 px-4 whitespace-nowrap text-brand-secondary text-xs">
                    {formatTime(log.timestamp)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${actionColor(log.action)}`}>
                      {actionIcon(log.action)} {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-brand-foreground text-xs">{log.page || '-'}</td>
                  <td className="py-3 px-4 text-brand-secondary text-xs max-w-xs truncate">
                    {log.href && <span className="text-blue-400">{log.href}</span>}
                    {log.text && !log.href && <span>{log.text}</span>}
                    {log.referrer && <span className="text-gray-500 ml-2">via {log.referrer}</span>}
                  </td>
                  <td className="py-3 px-4 text-brand-secondary text-xs">
                    {log.duration_seconds ? `${log.duration_seconds}s` : '-'}
                  </td>
                  <td className="py-3 px-4 text-brand-secondary text-xs">{log.ip || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}