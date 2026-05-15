'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      const scrolled   = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, scrolled)))
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
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none"
    >
      <div
        className="h-full bg-gold transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
