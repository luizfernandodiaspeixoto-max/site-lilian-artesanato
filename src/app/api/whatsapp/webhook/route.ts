import { NextResponse } from 'next/server'
import { sendWhatsAppMessage } from '@/lib/whatsapp'
import { readWhatsAppSettings } from '@/lib/store'

export async function POST(request: Request) {
  try {
    // Verificar se o chat bot está ativado na administração
    const settings = await readWhatsAppSettings()
    if (settings && settings.enabled === false) {
      return NextResponse.json({ success: true, status: 'disabled by admin' })
    }

    const body = await request.json()

    let senderPhone = ''
    let messageText = ''

    if (body.data && body.data.key) {
      // Evolution API Webhook
      if (body.data.key.fromMe) {
        return NextResponse.json({ success: true, ignored: 'message from me' })
      }
      senderPhone = body.data.key.remoteJid?.replace('@s.whatsapp.net', '') || ''
      messageText = (body.data.message?.conversation || body.data.message?.extendedTextMessage?.text || '').trim().toLowerCase()
    } else if (body.phone) {
      // Z-API Webhook
      if (body.fromMe) {
        return NextResponse.json({ success: true, ignored: 'message from me' })
      }
      senderPhone = body.phone
      messageText = (body.text?.message || body.message || '').trim().toLowerCase()
    }

    if (!senderPhone) {
      return NextResponse.json({ success: true, received: true })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lilianartesanato.com'
    const grupoUrl = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || 'https://chat.whatsapp.com/lilian-artesanato-grupo'

    let replyText = ''

    // Verificando opções do menu ou palavras-chave
    if (messageText === '1' || messageText.includes('site') || messageText.includes('acessar')) {
      replyText = `🌐 *Site Oficial — Lilian Artesanato*\n\nAcesse nosso site para conferir todas as bolsas, acessórios e peças artesanais exclusivas:\n${siteUrl}\n\nTem interesse em alguma peça específica? Me avise por aqui!`
    } 
    else if (messageText === '2' || messageText.includes('pedido') || messageText.includes('comprar') || messageText.includes('realizar pedido')) {
      replyText = `🛍️ *Como Realizar seu Pedido na Lilian Artesanato*:\n\n1. Escolha suas peças favoritas em nosso site: ${siteUrl}\n2. Me envie aqui no WhatsApp o *nome da peça* ou a *foto/print*.\n3. Combinamos os detalhes do pagamento e o envio para você!\n\nO que você deseja encomendar hoje?`
    } 
    else if (messageText === '3' || messageText.includes('grupo') || messageText.includes('grupos') || messageText.includes('vip')) {
      replyText = `👥 *Grupo VIP do WhatsApp — Lilian Artesanato*\n\nEntre no nosso grupo exclusivo para receber novidades, lançamentos e promoções em primeira mão:\n${grupoUrl}\n\nSerá um prazer ter você no grupo!`
    } 
    else if (messageText === '4' || messageText.includes('fale conosco') || messageText.includes('falar') || messageText.includes('atendimento') || messageText.includes('dúvida')) {
      replyText = `💬 *Fale Conosco — Atendimento com a Lilian*\n\nSua mensagem foi registrada! A Lilian ou nossa equipe já vai te responder por aqui.`
    } 
    else {
      // Menu Principal padrão
      replyText = `Olá! Seja muito bem-vindo(a) à *Lilian Artesanato* 🧶✨\n\nComo podemos te ajudar hoje? Escolha uma opção abaixo:\n\n1️⃣ 🌐 *Acessar o Site Oficial*\n2️⃣ 🛍️ *Realizar Pedido / Ver Catálogo*\n3️⃣ 👥 *Entrar no Grupo do WhatsApp*\n4️⃣ 💬 *Fale Conosco (Atendimento Direto)*\n\n*(Responda com o número da opção desejada ou digite sua dúvida!)*`
    }

    // Enviar resposta automática
    await sendWhatsAppMessage(senderPhone, replyText)

    return NextResponse.json({ success: true, replied: true })
  } catch (error) {
    console.error('Erro no webhook do WhatsApp:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ success: true, message: 'WhatsApp Webhook Menu Endpoint Active' })
}
