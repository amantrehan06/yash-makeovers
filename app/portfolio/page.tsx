import type { Metadata } from 'next'
import { site } from '@/config/site'
import { features } from '@/config/features'
import { content } from '@/config/content'
import { getImagesFromFolder, getBeforeAfterPairs, CLOUDINARY_FOLDERS } from '@/lib/cloudinary'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PortfolioGrid } from './PortfolioGrid'
import { BeforeAfter } from '@/components/sections/BeforeAfter'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Portfolio',
  description: `Browse ${site.artistName}'s portfolio of bridal and event makeup looks — South Asian, multicultural, Full Glam, and more. Serving ${site.addressStructured.addressLocality} and all of the GTA.`,
  alternates: { canonical: `https://${site.canonicalHost}/portfolio` },
}

export default async function PortfolioPage() {
  // All photos live in yash-makeovers/portfolio/. Category filters (Bridal,
  // Pre-Bridal, etc.) work via Cloudinary tags. The `featured` tag controls
  // which photos appear on the homepage spotlight — doesn't affect this page.
  const [images, pairs] = await Promise.all([
    getImagesFromFolder(CLOUDINARY_FOLDERS.portfolio),
    features.beforeAfter ? getBeforeAfterPairs() : Promise.resolve([]),
  ])
  const firstPair = pairs[0]

  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            currentPath="/portfolio"
            items={[{ label: 'Home', href: '/' }, { label: 'Portfolio' }]}
          />
          <SectionHeader
            eyebrow={content.portfolioPage.eyebrow}
            title={content.portfolioPage.title}
            subtitle={content.portfolioPage.subtitle}
            centered
          />
          <PortfolioGrid images={images} />
        </div>
      </section>

      {features.beforeAfter && (
        <BeforeAfter
          beforePublicId={firstPair?.before.public_id}
          afterPublicId={firstPair?.after.public_id}
        />
      )}
    </>
  )
}
