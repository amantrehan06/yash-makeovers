import type { Metadata } from 'next'
import { site } from '@/config/site'
import { features } from '@/config/features'
import { getBeforeAfterPairs } from '@/lib/cloudinary'
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

// ISR: rebuild every 8h to match the Cloudinary unstable_cache TTL in
// lib/cloudinary.ts. Serves the homepage statically from the edge so the
// Cloudinary searches inside Hero/About/FeaturedWork don't add to TTFB
// (was 47% Good in CrUX field data).
export const revalidate = 28800

export const metadata: Metadata = {
  // `absolute` bypasses the layout's `%s | Yash Makeovers` template so the
  // brand name (already at the start) isn't appended a second time.
  title: { absolute: `${site.name} — Bridal Makeup Artist in ${site.baseCity}` },
  description: `${site.name} is ${site.addressStructured.addressLocality}'s most trusted bridal makeup artist. ${site.experience} years of experience, ${site.brideCount} brides served across the GTA. Book your ${site.seasonYears} wedding date.`,
  alternates: {
    canonical: `https://${site.canonicalHost}`,
  },
}

export default async function HomePage() {
  // Pre-fetch the first before/after pair on the server so the slider has real
  // images without any client-side loading flicker.
  const firstPair = features.beforeAfter ? (await getBeforeAfterPairs())[0] : undefined

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BeautyStudio',
            name: site.name,
            telephone: site.phone,
            email: site.email,
            url: `https://${site.canonicalHost}`,
            address: {
              '@type': 'PostalAddress',
              ...site.addressStructured,
            },
            areaServed: site.seo.keywords.map((k) => k.split(' ').pop()).filter(Boolean),
            priceRange: '$$$',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: site.googleRating,
              reviewCount: site.googleReviewCount,
            },
          }),
        }}
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
      <InquiryForm />
    </>
  )
}
