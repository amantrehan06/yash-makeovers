import type { Metadata } from 'next'
import { site } from '@/config/site'
import { seo } from '@/config/seo'
import { features } from '@/config/features'
import { cities } from '@/config/cities'
import { reviews } from '@/config/reviews'
import { faqs } from '@/config/faq'
import { getBeforeAfterPairs } from '@/lib/cloudinary'
import { buildCloudinaryUrl } from '@/lib/cloudinaryUrl'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { PriceEstimator } from '@/components/sections/PriceEstimator'
import { Reviews } from '@/components/sections/Reviews'
import { Cities } from '@/components/sections/Cities'
import { InquiryForm } from '@/components/sections/InquiryForm'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { FAQ } from '@/components/sections/FAQ'

// ISR: rebuild every 8h to match the Cloudinary unstable_cache TTL in
// lib/cloudinary.ts. Serves the homepage statically from the edge so the
// Cloudinary searches inside Hero/About/FeaturedWork don't add to TTFB
// (was 47% Good in CrUX field data).
export const revalidate = 28800

export const metadata: Metadata = {
  // `absolute` bypasses the layout's `%s | Yash Makeovers` template so the
  // brand name (already at the start) isn't appended a second time.
  title: { absolute: `${site.name} — Bridal Makeup Artist in ${site.baseCity}` },
  // Conversion-angle description for the homepage: stats + season.
  // Distinct from layout fallback (brand-only) and /about (artist story).
  description: `Award-winning bridal makeup and hair by ${site.artistName} — ${site.experience} years, ${site.brideCount} brides across the Greater Toronto Area. Now booking ${site.seasonYears} weddings.`,
  alternates: {
    canonical: `https://${site.canonicalHost}`,
  },
}

// Maps day name to its schema.org URI (required form for OpeningHoursSpecification).
const DAY_URI: Record<string, string> = {
  Monday:    'https://schema.org/Monday',
  Tuesday:   'https://schema.org/Tuesday',
  Wednesday: 'https://schema.org/Wednesday',
  Thursday:  'https://schema.org/Thursday',
  Friday:    'https://schema.org/Friday',
  Saturday:  'https://schema.org/Saturday',
  Sunday:    'https://schema.org/Sunday',
}

export default async function HomePage() {
  // Pre-fetch the first before/after pair on the server so the slider has real
  // images without any client-side loading flicker.
  const firstPair = features.beforeAfter ? (await getBeforeAfterPairs())[0] : undefined

  // ── LocalBusiness schema (BeautyStudio) ──────────────────────────────
  // Single object built from config — no hardcoded values. Empty branding
  // image fields are omitted (Google validates "missing" cleanly; "empty
  // string" is treated as broken).
  const businessUrl = `https://${site.canonicalHost}`

  const sameAs = [
    site.instagram   ? `https://www.instagram.com/${site.instagram}/` : '',
    site.facebook,
    site.googleBusiness,
  ].filter(Boolean)

  const logoUrl = site.branding.logoPublicId
    ? buildCloudinaryUrl(site.branding.logoPublicId, { width: 512, height: 512, crop: 'fill' })
    : `${businessUrl}/icon.png`

  const imageUrl = site.branding.ogImagePublicId
    ? buildCloudinaryUrl(site.branding.ogImagePublicId, { width: 1200, height: 630, crop: 'fill' })
    : undefined

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type':    'BeautyStudio',
    '@id':      `${businessUrl}#business`,
    name:       site.name,
    telephone:  site.phone,
    email:      site.email,
    url:        businessUrl,
    logo:       logoUrl,
    ...(imageUrl ? { image: imageUrl } : {}),
    address: {
      '@type': 'PostalAddress',
      ...site.addressStructured,
    },
    geo: {
      '@type':    'GeoCoordinates',
      latitude:   site.geo.latitude,
      longitude:  site.geo.longitude,
    },
    sameAs,
    openingHoursSpecification: site.hours.map((h) => ({
      '@type':     'OpeningHoursSpecification',
      dayOfWeek:   h.days.map((d) => DAY_URI[d]),
      opens:       h.opens,
      closes:      h.closes,
    })),
    // Real cities served — proper City objects, not parsed keyword fragments.
    areaServed: cities.map((c) => ({
      '@type': 'City',
      name:    c.name,
      '@id':   `${businessUrl}/${c.slug}`,
    })),
    // Topical keywords for AI/LLM crawlers (gemini, perplexity) that prefer
    // explicit keyword arrays. Google ignores it for ranking but does parse it.
    keywords: seo.keywords.join(', '),
    priceRange: '$$$',
    // Matches the primary category on Google Business Profile — helps Google
    // confidently connect this schema with the GBP listing.
    category: site.businessCategory,
    aggregateRating: {
      '@type':     'AggregateRating',
      ratingValue: site.googleRating,
      reviewCount: site.googleReviewCount,
    },
    // Concrete reviews back up the AggregateRating — required to stay
    // policy-compliant with Google's review rich-result guidelines.
    review: reviews.map((r) => ({
      '@type':       'Review',
      author:        { '@type': 'Person', name: r.author },
      reviewRating:  { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      datePublished: r.datePublished,
      reviewBody:    r.body,
    })),
  }

  // Note: FAQPage JSON-LD is intentionally emitted only on /services (the
  // more authoritative URL for FAQ-driven queries: pricing, policy, etc.).
  // The visible FAQ section stays here for UX, but identical schema on two
  // URLs makes Google pick one for the rich result anyway — concentrating
  // it on /services maximizes that page's eligibility.

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <Hero />
      <Marquee />
      <About />
      <Services />
      {features.featuredGrid && <FeaturedWork />}
      {features.beforeAfter && (
        <BeforeAfter
          beforePublicId={firstPair?.before.public_id}
          afterPublicId={firstPair?.after.public_id}
        />
      )}
      {features.priceEstimator && <PriceEstimator />}
      <Reviews />
      <Cities />
      <FAQ items={faqs} />
      <InquiryForm />
    </>
  )
}
