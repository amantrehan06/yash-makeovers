// ─────────────────────────────────────────────────────────────────────────
// SEO configuration — single source of truth for everything that affects
// how the site appears in Google, social shares, and AI answer engines.
//
// Kept separate from site.ts because this surface will keep growing:
//   • keyword groups (services, styles, events, locations, near-me)
//   • per-page meta description templates
//   • per-route canonical / hreflang overrides
//   • redirect rules
//   • robots / sitemap exclusions
//   • structured-data toggles
//
// Anything in this file is consumed at BUILD or REQUEST time — no client
// bundle impact unless explicitly imported into a "use client" component.
// ─────────────────────────────────────────────────────────────────────────

export const seo = {
  // Primary keywords — currently used by the homepage LocalBusiness
  // `areaServed` schema (app/page.tsx). Google deprecated the <meta keywords>
  // tag in ~2009, so these are NOT emitted as a meta tag. They drive content
  // and schema instead.
  //
  // When expanding: prefer to group by intent (services / styles / events /
  // cities) rather than a flat list — see the "Grouped structure" discussion
  // in the SEO plan for how to wire grouped keywords into anchor text and
  // schema simultaneously.
  keywords: [
    'bridal makeup artist Brampton',
    'bridal makeup Toronto',
    'South Asian bridal makeup GTA',
    'makeup artist near me Brampton',
    'wedding makeup artist Mississauga',
  ],
} as const
