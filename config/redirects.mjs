// 301/302 redirects — preserve SEO equity from the legacy WordPress site
// and consolidate old paths to their new canonical URLs.
//
// Add a redirect here whenever you discover a legacy URL in Google Search
// Console ("Pages → Not indexed → Page with redirect" or "Not found 404").
// Each preserved redirect recovers backlink equity that would otherwise leak.
//
// Format mirrors Next.js's `redirects()` API — consumed in next.config.mjs.

// Each entry: { source, destination, permanent }
//   permanent: true  → 301 (search-engine-friendly, preserves SEO equity)
//   permanent: false → 302 (temporary, for non-canonical deflections)

export const redirects = [
  // ── Apex → www (301). Forces a single canonical host for every URL on
  // the site, matching <link rel="canonical">, og:url, sitemap, and schema.
  // Vercel may also enforce this at the platform level via domain settings,
  // but having it in code makes it explicit across any deploy target.
  {
    source:      '/:path*',
    destination: 'https://www.yashmakeovers.com/:path*',
    permanent:   true,
    // host condition handled in next.config.mjs (not part of the standard
    // shape) — see the spread in `next.config.mjs` redirects().
  },

  // ── Old WordPress city URLs → new dynamic city pages ──
  { source: '/bridal-hair-and-makeup-artist-in-brampton', destination: '/brampton',    permanent: true },
  { source: '/bridal-hair-and-makeup-artist-toronto',     destination: '/toronto',     permanent: true },
  { source: '/bridal-makeup-artist-mississauga',          destination: '/mississauga', permanent: true },

  // ── Removed blog posts → blog index ──
  { source: '/blog/south-asian-bridal-makeup-trends-2026', destination: '/blog', permanent: true },

  // ── Old WordPress page slugs → new pages ──
  { source: '/packages', destination: '/services', permanent: true },

  // ── Old WordPress portfolio sub-paths → portfolio index ──
  // Use :path+ (one OR MORE segments) — :path* matches zero segments
  // too, which would make /portfolio redirect to itself in a loop.
  { source: '/portfolio/:path+', destination: '/portfolio', permanent: true },

  // ── Residual WordPress admin traffic → home (302, not 301) ──
  // 302 because these paths shouldn't be indexed at all; we're not
  // canonicalizing them, just deflecting bots/scanners.
  { source: '/wp-admin',           destination: '/', permanent: false },
  { source: '/wp-content/:path*',  destination: '/', permanent: false },
  { source: '/wp-includes/:path*', destination: '/', permanent: false },
]
