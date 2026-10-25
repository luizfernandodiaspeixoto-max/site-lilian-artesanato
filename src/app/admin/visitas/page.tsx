'use client'

import { useState, useEffect } from 'react'

interface WeekDay {
  date: string
  visits: number
}

interface PageStat {
  page: string
  visits: number
}

interface VisitsData {
  totalVisits: number
  uniqueVisitors: number
  todayVisits: number
  todayUnique: number
  weekVisits: WeekDay[]
  byPage: PageStat[]
}

const EMPTY: VisitsData = {
  totalVisits: 0,
  uniqueVisitors: 0,
  todayVisits: 0,
  todayUnique: 0,
  weekVisits: [],
  byPage: [],
}

export default function VisitasPage() {
  const [data, setData] = useState<VisitsData>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchVisits = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/visitas')
      const json = await res.json()
      setData(json)
      setError(false)
    } catch {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => { fetchVisits() }, [])

  const maxWeek = Math.max(1, ...data.weekVisits.map((d) => d.visits))
  const maxPage = Math.max(1, ...data.byPage.map((p) => p.visits))

  const formatDay = (date: string) => {
    try {
      const [y, m, d] = date.split('-')
      return `${d}/${m}`
    } catch {
      return date
    }
  }

  const stats = [
    { label: 'Total de Visitas', value: data.totalVisits, icon: '👁️', accent: 'text-blue-400' },
    { label: 'Visitantes Únicos', value: data.uniqueVisitors, icon: '👥', accent: 'text-green-400' },
    { label: 'Visitas Hoje', value: data.todayVisits, icon: '📅', accent: 'text-amber-400' },
    { label: 'Únicos Hoje', value: data.todayUnique, icon: '🔆', accent: 'text-purple-400' },
  ]

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-serif text-brand-foreground">Contador de Visitas</h1>
            <p className="text-brand-secondary mt-1">Resumo das visitas registradas no site</p>
          </div>
          <div className="flex items-center gap-3">
            {!loading && (
              <span className="text-xs text-brand-secondary/70">
                Última atualização: {new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
              </span>
            )}
            <button
              onClick={fetchVisits}
              className="bg-brand-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
            >
              Atualizar
            </button>
          </div>
        </div>

{loading ? (
          <div className="text-center py-20 text-brand-secondary">Carregando...</div>
        ) : error ? (
          <div className="text-center py-20 text-brand-secondary">
            Não foi possível carregar as visitas.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-brand-border bg-brand-card p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{s.icon}</span>
                  </div>
                  <p className={`mt-3 text-3xl font-bold tabular-nums ${s.accent}`}>
                    {s.value.toLocaleString('pt-BR')}
                  </p>
                  <p className="mt-1 text-sm text-brand-secondary">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-brand-border bg-brand-card p-6 mb-8">
              <h2 className="text-lg font-semibold text-brand-foreground mb-6">Últimos 7 dias</h2>
              <div className="flex items-end justify-between gap-2 h-44">
                {data.weekVisits.length === 0 ? (
                  <p className="text-brand-secondary text-sm">Nenhuma visita registrada.</p>
                ) : (
                  data.weekVisits.map((day) => (
                    <div key={day.date} className="flex flex-col items-center gap-2 flex-1">
                      <span className="text-[10px] text-brand-secondary tabular-nums">{day.visits}</span>
                      <div
                        className="w-full max-w-14 rounded-t-lg bg-brand-accent transition-all"
                        style={{ height: `${Math.round((day.visits / maxWeek) * 100)}px` }}
                      />
                      <span className="text-xs text-brand-secondary">{formatDay(day.date)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-brand-border bg-brand-card p-6">
              <h2 className="text-lg font-semibold text-brand-foreground mb-6">Páginas mais visitadas</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-brand-border">
                      <th className="text-left py-3 px-4 text-brand-secondary font-medium">Página</th>
                      <th className="text-left py-3 px-4 text-brand-secondary font-medium">Visitas</th>
                      <th className="text-left py-3 px-4 text-brand-secondary font-medium w-1/2">Participação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.byPage.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-10 text-center text-brand-secondary">
                          Nenhuma visita registrada ainda.
                        </td>
                      </tr>
                    ) : (
                      data.byPage.map((p) => (
                        <tr key={p.page} className="border-b border-brand-border/50 hover:bg-brand-muted/30">
                          <td className="py-3 px-4 text-brand-foreground">{p.page || '/'}</td>
                          <td className="py-3 px-4 text-brand-secondary tabular-nums">{p.visits}</td>
                          <td className="py-3 px-4">
                            <div className="h-2 w-full rounded-full bg-brand-muted overflow-hidden">
                              <div
                                className="h-full rounded-full bg-brand-accent"
                                style={{ width: `${Math.round((p.visits / maxPage) * 100)}%` }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
    </>
  )
}