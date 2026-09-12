import { NextRequest, NextResponse } from 'next/server'
import { readLogs } from '@/lib/store'

const EMPTY = {
  totalVisits: 0,
  uniqueVisitors: 0,
  todayVisits: 0,
  todayUnique: 0,
  weekVisits: [],
  byPage: [],
}

function spDay(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function last7Days(): string[] {
  const days: string[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(spDay(d))
  }
  return days
}

export async function GET(request: NextRequest) {
  try {
    const entries = await readLogs()

    const views = entries.filter((e: any) => e.action === 'page_view')

    const totalVisits = views.length
    const uniqueVisitors = new Set(views.map((v: any) => v.ip)).size

    const today = spDay(new Date())
    const todayViews = views.filter((v: any) => spDay(new Date(v.timestamp)) === today)
    const todayVisits = todayViews.length
    const todayUnique = new Set(todayViews.map((v: any) => v.ip)).size

    const weekVisits = last7Days().map((day) => ({
      date: day,
      visits: views.filter((v: any) => spDay(new Date(v.timestamp)) === day).length,
    }))

    const byPageMap: Record<string, number> = {}
    views.forEach((v: any) => {
      const page = v.page || '/'
      byPageMap[page] = (byPageMap[page] || 0) + 1
    })

    const byPage = Object.entries(byPageMap)
      .map(([page, visits]) => ({ page, visits }))
      .sort((a, b) => b.visits - a.visits)

    return NextResponse.json({
      totalVisits,
      uniqueVisitors,
      todayVisits,
      todayUnique,
      weekVisits,
      byPage,
    })
  } catch (error) {
    return NextResponse.json(EMPTY, { status: 500 })
  }
}