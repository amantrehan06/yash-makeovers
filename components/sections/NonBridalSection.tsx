import Link from 'next/link'
import type { City } from '@/config/cities'
import { content, fillTemplate } from '@/config/content'
import { servicePages } from '@/config/servicePages'

// Renders a plain blurb string, turning any [text](/path) markdown link into a
// Next <Link> so a city blurb can point contextually at a service page. Strings
// without a link render byte-identically (split returns the whole string).
function renderWithLinks(text: string) {
  return text.split(/(\[[^\]]+\]\(\/[a-z0-9/-]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((\/[a-z0-9/-]+)\)$/)
    if (!m) return part
    return (
      <Link key={i} href={m[2]} className="text-gold underline underline-offset-2 hover:text-gold-dim">
        {m[1]}
      </Link>
    )
  })
}

// B2 — "Party, Prom & Event Makeup Artist in {city}" block on city pages.
// Purely additive below the existing city content: unique per-city sentence
// from cities.ts (nonBridalBlurb), shared body from content.ts, and chip
// links to the four occasion service pages (config/servicePages.ts).

export function NonBridalSection({ city }: { city: City }) {
  return (
    <section className="py-16 px-6 bg-ivory-2">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gold mb-4">
          {content.cityPage.nonBridalEyebrow}
        </p>
        <h2 className="font-serif text-headline md:text-5xl leading-tight text-dark mb-6">
          Party, Prom &amp; Event Makeup Artist in {city.name}
        </h2>
        <div className="space-y-4 max-w-3xl">
          <p className="text-muted text-base leading-relaxed">
            {renderWithLinks(fillTemplate(city.nonBridalBlurb))}
          </p>
          <p className="text-muted text-base leading-relaxed">
            {fillTemplate(content.cityPage.nonBridalBody).replace(/\{city\}/g, city.name)}
          </p>
        </div>
        <p className="text-xs uppercase tracking-widest text-gold mt-8 mb-4">
          {content.cityPage.nonBridalLinksLead}
        </p>
        <div className="flex flex-wrap gap-3">
          {servicePages.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="px-5 py-3 rounded-full border border-ivory-4 bg-ivory text-dark text-sm hover:border-gold hover:text-gold transition-colors inline-flex items-center gap-2"
            >
              {p.name}
              <span className="text-gold">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
