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
 * Per-package Service schema. Emitted on /services (one per package).
 *
 * Bridal makeup is a SERVICE (performed for the client) — not a Product
 * (physical good you ship). Service is the semantically correct schema.org
 * type per Google's spec. Don't be tempted to switch to Product just to
 * chase SERP price-card rich results — Google's structured-data guidelines
 * specifically warn against mistyping services as products.
 *
 * The schema still includes the high-value improvements: @id chaining to
 * homepage BeautyStudio (so Google sees it's the same operation),
 * AggregateRating inheritance (4.9★ from 158 reviews surfaces in SERP),
 * availability cue, and explicit areaServed.
 *
 * `priceValidUntil` is intentionally NOT emitted — the discount is open-ended.
 * If a real end date is added later, include it via an optional
 * `discountEndsOn?: string` field on Package and emit conditionally below.
 */
export function buildPackageServiceSchema(pkg: Package) {
  return {
    '@context':    'https://schema.org',
    '@type':       'Service',
    '@id':         `${businessUrl}/services#${pkg.id}`,
    name:          `${pkg.name} Makeup & Hair`,
    description:   pkg.tagline,
    serviceType:   'Bridal Makeup & Hair',
    category:      'Bridal Beauty Service',
    provider:      { '@type': 'BeautyStudio', '@id': `${businessUrl}#business` },
    areaServed:    { '@type': 'AdministrativeArea', name: 'Greater Toronto Area' },
    offers: {
      '@type':         'Offer',
      url:             `${businessUrl}/services`,
      priceCurrency:   'CAD',
      price:           pkg.price,
      availability:    'https://schema.org/InStock',
      priceSpecification: {
        '@type':         'UnitPriceSpecification',
        price:           pkg.price,
        priceCurrency:   'CAD',
        unitText:        pkg.priceNote, // e.g. "per person per event"
      },
    },
    // Inherit the homepage's aggregateRating so each Service entry can
    // surface the 4.9★ rating in SERP enrichments.
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
