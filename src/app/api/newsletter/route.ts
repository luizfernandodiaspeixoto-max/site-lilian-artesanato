import { NextRequest, NextResponse } from 'next/server'
import { readNewsletter, writeNewsletter, getStoreDiagnostic } from '@/lib/store'

export async function GET() {
  const list = await readNewsletter()
  const sorted = [...list].sort(
    (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  return NextResponse.json({ total: sorted.length, subscribers: sorted, _diag: getStoreDiagnostic() })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const phone = String(body.phone || '').trim()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios' },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 },
      )
    }

    const list = await readNewsletter()
    const exists = list.find(
      (s: any) => s.email.toLowerCase() === email.toLowerCase(),
    )
    if (exists) {
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 409 },
      )
    }

    const subscriber = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
    }

    list.push(subscriber)
    await writeNewsletter(list)

    return NextResponse.json({ ok: true, subscriber, _diag: getStoreDiagnostic() })
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Falha ao cadastrar', detail: String(err?.message || err) },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const list = await readNewsletter()
    const filtered = list.filter((s: any) => s.id !== body.id)

    if (filtered.length === list.length) {
      return NextResponse.json({ error: 'Cadastro não encontrado' }, { status: 404 })
    }

    await writeNewsletter(filtered)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Falha ao remover' }, { status: 500 })
  }
}