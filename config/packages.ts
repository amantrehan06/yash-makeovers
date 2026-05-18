// All service packages and their pricing.
//
// Discounts: each package supports an optional `originalPrice` for promotional
// pricing. When `originalPrice` is set, the website shows it struck through
// next to the current `price`. To run a sale:
//   1. Set `originalPrice` to the old price (e.g. '$700')
//   2. Set `originalPriceValue` to the number (e.g. 700)
//   3. Optionally set `discountLabel` for a small badge (e.g. 'Spring sale')
//   4. Update `price`/`priceValue` to the new sale price
// To end the sale, remove the `originalPrice*` fields and restore `price`.

export interface Package {
  id:                  string
  name:                string
  tagline:             string
  price:               string   // What client pays now (e.g. '$600')
  priceValue:          number   // Numeric version for calculations
  priceNote:           string
  highlight:           boolean
  includes:            readonly string[]
  // ── Optional discount support ──
  originalPrice?:      string   // Shown struck-through above price (e.g. '$700')
  originalPriceValue?: number   // For calculating savings amount
  discountLabel?:      string   // Small accent text (e.g. 'Limited time')
}

export const packages: readonly Package[] = [
  {
    id: 'bridal',
    name: 'Bridal',
    tagline: 'Ceremony, Reception, Nikkah, Walima, Baraat',
    price: '$600',
    priceValue: 600,
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
    price: '$450',
    priceValue: 450,
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
    price: '$350',
    priceValue: 350,
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
    price: '$250',
    priceValue: 250,
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
