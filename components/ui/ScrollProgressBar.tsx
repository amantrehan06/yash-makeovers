'use client'

import { useEffect, useState } from 'react'

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) {
        setProgress(0)
        return
      }
      const pct = (window.scrollY / docHeight) * 100
      setProgress(Math.min(100, Math.max(0, pct)))
    }

    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-0.5 z-[60] pointer-events-none"
    >
      <div
        className="h-full bg-gold transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
