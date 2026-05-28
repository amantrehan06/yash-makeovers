// Shared schema.org JSON-LD builders. Keeps schema construction in one place
// so every page emits identically-shaped structured data and a single edit
// (e.g. add a field, fix a property name) updates the whole site.
//
// Add a builder here whenever a schema type is needed on 2+ pages.

import { site } from '@/config/site'

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
