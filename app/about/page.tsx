import type { Metadata } from 'next'
import { site } from '@/config/site'
import { content } from '@/config/content'
import { getImagesFromFolder, CLOUDINARY_FOLDERS } from '@/lib/cloudinary'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { CloudinaryImage } from '@/components/ui/CloudinaryImage'

export const metadata: Metadata = {
  title: `About ${site.artistName} | ${site.name}`,
  description: `Meet ${site.artistName} — ${site.addressStructured.addressLocality}'s most trusted bridal makeup artist with ${site.experience} years of experience and ${site.brideCount} brides served across the GTA.`,
  alternates: { canonical: `https://${site.domain}/about` },
}

export default async function AboutPage() {
  const aboutImages = await getImagesFromFolder(CLOUDINARY_FOLDERS.about)
  const portraitPublicId = aboutImages[0]?.public_id
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
              { '@type': 'ListItem', position: 2, name: 'About', item: `https://${site.domain}/about` },
            ],
          }),
        }}
      />

      <section className="pt-32 pb-16 px-6 bg-ivory">
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
              {site.about}
            </p>

            <div className="border-t border-ivory-4 pt-10 mb-10">
              <SectionHeader eyebrow={content.aboutPage.whyChooseEyebrow} title={content.aboutPage.whyChooseTitle} />
              <div className="grid grid-cols-1 gap-6">
                {site.whyChoose.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-gold mt-1 flex-shrink-0">✦</span>
                    <div>
                      <p className="font-semibold text-dark mb-1">{item.title}</p>
                      <p className="text-muted text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-ivory-4 pt-10">
              <SectionHeader eyebrow={content.aboutPage.brandsEyebrow} title={content.aboutPage.brandsTitle} />
              <div className="flex flex-wrap gap-3">
                {content.aboutPage.brands.map((brand) => (
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
