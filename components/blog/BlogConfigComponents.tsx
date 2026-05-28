// Config-aware components for MDX blog posts. Posts call these by name
// and get live values from config — so a price change in packages.ts or
// site.ts auto-updates every blog post on the next deploy.
//
// Usage in MDX:
//   <PackagePrice id="bridal" />        → "$600"
//   <PackagePrice id="bridal" showOriginal />  → "~~$750~~ $600" with strike
//   <PriceTable />                       → full 4-package pricing table
//   <TravelFees />                       → inline travel fees sentence
//   <AddOnPrice id="airbrush" />         → "$40"
//   <Stat field="experience" />          → "10+"
//   <Stat field="brideCount" />          → "1,500+"
//   <CityCallout slug="brampton" />      → linked card with venues + neighborhoods

import Link from 'next/link'
import { site } from '@/config/site'
import { packages, getPackage, formatPrice, type Package } from '@/config/packages'
import { cities } from '@/config/cities'

// ─────────────────────────────────────────────────────────────────────
// PackagePrice — single inline price
// ─────────────────────────────────────────────────────────────────────

export function PackagePrice({
  id,
  showOriginal = false,
}: {
  id:             string
  showOriginal?:  boolean
}) {
  const pkg = getPackage(id)
  if (!showOriginal || pkg.originalPrice <= pkg.price) {
    return <strong>{formatPrice(pkg.price)}</strong>
  }
  return (
    <span>
      <span className="line-through text-muted-2 mr-1.5">{formatPrice(pkg.originalPrice)}</span>
      <strong>{formatPrice(pkg.price)}</strong>
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────
// PriceTable — full pricing table generated from packages config
// ─────────────────────────────────────────────────────────────────────

export function PriceTable() {
  return (
    <div className="my-8 border border-ivory-4 rounded-2xl overflow-hidden not-prose">
      <table className="w-full text-sm">
        <thead className="bg-ivory-2">
          <tr className="text-left text-dark">
            <th className="px-5 py-3 font-semibold">Package</th>
            <th className="px-5 py-3 font-semibold">Best for</th>
            <th className="px-5 py-3 font-semibold text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg: Package, i) => (
            <tr
              key={pkg.id}
              className={`${i < packages.length - 1 ? 'border-b border-ivory-4' : ''} ${
                pkg.highlight ? 'bg-gold/5' : ''
              }`}
            >
              <td className="px-5 py-4 align-top">
                <p className="text-dark font-medium">{pkg.name}</p>
                {pkg.highlight && (
                  <p className="text-xs uppercase tracking-widest text-gold mt-0.5">Most popular</p>
                )}
              </td>
              <td className="px-5 py-4 align-top text-muted text-sm">{pkg.tagline}</td>
              <td className="px-5 py-4 align-top text-right whitespace-nowrap">
                {pkg.originalPrice > pkg.price ? (
                  <>
                    <span className="line-through text-muted-2 text-xs mr-1">
                      {formatPrice(pkg.originalPrice)}
                    </span>
                    <strong className="text-dark">{formatPrice(pkg.price)}</strong>
                  </>
                ) : (
                  <strong className="text-dark">{formatPrice(pkg.price)}</strong>
                )}
                <p className="text-xs text-muted-2 mt-0.5">{pkg.priceNote}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// TravelFees — inline sentence with current Peel + GTA travel fees
// ─────────────────────────────────────────────────────────────────────

export function TravelFees() {
  return (
    <>
      <strong>{formatPrice(site.policies.travelPeel)}</strong> within Peel Region (Brampton, Mississauga) and{' '}
      <strong>{formatPrice(site.policies.travelGTA)}</strong> for the wider GTA
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────
// AddOnPrice — single add-on price from policies.addOns
// ─────────────────────────────────────────────────────────────────────

export function AddOnPrice({ id }: { id: keyof typeof site.policies.addOns }) {
  const addOn = site.policies.addOns[id]
  return <strong>{formatPrice(addOn.fee)}</strong>
}

// ─────────────────────────────────────────────────────────────────────
// Stat — site-level numeric facts (experience, brideCount, rating, etc.)
// ─────────────────────────────────────────────────────────────────────

const STAT_MAP = {
  experience:       () => site.experience,
  brideCount:       () => site.brideCount,
  rating:           () => site.googleRating,
  reviewCount:      () => site.googleReviewCount,
  artistName:       () => site.artistName,
  baseCity:         () => site.baseCity,
  depositPercent:   () => `${site.policies.depositPercent}%`,
  trialFee:         () => site.policies.trial.feeText,
  earlyMorningFee:  () => formatPrice(site.policies.earlyMorningFee),
  earlyMorningTime: () => site.policies.earlyMorningThreshold,
  seasonYears:      () => site.seasonYears,
} as const

export function Stat({ field }: { field: keyof typeof STAT_MAP }) {
  const value = STAT_MAP[field]()
  return <strong>{value}</strong>
}

// ─────────────────────────────────────────────────────────────────────
// CityCallout — linked card pointing to a /[city] page with quick facts
// Used inside blog posts to drive internal link equity to city pages.
// ─────────────────────────────────────────────────────────────────────

export function CityCallout({ slug }: { slug: string }) {
  const city = cities.find((c) => c.slug === slug)
  if (!city) return null

  return (
    <Link
      href={`/${city.slug}`}
      className="not-prose block my-8 p-6 rounded-2xl border border-gold-pale bg-ivory-2 hover:border-gold transition-colors"
    >
      <p className="text-xs uppercase tracking-widest text-gold mb-2">Serving {city.name}</p>
      <p className="font-serif text-2xl text-dark mb-2">
        Bridal makeup and hair in {city.name}
      </p>
      <p className="text-muted text-sm leading-relaxed mb-3">{city.subtitle}</p>
      {city.neighborhoods.length > 0 && (
        <p className="text-xs text-muted-2">
          <span className="font-medium text-dark">Neighbourhoods served:</span>{' '}
          {city.neighborhoods.slice(0, 5).join(' · ')}
        </p>
      )}
      <p className="text-gold text-sm font-medium mt-4">See the {city.name} page →</p>
    </Link>
  )
}
