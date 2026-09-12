import { NextRequest, NextResponse } from 'next/server'
import { readLogs, appendLog } from '@/lib/store'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const logEntry = {
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'local',
      userAgent: request.headers.get('user-agent') || 'unknown',
      ...body,
    }

    await appendLog(logEntry)

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Log failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '500')
    const page = searchParams.get('page')

    const allLogs = await readLogs()
    const logs = allLogs.reverse()

    let filtered = logs
    if (page) {
      filtered = logs.filter((l: any) => l.page === page)
    }

    return NextResponse.json({
      logs: filtered.slice(0, limit),
      total: filtered.length,
      totalAll: logs.length,
    })
  } catch (error) {
    return NextResponse.json({ logs: [], total: 0 }, { status: 500 })
  }
}