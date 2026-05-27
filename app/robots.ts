import type { MetadataRoute } from 'next'
import { site } from '@/config/site'

// Dynamic robots.txt — replaces public/robots.txt + next-sitemap output.
// Single source for sitemap URL + crawl rules.

export default function robots(): MetadataRoute.Robots {
  const base = `https://${site.canonicalHost}`
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host:    base,
  }
}
