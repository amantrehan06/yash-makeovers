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
  experience: '12+',
  brideCount: '1,500+',
  googleRating: '4.9',
  googleReviewCount: '158',

  about: `With over 12 years of experience and 1,500+ brides transformed across the GTA,
Yashpreet brings an unmatched blend of artistry and calm to every appointment.
Her journey began with a deep love for makeup and a belief that every woman deserves
to feel like the most radiant version of herself on her wedding day. Specialising in
South Asian and multicultural bridal looks, she has become the most trusted name for
brides in Brampton, Mississauga, and beyond — known not just for flawless results,
but for making every bride feel comfortable, confident, and truly seen.`,

  whyChoose: [
    {
      title: '12+ Years of Expertise',
      body: 'Over a decade perfecting bridal artistry — you are in the most experienced hands in the GTA.',
    },
    {
      title: '1,500+ Brides Served',
      body: 'Trusted by over 1,500 brides with unique beauty needs, skin tones, and wedding visions.',
    },
    {
      title: 'Luxury Products Only',
      body: 'DIOR, Charlotte Tilbury, Chanel, YSL Beauty, and Gucci — professional-grade products for a flawless, lasting finish.',
    },
    {
      title: 'Exceptional Reviews',
      body: '4.9 stars across 158 Google reviews — built entirely on word-of-mouth from happy brides.',
    },
  ],

  policies: {
    deposit: '30% non-refundable deposit required to secure your date',
    depositPercent: 30,
    cancellation: 'Deposits are non-refundable and non-transferable',
    travelPeel: 75,
    travelGTA: 150,
    travelText: '$75 within Peel Region · Up to $150 across GTA · Or visit us at 27 Divinity Circle, Brampton',
    earlyMorningFee: 100,
    earlyMorningThreshold: '4:30–6:00 AM',
    earlyMorningText: '$100 early morning fee for start times between 4:30–6:00 AM',
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
