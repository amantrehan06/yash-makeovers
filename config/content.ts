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
    submitButton:      'Send inquiry',
    submittingButton:  'Sending…',
    notAcceptingTitle: 'Not accepting new bookings',
    notAcceptingBody:  'We are currently not accepting new bookings. Please follow',
    successTitle:      'Inquiry received!',
    successBody:       'will reach out to you soon to discuss your vision. Keep an eye on your WhatsApp or email — we can\'t wait to make your day unforgettable.',
    errorBody:         'Something went wrong. Please WhatsApp us directly at',
    fields: {
      name:        { label: 'Full name',                       placeholder: 'Your full name' },
      whatsapp:    { label: 'WhatsApp number',                 placeholder: '+1 (647) 000-0000' },
      email:       { label: 'Email address',                   placeholder: 'your@email.com' },
      eventDate:   { label: 'Event date (optional)' },
      readyTime:   { label: 'Ready by time (optional)' },
      serviceType: { label: 'Service type' },
      message:     { label: 'Message',                         placeholder: 'Anything else we should know? Number of people, venue or city, inspiration, questions about the package...' },
    },
  },

  // ─── PAGES ──────────────────────────────────────────────────────────
  aboutPage: {
    eyebrow:           'The artist',
    titlePrefix:       'Meet',  // followed by artist name
    whyChooseEyebrow:  'Why brides choose Yash',
    whyChooseTitle:    'What sets us apart',
    brandsEyebrow:     'Luxury brands',
    brandsTitle:       'Products used',
    brands:            ['DIOR', 'Charlotte Tilbury', 'Chanel', 'YSL Beauty', 'Gucci', 'Too Faced'],
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

  termsPage: {
    eyebrow:  'Legal',
    title:    'Terms & Conditions',
    subtitle: 'Our booking terms — please read before confirming your appointment.',
    sections: {
      punctuality:         { number: '1',  title: 'Punctuality & waiting charges' },
      studioVisitors:      { number: '2',  title: 'Studio visitors' },
      facePrep:            { number: '3',  title: 'Face preparation' },
      hairPrep:            { number: '4',  title: 'Hair preparation' },
      extras:              { number: '5',  title: 'Items & services with additional charges' },
      gettingReadyShots:   { number: '6',  title: 'Getting-ready shots' },
      deposit:             { number: '7',  title: 'Deposit policy' },
      partialCancellation: { number: '8',  title: 'Partial cancellation' },
      partyExclusions:     { number: '9',  title: 'Party package exclusions' },
      timeChange:          { number: '10', title: 'Time changes' },
      consultation:        { number: '11', title: 'Consultation calls' },
    },
    questionsHelp: 'Questions about any of these? Please reach out before booking — we\'re happy to clarify.',
    inquiryAgreement: 'By submitting this inquiry, you acknowledge our',
    inquiryAgreementLink: 'Terms & Conditions',
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

// ─── Helpers ────────────────────────────────────────────────────────────
import { site } from './site'

// Formats a brand list as natural English with Oxford comma.
// Example: ['A', 'B', 'C']  →  "A, B, and C"
// Example: ['A', 'B']       →  "A and B"
// Example: ['A']            →  "A"
export function formatBrandList(brands: readonly string[] = content.aboutPage.brands): string {
  if (brands.length === 0) return ''
  if (brands.length === 1) return brands[0]
  if (brands.length === 2) return `${brands[0]} and ${brands[1]}`
  return `${brands.slice(0, -1).join(', ')}, and ${brands[brands.length - 1]}`
}

// Replaces template tokens in a string with their centralized values.
// Bump the source of truth (site.ts) and every page that uses these tokens
// updates automatically — no copy-paste hunting across config files.
//
// Supported tokens:
//   {experience}   → '12+'        (site.experience)
//   {brides}       → '1,500+'     (site.brideCount)
//   {rating}       → '4.9'        (site.googleRating)
//   {reviewCount}  → '158'        (site.googleReviewCount)
//   {seasonYears}  → '2026 & 2027' (site.seasonYears)
//   {brands}       → 'DIOR, Charlotte Tilbury, ...' (Oxford-comma list)
//   {artistName}   → 'Yashpreet'  (site.artistName)
//   {baseCity}     → 'Brampton, ON' (site.baseCity)
export function fillTemplate(text: string): string {
  return text
    .replace(/\{experience\}/g,  site.experience)
    .replace(/\{brides\}/g,      site.brideCount)
    .replace(/\{rating\}/g,      site.googleRating)
    .replace(/\{reviewCount\}/g, site.googleReviewCount)
    .replace(/\{seasonYears\}/g, site.seasonYears)
    .replace(/\{brands\}/g,      formatBrandList())
    .replace(/\{artistName\}/g,  site.artistName)
    .replace(/\{baseCity\}/g,    site.baseCity)
}
