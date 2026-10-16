'use client'

import { useState, useEffect } from 'react'

export default function WhatsAppAdminPage() {
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState(false)
  const [statusData, setStatusData] = useState<any>(null)
  const [enabled, setEnabled] = useState(true)
  const [toggling, setToggling] = useState(false)
  const [testPhone, setTestPhone] = useState('')
  const [testMsg, setTestMsg] = useState('Olá! Teste de integração do WhatsApp - Lilian Artesanato 🧶')
  const [testResult, setTestResult] = useState<any>(null)

  const fetchStatus = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/whatsapp')
      const data = await res.json()
      setStatusData(data)
      if (data.settings && typeof data.settings.enabled === 'boolean') {
        setEnabled(data.settings.enabled)
      }
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  const handleToggleChat = async (newVal: boolean) => {
    setToggling(true)
    try {
      const res = await fetch('/api/admin/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle', enabled: newVal })
      })
      const data = await res.json()
      if (data.success && data.settings) {
        setEnabled(data.settings.enabled)
      }
    } catch (e) {
      console.error(e)
    }
    setToggling(false)
  }

  const handleConnect = async () => {
    setConnecting(true)
    try {
      const res = await fetch('/api/admin/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'connect' })
      })
      const data = await res.json()
      setStatusData(data)
      if (data.settings && typeof data.settings.enabled === 'boolean') {
        setEnabled(data.settings.enabled)
      }
    } catch (e) {
      console.error(e)
    }
    setConnecting(false)
  }

  const handleSendTest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!testPhone || !testMsg) return
    setTestResult({ loading: true })
    try {
      const res = await fetch('/api/admin/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', phone: testPhone, message: testMsg })
      })
      const data = await res.json()
      setTestResult({ success: true, data })
    } catch (err) {
      setTestResult({ success: false, error: String(err) })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-brand-foreground">WhatsApp da Lilian</h1>
          <p className="text-brand-secondary mt-1">Conecte via Evolution API / Z-API e gerencie o atendimento automático</p>
        </div>
        <button
          onClick={fetchStatus}
          className="bg-brand-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
        >
          Atualizar Status
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-brand-secondary">Carregando painel do WhatsApp...</div>
      ) : (
        <div className="space-y-6">
          {/* Card de Ativação / Desativação do Chat Bot */}
          <div className="rounded-2xl border border-brand-border bg-brand-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-brand-foreground flex items-center gap-2">
                <span>🤖</span> Atendimento Automático (Chat Bot)
              </h2>
              <p className="text-sm text-brand-secondary mt-0.5">
                Quando ativado, o WhatsApp responde automaticamente com o menu de opções (Site, Pedido, Grupos, Fale Conosco).
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${enabled ? 'text-green-600 dark:text-green-400' : 'text-brand-secondary'}`}>
                {enabled ? 'ATIVADO ✅' : 'DESATIVADO ❌'}
              </span>
              <button
                type="button"
                disabled={toggling}
                onClick={() => handleToggleChat(!enabled)}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  enabled ? 'bg-green-600' : 'bg-brand-border'
                } disabled:opacity-50`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    enabled ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Card de Status e QR Code */}
          <div className="rounded-2xl border border-brand-border bg-brand-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-brand-foreground flex items-center gap-2">
                <span>📱</span> Status da Conexão
              </h2>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                statusData?.status?.connected
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
              }`}>
                {statusData?.status?.connected ? 'CONECTADO ✅' : 'DESCONECTADO ⚠️'}
              </span>
            </div>

            <p className="text-sm text-brand-secondary mb-6">
              Estado atual na API: <code className="bg-brand-muted px-2 py-1 rounded">{statusData?.status?.state || 'UNKNOWN'}</code>
            </p>

            {!statusData?.status?.connected && (
              <div className="border-t border-brand-border pt-6 text-center">
                <h3 className="text-lg font-medium text-brand-foreground mb-2">Leitura do QR Code pelo Celular</h3>
                <p className="text-sm text-brand-secondary mb-4">
                  Abra o WhatsApp no celular da Lilian, vá em <strong>Configurações &gt; Aparelhos Conectados &gt; Conectar Aparelho</strong> e aponte a câmera para o QR Code abaixo:
                </p>

                {statusData?.qrCode ? (
                  <div className="inline-block p-4 bg-white rounded-2xl shadow-md mb-4">
                    <img
                      src={statusData.qrCode.startsWith('data:') ? statusData.qrCode : `data:image/png;base64,${statusData.qrCode}`}
                      alt="WhatsApp QR Code"
                      className="w-64 h-64 object-contain mx-auto"
                    />
                  </div>
                ) : (
                  <div className="p-8 bg-brand-muted/30 rounded-xl mb-4 text-brand-secondary">
                    {statusData?.message || 'Clique no botão abaixo para gerar o QR Code da Evolution API / Z-API.'}
                  </div>
                )}

                <div>
                  <button
                    onClick={handleConnect}
                    disabled={connecting}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {connecting ? 'Gerando QR Code...' : 'Gerar / Atualizar QR Code'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Card de Configuração de Links */}
          <div className="rounded-2xl border border-brand-border bg-brand-card p-6">
            <h2 className="text-xl font-semibold text-brand-foreground mb-2 flex items-center gap-2">
              <span>🌐</span> Links do Atendimento Automático
            </h2>
            <p className="text-sm text-brand-secondary mb-6">
              Links enviados automaticamente quando o cliente escolhe a opção de site ou grupo.
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="p-4 rounded-xl border border-brand-border bg-brand-muted/10">
                <h3 className="font-semibold text-brand-foreground mb-1">🌐 Link do Site Cadastrado</h3>
                <input
                  type="text"
                  readOnly
                  value={process.env.NEXT_PUBLIC_SITE_URL || 'https://lilianartesanato.com'}
                  className="w-full bg-brand-muted px-3 py-2 rounded-lg text-sm text-brand-foreground border border-brand-border mt-1"
                />
              </div>

              <div className="p-4 rounded-xl border border-brand-border bg-brand-muted/10">
                <h3 className="font-semibold text-brand-foreground mb-1">👥 Link do Grupo VIP</h3>
                <input
                  type="text"
                  readOnly
                  value={process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || 'https://chat.whatsapp.com/lilian-artesanato-grupo'}
                  className="w-full bg-brand-muted px-3 py-2 rounded-lg text-sm text-brand-foreground border border-brand-border mt-1"
                />
              </div>
            </div>
          </div>

          {/* Card de Envio de Teste */}
          <div className="rounded-2xl border border-brand-border bg-brand-card p-6">
            <h2 className="text-xl font-semibold text-brand-foreground mb-4 flex items-center gap-2">
              <span>✉️</span> Testar Envio de Mensagem
            </h2>
            <form onSubmit={handleSendTest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-foreground mb-1">Número do WhatsApp (com DDD, ex: 28999999999)</label>
                <input
                  type="text"
                  placeholder="28999999999"
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  className="w-full bg-brand-muted px-4 py-2 rounded-xl text-brand-foreground border border-brand-border text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-foreground mb-1">Mensagem</label>
                <textarea
                  rows={3}
                  value={testMsg}
                  onChange={(e) => setTestMsg(e.target.value)}
                  className="w-full bg-brand-muted px-4 py-2 rounded-xl text-brand-foreground border border-brand-border text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={testResult?.loading}
                className="bg-brand-accent hover:opacity-90 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-opacity"
              >
                {testResult?.loading ? 'Enviando...' : 'Enviar Mensagem de Teste'}
              </button>

              {testResult && !testResult.loading && (
                <div className={`p-3 rounded-xl text-xs ${testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {testResult.success ? 'Mensagem enviada com sucesso! ✅' : `Erro ao enviar: ${testResult.error || JSON.stringify(testResult.data)}`}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
