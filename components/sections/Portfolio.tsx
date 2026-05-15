import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'

const placeholderImages = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  aspect: i % 3 === 0 ? 'aspect-[3/4]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[4/5]',
}))

export function Portfolio() {
  return (
    <section className="py-24 px-6 bg-ivory-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Portfolio"
            title="The work speaks for itself"
            subtitle="A curated selection of bridal and event looks."
          />
          <Button href="/portfolio" variant="outline" className="flex-shrink-0">
            View full portfolio →
          </Button>
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {placeholderImages.map((img) => (
            <div
              key={img.id}
              className={`${img.aspect} w-full rounded-xl overflow-hidden bg-ivory-3 break-inside-avoid flex items-center justify-center`}
            >
              <p className="text-center text-muted text-xs px-4">
                <span className="font-serif text-3xl block mb-2 text-gold-pale">✦</span>
                Portfolio image {img.id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
