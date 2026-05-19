import type { Metadata } from 'next'
import { site } from '@/config/site'
import { packages, formatPrice } from '@/config/packages'
import { content } from '@/config/content'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { FAQAccordion } from './FAQAccordion'

// Compose the meta description from the same packages config the page renders.
const packagesSummary = packages.map((p) => `${p.name} (${formatPrice(p.price)})`).join(', ')

export const metadata: Metadata = {
  title: `Services & Pricing | ${site.name}`,
  description: `Explore ${site.name} bridal packages: ${packagesSummary}. Serving all of the GTA.`,
  alternates: { canonical: `https://${site.domain}/services` },
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}` },
              { '@type': 'ListItem', position: 2, name: 'Services', item: `https://${site.domain}/services` },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            packages.map((pkg) => ({
              '@context':   'https://schema.org',
              '@type':      'Service',
              name:         `${pkg.name} Makeup and Hair`,
              description:  pkg.tagline,
              provider:     { '@type': 'BeautyStudio', name: site.name },
              areaServed:   'Greater Toronto Area',
              offers: {
                '@type':         'Offer',
                price:           String(pkg.price),
                priceCurrency:   'CAD',
                priceSpecification: {
                  '@type':         'UnitPriceSpecification',
                  price:           String(pkg.price),
                  priceCurrency:   'CAD',
                  unitText:        'per person per event',
                },
              },
            }))
          ),
        }}
      />

      <section className="pt-32 pb-24 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow={content.servicesPage.eyebrow}
            title={content.servicesPage.title}
            subtitle={content.servicesPage.subtitle}
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-7 flex flex-col ${
                  pkg.highlight
                    ? 'bg-dark text-ivory border border-dark-3'
                    : 'bg-ivory-2 text-dark border border-ivory-4'
                }`}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ivory text-xs px-4 py-1 rounded-full font-medium">
                    {content.servicesSection.popularBadge}
                  </span>
                )}
                <p className={`text-xs uppercase tracking-widest mb-2 ${pkg.highlight ? 'text-gold-light' : 'text-gold'}`}>
                  {pkg.name}
                </p>
                {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                  <p className={`text-base line-through ${pkg.highlight ? 'text-ivory-3' : 'text-muted'}`}>
                    {formatPrice(pkg.originalPrice)}
                  </p>
                )}
                <div className="flex items-baseline gap-2 mb-1">
                  <p className={`font-serif text-4xl ${pkg.highlight ? 'text-ivory' : 'text-dark'}`}>
                    {formatPrice(pkg.price)}
                  </p>
                  {pkg.discountLabel && (
                    <span className="text-xs uppercase tracking-widest text-gold font-medium">
                      {pkg.discountLabel}
                    </span>
                  )}
                </div>
                <p className={`text-xs mb-4 ${pkg.highlight ? 'text-ivory-4' : 'text-muted'}`}>
                  {pkg.priceNote}
                </p>
                <p className={`text-sm leading-relaxed mb-6 ${pkg.highlight ? 'text-ivory-3' : 'text-muted'}`}>
                  {pkg.tagline}
                </p>
                <ul className="flex flex-col gap-2.5 mt-auto">
                  {pkg.includes.map((item) => (
                    <li key={item} className={`text-sm flex gap-2 items-start ${pkg.highlight ? 'text-ivory-3' : 'text-muted'}`}>
                      <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  href="/contact"
                  variant={pkg.highlight ? 'primary' : 'outline'}
                  className="mt-8 w-full justify-center"
                >
                  {content.servicesSection.bookCTA}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-ivory-2 rounded-2xl border border-ivory-4 p-10">
            <SectionHeader eyebrow="Policies" title="Booking & travel policies" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(site.policies)
                .filter(([, value]) => typeof value === 'string')
                .map(([key, value]) => (
                  <div key={key} className="flex gap-3">
                    <span className="text-gold mt-1 flex-shrink-0">✦</span>
                    <p className="text-muted text-sm leading-relaxed">{value as string}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-20">
            <SectionHeader eyebrow={content.servicesPage.faqEyebrow} title={content.servicesPage.faqTitle} />
            <FAQAccordion />
          </div>
        </div>
      </section>
    </>
  )
}
