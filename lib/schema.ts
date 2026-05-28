// Shared schema.org JSON-LD builders. Keeps schema construction in one place
// so every page emits identically-shaped structured data and a single edit
// (e.g. add a field, fix a property name) updates the whole site.
//
// Add a builder here whenever a schema type is needed on 2+ pages.

import { site } from '@/config/site'
import { packages, type Package } from '@/config/packages'
import type { City } from '@/config/cities'

// Derived once at module load — refreshes on rebuild whenever packages change.
const packagePrices = packages.map((p) => p.price)
const lowPrice      = Math.min(...packagePrices)
const highPrice     = Math.max(...packagePrices)

const businessUrl = `https://${site.canonicalHost}`

export interface BreadcrumbItem {
  label: string
  href?: string  // relative ('/about') or absolute. Omit on the last (current) item.
}

/**
 * Build a schema.org BreadcrumbList from a list of {label, href} items.
 * Resolves relative hrefs against the canonical host. The last item is
 * treated as the current page — its `href` is still emitted (Google requires
 * `item` on every position).
 */
/**
 * Per-package Product + Offer schema. Emitted on /services (one per package).
 *
 * `Product` (vs `Service`) is what unlocks Google's commercial SERP rich-result
 * features — price display, "In stock" cue, AggregateRating inheritance from
 * the homepage BeautyStudio. Provider chained via @id so Google understands
 * this isn't a separate vendor.
 *
 * `priceValidUntil` is intentionally NOT emitted — the discount is open-ended
 * for now. When a real end date is set, add a `discountEndsOn` field to
 * Package and emit `priceValidUntil: pkg.discountEndsOn` conditionally below.
 * Without it, Google still ingests price + ranks the page, just no strikethrough
 * sale-urgency badge in SERP.
 */
export function buildPackageProductSchema(pkg: Package) {
  return {
    '@context':    'https://schema.org',
    '@type':       'Product',
    '@id':         `${businessUrl}/services#${pkg.id}`,
    name:          `${pkg.name} Makeup & Hair Package`,
    description:   pkg.tagline,
    brand:         { '@type': 'Brand', name: site.name },
    category:      'Bridal Makeup & Hair Service',
    offers: {
      '@type':         'Offer',
      url:             `${businessUrl}/services`,
      priceCurrency:   'CAD',
      price:           pkg.price,
      availability:    'https://schema.org/InStock',
      // Reference the studio so Google knows who's selling this.
      seller:          { '@type': 'BeautyStudio', '@id': `${businessUrl}#business` },
      priceSpecification: {
        '@type':         'UnitPriceSpecification',
        price:           pkg.price,
        priceCurrency:   'CAD',
        unitText:        pkg.priceNote, // e.g. "per person per event"
      },
    },
    // Inherit the homepage's aggregateRating via @id so each Product card in
    // SERPs can show the 4.9★ from 158 reviews — significant CTR lift.
    aggregateRating: {
      '@type':     'AggregateRating',
      ratingValue: site.googleRating,
      reviewCount: site.googleReviewCount,
    },
  }
}

/**
 * Per-city Service schema — the biggest local-SEO lever for "[service] in [city]"
 * queries. Tells Google the studio (LocalBusiness on /) explicitly serves THIS city,
 * with explicit geo coordinates representing the service area.
 *
 * Linked back to the homepage BeautyStudio via @id chain so Google understands
 * it's the same business providing the service (not a separate operation).
 *
 * Renders on each /[city] page.
 */
export function buildCityServiceSchema(city: City) {
  const cityUrl = `${businessUrl}/${city.slug}`
  return {
    '@context':    'https://schema.org',
    '@type':       'Service',
    '@id':         `${cityUrl}#service`,
    name:          `Bridal Makeup & Hair in ${city.name}`,
    serviceType:   'Bridal Makeup & Hair',
    description:   `On-location and studio bridal makeup and hair services by ${site.artistName} for brides in ${city.name}, ${city.province}.`,
    url:           cityUrl,
    provider:      { '@type': 'BeautyStudio', '@id': `${businessUrl}#business` },
    areaServed: {
      '@type': 'City',
      name:    city.name,
      address: {
        '@type':         'PostalAddress',
        addressLocality: city.name,
        addressRegion:   city.province,
        addressCountry:  site.addressStructured.addressCountry,
      },
      geo: {
        '@type':   'GeoCoordinates',
        latitude:  city.geo.latitude,
        longitude: city.geo.longitude,
      },
    },
    // Pricing range cue for SERP — derived from config/packages.ts so a
    // price change there auto-updates every city's schema.
    offers: {
      '@type':         'AggregateOffer',
      priceCurrency:   'CAD',
      lowPrice,
      highPrice,
      offerCount:      packages.length,
      availability:    'https://schema.org/InStock',
    },
  }
}

export function buildBreadcrumbSchema(items: readonly BreadcrumbItem[], currentPath: string) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => {
      const isLast = i === items.length - 1
      const href   = item.href ?? (isLast ? currentPath : '/')
      const url    = href.startsWith('http') ? href : `${businessUrl}${href}`
      return {
        '@type':  'ListItem',
        position: i + 1,
        name:     item.label,
        item:     url,
      }
    }),
  }
}
