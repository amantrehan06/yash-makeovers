'use client'

import { useState } from 'react'
import { site } from '@/config/site'

const t = site.policies.terms

const faqs = [
  {
    q: 'How far in advance should I book?',
    a: '6–12 months is ideal for wedding dates. Popular dates fill up quickly — especially May through October.',
  },
  {
    q: 'What deposit is required to secure my date?',
    a: `A ${site.policies.depositPercent}% non-refundable and non-transferable deposit via e-transfer secures your date. No payment is required until we've spoken and you're ready to move forward.`,
  },
  {
    q: 'Do you offer a consultation or trial?',
    a: `${site.policies.consultation.description} If you wish to proceed with a makeup-only trial, the fee is ${site.policies.trial.feeText}, and once your booking is confirmed, we can schedule the trial ${site.policies.trial.scheduling.toLowerCase()} ${site.policies.trial.refundCondition}`,
  },
  {
    q: `Can ${site.artistName} travel to my venue?`,
    a: `Absolutely. ${site.artistName} travels across the GTA. Travel fees: $${site.policies.travelPeel} within Peel Region, up to $${site.policies.travelGTA} for greater GTA. Alternatively, you can visit the studio at ${site.address}.`,
  },
  {
    q: 'Is there an early morning fee?',
    a: `Yes — a $${site.policies.earlyMorningFee} early morning fee applies for start times between ${site.policies.earlyMorningThreshold}.`,
  },
  {
    q: 'What if I arrive late to my appointment?',
    a: `We highly value punctuality. Waiting charges apply at $${t.waitingCharges[0].fee} for 15 minutes late, $${t.waitingCharges[1].fee} for 30 minutes, and $${t.waitingCharges[2].fee} for 1 hour. ${t.waitingNote}`,
  },
  {
    q: 'Do hair extensions cost extra?',
    a: `Yes. Application of your own hair extensions is $${t.extras[1].fee} per set. Studio-provided extensions are $${t.extras[2].fee} per extension (includes application).`,
  },
  {
    q: 'How should I prep my face and hair before the appointment?',
    a: `${t.facePrep} ${t.hairPrep}`,
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
