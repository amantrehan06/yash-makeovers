import { type Package, formatPrice } from '@/config/packages'
import { content } from '@/config/content'
import { Button } from '@/components/ui/Button'

// Reusable package/pricing card. Used on:
//   • homepage Services section (full — with includes list + popular badge)
//   • /services page (full — with includes list + popular badge)
//   • /[city] page (compact — no includes list, smaller padding, city-specific CTA)
//
// Edit the visual treatment here once and every package grid on the site
// updates. The `Package` data model is owned by config/packages.ts.

export interface PackageCardProps {
  pkg:              Package
  ctaHref?:         string   // defaults to '/contact'
  ctaText:          string   // required — varies per page (e.g. "Book in Brampton")
  showIncludes?:    boolean  // defaults true. City pages set false for a denser grid.
  showPopularBadge?:boolean  // defaults true. Hide on contexts that don't need the visual emphasis.
  compact?:         boolean  // defaults false. Smaller text + tighter padding for city pages.
}

export function PackageCard({
  pkg,
  ctaHref          = '/contact',
  ctaText,
  showIncludes     = true,
  showPopularBadge = true,
  compact          = false,
}: PackageCardProps) {
  const padding   = compact ? 'p-6' : 'p-7'
  const priceSize = compact ? 'text-3xl' : 'text-4xl'

  return (
    <div
      className={`relative rounded-2xl ${padding} flex flex-col ${
        pkg.highlight
          ? 'bg-dark text-ivory border border-dark-3'
          : 'bg-ivory-2 text-dark border border-ivory-4'
      }`}
    >
      {showPopularBadge && pkg.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ivory text-xs px-4 py-1 rounded-full font-medium">
          {content.servicesSection.popularBadge}
        </span>
      )}

      <p className={`text-xs uppercase tracking-widest mb-2 ${pkg.highlight ? 'text-gold-light' : 'text-gold'}`}>
        {pkg.name}
      </p>

      {pkg.originalPrice > pkg.price && (
        <p className={`text-sm mb-1 ${pkg.highlight ? 'text-ivory-3' : 'text-muted'}`}>
          <span className="price-strike">{formatPrice(pkg.originalPrice)}</span>
        </p>
      )}

      <div className="flex items-baseline gap-2 mb-1">
        <p className={`font-serif ${priceSize} ${pkg.highlight ? 'text-ivory' : 'text-dark'}`}>
          {formatPrice(pkg.price)}
        </p>
        {pkg.discountLabel && (
          <span className="text-xs uppercase tracking-widest text-gold font-medium">
            {pkg.discountLabel}
          </span>
        )}
      </div>
      {pkg.discountNote && (
        <p className={`text-xs mb-1 ${pkg.highlight ? 'text-ivory-4' : 'text-muted'}`}>
          {pkg.discountNote}
        </p>
      )}

      <p className={`text-xs mb-4 ${pkg.highlight ? 'text-ivory-4' : 'text-muted'}`}>
        {pkg.priceNote}
      </p>

      <p className={`text-sm leading-relaxed mb-6 ${pkg.highlight ? 'text-ivory-3' : 'text-muted'}`}>
        {pkg.tagline}
      </p>

      {showIncludes && (
        <ul className="flex flex-col gap-2.5 mt-auto">
          {pkg.includes.map((item) => (
            <li
              key={item}
              className={`text-sm flex gap-2 items-start ${pkg.highlight ? 'text-ivory-3' : 'text-muted'}`}
            >
              <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      <Button
        href={ctaHref}
        variant={pkg.highlight ? 'primary' : 'outline'}
        className={`${showIncludes ? 'mt-8' : 'mt-auto'} w-full justify-center`}
      >
        {ctaText}
      </Button>
    </div>
  )
}
