import Image from 'next/image'
import { features } from '@/config/features'
import { getImagesFromFolder, CLOUDINARY_FOLDERS } from '@/lib/cloudinary'
import { buildCloudinaryUrl } from '@/lib/cloudinaryUrl'
import { site } from '@/config/site'
import { SectionHeader } from '@/components/ui/SectionHeader'

// Server component — curated photos that Yashpreet uploads manually to
// yash-makeovers/featured/. No external Instagram API. The section ends
// with a plain link out to her Instagram (no embedded feed).

export async function FeaturedWork() {
  if (!features.featuredGrid) return null

  const images = await getImagesFromFolder(CLOUDINARY_FOLDERS.featured)

  return (
    <section className="py-24 px-6 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Our work"
          title="A curated selection"
          subtitle="A handful of recent looks. For the latest, follow along on Instagram."
          centered
        />

        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-10">
            {images.map((img, i) => {
              const src = buildCloudinaryUrl(img.public_id, {
                width:   800,
                height:  800,
                crop:    'fill',
                quality: 'auto:good',
                format:  'webp',
              })
              const blurSrc = buildCloudinaryUrl(img.public_id, {
                width:   20,
                height:  20,
                crop:    'fill',
                quality: 'auto',
                format:  'webp',
              })
              return (
                <div
                  key={img.public_id}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-ivory-3"
                >
                  <Image
                    src={src}
                    alt={`${site.name} featured bridal look ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    placeholder="blur"
                    blurDataURL={blurSrc}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          // No photos uploaded yet — show 6 placeholder tiles.
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-ivory-3 flex items-center justify-center"
              >
                <span className="text-muted text-sm">Coming soon</span>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href={`https://instagram.com/${site.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-dim transition-colors font-medium"
          >
            Follow @{site.instagram} on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
