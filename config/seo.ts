// ─────────────────────────────────────────────────────────────────────────
// SEO configuration — single source of truth for everything that affects
// how the site appears in Google, social shares, and AI answer engines.
//
// Kept separate from site.ts because this surface will keep growing:
//   • keyword groups (defend / head / services / longtail)
//   • per-page meta description templates
//   • per-route canonical / hreflang overrides
//   • redirect rules
//   • robots / sitemap exclusions
//   • structured-data toggles
//
// Anything in this file is consumed at BUILD or REQUEST time — no client
// bundle impact unless explicitly imported into a "use client" component.
// ─────────────────────────────────────────────────────────────────────────

import { cities } from './cities'

// City names come from config/cities.ts — add a city there and every
// city-templated keyword group picks it up automatically.
const cityNames = cities.map((c) => c.name)

export const seo = {
  // Tiered keyword groups, by intent. Google deprecated the <meta keywords>
  // tag in ~2009, so these are NOT emitted as a meta tag — they drive schema
  // (LocalBusiness `keywords`, Person `knowsAbout`) and content decisions.
  //
  // defend:   rankings we already own and must not lose (bridal × city)
  // head:     the broader head terms this rollout targets (makeup artist × city)
  // services: occasion terms matching the /party-makeup, /prom-makeup,
  //           /engagement-makeup, /photoshoot-makeup pages
  // longtail: question/comparison queries the blog engine writes against
  keywords: {
    defend: cityNames.map((c) => `bridal makeup artist ${c}`),
    head: [
      ...cityNames.map((c) => `makeup artist in ${c}`),
      ...cityNames.map((c) => `wedding makeup artist ${c}`),
      'hair and makeup artist Brampton',
    ],
    services: [
      'party makeup artist Brampton',
      'prom makeup Brampton',
      'engagement makeup artist Brampton',
      'mehndi makeup artist Brampton',
      'sangeet makeup artist',
      'jaggo makeup',
      'rokah makeup artist GTA',
      'nikkah makeup artist brampton',
      'nikkah makeup artist mississauga',
      'walima makeup artist GTA',
      'muslim bridal makeup toronto',
      'eshoot makeup artist GTA',
      'pre-wedding shoot makeup Toronto',
      'editorial makeup artist GTA',
      'brand shoot makeup Toronto',
      'South Asian bridal makeup GTA',
    ],
    longtail: [
      'bridal makeup cost Brampton',
      'bridal makeup trial Brampton',
      'airbrush vs traditional bridal makeup',
      'makeup artist near me Brampton',
    ],
  },
} as const

// Flat view for consumers that want one list (homepage LocalBusiness
// `keywords`). Order: defend first so the highest-value terms lead.
export const allKeywords: readonly string[] = [
  ...seo.keywords.defend,
  ...seo.keywords.head,
  ...seo.keywords.services,
  ...seo.keywords.longtail,
]
