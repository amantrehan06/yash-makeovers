import { reviews } from '@/config/reviews'
import { site } from '@/config/site'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ReviewCard } from '@/components/ui/ReviewCard'

interface Props {
  citySlug: string
  cityName: string
}

export function CityReviews({ citySlug, cityName }: Props) {
  // City-specific reviews first — fall back to most recent shown reviews if
  // fewer than 2 are tagged for this city (so no city page is ever empty).
  const cityReviews = reviews.filter(
    (r) => r.show && r.placements.includes(citySlug)
  )
  const displayed =
    cityReviews.length >= 2
      ? cityReviews.slice(0, 5)
      : [...reviews]
          .filter((r) => r.show)
          .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
          .slice(0, 5)

  return (
    <section className="py-16 px-6 bg-dark">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="Client love"
            title={`What ${cityName} brides say`}
            light
          />
          <a
            href={site.googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gold-light text-sm hover:text-gold transition-colors flex-shrink-0"
          >
            ⭐ {site.googleRating} · {site.googleReviewCount} reviews on Google →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayed.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
