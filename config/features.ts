// Feature toggles — server-only env vars (no NEXT_PUBLIC_ prefix).
//
// Most features default to ON (opt-out): set the env var to 'false' to disable.
// Some features default to OFF (opt-in): set the env var to 'true' to enable.
// All require a redeploy to take effect.
//
// IMPORTANT: these are SERVER-ONLY env vars. In client components the
// values will always read as ON regardless of the flag — the in-component
// `if (!features.x) return null` check is defensive only. The primary
// disabling mechanism is the parent server component choosing not to
// render the optional section. See app/page.tsx and app/layout.tsx.

export const features = {
  // Opt-out (default ON):
  whatsapp:          process.env.FEATURE_WHATSAPP          !== 'false',
  featuredGrid:      process.env.FEATURE_FEATURED_GRID      !== 'false',
  beforeAfter:       process.env.FEATURE_BEFORE_AFTER       !== 'false',
  acceptingBookings: process.env.FEATURE_ACCEPTING_BOOKINGS !== 'false',
  blogEngine:        process.env.FEATURE_BLOG_ENGINE        !== 'false',
  blogNotify:        process.env.FEATURE_BLOG_NOTIFY        !== 'false',

  // Opt-in (default OFF — set env var to 'true' to enable):
  priceEstimator:    process.env.FEATURE_PRICE_ESTIMATOR    === 'true',
} as const

export type FeatureFlag = keyof typeof features
