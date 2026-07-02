import type { MetadataRoute } from 'next'
import { site } from '@/config/site'
import { cities } from '@/config/cities'
import { servicePages } from '@/config/servicePages'
import { getAllPosts } from '@/lib/blog'

// Dynamic sitemap — replaces next-sitemap (which baked the same lastmod
// into every URL). Per-URL lastmod + priority help Google decide what to
// recrawl first and which pages matter most.
//
// Edit a page's relative weight by adjusting `priority` (0.0-1.0).
// changeFrequency is a hint, not a guarantee — Google ignores it for
// large sites but small/medium sites still benefit.

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.canonicalHost}`
  const now  = new Date()

  // ── Static high-value pages ────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/services`,            lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/portfolio`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/about`,               lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${base}/terms-and-conditions`,lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // ── Occasion service pages (party / prom / engagement / photoshoot) ──
  // Driven by config/servicePages.ts — add a page there and it appears here.
  const serviceRoutes: MetadataRoute.Sitemap = servicePages.map((p) => ({
    url:             `${base}/${p.slug}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.85,
  }))

  // ── City pages (and their /work archives where contentBlocks exist) ──
  // City pages are the heart of local-SEO; weight them just under home/services.
  const cityPages: MetadataRoute.Sitemap = cities.flatMap((c) => {
    const entries: MetadataRoute.Sitemap = [
      {
        url:             `${base}/${c.slug}`,
        lastModified:    now,
        changeFrequency: 'weekly',
        priority:        c.isHome ? 0.95 : 0.85,
      },
    ]
    if (c.contentBlocks.length > 0) {
      // Use the freshest content-block date as lastModified for the /work
      // archive — Google sees real freshness when you add a case study.
      const newest = c.contentBlocks
        .map((b) => b.date)
        .sort()
        .at(-1)
      entries.push({
        url:             `${base}/${c.slug}/work`,
        lastModified:    newest ? new Date(newest) : now,
        changeFrequency: 'monthly',
        priority:        0.6,
      })
    }
    return entries
  })

  // ── Blog posts (real per-post lastmod from frontmatter) ──
  // Falls back to the publish date when `updated` isn't set yet.
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url:             `${base}/blog/${p.slug}`,
    lastModified:    new Date(p.updated ?? p.date),
    changeFrequency: 'monthly',
    priority:        0.5,
  }))

  return [...staticPages, ...serviceRoutes, ...cityPages, ...blogPages]
}
