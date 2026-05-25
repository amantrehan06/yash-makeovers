'use client'

import { useState } from 'react'
import type { Faq } from './faqs'

// Presentational only. The faqs array lives in ./faqs.ts so the same data
// also feeds the FAQPage JSON-LD emitted by app/services/page.tsx.
export function FAQAccordion({ faqs }: { faqs: readonly Faq[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y divide-ivory-4">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            className="w-full py-5 text-left flex justify-between items-center gap-4 group"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-medium text-dark group-hover:text-gold transition-colors text-sm md:text-base">
              {faq.q}
            </span>
            <span className={`text-gold flex-shrink-0 transition-transform ${open === i ? 'rotate-45' : ''}`}>
              +
            </span>
          </button>
          {open === i && (
            <p className="pb-5 text-muted text-sm leading-relaxed">{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  )
}
