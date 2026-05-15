'use client'

import { useState } from 'react'
import { site } from '@/config/site'
import { features } from '@/config/features'
import { trackEvent } from '@/lib/analytics'

const WA_URL = `https://wa.me/${site.whatsapp}?text=Hi%20${encodeURIComponent(site.artistName)}%2C%20I%27d%20like%20to%20inquire%20about%20your%20makeup%20services`

export function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false)
  if (!features.whatsapp) return null

  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.artistName} on WhatsApp`}
      onClick={() => trackEvent('whatsapp_clicked', { source: 'floating_button' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      {hovered && (
        <span className="bg-dark text-ivory text-xs px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg animate-fade-in-up">
          Chat with {site.artistName}
        </span>
      )}
      <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition-colors animate-pulse-beat">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.524 5.847L.057 23.516a.5.5 0 0 0 .619.617l5.783-1.481A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.678-.497-5.214-1.363l-.374-.214-3.88.994.998-3.79-.23-.381A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </div>
    </a>
  )
}
