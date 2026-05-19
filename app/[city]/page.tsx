import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cities } from '@/config/cities'
import { site } from '@/config/site'
import { packages, formatPrice } from '@/config/packages'
import { reviews } from '@/config/reviews'
import { content } from '@/config/content'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'

interface Props {
  params: { city: string }
}

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cities.find((c) => c.slug === params.city)
  if (!city) return {}
  return {
    title:       city.metaTitle,
    description: city.metaDescription,
    alternates:  { canonical: `https://${site.domain}/${city.slug}` },
    openGraph: {
      title:       city.metaTitle,
      description: city.metaDescription,
      type:        'website',
      locale:      'en_CA',
    },
  }
}

function cityFaqs(cityName: string) {
  // All prices + fees derive from config — change once in config/packages.ts
  // or config/site.ts and every city FAQ reflects it.
  const bridal    = packages.find((p) => p.id === 'bridal')!
  const preBridal = packages.find((p) => p.id === 'pre-bridal')!
  const fullGlam  = packages.find((p) => p.id === 'full-glam')!
  const party     = packages.find((p) => p.id === 'party')!

  return [
    {
      q: `How much does bridal makeup cost in ${cityName}?`,
      a: `${site.artistName}'s bridal packages start at ${bridal.price} per person per event for the full Bridal package — including ${bridal.includes.slice(0, 4).join(', ')}, and more. Pre-Bridal events are ${preBridal.price}, Full Glam is ${fullGlam.price}, and Regular Party is ${party.price} per person.`,
    },
    {
      q: `Does ${site.artistName} travel to ${cityName}?`,
      a: `Yes — ${site.artistName} travels to all venues across the GTA. Travel fees: $${site.policies.travelPeel} within Peel Region, up to $${site.policies.travelGTA} for the wider GTA. Alternatively, visit the studio at ${site.address}.`,
    },
    {
      q: 'How far in advance should I book?',
      a: `${site.artistName} is currently ${site.availability.toLowerCase()}, with popular dates filling up quickly (especially May through October). We recommend reaching out 6–12 months before your wedding. A ${site.policies.depositPercent}% non-refundable deposit via e-transfer secures your date.`,
    },
  ]
}

export default function CityPage({ params }: Props) {
  const city = cities.find((c) => c.slug === params.city)
  if (!city) notFound()

  const faqs = cityFaqs(city.name)
  // Pick 2 most relevant reviews — for now, the 2 most recent (all are bridal).
  const featuredReviews = reviews.slice(0, 2)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home',     item: `https://${site.domain}` },
              { '@type': 'ListItem', position: 2, name: city.name,  item: `https://${site.domain}/${city.slug}` },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name:    faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-gold mb-4">
              {city.name}, {city.province}
            </p>
            <h1 className="font-serif text-4xl md:text-[56px] text-dark leading-[1.05] tracking-tight mb-6">
              {city.h1}
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-8">{city.intro}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contact" size="lg">
                Book in {city.name}
              </Button>
              <Button href="/portfolio" variant="outline" size="lg">
                View portfolio
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Years of expertise', value: site.experience },
              { label: 'Brides served',      value: site.brideCount },
              { label: 'Google rating',      value: `⭐ ${site.googleRating}` },
              { label: 'Google reviews',     value: site.googleReviewCount },
            ].map((s) => (
              <div key={s.label} className="bg-ivory-2 rounded-2xl p-6 border border-ivory-4 text-center">
                <p className="font-serif text-3xl text-gold">{s.value}</p>
                <p className="text-muted text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6 bg-ivory-2">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow={content.cityPage.servicesEyebrow}
            title={`Bridal packages for ${city.name} brides`}
            subtitle={content.cityPage.servicesSubtitle}
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 border flex flex-col ${
                  pkg.highlight ? 'bg-dark text-ivory border-dark-3' : 'bg-ivory border-ivory-4'
                }`}
              >
                <p className={`text-xs uppercase tracking-widest mb-2 ${pkg.highlight ? 'text-gold-light' : 'text-gold'}`}>
                  {pkg.name}
                </p>
                {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                  <p className={`text-base line-through ${pkg.highlight ? 'text-ivory-3' : 'text-muted'}`}>
                    {formatPrice(pkg.originalPrice)}
                  </p>
                )}
                <div className="flex items-baseline gap-2">
                  <p className={`font-serif text-3xl ${pkg.highlight ? 'text-ivory' : 'text-dark'}`}>{formatPrice(pkg.price)}</p>
                  {pkg.discountLabel && (
                    <span className="text-xs uppercase tracking-widest text-gold font-medium">
                      {pkg.discountLabel}
                    </span>
                  )}
                </div>
                <p className={`text-xs mt-1 mb-4 ${pkg.highlight ? 'text-ivory-4' : 'text-muted'}`}>{pkg.priceNote}</p>
                <p className={`text-sm leading-relaxed mb-6 ${pkg.highlight ? 'text-ivory-3' : 'text-muted'}`}>{pkg.tagline}</p>
                <Button
                  href="/contact"
                  variant={pkg.highlight ? 'primary' : 'outline'}
                  className="mt-auto w-full justify-center"
                >
                  Book in {city.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 px-6 bg-ivory">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow={`Why ${city.name} brides choose ${site.artistName}`}
            title={content.cityPage.whyChooseTitle}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {site.whyChoose.map((item) => (
              <div key={item.title} className="flex gap-4 bg-ivory-2 rounded-2xl p-6 border border-ivory-4">
                <span className="text-gold mt-1 flex-shrink-0 text-lg">✦</span>
                <div>
                  <p className="font-semibold text-dark mb-2">{item.title}</p>
                  <p className="text-muted text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 px-6 bg-dark">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow={content.cityPage.reviewsEyebrow}
            title={`What brides in the GTA are saying`}
            light
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {featuredReviews.map((review) => (
              <div key={review.id} className="bg-dark-2 rounded-2xl p-8 border border-dark-3">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-gold text-sm">⭐</span>
                  ))}
                </div>
                <p className="text-ivory-3 text-sm leading-relaxed mb-6">
                  &ldquo;{review.body}&rdquo;
                </p>
                <p className="text-ivory font-medium text-sm">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-ivory">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow={content.cityPage.faqEyebrow}
            title={`${content.cityPage.faqTitle} — ${city.name}`}
          />
          <div className="divide-y divide-ivory-4">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <p className="font-medium text-dark mb-2">{faq.q}</p>
                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gold">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-3xl md:text-4xl text-ivory mb-4">
            Ready to look stunning in {city.name}?
          </p>
          <p className="text-gold-pale mb-8">{site.availability}</p>
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="border-ivory text-ivory hover:bg-ivory hover:text-gold"
          >
            Book your {city.name} date →
          </Button>
        </div>
      </section>
    </>
  )
}
