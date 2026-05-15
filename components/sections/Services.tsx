import { packages } from '@/config/packages'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'

export function Services() {
  return (
    <section className="py-24 px-6 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Services & Pricing"
          title="Packages crafted for every occasion"
          subtitle="From the bridal ceremony to intimate celebrations — every look is designed to last all day."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl p-7 flex flex-col ${
                pkg.highlight
                  ? 'bg-dark text-ivory border border-dark-3'
                  : 'bg-ivory-2 text-dark border border-ivory-4'
              }`}
            >
              {pkg.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ivory text-xs px-4 py-1 rounded-full font-medium">
                  Most popular
                </span>
              )}

              <p
                className={`text-xs uppercase tracking-widest mb-2 ${
                  pkg.highlight ? 'text-gold-light' : 'text-gold'
                }`}
              >
                {pkg.name}
              </p>
              <p
                className={`font-serif text-4xl mb-1 ${
                  pkg.highlight ? 'text-ivory' : 'text-dark'
                }`}
              >
                {pkg.price}
              </p>
              <p
                className={`text-xs mb-4 ${pkg.highlight ? 'text-ivory-4' : 'text-muted'}`}
              >
                {pkg.priceNote}
              </p>
              <p
                className={`text-sm leading-relaxed mb-6 ${
                  pkg.highlight ? 'text-ivory-3' : 'text-muted'
                }`}
              >
                {pkg.tagline}
              </p>

              <ul className="flex flex-col gap-2.5 mt-auto">
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className={`text-sm flex gap-2 items-start ${
                      pkg.highlight ? 'text-ivory-3' : 'text-muted'
                    }`}
                  >
                    <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                href="/contact"
                variant={pkg.highlight ? 'primary' : 'outline'}
                className="mt-8 w-full justify-center"
              >
                Book this package
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-muted text-sm mt-8">
          All packages include travel within the GTA. Early morning fee of $100/person applies for 4:30–6:00 AM start times.
        </p>
      </div>
    </section>
  )
}
