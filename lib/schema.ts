// Shared schema.org JSON-LD builders. Keeps schema construction in one place
// so every page emits identically-shaped structured data and a single edit
// (e.g. add a field, fix a property name) updates the whole site.
//
// Add a builder here whenever a schema type is needed on 2+ pages.

import { site } from '@/config/site'
import { packages, getPackage, type Package } from '@/config/packages'
import { fillTemplate } from '@/config/content'
import type { City } from '@/config/cities'
import type { ServicePage } from '@/config/servicePages'

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
    category:      site.businessCategory, // matches Google Business Profile
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
    // No aggregateRating: Service isn't a supported review-snippet type and
    // self-authored ratings are disallowed. Stars come from Google Business Profile.
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

// "10+" → 10. site.experience is a display string; schema wants a number.
const yearsInBusiness = parseInt(site.experience, 10) || undefined

/**
 * Person schema for Yashpreet — E-E-A-T signal. Google increasingly weighs
 * author/operator identity, especially for beauty/wedding content. One shared
 * `@id` (`/about#artist`) on every page that emits it, so Google sees a single
 * entity. Description reuses site.about (single source) with tokens expanded;
 * expertise topics come from site.artist.knowsAbout.
 *
 * `imageUrl` is optional — /about passes its Cloudinary portrait; pages
 * without a fetched portrait omit it (Google validates "missing" cleanly).
 */
export function buildPersonSchema({ imageUrl }: { imageUrl?: string } = {}) {
  return {
    '@context':  'https://schema.org',
    '@type':     'Person',
    '@id':       `${businessUrl}/about#artist`,
    name:        site.artistName,
    ...(site.artist.fullLegalName ? { alternateName: site.artist.fullLegalName } : {}),
    jobTitle:    'Makeup Artist', // matches GBP primary category (site.businessCategory)
    description: fillTemplate(site.about),
    ...(imageUrl ? { image: imageUrl } : {}),
    knowsAbout:  site.artist.knowsAbout,
    ...(yearsInBusiness ? { hasOccupation: {
      '@type':         'Occupation',
      name:            'Makeup Artist',
      experienceRequirements: `${yearsInBusiness}+ years`,
    } } : {}),
    worksFor:    { '@type': 'BeautyStudio', '@id': `${businessUrl}#business`, name: site.name },
    address:     { '@type': 'PostalAddress', ...site.addressStructured },
    sameAs:      [
      site.instagram ? `https://www.instagram.com/${site.instagram}/` : '',
      site.facebook,
    ].filter(Boolean),
  }
}

/**
 * Per-occasion Service schema for the service pages (/party-makeup, ...).
 * Same shape family as buildCityServiceSchema: @id chained to the homepage
 * BeautyStudio, GTA-wide areaServed, and an AggregateOffer derived from the
 * page's own packageIds so a price change in config/packages.ts flows here.
 */
export function buildServicePageSchema(page: ServicePage) {
  const pageUrl      = `${businessUrl}/${page.slug}`
  const pagePackages = page.packageIds.map(getPackage)
  const prices       = pagePackages.map((p) => p.price)
  return {
    '@context':   'https://schema.org',
    '@type':      'Service',
    '@id':        `${pageUrl}#service`,
    name:         page.h1,
    serviceType:  page.serviceType,
    description:  fillTemplate(page.metaDescription),
    url:          pageUrl,
    category:     site.businessCategory,
    provider:     { '@type': 'BeautyStudio', '@id': `${businessUrl}#business` },
    areaServed:   { '@type': 'AdministrativeArea', name: 'Greater Toronto Area' },
    offers: {
      '@type':       'AggregateOffer',
      priceCurrency: 'CAD',
      lowPrice:      Math.min(...prices),
      highPrice:     Math.max(...prices),
      offerCount:    pagePackages.length,
      availability:  'https://schema.org/InStock',
    },
  }
}

/**
 * FAQPage schema from a list of {q, a} pairs. One shared builder so /services,
 * city pages, and service pages all emit the identical shape Google's Rich
 * Results Test validates. Emit at most ONE FAQPage per URL.
 */
export function buildFaqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name:    faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
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
