// Studio address as a single source of truth. `address` (display string) is
// derived from the structured parts below — edit any field once and both
// the display string and the schema.org address update.
const addressStructured = {
  streetAddress:   '27 Divinity Circle',
  addressLocality: 'Brampton',
  addressRegion:   'ON',
  postalCode:      'L7A 3Y3',
  addressCountry:  'CA',
} as const

export const site = {
  name: 'Yash Makeovers',
  artistName: 'Yashpreet',
  // Business category — must match the primary category on your Google
  // Business Profile (Google cross-references these). Surfaces in schema
  // `category` fields and SERP knowledge cards. Change here AND in GBP if
  // you ever rebrand (don't drift — Google notices).
  businessCategory: 'Make-up artist',
  tagline: 'Your most beautiful moment',
  phone: '+1 (647) 654-7288',
  whatsapp: '16476547288',
  email: 'info@yashmakeovers.com',
  // Derived — never edit directly. Update `addressStructured` instead.
  address: `${addressStructured.streetAddress}, ${addressStructured.addressLocality} ${addressStructured.addressRegion} ${addressStructured.postalCode}`,
  addressStructured,

  // ── Geo coordinates (LocalBusiness schema — critical for local pack ranking) ──
  // Get from: maps.google.com → search the studio → right-click the pin →
  // click the "lat, lng" line at the top to copy. Paste here as numbers.
  geo: {
    latitude:  43.69394533368765,   // ← FILL e.g. 43.7315
    longitude: -79.85042919000966,   // ← FILL e.g. -79.7624
  },

  // ── Opening hours (LocalBusiness schema → eligible for SERP hours panel) ──
  // Use 24-hr "HH:MM". One entry per day-group with identical hours.
  // If you're strictly by-appointment-only, replace the array with:
  //   hours: 'by-appointment' as const,
  hours: [
    { days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '06:00', closes: '22:00' },
  ],

  // Derived from addressStructured — "Brampton, ON". Single source: edit the
  // address fields above and this updates everywhere ({baseCity} token, schema, meta).
  baseCity: `${addressStructured.addressLocality}, ${addressStructured.addressRegion}`,
  // Brand-level service area (GTA-wide) vs baseCity (the home studio). Used for
  // homepage positioning so the brand reads area-wide, while city pages target
  // each city specifically.
  serviceArea:     'the GTA',
  serviceAreaFull: 'the Greater Toronto Area',
  // Bare apex — used for display contexts (footer text, OG image, signatures)
  // and email FROM addresses where 'www.' looks awkward.
  domain: 'yashmakeovers.com',
  // Canonical hostname the site actually serves at. Used for every URL that
  // ends up in <link rel="canonical">, og:url, schema.org @id fields,
  // breadcrumbs, metadataBase, and the sitemap. Must match the host clients
  // resolve to (apex 301s to this).
  canonicalHost: 'www.yashmakeovers.com',
  instagram: 'yashmakeovers',
  facebook: 'https://facebook.com/yashmakeovers',
  googleBusiness: 'https://share.google/YFKrusBaeZJoi0d3b',
  // Read from env so it can be updated in Vercel without code changes.
  // (NEXT_PUBLIC_ vars are inlined at build — Vercel auto-rebuilds on env change.)
  availability: process.env.NEXT_PUBLIC_AVAILABILITY_MSG ?? 'Now booking 2026 & 2027 weddings',
  // Single source of truth for stats that change over time. Update these
  // values and the entire site (meta descriptions, city intros, body copy)
  // refreshes via fillTemplate() — no string hunting required.
  experience:        '10+',         // {experience} token
  brideCount:        '2,000+',      // {brides} token
  googleRating:      '4.9',         // {rating} token
  googleReviewCount: '162',         // {reviewCount} token
  seasonYears:       '2026 & 2027', // {seasonYears} token — bump yearly

  about: `With {experience} years of experience and {brides} brides transformed across the GTA,
{artistName} brings an unmatched blend of artistry and calm to every appointment.
Her journey began with a deep love for makeup and a belief that every woman deserves
to feel like the most radiant version of herself on her wedding day. Specialising in
South Asian and multicultural bridal looks, she has become the most trusted name for
brides in Brampton, Mississauga, Toronto, and beyond, known not just for flawless results,
but for making every bride feel comfortable, confident, and truly seen.`,

  whyChoose: [
    {
      title: '{experience} Years of Expertise',
      body:  'Over a decade perfecting bridal artistry. You are in the most experienced hands in the GTA.',
    },
    {
      title: '{brides} Brides Served',
      body:  'Trusted by {brides} brides with unique beauty needs, skin tones, and wedding visions.',
    },
    {
      title: 'Luxury Products Only',
      body:  '{brands}: professional-grade products for a flawless, lasting finish.',
    },
    {
      title: 'Exceptional Reviews',
      body:  '{rating} stars across {reviewCount} Google reviews, built entirely on word-of-mouth from happy brides.',
    },
  ],

  policies: {
    // ── Pricing & operational fees (used by FAQ, PriceEstimator, InquiryForm) ──
    depositPercent: 30,
    travelPeel:     75,
    travelGTA:      150,
    earlyMorningFee:       100,
    earlyMorningThreshold: '4:30 to 6:00 AM',

    // ── Optional add-ons (used by FAQ, services page, estimator) ──
    // Single source of truth for every à-la-carte service. Edit a price here
    // and it propagates to FAQ answers and any future add-on UI.
    addOns: {
      airbrush:              { fee: 40, label: 'Airbrush application' },
      clientHairExtensions:  { fee: 35, label: "Client's own hair extension application" },
      studioHairExtensions:  { fee: 75, label: 'Studio-provided hair extensions', unit: 'per extension' },
      blowDryWetHair:        { fee: 20, label: 'Blow-dry on wet hair' },
      bridalDupattaSetting:  { fee: 50, label: 'Bridal dupatta setting' },
      partyDupattaSetting:   { fee: 30, label: 'Party dupatta setting' },
      jewelrySetting:        { fee: 20, label: 'Jewelry setting' },
      premiumMinkLashes:     { fee: 20, label: 'Premium mink lashes' },
      touchupKit:            { fee: 25, label: 'Touchup kit' },
    },

    // ── Consultation phone call ──
    // Standard process — included with Bridal and Pre-Bridal packages.
    consultation: {
      description: 'Consultation calls are reserved for Bridal and Pre-Bridal packages. Please reach out 2-3 weeks prior to your event date to schedule the call. Prepare your questions and inspiration pictures in advance, ideally when your outfit and jewelry are ready for discussion.',
      timing:      '2-3 weeks prior to event date',
      eligibility: ['Bridal', 'Pre-Bridal'],
    },

    // ── Optional makeup-only trial ──
    // Separate from the consultation phone call — pre-event makeup test.
    trial: {
      fee:             250,
      feeText:         '$250',
      scheduling:      'Within 2-3 business days of booking confirmation, subject to availability.',
      refundCondition: 'If you decide not to proceed after the trial, the deposit for the main event dates is fully refundable, provided the trial is booked immediately following the booking. If the trial is scheduled at a later date, the deposit becomes non-refundable.',
    },

    // ── Formal Terms & Conditions ──
    // Rendered as a structured page at /terms-and-conditions. Each section
    // below maps 1:1 to a numbered heading on the page.
    terms: {
      // 1. Punctuality and waiting charges
      waitingCharges: [
        { duration: '15 minutes late', fee: 25  },
        { duration: '30 minutes late', fee: 50  },
        { duration: '1 hour late',     fee: 100 },
      ],
      waitingNote: 'Appointments may need to be cancelled if lateness exceeds 1 hour, or 30 minutes depending on availability.',

      // 2. Studio visitors
      studioVisitors: 'To maintain a calm and focused atmosphere conducive to our services, we respectfully ask that clients refrain from bringing additional visitors to the studio.',

      // 3. Face preparation
      facePrep: 'For optimal results, please arrive with a freshly washed face, free of makeup or mascara. This ensures the best outcome for your appointment.',

      // 4. Hair preparation
      hairPrep: 'For the hairstyling process, please wash your hair thoroughly using shampoo only, and refrain from applying conditioner or other hair products. We recommend drying your hair straight the night before your appointment.',

      // 5. Excluded items / additional charges
      // Items reference `addOns` by id — the fee/label flows from there so
      // there's one source of truth for every price. `note` overrides on a
      // per-context basis (T&C wording can differ from a generic add-on label).
      // For client-provided items with no fee, use `name` + `note` (no addOnId).
      extras: [
        { name: 'Hair accessories (flowers, decorative items)', note: 'Clients provide; no application charge' },
        { addOnId: 'clientHairExtensions', note: 'per set, includes application'        },
        { addOnId: 'studioHairExtensions', note: 'per extension, includes application'  },
        { addOnId: 'blowDryWetHair' },
      ],

      // 6. Getting-ready shots
      gettingReadyShots: {
        description: 'If you would like getting-ready shots before dupatta setting, please inform us in advance.',
        fee:         100,
        duration:    '45 minutes',
        note:        'Charged as waiting time.',
      },

      // 7. Deposit policy (cross-references the trial refund exception above)
      deposit: 'A non-refundable and non-transferable deposit is required to secure your appointment. The only exception is the trial-linked refund described above. See "Do you offer a consultation or trial?" for details.',

      // 8. Partial cancellation
      partialCancellation: 'Partial cancellation of services is not permitted. All services included in a booked package must be completed.',

      // 9. Party package exclusions
      partyExclusions: 'Our Regular Party package does not include Tikka, jewelry, dressing, or dupatta setting.',

      // 10. Time change
      timeChange: 'Once a booking is confirmed, time changes can only be accommodated if availability permits, taking into consideration the schedules before and after the slot. Please contact us to discuss any rescheduling.',

      // 11. Agreement
      agreement: 'By booking an appointment with us, you acknowledge that you have read and agree to abide by these Terms and Conditions.',
    },
  },

  // Luxury brands used in the studio. Surfaces in FAQ answers and the
  // {brands} template token (see whyChoose). Edit here, updates everywhere.
  brands: ['DIOR', 'Charlotte Tilbury', 'Chanel', 'YSL Beauty', 'Gucci', 'Too Faced'],

  // GTA bridal-makeup market price range — industry-wide context used in
  // blog posts (e.g. "Bridal makeup in the GTA typically runs $500-$1000").
  // Update when market shifts. Yashpreet's actual pricing lives in packages.ts.
  industryPricing: {
    bridalRangeLow:  500,
    bridalRangeHigh: 1000,
  },

  // ── Branding (theme color + default OG image + logo for schema) ──
  // Leave image fields empty until uploaded — wiring falls back gracefully:
  //   ogImagePublicId empty → no social-share card image (title/desc only)
  //   logoPublicId    empty → uses /icon.svg (the YM monogram in /app)
  branding: {
    themeColor:      '#A8834A',  // brand gold (--color-gold), used in browser chrome / PWA
    // 1200×630 image used for social share previews (WhatsApp, FB, X, iMessage, LinkedIn).
    // When ready: upload to Cloudinary at path `yash-makeovers/og/og-default`
    // then paste the public_id here (e.g. 'yash-makeovers/og/og-default').
    ogImagePublicId: '',
    // Square brand logo used in Article.publisher.logo JSON-LD (≥112×112, ideally 512×512 PNG/SVG).
    // When ready: upload to Cloudinary at path `yash-makeovers/brand/logo-square`
    // then paste the public_id here (e.g. 'yash-makeovers/brand/logo-square').
    logoPublicId:    '',
  },

  // ── Artist details (Person schema for E-E-A-T on /about) ──
  // Only fields NOT already on `site` live here. The Person schema's
  // `description` reads from `site.about` (with tokens expanded) and the
  // `image` reads from the Cloudinary folder auto-fetch in app/about/page.tsx
  // (yash-makeovers/about/*) — no separate image field needed here.
  artist: {
    knowsAbout: [                                            // ← edit to taste — Google reads these as topical expertise signals
      'Bridal makeup',
      'Wedding makeup',
      'South Asian bridal makeup',
      'Airbrush makeup',
      'Bridal Makeup and Hair',
      'Bridal hair styling',
    ],
    fullLegalName: '',  // ← optional — FILL only if different from site.artistName (e.g. 'Yashpreet Kaur')
    // Note: years in business is derived from site.experience ('10+' → 10)
    // at the schema wiring step. Edit site.experience to update everywhere.
  },

} as const
