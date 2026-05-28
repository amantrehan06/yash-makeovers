import type { Metadata } from 'next'
import { site } from '@/config/site'
import { content, fillTemplate } from '@/config/content'
import { getImagesFromFolder, CLOUDINARY_FOLDERS } from '@/lib/cloudinary'
import { buildCloudinaryUrl } from '@/lib/cloudinaryUrl'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { CloudinaryImage } from '@/components/ui/CloudinaryImage'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { WhyChooseItem } from '@/components/ui/WhyChooseItem'

// "10+" → 10. site.experience is a display string; schema wants a number.
const yearsInBusiness = parseInt(site.experience, 10) || undefined

export const metadata: Metadata = {
  title: `About ${site.artistName}`,
  // Artist-story angle — distinct from homepage (stats) and blog (tips).
  description: `Meet ${site.artistName}, the bridal artist behind ${site.brideCount} GTA weddings. South Asian and multicultural bridal looks, ${site.experience} years of experience, based in ${site.addressStructured.addressLocality}.`,
  alternates: { canonical: `https://${site.canonicalHost}/about` },
}

export default async function AboutPage() {
  const aboutImages = await getImagesFromFolder(CLOUDINARY_FOLDERS.about)
  const portraitPublicId = aboutImages[0]?.public_id

  const businessUrl  = `https://${site.canonicalHost}`
  const portraitUrl  = portraitPublicId
    ? buildCloudinaryUrl(portraitPublicId, { width: 800, height: 800, crop: 'fill' })
    : undefined

  // Person schema — E-E-A-T signal. Google increasingly weighs author/operator
  // identity, especially for beauty/wedding content. Description reuses
  // site.about (single source) with tokens expanded.
  const personSchema = {
    '@context':  'https://schema.org',
    '@type':     'Person',
    '@id':       `${businessUrl}/about#artist`,
    name:        site.artistName,
    ...(site.artist.fullLegalName ? { alternateName: site.artist.fullLegalName } : {}),
    jobTitle:    'Bridal Makeup Artist',
    description: fillTemplate(site.about),
    ...(portraitUrl ? { image: portraitUrl } : {}),
    knowsAbout:  site.artist.knowsAbout,
    ...(yearsInBusiness ? { hasOccupation: {
      '@type':         'Occupation',
      name:            'Bridal Makeup Artist',
      experienceRequirements: `${yearsInBusiness}+ years`,
    } } : {}),
    worksFor:    { '@type': 'BeautyStudio', '@id': `${businessUrl}#business`, name: site.name },
    address:     { '@type': 'PostalAddress', ...site.addressStructured },
    sameAs:      [
      site.instagram ? `https://www.instagram.com/${site.instagram}/` : '',
      site.facebook,
    ].filter(Boolean),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <section className="pt-32 pb-16 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            currentPath="/about"
            items={[{ label: 'Home', href: '/' }, { label: 'About' }]}
          />
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-ivory-3 sticky top-24">
            {portraitPublicId ? (
              <CloudinaryImage
                publicId={portraitPublicId}
                alt={`${site.artistName}, bridal makeup artist at ${site.name}`}
                width={720}
                height={960}
                crop="fill"
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">
                <p className="text-center px-8">
                  <span className="font-serif text-5xl block mb-3 text-gold-pale">✦</span>
                  Upload a portrait to<br />Cloudinary → yash-makeovers/about/
                </p>
              </div>
            )}
          </div>

          <div>
            <SectionHeader
              eyebrow={content.aboutPage.eyebrow}
              title={`${content.aboutPage.titlePrefix} ${site.artistName}`}
            />
            <p className="text-muted leading-relaxed whitespace-pre-line text-base mb-10">
              {fillTemplate(site.about)}
            </p>

            <div className="border-t border-ivory-4 pt-10 mb-10">
              <SectionHeader eyebrow={content.aboutPage.whyChooseEyebrow} title={content.aboutPage.whyChooseTitle} />
              <div className="grid grid-cols-1 gap-6">
                {site.whyChoose.map((item) => (
                  <WhyChooseItem key={item.title} title={item.title} body={item.body} />
                ))}
              </div>
            </div>

            <div className="border-t border-ivory-4 pt-10">
              <SectionHeader eyebrow={content.aboutPage.brandsEyebrow} title={content.aboutPage.brandsTitle} />
              <div className="flex flex-wrap gap-3">
                {site.brands.map((brand) => (
                  <span
                    key={brand}
                    className="px-4 py-2 rounded-full border border-gold-pale text-gold-dim text-sm"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            <Button href="/contact" size="lg" className="mt-10">
              {content.aboutPage.cta} {site.artistName}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
