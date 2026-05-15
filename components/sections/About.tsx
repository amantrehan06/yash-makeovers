import { site } from '@/config/site'
import { images } from '@/config/images'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { CloudinaryImage } from '@/components/ui/CloudinaryImage'

export function About() {
  return (
    <section className="py-24 px-6 bg-ivory-2">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ivory-3 order-2 md:order-1">
          <CloudinaryImage
            publicId={images.about.portrait}
            alt={`${site.artistName}, bridal makeup artist at ${site.name} in ${site.baseCity}`}
            width={720}
            height={900}
            crop="fill"
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="order-1 md:order-2">
          <SectionHeader
            eyebrow={`About ${site.artistName}`}
            title="The artist behind the magic"
            subtitle=""
          />
          <p className="text-muted leading-relaxed whitespace-pre-line text-base">
            {site.about}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {site.whyChoose.map((item) => (
              <div key={item.title} className="bg-ivory rounded-xl p-4 border border-ivory-4">
                <p className="text-gold text-xs font-medium mb-1">✦</p>
                <p className="font-medium text-dark text-sm">{item.title}</p>
              </div>
            ))}
          </div>

          <Button href="/about" variant="outline" className="mt-8">
            Read the full story
          </Button>
        </div>
      </div>
    </section>
  )
}
