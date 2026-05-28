import { reviews } from '@/config/reviews'
import { site } from '@/config/site'
import { content } from '@/config/content'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ReviewCard } from '@/components/ui/ReviewCard'

export function Reviews() {
  return (
    <section className="py-24 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow={content.reviewsSection.eyebrow}
            title={content.reviewsSection.title}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
