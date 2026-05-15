import { site } from '@/config/site'
import { images } from '@/config/images'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CloudinaryImage } from '@/components/ui/CloudinaryImage'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-ivory pt-16">
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-[52fr_48fr] gap-12 items-center py-20">
        <div className="order-2 md:order-1">
          <Badge variant="gold">{site.availability}</Badge>

          <h1 className="font-serif mt-6 text-5xl md:text-display text-dark leading-tight">
            {site.tagline}
          </h1>

          <p className="mt-6 text-muted text-lg leading-relaxed max-w-lg">
            Bridal makeup artistry by {site.artistName} — serving brides across the GTA with over{' '}
            {site.experience} years of expertise and {site.brideCount} happy brides.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button href="/contact" size="lg">
              Book your date
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              View portfolio
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-ivory-4 pt-8">
            <div>
              <p className="font-serif text-4xl text-gold">{site.experience}</p>
              <p className="text-muted text-sm mt-1">Years of expertise</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-gold">{site.brideCount}</p>
              <p className="text-muted text-sm mt-1">Brides served</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-gold">⭐ {site.googleRating}</p>
              <p className="text-muted text-sm mt-1">{site.googleReviewCount} Google reviews</p>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 relative">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-ivory-3">
            <CloudinaryImage
              publicId={images.hero.main}
              alt={`${site.artistName} — bridal makeup artist in ${site.baseCity}`}
              width={720}
              height={960}
              priority
              crop="fill"
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 48vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
