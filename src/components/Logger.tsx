'use client'

import { useLogger } from '@/lib/useLogger'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function Logger({ children }: { children: React.ReactNode }) {
  const { logEvent } = useLogger()
  const pathname = usePathname()
  const lastPage = useRef<string>('')

  useEffect(() => {
    if (pathname !== lastPage.current) {
      lastPage.current = pathname
      logEvent('page_view', { page: pathname })
    }
  }, [pathname, logEvent])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      const button = target.closest('button')

      if (anchor) {
        const href = anchor.getAttribute('href') || ''
        logEvent('link_click', {
          href,
          text: anchor.textContent?.trim().slice(0, 100) || '',
        })
      }

      if (button) {
        logEvent('button_click', {
          text: button.textContent?.trim().slice(0, 100) || '',
          class: button.className.slice(0, 200),
        })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [logEvent])

  return <>{children}</>
}
