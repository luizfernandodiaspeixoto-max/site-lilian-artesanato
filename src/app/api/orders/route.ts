import { NextRequest, NextResponse } from 'next/server'
import { readOrders, writeOrders } from '@/lib/store'

const STATUSES = ['Novo', 'Confirmado', 'Em Produção', 'Enviado', 'Entregue', 'Cancelado']

function generateId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return `LIL-${code}`
}

export async function GET() {
  const orders = await readOrders()
  const sorted = [...orders].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
  return NextResponse.json({ orders: sorted })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const customer = String(body.customer || '').trim()
    const total = Number(body.total)

    if (!customer) {
      return NextResponse.json({ error: 'Cliente é obrigatório' }, { status: 400 })
    }

    const order = {
      id: generateId(),
      customer,
      date: new Date().toISOString(),
      tracking: body.tracking ? String(body.tracking).trim() : '',
      total: isNaN(total) || total <= 0 ? 0 : total,
      status: STATUSES.includes(body.status) ? body.status : 'Novo',
    }

    const orders = await readOrders()
    orders.push(order)
    await writeOrders(orders)

    return NextResponse.json({ ok: true, order })
  } catch {
    return NextResponse.json({ error: 'Falha ao criar pedido' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const orders = await readOrders()
    const order = orders.find((o: any) => o.id === body.id)

    if (!order) {
      return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 })
    }

    if (body.status && STATUSES.includes(body.status)) {
      order.status = body.status
    }
    if (body.tracking !== undefined) {
      order.tracking = String(body.tracking).trim()
    }

    await writeOrders(orders)
    return NextResponse.json({ ok: true, order })
  } catch {
    return NextResponse.json({ error: 'Falha ao atualizar pedido' }, { status: 500 })
  }
}