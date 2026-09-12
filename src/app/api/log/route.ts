import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const LOGS_DIR = path.join(process.cwd(), 'data', 'logs')
const LOGS_FILE = path.join(LOGS_DIR, 'access.log')

function ensureLogsDir() {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true })
  }
}

export async function POST(request: NextRequest) {
  try {
    ensureLogsDir()
    const body = await request.json()

    const logEntry = {
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'local',
      userAgent: request.headers.get('user-agent') || 'unknown',
      ...body,
    }

    const logLine = JSON.stringify(logEntry) + '\n'
    fs.appendFileSync(LOGS_FILE, logLine, 'utf8')

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Log failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    ensureLogsDir()
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '500')
    const page = searchParams.get('page')

    if (!fs.existsSync(LOGS_FILE)) {
      return NextResponse.json({ logs: [], total: 0 })
    }

    const content = fs.readFileSync(LOGS_FILE, 'utf8')
    const lines = content.trim().split('\n').filter(Boolean)
    const logs = lines.map(line => {
      try { return JSON.parse(line) } catch { return null }
    }).filter(Boolean).reverse()

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
