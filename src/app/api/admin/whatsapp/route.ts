import { NextResponse } from 'next/server'
import { getWhatsAppStatus, getWhatsAppQRCode, sendWhatsAppMessage } from '@/lib/whatsapp'
import { readWhatsAppSettings, writeWhatsAppSettings } from '@/lib/store'

export async function GET() {
  try {
    const status = await getWhatsAppStatus()
    const settings = await readWhatsAppSettings()
    let qrData = { qrCode: null, message: '' }

    if (!status.connected) {
      qrData = await getWhatsAppQRCode()
    }

    return NextResponse.json({
      success: true,
      status,
      settings,
      ...qrData
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, phone, message, enabled } = body

    if (action === 'toggle') {
      const settings = await readWhatsAppSettings()
      settings.enabled = !!enabled
      await writeWhatsAppSettings(settings)
      return NextResponse.json({ success: true, settings })
    }

    if (action === 'connect') {
      const qrData = await getWhatsAppQRCode()
      const status = await getWhatsAppStatus()
      const settings = await readWhatsAppSettings()
      return NextResponse.json({ success: true, status, settings, ...qrData })
    }

    if (action === 'send') {
      if (!phone || !message) {
        return NextResponse.json({ success: false, error: 'Telefone e mensagem são obrigatórios' }, { status: 400 })
      }
      const result = await sendWhatsAppMessage(phone, message)
      return NextResponse.json({ success: true, result })
    }

    return NextResponse.json({ success: false, error: 'Ação inválida' }, { status: 400 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
