'use client'

import { useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'

function sendLog(data: Record<string, any>) {
  try {
    const body = {
      ...data,
      page: window.location.pathname,
      referrer: document.referrer || null,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      screen: `${screen.width}x${screen.height}`,
      lang: navigator.language,
      timestamp: new Date().toISOString(),
    }

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/log', JSON.stringify(body))
    } else {
      fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true,
      }).catch(() => {})
    }
  } catch {}
}

export function useLogger() {
  const pathname = usePathname()
  const lastPage = useRef<string>('')
  const startTime = useRef<number>(Date.now())

  useEffect(() => {
    startTime.current = Date.now()
    if (pathname !== lastPage.current) {
      lastPage.current = pathname
      sendLog({ action: 'page_view', page: pathname })
    }
  }, [pathname])

  useEffect(() => {
    const handleBeforeUnload = () => {
      const duration = Math.round((Date.now() - startTime.current) / 1000)
      sendLog({ action: 'page_leave', duration_seconds: duration })
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const logEvent = useCallback((action: string, data?: Record<string, any>) => {
    sendLog({ action, ...data })
  }, [])

  return { logEvent }
}
