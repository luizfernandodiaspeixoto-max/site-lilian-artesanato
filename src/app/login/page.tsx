'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Falha no login')
      }

      router.push('/admin/orders')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#2E2420] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/assets/images/app_logo.png"
            alt="Lilian Artesanato"
            width={64}
            height={64}
            unoptimized
            className="mx-auto mb-4 rounded-full"
          />
          <h1 className="font-display text-2xl font-semibold text-[#FAF7F2]">
            Área Administrativa
          </h1>
          <p className="mt-1 text-sm text-[#C4A882]">
            Painel de gerenciamento do Lilian Artesanato
          </p>
        </div>

        <div className="rounded-2xl border border-[#4A3530] bg-[#3A2A24] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#C4A882] mb-1.5">
                Usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-[#4A3530] bg-[#2E2420] px-4 py-2.5 text-sm text-[#FAF7F2] placeholder-[#C4A882]/50 outline-none focus:border-[#C4956A] focus:ring-1 focus:ring-[#C4956A]/40 transition-colors"
                placeholder="Digite seu usuário"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#C4A882] mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#4A3530] bg-[#2E2420] px-4 py-2.5 text-sm text-[#FAF7F2] placeholder-[#C4A882]/50 outline-none focus:border-[#C4956A] focus:ring-1 focus:ring-[#C4956A]/40 transition-colors"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full rounded-xl bg-[#C4956A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#A67850] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#C4A882]/40">
          Acesso restrito · Somente para administradores
        </p>
      </div>
    </div>
  )
}
