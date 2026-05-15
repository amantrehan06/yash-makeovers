import { reviews } from '@/config/reviews'
import { site } from '@/config/site'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function Reviews() {
  return (
    <section className="py-24 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Client love"
            title="What brides are saying"
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
            <div key={review.id} className="bg-dark-2 rounded-2xl p-8 border border-dark-3">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-gold text-sm">⭐</span>
                ))}
              </div>
              <p className="text-ivory-3 text-sm leading-relaxed mb-6">
                &ldquo;{review.body}&rdquo;
              </p>
              <p className="text-ivory font-medium text-sm">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
