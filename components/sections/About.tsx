import { site } from '@/config/site'
import { content, fillTemplate } from '@/config/content'
import { getImagesFromFolder, CLOUDINARY_FOLDERS } from '@/lib/cloudinary'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { CloudinaryImage } from '@/components/ui/CloudinaryImage'

// Async server component — picks up whatever photo Yashpreet uploads to
// yash-makeovers/about/, regardless of filename. First photo wins.
export async function About() {
  const aboutImages = await getImagesFromFolder(CLOUDINARY_FOLDERS.about)
  const portraitPublicId = aboutImages[0]?.public_id

  return (
    <section className="py-24 px-6 bg-ivory-2">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ivory-3 order-2 md:order-1">
          {portraitPublicId ? (
            <CloudinaryImage
              publicId={portraitPublicId}
              alt={`${site.artistName}, bridal makeup artist at ${site.name} in ${site.baseCity}`}
              width={480}
              height={600}
              crop="fill"
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 92vw, 480px"
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

        <div className="order-1 md:order-2">
          <SectionHeader
            eyebrow={`About ${site.artistName}`}
            title={content.aboutSection.title}
            subtitle=""
          />
          <p className="text-muted leading-relaxed whitespace-pre-line text-base">
            {fillTemplate(site.about)}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {site.whyChoose.map((item) => (
              <div key={item.title} className="bg-ivory rounded-xl p-4 border border-ivory-4">
                <p className="text-gold text-xs font-medium mb-1">✦</p>
                <p className="font-medium text-dark text-sm">{fillTemplate(item.title)}</p>
              </div>
            ))}
          </div>

          <Button href="/about" variant="outline" className="mt-8">
            {content.aboutSection.readMoreCTA}
          </Button>
        </div>
      </div>
    </section>
  )
}
