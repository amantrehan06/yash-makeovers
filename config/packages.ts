// All service packages and their pricing.
//
// To change a price: edit the `price` number. Use `formatPrice(n)` anywhere
// you want it rendered with the dollar sign ('$600', '$1,200', etc.).
//
// To run a discount on a package:
//   1. Lower `price` to the new sale amount
//   2. Keep `originalPrice` at the higher (pre-discount) amount
//   3. Optionally set `discountLabel` for a small badge (e.g. 'Spring sale')
//
// To end the discount: set `originalPrice` back equal to `price` and clear
// `discountLabel` to ''. The site auto-hides both when there's no discount.
//   - Strike-through hides when originalPrice <= price
//   - Badge hides when discountLabel === ''

export interface Package {
  id:            string
  name:          string
  tagline:       string
  price:         number          // What the client pays now
  originalPrice: number          // Pre-discount price (set equal to `price` when no discount)
  discountLabel: string          // Badge text — use '' when no discount
  priceNote:     string
  highlight:     boolean
  includes:      readonly string[]
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
    originalPrice: 750,
    discountLabel: 'Limited Time',
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
    originalPrice: 600,
    discountLabel: 'Limited Time',
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
    originalPrice: 350,
    discountLabel: '',
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
    originalPrice: 250,
    discountLabel: '',
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
