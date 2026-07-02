import { site } from '@/config/site'
import { content } from '@/config/content'
import { getImagesFromFolder, CLOUDINARY_FOLDERS } from '@/lib/cloudinary'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CloudinaryImage } from '@/components/ui/CloudinaryImage'

// Async server component — picks up whatever photo Yashpreet uploads to
// yash-makeovers/hero/, regardless of filename. First photo wins.
export async function Hero() {
  const heroImages = await getImagesFromFolder(CLOUDINARY_FOLDERS.hero)
  const heroPublicId = heroImages[0]?.public_id

  return (
    <section className="relative min-h-screen flex items-center bg-ivory pt-16">
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-[52fr_48fr] gap-12 items-center py-20">
        <div className="order-2 md:order-1">
          <Badge variant="gold">{site.availability}</Badge>

          <h1 className="font-serif mt-6 text-5xl md:text-display text-dark leading-tight">
            {site.tagline}
          </h1>

          <p className="mt-6 text-muted text-lg leading-relaxed max-w-lg">
            Bridal makeup artistry by {site.artistName}, serving brides across the GTA with over{' '}
            {site.experience} years of expertise and {site.brideCount} happy brides.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button href="/contact" size="lg">
              {content.hero.ctaPrimary}
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              {content.hero.ctaSecondary}
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-ivory-4 pt-8">
            <div>
              <p className="font-serif text-4xl text-gold">{site.experience}</p>
              <p className="text-muted text-sm mt-1">{content.hero.statExperience}</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-gold">{site.brideCount}</p>
              <p className="text-muted text-sm mt-1">{content.hero.statBrides}</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-gold">⭐ {site.googleRating}</p>
              <p className="text-muted text-sm mt-1">{site.googleReviewCount} {content.hero.statReviews}</p>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 relative">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-ivory-3">
            {heroPublicId ? (
              <CloudinaryImage
                publicId={heroPublicId}
                alt={`${site.artistName}, bridal makeup artist in ${site.baseCity}`}
                width={480}
                height={640}
                priority
                crop="fill"
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 92vw, 480px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">
                <p className="text-center px-8">
                  <span className="font-serif text-5xl block mb-3 text-gold-pale">✦</span>
                  Upload a hero photo to<br />Cloudinary → yash-makeovers/hero/
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
