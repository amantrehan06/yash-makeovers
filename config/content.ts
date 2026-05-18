// Single source of truth for all UI copy on the website.
//
// To change any heading, button label, form placeholder, or marketing line:
//   edit the matching key here → rebuild auto-picks it up.
//
// Business data (name, phone, address, prices, fees) lives in site.ts and
// packages.ts. This file is only for "copy" — words on the page.
//
// Organized by section / page to mirror the user-visible structure.

export const content = {
  // ─── HOMEPAGE SECTIONS ──────────────────────────────────────────────
  hero: {
    ctaPrimary:    'Book your date',
    ctaSecondary:  'View portfolio',
    statExperience:'Years of expertise',
    statBrides:    'Brides served',
    statReviews:   'Google reviews',
  },

  aboutSection: {
    title:        'The artist behind the magic',
    readMoreCTA:  'Read the full story',
  },

  servicesSection: {
    eyebrow:    'Services & Pricing',
    title:      'Packages crafted for every occasion',
    subtitle:   'From the bridal ceremony to intimate celebrations — every look is designed to last all day.',
    popularBadge: 'Most Popular',
    bookCTA:    'Book this package',
  },

  featuredWork: {
    eyebrow:     'Our work',
    title:       'A curated selection',
    subtitle:    'A handful of recent looks. For the latest, follow along on Instagram.',
    instagramCTA:'Follow @{instagram} on Instagram', // {instagram} replaced with site.instagram
    placeholder: 'Coming soon',
  },

  beforeAfter: {
    eyebrow:  'Transformation',
    title:    'See the difference',
    subtitle: 'Drag the slider — or use the arrow keys — to reveal the before and after.',
  },

  priceEstimator: {
    eyebrow:  'Price Estimator',
    title:    'Estimate your investment',
    subtitle: 'Get an instant range before booking. No surprises — just transparency.',
  },

  reviewsSection: {
    eyebrow: 'Client love',
    title:   'What brides are saying',
  },

  citiesSection: {
    eyebrow:        'Service area',
    title:          'Serving all of the GTA',
    homeBaseLabel:  'Home base',
  },

  inquiryForm: {
    eyebrow:           'Get in touch',
    title:             'Start your booking',
    steps:             ['Contact', 'Event details', 'Location & time', 'Your vision'],
    submitButton:      'Send inquiry',
    submittingButton:  'Sending…',
    backButton:        '← Back',
    continueButton:    'Continue →',
    notAcceptingTitle: 'Not accepting new bookings',
    notAcceptingBody:  'We are currently not accepting new bookings. Please follow',
    successTitle:      'Inquiry received!',
    successBody:       'will WhatsApp you within 24 hours to discuss your vision. Keep an eye on your WhatsApp — we can\'t wait to make your day unforgettable.',
    errorBody:         'Something went wrong. Please WhatsApp us directly at',
    earlyMorningWarning: 'Early morning fee applies.',
    fields: {
      name:        { label: 'Full name',                placeholder: 'Your full name' },
      whatsapp:    { label: 'WhatsApp number',          placeholder: '+1 (647) 000-0000' },
      email:       { label: 'Email address',            placeholder: 'your@email.com' },
      eventDate:   { label: 'Event date' },
      serviceType: { label: 'Service type',             placeholder: 'Select a service' },
      numPeople:   { label: 'Number of people',         placeholder: 'Select' },
      city:        { label: 'City / Venue location',    placeholder: 'e.g. Brampton, ON or venue name' },
      startTime:   { label: 'Preferred start time' },
      vision:      { label: 'Your vision & inspiration', placeholder: 'Describe your dream look, color palette, any inspiration images or references, and any specific requirements...' },
    },
    peopleOptions: [
      { value: '1',   label: '1 person' },
      { value: '2-3', label: '2–3 people' },
      { value: '4-6', label: '4–6 people' },
      { value: '7+',  label: '7+ people' },
    ],
  },

  // ─── PAGES ──────────────────────────────────────────────────────────
  aboutPage: {
    eyebrow:           'The artist',
    titlePrefix:       'Meet',  // followed by artist name
    whyChooseEyebrow:  'Why brides choose Yash',
    whyChooseTitle:    'What sets us apart',
    brandsEyebrow:     'Luxury brands',
    brandsTitle:       'Products used',
    brands:            ['DIOR', 'Charlotte Tilbury', 'Chanel', 'YSL Beauty', 'Gucci Beauty'],
    cta:               'Book your date with',  // followed by artist name
  },

  servicesPage: {
    eyebrow:  'Services & Pricing',
    title:    'Every look, perfectly crafted',
    subtitle: 'Transparent pricing, all-inclusive packages, and a calm, professional process from inquiry to event day.',
    faqEyebrow: 'FAQ',
    faqTitle:   'Frequently asked',
  },

  portfolioPage: {
    eyebrow:  'Portfolio',
    title:    'The work speaks for itself',
    subtitle: 'Browse looks from bridal ceremonies to full glam events.',
    filters:  ['All', 'Bridal', 'Pre-Bridal', 'Full Glam', 'Party', 'South Asian'] as const,
    loadMore: 'Load more',
  },

  contactPage: {
    eyebrow: "Let's connect",
    title:   'Book your date',
    cards: {
      whatsapp: 'WhatsApp',
      email:    'Email',
      studio:   'Studio',
    },
  },

  blogPage: {
    eyebrow: 'Bridal beauty journal',
    title:   'Tips, trends & advice',
  },

  cityPage: {
    servicesEyebrow:    'Services',
    servicesSubtitle:   'Transparent pricing. No hidden fees.',
    whyChooseTitle:     'What sets us apart',
    reviewsEyebrow:     'Client love',
    faqEyebrow:         'FAQ',
    faqTitle:           'Frequently asked',
  },

  notFound: {
    title:        'This page slipped out of the kit.',
    description:  "The page you're looking for may have moved or never existed. Let's get you back to something useful.",
    primaryCTA:   'Back to homepage',
    secondaryCTAPrefix: 'Contact',  // followed by artist name
    portfolioLink:    'View portfolio',
    servicesLink:     'Services & pricing',
    blogLink:         'Bridal beauty blog',
  },
} as const
