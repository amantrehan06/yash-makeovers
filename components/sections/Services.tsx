import { packages } from '@/config/packages'
import { content } from '@/config/content'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { PackageCard } from '@/components/ui/PackageCard'

export function Services() {
  return (
    <section className="py-24 px-6 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={content.servicesSection.eyebrow}
          title={content.servicesSection.title}
          subtitle={content.servicesSection.subtitle}
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              ctaText={content.servicesSection.bookCTA}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
