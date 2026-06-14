// Config-aware components for MDX blog posts — live values from config so a
// price/stat change propagates to every post on the next deploy.

import Link from 'next/link'
import { site } from '@/config/site'
import { fillTemplate } from '@/config/content'
import { packages, getPackage, formatPrice, type Package } from '@/config/packages'
import { cities } from '@/config/cities'

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

export function TravelFees() {
  return (
    <>
      <strong>{formatPrice(site.policies.travelPeel)}</strong> within Peel Region (Brampton, Mississauga) and{' '}
      <strong>{formatPrice(site.policies.travelGTA)}</strong> for the wider GTA
    </>
  )
}

export function AddOnPrice({ id }: { id: keyof typeof site.policies.addOns }) {
  const addOn = site.policies.addOns[id]
  return <strong>{formatPrice(addOn.fee)}</strong>
}

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

export function IndustryRange() {
  return (
    <strong>
      {formatPrice(site.industryPricing.bridalRangeLow)}-
      {formatPrice(site.industryPricing.bridalRangeHigh)}
    </strong>
  )
}

// Linked card to a /[city] page — drives internal link equity from posts.
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
      <p className="text-muted text-sm leading-relaxed mb-3">{fillTemplate(city.subtitle)}</p>
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
