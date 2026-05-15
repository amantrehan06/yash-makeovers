'use client'

import { useState } from 'react'
import { site } from '@/config/site'

const faqs = [
  {
    q: 'How far in advance should I book?',
    a: '6–12 months is ideal for wedding dates. Popular dates fill up quickly — especially May through October.',
  },
  {
    q: 'What deposit is required to secure my date?',
    a: `A ${site.policies.depositPercent}% non-refundable deposit via e-transfer secures your date. No payment is required until we've spoken and you're ready to move forward.`,
  },
  {
    q: 'Do you offer a trial session?',
    a: "Yes — a trial is strongly recommended for brides. It helps us nail your look before the big day and ensures you feel confident and excited.",
  },
  {
    q: `Can ${site.artistName} travel to my venue?`,
    a: `Absolutely. ${site.artistName} travels across the GTA. Travel fees: $${site.policies.travelPeel} within Peel Region, up to $${site.policies.travelGTA} for greater GTA. Alternatively, you can visit the studio at ${site.address}.`,
  },
  {
    q: 'Is there an early morning fee?',
    a: `Yes — a $${site.policies.earlyMorningFee}/person early morning fee applies for start times between ${site.policies.earlyMorningThreshold}.`,
  },
  {
    q: 'Do you work with all skin tones?',
    a: `Absolutely. ${site.artistName} specializes in South Asian and multicultural bridal looks and has extensive experience working with all skin tones and undertones.`,
  },
]

export function FAQAccordion() {
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
