import type { Metadata } from 'next'
import { site } from '@/config/site'
import { features } from '@/config/features'
import { getBeforeAfterPairs } from '@/lib/cloudinary'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { TrustBar } from '@/components/sections/TrustBar'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Portfolio } from '@/components/sections/Portfolio'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { PriceEstimator } from '@/components/sections/PriceEstimator'
import { Reviews } from '@/components/sections/Reviews'
import { Cities } from '@/components/sections/Cities'
import { InquiryForm } from '@/components/sections/InquiryForm'
import { FeaturedWork } from '@/components/sections/FeaturedWork'

// Rebuild every hour so freshly uploaded Cloudinary photos appear without a
// full redeploy. Matches the cadence used on /portfolio.
export const revalidate = 3600

export const metadata: Metadata = {
  title: `${site.name} — Bridal Makeup Artist in Brampton, ON`,
  description: `${site.name} is Brampton's most trusted bridal makeup artist. 12+ years of experience, 1,500+ brides served across the GTA. Book your 2026 or 2027 wedding date.`,
  alternates: {
    canonical: `https://${site.domain}`,
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
            url: `https://${site.domain}`,
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
      <TrustBar />
      <About />
      <Services />
      <Portfolio />
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
      {features.featuredGrid && <FeaturedWork />}
    </>
  )
}
