// Feature toggles — edit values below to show/hide sections of the site.
//
// To flip a feature: change true → false (or vice versa), commit, push.
// Vercel auto-deploys in ~60 seconds.
//
// For urgent overrides without a code change, you can also set
//   FEATURE_<NAME>=true|false
// in Vercel env vars — env var wins over the default below.

const defaults = {
  whatsapp:          true,   // Floating WhatsApp button (bottom-right)
  featuredGrid:      true,   // Homepage "A curated selection" grid
  beforeAfter:       false,   // Transformation slider (homepage + portfolio)
  acceptingBookings: true,   // Inquiry form — false shows "not accepting" message
  blogEngine:        false,   // Weekly autonomous blog post cron
  blogNotify:        false,   // Email notification when a blog post publishes
  priceEstimator:    false,  // Homepage price calculator widget
}

// Env-var override: 'true'/'false' wins over the default. Anything else
// (empty, undefined, garbage) falls through to the default.
function flag(name: keyof typeof defaults): boolean {
  const env = process.env[`FEATURE_${name.replace(/[A-Z]/g, (c) => `_${c}`).toUpperCase()}`]
  if (env === 'true')  return true
  if (env === 'false') return false
  return defaults[name]
}

export const features = {
  whatsapp:          flag('whatsapp'),
  featuredGrid:      flag('featuredGrid'),
  beforeAfter:       flag('beforeAfter'),
  acceptingBookings: flag('acceptingBookings'),
  blogEngine:        flag('blogEngine'),
  blogNotify:        flag('blogNotify'),
  priceEstimator:    flag('priceEstimator'),
} as const

export type FeatureFlag = keyof typeof features
