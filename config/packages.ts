// All service packages and their pricing.
//
// To change a price: edit `price` (numeric). Use `formatPrice(n)` anywhere
// you want it rendered with the dollar sign.
//
// To run a discount:
//   1. Set `originalPrice` to the old price (the "before" amount)
//   2. Update `price` to the new (lower) sale price
//   3. Optionally set `discountLabel` for a small badge (e.g. 'Spring sale')
//
// To end the discount: delete `originalPrice` (or set it equal to `price`)
// and delete `discountLabel`.

export interface Package {
  id:             string
  name:           string
  tagline:        string
  price:          number              // What client pays now (e.g. 600)
  priceNote:      string
  highlight:      boolean
  includes:       readonly string[]
  // ── Optional discount support ──
  originalPrice?: number              // Shown struck-through if greater than `price`
  discountLabel?: string              // Small accent badge (empty string = no badge)
}

// Formats a number as a CAD price string with grouping. 600 → "$600", 1200 → "$1,200".
export function formatPrice(value: number): string {
  return `$${value.toLocaleString('en-CA')}`
}

export const packages: readonly Package[] = [
  {
    id: 'bridal',
    name: 'Bridal',
    tagline: 'Ceremony, Reception, Nikkah, Walima, Baraat',
    price: 600,
    priceNote: 'per person per event',
    highlight: true,
    includes: [
      'HD Waterproof Makeup',
      'Hairstyling',
      'Premium mink lashes',
      'Dupatta setting',
      'Jewelry setting',
      'Hair padding and pins',
      '30-min consultation call (3–4 weeks before)',
      'Touchup kit',
    ],
  },
  {
    id: 'pre-bridal',
    name: 'Pre-Bridal',
    tagline: 'Rokah, Jagoo, Engagement, Mehndi, Sangeet',
    price: 450,
    priceNote: 'per person per event',
    highlight: false,
    includes: [
      'HD Waterproof Makeup',
      'Hairstyling',
      'Premium mink lashes',
      'Light dupatta setting (no head cover)',
      'Hair padding and pins',
    ],
  },
  {
    id: 'full-glam',
    name: 'Full Glam',
    tagline: 'eShoot, Baby Shower, Sister/Brother Weddings',
    price: 350,
    priceNote: 'per person per event',
    highlight: false,
    includes: [
      'HD Waterproof Makeup',
      'Hairstyling',
      'Premium mink lashes',
      'Hair pins',
    ],
  },
  {
    id: 'party',
    name: 'Regular Party',
    tagline: 'Everyday events and celebrations',
    price: 250,
    priceNote: 'per person per event',
    highlight: false,
    includes: [
      'Makeup (regular finish)',
      'Regular lashes',
      'Hair pins',
      'Simple hairdo, updos, curls, basic volume',
    ],
  },
]
