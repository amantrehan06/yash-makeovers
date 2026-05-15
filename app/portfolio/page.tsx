import type { Metadata } from 'next'
import { site } from '@/config/site'
import { features } from '@/config/features'
import { getImagesFromFolder, getBeforeAfterPairs, CLOUDINARY_FOLDERS } from '@/lib/cloudinary'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { PortfolioGrid } from './PortfolioGrid'
import { BeforeAfter } from '@/components/sections/BeforeAfter'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Portfolio | ${site.name}`,
  description: `Browse ${site.artistName}'s portfolio of bridal and event makeup looks — South Asian, multicultural, Full Glam, and more. Serving ${site.addressStructured.addressLocality} and all of the GTA.`,
  alternates: { canonical: `https://${site.domain}/portfolio` },
}

export default async function PortfolioPage() {
  // Validated images only — wrong-shape uploads are skipped server-side with
  // a console warning that tells Yashpreet exactly what to fix.
  const [images, pairs] = await Promise.all([
    getImagesFromFolder(CLOUDINARY_FOLDERS.portfolio),
    features.beforeAfter ? getBeforeAfterPairs() : Promise.resolve([]),
  ])
  const firstPair = pairs[0]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home',      item: `https://${site.domain}` },
              { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `https://${site.domain}/portfolio` },
            ],
          }),
        }}
      />

      <section className="pt-32 pb-16 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Portfolio"
            title="The work speaks for itself"
            subtitle="Browse looks from bridal ceremonies to full glam events."
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
