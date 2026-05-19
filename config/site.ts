export const site = {
  name: 'Yash Makeovers',
  artistName: 'Yashpreet',
  tagline: 'Your most beautiful moment',
  phone: '+1 (647) 654-7288',
  whatsapp: '16476547288',
  email: 'info@yashmakeovers.com',
  address: '27 Divinity Circle, Brampton ON L7A 3Y4',
  addressStructured: {
    streetAddress:   '27 Divinity Circle',
    addressLocality: 'Brampton',
    addressRegion:   'ON',
    postalCode:      'L7A 3Y4',
    addressCountry:  'CA',
  },
  baseCity: 'Brampton, ON',
  domain: 'yashmakeovers.com',
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
  brideCount:        '1,500+',      // {brides} token
  googleRating:      '4.9',         // {rating} token
  googleReviewCount: '158',         // {reviewCount} token
  seasonYears:       '2026 & 2027', // {seasonYears} token — bump yearly

  about: `With {experience} years of experience and {brides} brides transformed across the GTA,
{artistName} brings an unmatched blend of artistry and calm to every appointment.
Her journey began with a deep love for makeup and a belief that every woman deserves
to feel like the most radiant version of herself on her wedding day. Specialising in
South Asian and multicultural bridal looks, she has become the most trusted name for
brides in Brampton, Mississauga, Toronto, and beyond — known not just for flawless results,
but for making every bride feel comfortable, confident, and truly seen.`,

  whyChoose: [
    {
      title: '{experience} Years of Expertise',
      body:  'Over a decade perfecting bridal artistry — you are in the most experienced hands in the GTA.',
    },
    {
      title: '{brides} Brides Served',
      body:  'Trusted by {brides} brides with unique beauty needs, skin tones, and wedding visions.',
    },
    {
      title: 'Luxury Products Only',
      body:  '{brands} — professional-grade products for a flawless, lasting finish.',
    },
    {
      title: 'Exceptional Reviews',
      body:  '{rating} stars across {reviewCount} Google reviews — built entirely on word-of-mouth from happy brides.',
    },
  ],

  policies: {
    // ── Pricing & operational fees (used by FAQ, PriceEstimator, InquiryForm) ──
    depositPercent: 30,
    travelPeel:     75,
    travelGTA:      150,
    earlyMorningFee:       100,
    earlyMorningThreshold: '4:30–6:00 AM',

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
      hairPrep: 'For the hairstyling process, please wash your hair thoroughly using shampoo only — refrain from applying conditioner or other hair products. We recommend drying your hair straight the night before your appointment.',

      // 5. Excluded items / additional charges
      extras: [
        { name: 'Hair accessories (flowers, decorative items)', note: 'Clients provide; no application charge' },
        { name: 'Client\'s own hair extensions',                fee: 35, note: 'per set, includes application' },
        { name: 'Studio-provided hair extensions',              fee: 75, note: 'per extension, includes application' },
        { name: 'Blow-drying on wet hair',                      fee: 20 },
      ],

      // 6. Getting-ready shots
      gettingReadyShots: {
        description: 'If you would like getting-ready shots before dupatta setting, please inform us in advance.',
        fee:         100,
        duration:    '45 minutes',
        note:        'Charged as waiting time.',
      },

      // 7. Deposit policy (cross-references the trial refund exception above)
      deposit: 'A non-refundable and non-transferable deposit is required to secure your appointment. The only exception is the trial-linked refund described above — see "Do you offer a consultation or trial?" for details.',

      // 8. Partial cancellation
      partialCancellation: 'Partial cancellation of services is not permitted — all services included in a booked package must be completed.',

      // 9. Party package exclusions
      partyExclusions: 'Our Regular Party package does not include Tikka, jewelry, dressing, or dupatta setting.',

      // 10. Time change
      timeChange: 'Once a booking is confirmed, time changes can only be accommodated if availability permits, taking into consideration the schedules before and after the slot. Please contact us to discuss any rescheduling.',

      // 11. Agreement
      agreement: 'By booking an appointment with us, you acknowledge that you have read and agree to abide by these Terms and Conditions.',
    },
  },

  seo: {
    keywords: [
      'bridal makeup artist Brampton',
      'bridal makeup Toronto',
      'South Asian bridal makeup GTA',
      'makeup artist near me Brampton',
      'wedding makeup artist Mississauga',
    ],
  },
} as const
