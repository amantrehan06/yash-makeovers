import Link from 'next/link'
import { cities } from '@/config/cities'
import { site } from '@/config/site'
import { content } from '@/config/content'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function Cities() {
  return (
    <section className="py-24 px-6 bg-ivory-2">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={content.citiesSection.eyebrow}
          title={content.citiesSection.title}
          subtitle={`${site.artistName} travels to your venue, wherever your celebration takes you.`}
          centered
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-12">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-ivory border border-ivory-4 p-6 text-center hover:border-gold hover:shadow-md transition-all"
            >
              <p className="text-gold text-lg mb-2">✦</p>
              <p className="font-medium text-dark group-hover:text-gold transition-colors">
                {city.name}
              </p>
              <p className="text-muted-2 text-xs mt-1">{city.province}</p>
              {city.isHome && (
                <span className="absolute top-2 right-2 text-xs bg-gold-pale text-gold-dim px-2 py-0.5 rounded-full">
                  {content.citiesSection.homeBaseLabel}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
