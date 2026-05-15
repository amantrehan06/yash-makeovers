// Feature toggles — server-only env vars (no NEXT_PUBLIC_ prefix).
//
// All features default to ON. To turn one off, set the matching env var
// to the literal string 'false' (lowercase) in Vercel and redeploy.
//
// IMPORTANT: these are SERVER-ONLY env vars. In client components the
// values will always read as ON regardless of the flag — the in-component
// `if (!features.x) return null` check is defensive only. The primary
// disabling mechanism is the parent server component choosing not to
// render the optional section. See app/page.tsx and app/layout.tsx.

export const features = {
  whatsapp:          process.env.FEATURE_WHATSAPP          !== 'false',
  featuredGrid:      process.env.FEATURE_FEATURED_GRID      !== 'false',
  beforeAfter:       process.env.FEATURE_BEFORE_AFTER       !== 'false',
  priceEstimator:    process.env.FEATURE_PRICE_ESTIMATOR    !== 'false',
  acceptingBookings: process.env.FEATURE_ACCEPTING_BOOKINGS !== 'false',
  blogEngine:        process.env.FEATURE_BLOG_ENGINE        !== 'false',
  blogNotify:        process.env.FEATURE_BLOG_NOTIFY        !== 'false',
} as const

export type FeatureFlag = keyof typeof features
