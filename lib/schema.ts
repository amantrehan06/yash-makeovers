// Shared schema.org JSON-LD builders. Keeps schema construction in one place
// so every page emits identically-shaped structured data and a single edit
// (e.g. add a field, fix a property name) updates the whole site.
//
// Add a builder here whenever a schema type is needed on 2+ pages.

import { site } from '@/config/site'
import { packages } from '@/config/packages'
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
