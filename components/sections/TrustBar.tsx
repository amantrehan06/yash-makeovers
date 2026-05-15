import { site } from '@/config/site'

const stats = [
  { value: site.experience, label: 'Years of expertise', icon: '✦' },
  { value: site.brideCount, label: 'Happy brides', icon: '✦' },
  { value: `${site.googleRating} Stars`, label: `${site.googleReviewCount} Google reviews`, icon: '⭐' },
  { value: 'GTA-wide', label: '10 cities served', icon: '✦' },
]

export function TrustBar() {
  return (
    <section className="bg-dark-2 py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-gold text-xs mb-1">{stat.icon}</p>
            <p className="font-serif text-3xl text-ivory">{stat.value}</p>
            <p className="text-muted-2 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
