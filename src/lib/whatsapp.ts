/**
 * Biblioteca de Integração com WhatsApp (Evolution API ou Z-API)
 * Permite gerenciar instâncias, gerar QR Code para leitura do celular e enviar mensagens automáticas.
 */

interface WhatsAppConfig {
  provider: 'evolution' | 'zapi';
  apiUrl: string;
  apiKey: string;
  instanceName: string;
}

function getConfig(): WhatsAppConfig {
  const provider = (process.env.WHATSAPP_PROVIDER || 'evolution') as 'evolution' | 'zapi';
  const apiUrl = process.env.EVOLUTION_API_URL || process.env.ZAPI_API_URL || 'https://api.evolution-api.com';
  const apiKey = process.env.EVOLUTION_API_KEY || process.env.ZAPI_TOKEN || '';
  const instanceName = process.env.EVOLUTION_INSTANCE || process.env.ZAPI_INSTANCE || 'lilian-artesanato';

  return { provider, apiUrl, apiKey, instanceName };
}

export async function getWhatsAppStatus() {
  const config = getConfig();

  if (config.provider === 'evolution') {
    try {
      const res = await fetch(`${config.apiUrl}/instance/connectionState/${config.instanceName}`, {
        headers: {
          'apikey': config.apiKey,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        return { connected: false, state: 'DISCONNECTED', qrCode: null };
      }
      const data = await res.json();
      const state = data.instance?.state || data.state || 'DISCONNECTED';
      const connected = state === 'open' || state === 'CONNECTED';
      return { connected, state, qrCode: null };
    } catch (e) {
      return { connected: false, state: 'ERROR', error: String(e), qrCode: null };
    }
  } else {
    // Z-API
    try {
      const res = await fetch(`https://api.z-api.io/instances/${config.instanceName}/token/${config.apiKey}/status`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) return { connected: false, state: 'DISCONNECTED', qrCode: null };
      const data = await res.json();
      return { connected: data.connected || false, state: data.connected ? 'CONNECTED' : 'DISCONNECTED', qrCode: null };
    } catch (e) {
      return { connected: false, state: 'ERROR', error: String(e), qrCode: null };
    }
  }
}

export async function getWhatsAppQRCode() {
  const config = getConfig();

  if (config.provider === 'evolution') {
    try {
      // Tentar conectar / obter QR code na Evolution API
      const res = await fetch(`${config.apiUrl}/instance/connect/${config.instanceName}`, {
        headers: {
          'apikey': config.apiKey,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        // Se a instância não existir, criá-la primeiro
        const createRes = await fetch(`${config.apiUrl}/instance/create`, {
          method: 'POST',
          headers: {
            'apikey': config.apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            instanceName: config.instanceName,
            qrcode: true,
            integration: 'WHATSAPP-BAILEYS'
          })
        });
        if (createRes.ok) {
          const createData = await createRes.json();
          return {
            qrCode: createData.qrcode?.base64 || createData.base64 || null,
            pairingCode: createData.pairingCode || null,
            message: 'Instância criada com sucesso. Escaneie o QR Code.'
          };
        }
        return { qrCode: null, message: 'Erro ao conectar ou criar instância na Evolution API.' };
      }

      const data = await res.json();
      return {
        qrCode: data.base64 || data.qrcode?.base64 || data.code || null,
        pairingCode: data.pairingCode || null,
        message: 'QR Code obtido com sucesso.'
      };
    } catch (e) {
      return { qrCode: null, message: String(e) };
    }
  } else {
    // Z-API - QR Code
    try {
      const res = await fetch(`https://api.z-api.io/instances/${config.instanceName}/token/${config.apiKey}/qr-code/image`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) return { qrCode: null, message: 'Erro ao obter QR Code da Z-API' };
      const data = await res.json();
      return { qrCode: data.value || data.image || null, message: 'QR Code Z-API obtido.' };
    } catch (e) {
      return { qrCode: null, message: String(e) };
    }
  }
}

export async function sendWhatsAppMessage(phone: string, text: string) {
  const config = getConfig();
  // Limpar telefone (apenas números)
  const cleanPhone = phone.replace(/\D/g, '');

  if (config.provider === 'evolution') {
    try {
      const res = await fetch(`${config.apiUrl}/message/sendText/${config.instanceName}`, {
        method: 'POST',
        headers: {
          'apikey': config.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: cleanPhone,
          textMessage: {
            text
          }
        })
      });
      return await res.json();
    } catch (e) {
      console.error('Erro ao enviar mensagem Evolution API:', e);
      return { success: false, error: String(e) };
    }
  } else {
    // Z-API
    try {
      const res = await fetch(`https://api.z-api.io/instances/${config.instanceName}/token/${config.apiKey}/send-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanPhone,
          message: text
        })
      });
      return await res.json();
    } catch (e) {
      console.error('Erro ao enviar mensagem Z-API:', e);
      return { success: false, error: String(e) };
    }
  }
}
