'use client'

import { useState } from 'react'
// Presentational only. Callers own their faq data — the same array typically
// also feeds the FAQPage JSON-LD so visible content matches the schema (a
// hard requirement for Google rich-results eligibility).
export interface FaqItem { q: string; a: string }

export function FAQAccordion({ faqs }: { faqs: readonly FaqItem[] }) {
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
