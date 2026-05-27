import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/config/site'
import { content } from '@/config/content'
import { formatPrice } from '@/config/packages'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'

// `terms.extras` items either reference an addOn by id (price + label flow
// from site.policies.addOns) OR are standalone (client-provided, no fee).
// Resolve to a uniform shape here so the render below stays simple.
type ExtraRow = { name: string; fee?: number; note?: string }

const t  = site.policies.terms
const cn = content.termsPage

const extras: readonly ExtraRow[] = t.extras.map((x): ExtraRow => {
  if ('addOnId' in x) {
    const addOn = site.policies.addOns[x.addOnId]
    return { name: addOn.label, fee: addOn.fee, note: 'note' in x ? x.note : undefined }
  }
  return x
})

export const metadata: Metadata = {
  title:       cn.title,
  description: `${site.name} booking terms and conditions. Punctuality, deposits, preparation, additional charges, and cancellation policies.`,
  alternates:  { canonical: `https://${site.canonicalHost}/terms-and-conditions` },
}

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home',                item: `https://${site.canonicalHost}` },
              { '@type': 'ListItem', position: 2, name: 'Terms & Conditions',  item: `https://${site.canonicalHost}/terms-and-conditions` },
            ],
          }),
        }}
      />

      <section className="pt-32 pb-12 px-6 bg-ivory">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]} />
          <SectionHeader
            eyebrow={cn.eyebrow}
            title={cn.title}
            subtitle={cn.subtitle}
            centered
          />
        </div>
      </section>

      <section className="pb-24 px-6 bg-ivory">
        <article className="max-w-3xl mx-auto flex flex-col gap-12 text-dark">

          {/* 1 — Punctuality & waiting charges */}
          <Section number={cn.sections.punctuality.number} title={cn.sections.punctuality.title}>
            <p className="text-muted leading-relaxed mb-5">
              We highly value punctuality and extend the same expectation to our clients.
              A waiting charge applies if you arrive 15 minutes late or beyond:
            </p>
            <div className="border border-ivory-4 rounded-xl overflow-hidden">
              {t.waitingCharges.map((w, i) => (
                <div
                  key={w.duration}
                  className={`flex justify-between items-center px-5 py-3 text-sm ${
                    i < t.waitingCharges.length - 1 ? 'border-b border-ivory-4' : ''
                  } ${i % 2 === 1 ? 'bg-ivory-2' : 'bg-ivory'}`}
                >
                  <span className="text-dark">{w.duration}</span>
                  <span className="font-medium text-gold">{formatPrice(w.fee)}</span>
                </div>
              ))}
            </div>
            <p className="text-muted text-sm leading-relaxed mt-4 italic">
              {t.waitingNote}
            </p>
          </Section>

          {/* 2 — Studio visitors */}
          <Section number={cn.sections.studioVisitors.number} title={cn.sections.studioVisitors.title}>
            <p className="text-muted leading-relaxed">{t.studioVisitors}</p>
          </Section>

          {/* 3 — Face preparation */}
          <Section number={cn.sections.facePrep.number} title={cn.sections.facePrep.title}>
            <p className="text-muted leading-relaxed">{t.facePrep}</p>
          </Section>

          {/* 4 — Hair preparation */}
          <Section number={cn.sections.hairPrep.number} title={cn.sections.hairPrep.title}>
            <p className="text-muted leading-relaxed">{t.hairPrep}</p>
          </Section>

          {/* 5 — Excluded items / additional charges */}
          <Section number={cn.sections.extras.number} title={cn.sections.extras.title}>
            <p className="text-muted leading-relaxed mb-5">
              The following items and services are not included in our standard appointment packages
              and may incur additional charges:
            </p>
            <div className="border border-ivory-4 rounded-xl overflow-hidden">
              {extras.map((x, i) => (
                <div
                  key={x.name}
                  className={`flex flex-col sm:flex-row sm:justify-between sm:items-center px-5 py-4 gap-1 ${
                    i < extras.length - 1 ? 'border-b border-ivory-4' : ''
                  } ${i % 2 === 1 ? 'bg-ivory-2' : 'bg-ivory'}`}
                >
                  <div className="flex-1">
                    <p className="text-dark text-sm font-medium">{x.name}</p>
                    {x.note && <p className="text-muted-2 text-xs mt-0.5">{x.note}</p>}
                  </div>
                  {x.fee !== undefined && (
                    <span className="font-medium text-gold text-sm flex-shrink-0">
                      {formatPrice(x.fee)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* 6 — Getting-ready shots */}
          <Section number={cn.sections.gettingReadyShots.number} title={cn.sections.gettingReadyShots.title}>
            <p className="text-muted leading-relaxed mb-3">{t.gettingReadyShots.description}</p>
            <p className="text-dark text-sm">
              <span className="font-medium">{formatPrice(t.gettingReadyShots.fee)}</span>
              {' for a '}
              <span>{t.gettingReadyShots.duration}</span>
              {' slot. '}
              <span className="text-muted">{t.gettingReadyShots.note}</span>
            </p>
          </Section>

          {/* 7 — Deposit policy */}
          <Section number={cn.sections.deposit.number} title={cn.sections.deposit.title}>
            <p className="text-muted leading-relaxed">{t.deposit}</p>
            <p className="text-muted text-sm leading-relaxed mt-3 italic">
              A {site.policies.depositPercent}% deposit secures your appointment.
            </p>
          </Section>

          {/* 8 — Partial cancellation */}
          <Section number={cn.sections.partialCancellation.number} title={cn.sections.partialCancellation.title}>
            <p className="text-muted leading-relaxed">{t.partialCancellation}</p>
          </Section>

          {/* 9 — Party package exclusions */}
          <Section number={cn.sections.partyExclusions.number} title={cn.sections.partyExclusions.title}>
            <p className="text-muted leading-relaxed">{t.partyExclusions}</p>
          </Section>

          {/* 10 — Time change */}
          <Section number={cn.sections.timeChange.number} title={cn.sections.timeChange.title}>
            <p className="text-muted leading-relaxed">{t.timeChange}</p>
          </Section>

          {/* 11 — Consultation calls */}
          <Section number={cn.sections.consultation.number} title={cn.sections.consultation.title}>
            <p className="text-muted leading-relaxed mb-3">{site.policies.consultation.description}</p>
            <p className="text-dark text-sm">
              <span className="font-medium">Eligible packages:</span>{' '}
              <span className="text-muted">{site.policies.consultation.eligibility.join(', ')}</span>
            </p>
            <p className="text-dark text-sm mt-1">
              <span className="font-medium">Timing:</span>{' '}
              <span className="text-muted">{site.policies.consultation.timing}</span>
            </p>
          </Section>

          {/* Agreement footer */}
          <div className="border-t border-ivory-4 pt-10 mt-4">
            <p className="text-dark text-sm leading-relaxed mb-6">
              {t.agreement}
            </p>
            <p className="text-muted text-sm leading-relaxed mb-8">
              {cn.questionsHelp}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button href="/contact" size="md">Start your booking</Button>
              <Link
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-ivory transition-colors"
              >
                Ask a question
              </Link>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="scroll-mt-24" id={`section-${number}`}>
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-serif text-3xl text-gold flex-shrink-0">{number}.</span>
        <h2 className="font-serif text-2xl md:text-3xl text-dark leading-tight">{title}</h2>
      </div>
      <div className="pl-0 md:pl-12">{children}</div>
    </section>
  )
}
