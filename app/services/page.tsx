import type { Metadata } from 'next'
import { site } from '@/config/site'
import { packages, formatPrice } from '@/config/packages'
import { content } from '@/config/content'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PackageCard } from '@/components/ui/PackageCard'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { faqs } from '@/config/faq'
import { buildPackageProductSchema } from '@/lib/schema'

// Compose the meta description from the same packages config the page renders.
const packagesSummary = packages.map((p) => `${p.name} (${formatPrice(p.price)})`).join(', ')

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description: `Explore ${site.name} bridal packages: ${packagesSummary}. Serving all of the GTA.`,
  alternates: { canonical: `https://${site.canonicalHost}/services` },
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type':         'Question',
              name:            faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />

      {/* One Product schema per package. Upgrades from generic Service →
          Product so each package becomes eligible for Google's commercial
          SERP rich card (price + availability + ★ rating). Built via
          buildPackageProductSchema() in lib/schema.ts so the shape edits
          in one place. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(packages.map((pkg) => buildPackageProductSchema(pkg))),
        }}
      />

      <section className="pt-32 pb-24 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            currentPath="/services"
            items={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
          />
          <SectionHeader
            eyebrow={content.servicesPage.eyebrow}
            title={content.servicesPage.title}
            subtitle={content.servicesPage.subtitle}
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                ctaText={content.servicesSection.bookCTA}
              />
            ))}
          </div>

          <div className="mt-20">
            <SectionHeader eyebrow={content.servicesPage.faqEyebrow} title={content.servicesPage.faqTitle} />
            <FAQAccordion faqs={faqs} />
            <p className="text-center text-muted text-sm mt-10">
              For our full booking policy, waiting charges, preparation guide,
              and additional service fees, please read our{' '}
              <a
                href="/terms-and-conditions"
                className="text-gold hover:text-gold-dim underline underline-offset-2"
              >
                Terms &amp; Conditions
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
