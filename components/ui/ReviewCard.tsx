import type { Review } from '@/config/reviews'

// Single review card — dark theme (designed for placement on bg-dark sections).
// Used on the homepage Reviews section and city page reviews block. The outer
// section/grid/heading stay where they are; this component owns just the card.

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-dark-2 rounded-2xl p-8 border border-dark-3">
      <div className="flex gap-1 mb-4" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <span key={i} aria-hidden className="text-gold text-sm">⭐</span>
        ))}
      </div>
      <p className="text-ivory-3 text-sm leading-relaxed mb-6">
        &ldquo;{review.body}&rdquo;
      </p>
      <p className="text-ivory font-medium text-sm">{review.author}</p>
    </div>
  )
}
