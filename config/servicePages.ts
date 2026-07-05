// Occasion service-page data (party / prom / engagement / photoshoot).
// Mirrors the config/cities.ts shape: each page owns its slug, meta fields,
// h1, intro, sections, and FAQ, and the route component renders from this
// object — no copy lives in JSX.
//
// CONFIG-FIRST: every price, fee, group size, and policy below is COMPOSED
// from config/packages.ts, config/site.ts, and `bookingPolicies` at module
// load. Change a price in packages.ts and every sentence here updates on
// rebuild. Never re-type a number into the copy.
//
// Strings use template tokens — see config/content.ts → fillTemplate().
// Tokens: {experience}, {brides}, {rating}, {reviewCount}, {seasonYears},
//         {brands}, {artistName}, {baseCity}

import { site } from './site'
import { getPackage, formatPrice } from './packages'

// ── Booking policies (owner-confirmed 2026-07) ─────────────────────────
// Single source for group-size, travel, and lead-time rules. Page copy and
// FAQ answers render FROM these values. If a rule changes, edit it here.
export const bookingPolicies = {
  // Max people per booking — applies to the party package, and to the
  // people accompanying a bride on bridal bookings.
  groupMax: '4 to 5',
  // Solo party/prom/guest appointments are studio-only (no travel for one
  // person). Travel is available for groups of this size or larger.
  travelMinGroup: 2,
  // Guest makeup: studio preferred; travel for groups of 2+.
  guestsStudioPreferred: true,
  // No formal same-week cutoff, but summer dates book months ahead.
  // Copy angle: "book early, summer weekends fill first" — no false urgency.
  leadTimeNote: 'summer weekends fill first and popular dates book months ahead',
} as const

export interface ServicePageSection {
  heading: string
  body:    string   // \n\n-separated paragraphs; tokens allowed
  // Optional anchor (e.g. 'mehndi-makeup') — rendered as the section's id so
  // /engagement-makeup#mehndi-makeup deep-links work. Omit on plain sections.
  id?:     string
}

export interface ServicePageFaq { q: string; a: string }

export interface ServicePage {
  slug:            string
  name:            string   // short link label (footer, related-services chips)
  eyebrow:         string
  metaTitle:       string
  metaDescription: string
  h1:              string
  subtitle:        string
  intro:           string   // \n\n-separated paragraphs; tokens allowed
  serviceType:     string   // Service schema serviceType
  packageIds:      readonly string[]
  packagesTitle:   string
  sections:        readonly ServicePageSection[]
  faq:             readonly ServicePageFaq[]
  // TODO(gallery): Cloudinary currently holds bridal / semi-bridal / full-glam
  // looks only — all four pages launch with the 'full-glam' tag. When
  // occasion-specific photos (party, prom, eShoot) are uploaded and tagged,
  // point each page at its own tag here. Never use stock photos.
  galleryTag:      string
  ctaTitle:        string
}

const bridal    = getPackage('bridal')
const preBridal = getPackage('pre-bridal')
const fullGlam  = getPackage('full-glam')
const party     = getPackage('party')

const { policies } = site
const { addOns, trial, consultation } = policies

// Pre-wedding event names parsed from the Pre-Bridal tagline (single source:
// edit the tagline in packages.ts and these rename everywhere). Positional:
// 'Rokah, Jaggo, Engagement, Mehndi, Sangeet'.
const [rokah, jagoo, , mehndi, sangeet] = preBridal.tagline.split(', ')

// Nikkah and Walima parsed from the Bridal tagline (same single-source rule).
// Positional: 'Ceremony, Reception, Nikkah, Walima, Baraat'.
const [, , nikkah, walima] = bridal.tagline.split(', ')

// Shared composed fragments — one source, four pages.
// '06:00' → '6:00 AM' (site.hours stores 24-hr strings for the schema).
const fmtHour = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`
}
const studioHours = `${fmtHour(site.hours[0].opens)} to ${fmtHour(site.hours[0].closes)}`
const travelFees = `${formatPrice(policies.travelPeel)} within Peel Region and up to ${formatPrice(policies.travelGTA)} across the wider GTA`
const depositLine = `A ${policies.depositPercent}% deposit via e-transfer secures your date. No payment is required until we've spoken and you're ready to confirm.`
const soloStudioLine = `Solo appointments happen at my studio in {baseCity}. I don't travel for a single booking. For groups of ${bookingPolicies.travelMinGroup} or more, travel is available: ${travelFees}.`
// "$450, reduced from $600 for 2026 bookings" — emitted only while the
// discount is live; disappears automatically when originalPrice == price.
const preBridalPriceText = preBridal.originalPrice > preBridal.price
  ? `${formatPrice(preBridal.price)} per person per event, reduced from ${formatPrice(preBridal.originalPrice)} (${preBridal.discountNote.replace(/^\*\s*/, '')})`
  : `${formatPrice(preBridal.price)} per person per event`
const bridalPriceText = bridal.originalPrice > bridal.price
  ? `${formatPrice(bridal.price)} per person per event, reduced from ${formatPrice(bridal.originalPrice)} (${bridal.discountNote.replace(/^\*\s*/, '')})`
  : `${formatPrice(bridal.price)} per person per event`

export const servicePages: readonly ServicePage[] = [
  {
    slug:    'bridal-makeup',
    name:    'Bridal Makeup',
    eyebrow: 'Packages & Prices',
    // Cannibalization guard: this page targets package/price/process intent.
    // City pages own "bridal makeup artist in {city}"; keep that phrase (and
    // "wedding makeup artist in {city}") out of the title, h1, and headings.
    metaTitle: 'Bridal Makeup Packages & Prices | Brampton & the GTA',
    metaDescription:
      `Bridal makeup packages and prices by {artistName}: HD waterproof wedding makeup, hair, trial and consultation, all priced up front. {rating}★ ({reviewCount} reviews).`,
    h1:       'Bridal Makeup & Hair Packages',
    subtitle: 'Two packages, transparent pricing, a trial option, and one artist from the first consultation to the reception.',
    serviceType: 'Bridal Makeup & Hair',
    packageIds: ['bridal', 'pre-bridal'],
    packagesTitle: 'Bridal packages and pricing',
    intro:
      `Booking bridal makeup should feel like the calmest decision in your wedding planning, not the most confusing. This page lays out exactly what each package includes, what it costs, and how the trial and consultation work, so there are no surprises on the wedding day.\n\nThere are two tiers. The ${bridal.name} package (${bridalPriceText}) is the full wedding day service for your ceremony and reception. The ${preBridal.name} package (${preBridalPriceText}) covers the lighter pre-wedding events. Both are priced ${bridal.priceNote}, and both use the same luxury kit: {brands}.`,
    sections: [
      {
        heading: 'What your wedding day package includes',
        body:
          `Every ${bridal.name} booking is priced ${bridal.priceNote} and covers the same all-inclusive essentials, so nothing about your look is left to chance: ${bridal.includes.join(', ')}. The goal is a face and hairstyle that hold from the first ceremony photo to the last reception dance.\n\nA few of these matter more than brides expect. The HD waterproof base is chosen for sixteen hour days and happy tears. The dupatta setting keeps your dupatta pinned exactly where it should sit through every hug and head turn. The jewelry setting places your tikka and necklaces so nothing slips during the ceremony. And the touchup kit goes home with you, so the wedding makeup still reads fresh when the reception runs late.`,
      },
      {
        heading: 'Which wedding events the package covers',
        body:
          `The ${bridal.name} package is built for the main wedding days: ${bridal.tagline}. In practice that means your ceremony and your reception, the two moments with the most photos and the longest hours in the chair.\n\nSome events sit just outside this package. For a two day Muslim wedding, [bridal makeup packages for the Nikkah and Walima](/nikkah-walima-makeup) cover both days in detail. For the events before the wedding, like the engagement or Sangeet, [engagement and pre-wedding makeup](/engagement-makeup) uses the ${preBridal.name} package instead. When your day is a single ceremony and reception, the ${bridal.name} package is the right home.`,
      },
      {
        heading: 'The trial and the consultation call',
        body:
          `A consultation call comes with both the ${consultation.eligibility.join(' and ')} packages. We schedule it ${consultation.timing.toLowerCase()}, and it is where we talk through your outfit, jewelry, and inspiration pictures before the day.\n\nA full wedding makeup trial is separate and optional, at ${trial.feeText}. Trials are booked ${trial.scheduling.toLowerCase()} ${trial.refundCondition} In short, if you trial immediately after booking and decide the look is not for you, your deposit is protected.`,
      },
      {
        heading: 'Optional add-ons',
        body:
          `Both packages are all-inclusive, but a few extras come up. If you prefer an airbrushed finish, ${addOns.airbrush.label.toLowerCase()} is ${formatPrice(addOns.airbrush.fee)}. For length and volume, ${addOns.clientHairExtensions.label.toLowerCase()} is ${formatPrice(addOns.clientHairExtensions.fee)}, or ${addOns.studioHairExtensions.label.toLowerCase()} are ${formatPrice(addOns.studioHairExtensions.fee)} ${addOns.studioHairExtensions.unit}. If you arrive with wet hair, a ${addOns.blowDryWetHair.label.toLowerCase()} is ${formatPrice(addOns.blowDryWetHair.fee)}.\n\nEverything already in the ${bridal.name} package, including dupatta setting, jewelry setting, premium mink lashes, and the touchup kit, is part of the price. Add-ons only cover the extras above.`,
      },
      {
        heading: 'Booking and your deposit',
        body:
          `A ${policies.depositPercent}% deposit by e-transfer secures your date, and no payment is needed until we have spoken and you are ready to confirm. ${bookingPolicies.leadTimeNote}, so the earlier the better.\n\nOn the day, ${bookingPolicies.groupMax} people can book alongside the bride, and travel is available for groups of ${bookingPolicies.travelMinGroup} or more at ${travelFees}. For a very early ceremony start, a ${formatPrice(policies.earlyMorningFee)} early-morning fee applies between ${policies.earlyMorningThreshold}.`,
      },
    ],
    faq: [
      {
        q: 'What does bridal makeup cost?',
        a: `The ${bridal.name} package is ${bridalPriceText}, and the ${preBridal.name} package is ${preBridalPriceText}, both ${bridal.priceNote}. That covers your makeup, hairstyling, lashes, and setting. When people ask about wedding makeup cost in the GTA, this is the honest answer: one all-inclusive price per person per event, with optional add-ons on top.`,
      },
      {
        q: 'What is included in the bridal package?',
        a: `The ${bridal.name} package includes ${bridal.includes.join(', ')}. Nothing on that list is an upsell; it is all part of the ${formatPrice(bridal.price)} price.`,
      },
      {
        q: 'What is the difference between the trial and the consultation call?',
        a: `The consultation call is included with the ${consultation.eligibility.join(' and ')} packages and happens ${consultation.timing.toLowerCase()}; it is a conversation about your outfit, jewelry, and vision. A wedding makeup trial is a separate, optional session at ${trial.feeText} where we actually test the look on your skin. Many brides do both.`,
      },
      {
        q: 'Can I book multiple events together?',
        a: `Yes. Pricing is ${bridal.priceNote}, so your ceremony, reception, and any pre-wedding events simply stack as separate bookings with one artist across all of them. Booking them together also locks every date before the calendar fills.`,
      },
      {
        q: 'When should I book?',
        a: `I recommend booking 6 to 12 months in advance, especially for peak wedding season from May through October when dates fill up fast. A ${policies.depositPercent}% deposit secures your date once you are ready.`,
      },
    ],
    galleryTag: 'bridal',
    ctaTitle:   'Ready to plan your wedding day look?',
  },

  {
    slug:    'party-makeup',
    name:    'Party Makeup',
    eyebrow: 'Party & Event Makeup',
    metaTitle: 'Party Makeup Artist in Brampton & the GTA',
    metaDescription:
      `Party and event makeup by {artistName}, from the {baseCity} studio, or on-location for groups of ${bookingPolicies.travelMinGroup}+. Two tiers from ${formatPrice(party.price)}. {rating}★ · {reviewCount} Google reviews.`,
    h1:       'Party Makeup Artist in Brampton & the GTA',
    subtitle: 'Two straightforward tiers (regular finish or full glam) at the {baseCity} studio, or on-location for groups.',
    serviceType: 'Party & Event Makeup and Hair',
    packageIds: ['party', 'full-glam'],
    packagesTitle: 'Party packages & pricing',
    intro:
      `Not every celebration needs a bridal-scale production, but the makeup still has to look right in person and in photos. Party makeup covers everything outside the wedding day itself: birthdays, anniversaries, baby showers, receptions you're attending as a guest, and any evening where you want a professional finish that actually lasts.\n\nThere are two tiers, and choosing between them is simple. The ${party.name} package (${formatPrice(party.price)}) keeps it clean: regular-finish makeup, regular lashes, and a simple hairdo (updos, curls, or basic volume). ${fullGlam.name} (${formatPrice(fullGlam.price)}) steps up to HD waterproof makeup, full hairstyling, and premium mink lashes; it's the tier I recommend when the event is being professionally photographed.\n\nBoth are priced per person per event, and both use the same kit I bring to weddings: {brands}.`,
    sections: [
      {
        heading: 'Studio or on-location: how it works',
        body:
          `${soloStudioLine} Keeping solo appointments in the studio is what keeps the pricing flat and the schedule reliable, and the studio runs ${studioHours} seven days a week, so even an early start is workable.\n\nParty bookings take ${bookingPolicies.groupMax} people at most. That cap is deliberate: one artist, proper time in the chair for every face, rather than an assembly-line pass ten minutes before you have to leave.`,
      },
      {
        heading: "What's included, and what's an add-on",
        body:
          `The ${party.name} package deliberately leaves out tikka, jewelry, dressing, and dupatta setting, because most party clients don't need them. When you do, they're straightforward add-ons: ${addOns.partyDupattaSetting.label.toLowerCase()} is ${formatPrice(addOns.partyDupattaSetting.fee)} and ${addOns.jewelrySetting.label.toLowerCase()} is ${formatPrice(addOns.jewelrySetting.fee)}.\n\nOther popular extras: ${addOns.airbrush.label.toLowerCase()} (${formatPrice(addOns.airbrush.fee)}), ${addOns.premiumMinkLashes.label.toLowerCase()} (${formatPrice(addOns.premiumMinkLashes.fee)}), a ${addOns.blowDryWetHair.label.toLowerCase()} (${formatPrice(addOns.blowDryWetHair.fee)}), and a ${addOns.touchupKit.label.toLowerCase()} (${formatPrice(addOns.touchupKit.fee)}) so the look survives a long night.`,
      },
      {
        heading: 'Booking your date',
        body:
          `${depositLine} There's no formal cutoff on how late you can book, but ${bookingPolicies.leadTimeNote}.\n\nCome with a freshly washed face, free of makeup, and hair washed with shampoo only, no conditioner or products. The makeup sits better and lasts longer on a clean base.`,
      },
    ],
    faq: [
      {
        q: 'How much does party makeup cost in Brampton?',
        a: `The ${party.name} package is ${formatPrice(party.price)} per person per event: regular-finish makeup, regular lashes, and a simple hairdo. ${fullGlam.name} is ${formatPrice(fullGlam.price)} with HD waterproof makeup, full hairstyling, and premium mink lashes. A ${policies.depositPercent}% deposit confirms your booking.`,
      },
      {
        q: 'Do you travel for party makeup?',
        a: `For groups of ${bookingPolicies.travelMinGroup} or more, yes. Travel is ${travelFees}. Solo party appointments are studio-only, at ${site.address}.`,
      },
      {
        q: 'How many people can book party makeup together?',
        a: `${bookingPolicies.groupMax} people per booking at most. The same cap applies to family and friends booking alongside a bride on a wedding morning; it's what keeps every face getting proper time.`,
      },
      {
        q: `What's the difference between ${party.name} and ${fullGlam.name}?`,
        a: `${party.name} (${formatPrice(party.price)}) is a regular-finish look: ${party.includes.join(', ').toLowerCase()}. ${fullGlam.name} (${formatPrice(fullGlam.price)}) upgrades to ${fullGlam.includes.join(', ').toLowerCase()}, the better choice when there's a professional photographer.`,
      },
      {
        q: 'Does party makeup include hairstyling?',
        a: `Yes. ${party.name} includes a simple hairdo: updos, curls, or basic volume. ${fullGlam.name} includes full hairstyling. If your hair will be wet on arrival, a ${addOns.blowDryWetHair.label.toLowerCase()} is ${formatPrice(addOns.blowDryWetHair.fee)}; ideally arrive with it washed (shampoo only) and dried straight.`,
      },
    ],
    galleryTag: 'full-glam',
    ctaTitle:   'Ready to book your party date?',
  },

  {
    slug:    'prom-makeup',
    name:    'Prom Makeup',
    eyebrow: 'Prom Season',
    metaTitle: 'Prom Makeup & Hair in Brampton',
    metaDescription:
      `Prom makeup and hair in Brampton by {artistName}, ${formatPrice(party.price)} per person with lashes and hairstyling included. Studio, or travel for groups of ${bookingPolicies.travelMinGroup}+.`,
    h1:       'Prom Makeup & Hair in Brampton',
    subtitle: 'One flat rate for makeup, lashes and hair. Solo at the {baseCity} studio, or with your friends on-location.',
    serviceType: 'Prom Makeup and Hair',
    // Regular Party is the base prom look; Full Glam is the step-up (HD
    // waterproof + premium mink lashes) the copy already points to.
    packageIds: ['party', 'full-glam'],
    packagesTitle: 'Prom packages & pricing',
    intro:
      `Prom is one of the few nights that gets documented from every angle: the driveway photos, the limo, the dance floor. My prom service is the same package I run for parties: makeup, regular lashes, and hair (updos, curls, or basic volume) at ${formatPrice(party.price)} per person, with no required extras.\n\nIf you're coming solo, you'll visit my studio in {baseCity}. Getting ready with friends is honestly the better way to do it: groups of ${bookingPolicies.travelMinGroup} or more can book travel, and the getting-ready photos happen at home instead of in a parking lot between appointments.`,
    sections: [
      {
        heading: 'Book it with your friends',
        body:
          `Travel for groups of ${bookingPolicies.travelMinGroup} or more is ${travelFees}, and a booking takes ${bookingPolicies.groupMax} people at most. One artist works through the group in turn, so plan the afternoon with staggered chair times. The studio runs ${studioHours}, so there's plenty of room before an evening prom.`,
      },
      {
        heading: 'Prom season timing: April to June',
        body:
          `Prom season lands in April, May, and June, exactly when the GTA wedding season ramps up, and wedding mornings claim the early slots first. There's no formal booking cutoff, but ${bookingPolicies.leadTimeNote}. ${depositLine}`,
      },
      {
        heading: 'Upgrades that make sense for prom',
        body:
          `The flat rate covers the full look, but a few add-ons come up often: ${addOns.premiumMinkLashes.label.toLowerCase()} (${formatPrice(addOns.premiumMinkLashes.fee)}), ${addOns.airbrush.label.toLowerCase()} (${formatPrice(addOns.airbrush.fee)}), and a ${addOns.touchupKit.label.toLowerCase()} (${formatPrice(addOns.touchupKit.fee)}) to get you from photos through the last dance.\n\nWearing extensions? Application of your own set is ${formatPrice(addOns.clientHairExtensions.fee)}, or studio-provided extensions are ${formatPrice(addOns.studioHairExtensions.fee)} ${addOns.studioHairExtensions.unit}. And if you want the step-up HD waterproof finish with premium mink lashes, ask about ${fullGlam.name} (${formatPrice(fullGlam.price)}), the tier I use for photoshoots.`,
      },
    ],
    faq: [
      {
        q: 'How much does prom makeup cost in Brampton?',
        a: `${formatPrice(party.price)} per person, and that includes the makeup, regular lashes, and hairstyling (updos, curls, or basic volume). A ${policies.depositPercent}% deposit via e-transfer confirms your slot.`,
      },
      {
        q: 'Can my friends and I get ready together?',
        a: `Yes, that's the best way to do prom. Groups of ${bookingPolicies.travelMinGroup} or more can book travel (${travelFees}) and I come to you; ${bookingPolicies.groupMax} people per booking at most. Booking solo? You'll come to the studio in ${site.addressStructured.addressLocality}.`,
      },
      {
        q: 'Do you do prom hair as well as makeup?',
        a: `Yes, hair is included in the flat rate: simple updos, curls, and basic volume. Hair extension application is available as an add-on: ${formatPrice(addOns.clientHairExtensions.fee)} for your own set, or ${formatPrice(addOns.studioHairExtensions.fee)} ${addOns.studioHairExtensions.unit} for studio-provided.`,
      },
      {
        q: 'When should I book prom makeup?',
        a: `As soon as you have the date. Prom season (April to June) overlaps the start of GTA wedding season, and ${bookingPolicies.leadTimeNote}. There's no formal cutoff (late asks are welcome if the calendar allows), but early is safest.`,
      },
      {
        q: 'How should I prepare for the appointment?',
        a: `Arrive with a freshly washed face, free of makeup or mascara, and hair washed with shampoo only (no conditioner or styling products), ideally dried straight the night before. That gives the longest-lasting result for a long prom night.`,
      },
    ],
    galleryTag: 'full-glam',
    ctaTitle:   'Ready to book your prom date?',
  },

  {
    slug:    'engagement-makeup',
    name:    'Engagement Makeup',
    eyebrow: 'Engagement & Pre-Wedding Events',
    metaTitle: 'Engagement & Pre-Wedding Makeup | Rokah, Mehndi, Sangeet',
    metaDescription:
      `Engagement and reception makeup by {artistName}: Pre-Bridal glam for Rokah, Mehndi, Sangeet and engagement events, plus guest makeup. {experience} years across the GTA.`,
    h1:       'Engagement, Reception & Guest Makeup',
    subtitle: 'Pre-Bridal glam for Rokah, engagement, Mehndi and Sangeet, plus party makeup for the family celebrating with you.',
    serviceType: 'Engagement & Pre-Wedding Event Makeup and Hair',
    // Pre-Bridal is the recommended package; Bridal is the step-up for main
    // ceremony days (owner-confirmed). Guests book the party package — see
    // the 'Guest and family makeup' section and /party-makeup.
    packageIds: ['pre-bridal', 'bridal'],
    packagesTitle: 'Packages for engagement events',
    intro:
      `An engagement, Rokah, or Sangeet is its own event with its own look, usually softer than the wedding day, but it still has to survive hugs, tears, and a few hundred photos. The ${preBridal.name} package is the one I recommend for exactly this stage: ${preBridal.tagline}.\n\nIt includes HD waterproof makeup, hairstyling, premium mink lashes, light dupatta setting, and hair padding and pins, at ${preBridalPriceText}. A consultation call is part of the package. We talk through your outfit, jewelry, and inspiration pictures ${consultation.timing.replace(' prior to event date', ' before the event')}.\n\nIf your date is actually a main ceremony day (${bridal.tagline}), the ${bridal.name} package (${formatPrice(bridal.price)}) is the step-up: it adds full dupatta setting, jewelry setting, and a touchup kit. And because these are family events, I handle the guests too. More on that below.\n\nThe ${preBridal.name} package is priced ${preBridal.priceNote}, so most brides book ${rokah}, ${mehndi}, and ${sangeet} together and keep one wedding makeup artist across every event. The looks evolve on purpose, the schedule is planned once, and the photos stay consistent from the first ceremony to the last dance.`,
    sections: [
      {
        heading: 'Which package for which event',
        body:
          `The ${preBridal.name} package (${formatPrice(preBridal.price)}) covers the pre-wedding circuit: ${preBridal.tagline}. The ${bridal.name} package (${formatPrice(bridal.price)}) is reserved for main ceremony days (${bridal.tagline}), where the full dupatta setting, jewelry setting, and touchup kit come into play.\n\nNot sure which side your event lands on? Send the details through the inquiry form and we'll decide together. The pricing is per person per event either way, so there's no penalty for asking.`,
      },
      {
        heading: `${rokah} & ${jagoo} makeup`,
        id:      'rokah-jaggo-makeup',
        body:
          `A ${rokah} is usually the most intimate event of the wedding cycle: close family, a living room or a small hall, and photos taken at conversation distance. The makeup stays soft and skin-forward so it reads naturally up close. ${jagoo} night is the opposite energy. It is a dancing night, and the look has to survive dhol, sweat, and a few hours of movement without budging.\n\nBoth run on the ${preBridal.name} package (${formatPrice(preBridal.price)} ${preBridal.priceNote}): HD waterproof makeup, hairstyling, premium mink lashes, and light dupatta setting where the outfit calls for it.`,
      },
      {
        heading: `${mehndi} makeup`,
        id:      'mehndi-makeup',
        body:
          `${mehndi} is a daytime event, and daylight changes the makeup math. Natural light is honest, so the base has to be sweat-proof and blended for close-up viewing rather than ballroom distance. The classic yellow and green outfits pull warmth toward the face, so I balance the skin tones against them.\n\nAnd your hands are in every photo, from the cone to the final reveal, which means the look has to stay put through hours of sitting, hugging, and holding your palms up to the camera. HD waterproof makeup, hairstyling, and premium mink lashes come with the ${preBridal.name} package (${formatPrice(preBridal.price)} ${preBridal.priceNote}).`,
      },
      {
        heading: `${sangeet} makeup`,
        id:      'sangeet-makeup',
        body:
          `${sangeet} is the performance night. Stage lighting, choreographed dances, and a videographer catching every second mean the makeup has to behave like it is on set. The HD waterproof base is built for exactly that: heat, movement, and hours under bright light without separating.\n\nPremium mink lashes matter more here than at any other event, because the eyes carry the look on video. Hairstyling is set to survive the dancing, with hair padding and pins holding through the last song. Like every pre-wedding event, ${sangeet} runs on the ${preBridal.name} package at ${formatPrice(preBridal.price)} ${preBridal.priceNote}.`,
      },
      {
        heading: 'Guest and family makeup',
        body:
          `For the people celebrating with you, the ${party.name} package (${formatPrice(party.price)}) covers a regular-finish look with lashes and a simple hairdo, and ${fullGlam.name} (${formatPrice(fullGlam.price)}) is the step up for close family; it's the tier named for sister and brother weddings.\n\nGuest makeup works best at the studio; travel is available when ${bookingPolicies.travelMinGroup} or more people are getting ready together. Bookings take ${bookingPolicies.groupMax} people alongside you at most.`,
      },
      {
        heading: 'Travel, the studio, and early starts',
        body:
          `I travel across the GTA for engagement events: ${travelFees}. Or come to the studio in {baseCity}; it runs ${studioHours} daily. For ceremonies with very early ready times, a ${formatPrice(policies.earlyMorningFee)} early-morning fee applies between ${policies.earlyMorningThreshold}.\n\n${depositLine}`,
      },
    ],
    faq: [
      {
        q: 'How much does engagement makeup cost in Brampton?',
        a: `The recommended package is ${preBridal.name} at ${preBridalPriceText}. It includes HD waterproof makeup, hairstyling, premium mink lashes, light dupatta setting, and hair padding. For main ceremony days, the ${bridal.name} package (${formatPrice(bridal.price)}) is the step-up. Guests can book the ${party.name} package at ${formatPrice(party.price)}.`,
      },
      {
        q: `What's the difference between the ${preBridal.name} and ${bridal.name} packages?`,
        a: `${preBridal.name} (${formatPrice(preBridal.price)}) is for pre-wedding events: ${preBridal.tagline}. ${bridal.name} (${formatPrice(bridal.price)}) is for main ceremony days (${bridal.tagline}) and adds full dupatta setting, jewelry setting, and a touchup kit.`,
      },
      {
        q: 'Is a consultation call included?',
        a: `Yes, consultation calls come with the ${consultation.eligibility.join(' and ')} packages, scheduled ${consultation.timing.toLowerCase()}. Have your questions and inspiration pictures ready, ideally once your outfit and jewelry are decided. A full makeup trial is also available for ${trial.feeText}.`,
      },
      {
        q: 'Do you cover Mehndi and Sangeet nights too?',
        a: `Yes, Mehndi and Sangeet are exactly what the ${preBridal.name} package is for, alongside Rokah, ${jagoo}, and the engagement itself. Pricing is per person per event, so multi-event bookings simply stack.`,
      },
      {
        q: 'Can my mom and sisters get makeup at the same appointment?',
        a: `Yes, ${bookingPolicies.groupMax} people at most can book alongside you. Guest makeup is studio-preferred; travel opens up when ${bookingPolicies.travelMinGroup} or more people are getting services at your location.`,
      },
      {
        q: `Do you do ${mehndi} makeup in Brampton?`,
        a: `Yes, ${mehndi} bookings are one of the most common uses of the ${preBridal.name} package (${preBridalPriceText}). I build the look for daytime light: a sweat-proof HD base, tones balanced against the yellow and green outfits, and hair that lasts the whole afternoon. Come to the studio in ${site.addressStructured.addressLocality}, or I travel when ${bookingPolicies.travelMinGroup} or more people are getting ready together.`,
      },
      {
        q: 'Can I book all my pre-wedding events together?',
        a: `Yes, and I recommend it. The ${preBridal.name} package is priced ${preBridal.priceNote}, so ${rokah}, ${jagoo}, ${mehndi}, and ${sangeet} bookings simply stack, with one ${policies.depositPercent}% deposit conversation and one artist across every event. That consistency shows in the photos, because the looks are planned as a sequence instead of one-offs.`,
      },
      {
        q: `How do ${mehndi} and ${sangeet} makeup looks differ?`,
        a: `${mehndi} is daytime: softer, skin-forward, and sweat-proof for natural light and close-up photos of you and your hands. ${sangeet} is the evening performance: a stronger HD base for stage lighting and dancing, and lashes that define the eyes on video. Same ${preBridal.name} package for both; I tune the look to the event.`,
      },
    ],
    galleryTag: 'full-glam',
    ctaTitle:   'Ready to book your engagement date?',
  },

  {
    slug:    'nikkah-walima-makeup',
    name:    'Nikkah & Walima',
    eyebrow: 'Nikkah & Walima Makeup',
    metaTitle: 'Nikkah & Walima Makeup Artist | Brampton & the GTA',
    metaDescription:
      `${nikkah} and ${walima} makeup by {artistName} in the GTA. HD waterproof bridal looks that hold through the ceremony and the reception. {rating}★ · {reviewCount} reviews.`,
    h1:       'Nikkah & Walima Makeup Artist in the GTA',
    subtitle: `Bridal makeup and hair for your ${nikkah} and ${walima}, built to last both days.`,
    serviceType: 'Nikkah & Walima Bridal Makeup and Hair',
    packageIds: ['bridal'],
    packagesTitle: 'The bridal package',
    intro:
      `Your ${nikkah} and ${walima} are two different days with two different moods, and the makeup should reflect that. Both run on the ${bridal.name} package (${bridalPriceText}), the same all-day bridal and wedding makeup service I bring to every ceremony: ${bridal.includes.slice(0, 3).join(', ').toLowerCase()}, dupatta and jewelry setting, and a touchup kit.\n\nThe ${bridal.name} package covers the full wedding cycle: ${bridal.tagline}. For a Muslim wedding that usually means the ${nikkah} ceremony and the ${walima} reception, and I plan them as one connected look rather than two unrelated appointments.`,
    sections: [
      {
        heading: `${nikkah} makeup`,
        id:      'nikkah-makeup',
        body:
          `The ${nikkah} is the ceremony, and the look leans elegant and timeless rather than heavy. I keep the skin luminous, the eyes defined but soft, and the whole face photograph-ready for the signing, the family portraits, and the close, emotional moments that define the day.\n\nThe HD waterproof base earns its place here: ${nikkah} ceremonies run long and emotional, and the makeup has to survive happy tears without a single touchup showing. Hairstyling, premium mink lashes, and setting are all part of the ${bridal.name} package.`,
      },
      {
        heading: `${walima} makeup`,
        id:      'walima-makeup',
        body:
          `The ${walima} is the reception, and this is where the glam goes fuller. Brighter ballroom lighting and an evening of photos and dancing call for more structure: a stronger eye, a defined lip, and a base built to hold under hot lights from the entrance to the last dance.\n\nBecause the ${walima} often falls on a different day, I treat it as its own look that still feels like a continuation of the ${nikkah}. Same bride, same story, evolved for the evening.`,
      },
      {
        heading: 'Booking both days',
        body:
          `The ${bridal.name} package is priced ${bridal.priceNote}, so the ${nikkah} and the ${walima} are booked as two events with one artist across both. That is the whole point: one person who knows your face, your outfits, and your timeline, so the second day never starts from scratch.\n\nA consultation call is included to plan both looks together, ${consultation.timing.replace(' prior to event date', ' before your dates')}. Bring your outfits and inspiration for each day and we map the two looks as a pair.`,
      },
      {
        heading: 'Travel and the studio',
        body:
          `I travel across the GTA for Muslim weddings: ${travelFees}. Or get ready at the studio in {baseCity}, which runs ${studioHours} daily. For early ${nikkah} start times, a ${formatPrice(policies.earlyMorningFee)} early-morning fee applies between ${policies.earlyMorningThreshold}.\n\n${depositLine}`,
      },
    ],
    faq: [
      {
        q: `How much does ${nikkah} makeup cost in Brampton?`,
        a: `${nikkah} makeup runs on the ${bridal.name} package at ${bridalPriceText}. That includes ${bridal.includes.slice(0, 5).join(', ').toLowerCase()}, and a touchup kit. The same package covers your ${walima}, priced ${bridal.priceNote}.`,
      },
      {
        q: `What's the difference between ${nikkah} and ${walima} makeup?`,
        a: `The ${nikkah} look is softer and elegant for the ceremony, with luminous skin and a defined but gentle eye. The ${walima} look is fuller reception glam, built with more structure for bright lighting, photos, and dancing. Same ${bridal.name} package for both; I tune the intensity to each day.`,
      },
      {
        q: 'Do you set the hijab or offer a hijab styling service?',
        a: `I don't offer a separate hijab-setting service. Most ${nikkah} brides who wear one arrange and pin their own hijab, and I focus the ${bridal.name} package on the makeup and any visible hairstyling so the finished look works beautifully with it.`,
      },
      {
        q: `Can I book the ${nikkah} and ${walima} together?`,
        a: `Yes, and it's the easiest way to do it. Pricing is ${bridal.priceNote}, so the two days book as two events with one deposit conversation and one artist across both. Booking together also locks both dates before summer weekends fill.`,
      },
      {
        q: `Do you travel for ${nikkah} and ${walima} makeup?`,
        a: `Yes. Travel is ${travelFees}. For groups of ${bookingPolicies.travelMinGroup} or more getting ready together I come to you; solo bookings are welcome at the studio in ${site.addressStructured.addressLocality}.`,
      },
    ],
    galleryTag: 'full-glam',
    ctaTitle:   `Ready to book your ${nikkah} and ${walima}?`,
  },

  {
    slug:    'photoshoot-makeup',
    name:    'eShoot Makeup',
    eyebrow: 'eShoot & Pre-Wedding Shoots',
    metaTitle: 'eShoot & Pre-Wedding Photoshoot Makeup | GTA',
    metaDescription:
      `eShoot and pre-wedding photoshoot makeup across the GTA: HD waterproof ${fullGlam.name} by {artistName}, built for the camera. Studio or on-location for ${bookingPolicies.travelMinGroup}+.`,
    h1:       'eShoot & Pre-Wedding Photoshoot Makeup',
    subtitle: 'Full Glam built for the camera: engagement shoots and pre-wedding sessions across the GTA.',
    serviceType: 'eShoot & Pre-Wedding Photoshoot Makeup and Hair',
    packageIds: ['full-glam'],
    packagesTitle: 'The eShoot package',
    intro:
      `An eShoot, the engagement or pre-wedding photoshoot couples do in the months before the wedding, is the one booking where the camera is the entire audience. There's no long ceremony to get through; there's a lens two feet from your face for a couple of hours. The makeup has to be built for that.\n\nEvery eShoot I do runs on the ${fullGlam.name} package (${formatPrice(fullGlam.price)} per person): HD waterproof makeup, hairstyling, and premium mink lashes. It's the same finish I use on wedding mornings, tuned for close-up photography rather than banquet-hall distance.\n\neShoot and pre-wedding sessions are the heart of this service, and editorial and brand-shoot makeup are available too: same ${fullGlam.name} package, same pricing.`,
    sections: [
      {
        heading: 'Makeup that reads on camera',
        body:
          `The base is HD waterproof. It's listed in the package for a reason, because outdoor sessions mean wind, warmth, and the occasional happy tear. I work exclusively with {brands}, and if you prefer an airbrushed finish, ${addOns.airbrush.label.toLowerCase()} is a ${formatPrice(addOns.airbrush.fee)} add-on.\n\nPremium mink lashes are included, and a ${addOns.touchupKit.label.toLowerCase()} (${formatPrice(addOns.touchupKit.fee)}) is worth adding for longer sessions or a two-location shoot day.`,
      },
      {
        heading: "Planning around your photographer's light",
        body:
          `Most shoot schedules are built backwards from the light, usually the golden-hour window your photographer wants. I plan the makeup start time the same way. The studio opens at ${fmtHour(site.hours[0].opens)} daily, and if you need to be camera-ready very early, a ${formatPrice(policies.earlyMorningFee)} early-morning fee applies for ${policies.earlyMorningThreshold} starts.\n\nTell me the shoot time and location when you inquire and I'll work out when the chair time needs to begin.`,
      },
      {
        heading: 'Studio or on-location',
        body:
          `If one person is getting makeup (typically the bride-to-be), the appointment happens at my studio in {baseCity}. When ${bookingPolicies.travelMinGroup} or more people are getting services (say your mom or sister is joining the shoot), travel is available: ${travelFees}.\n\n${depositLine}`,
      },
    ],
    faq: [
      {
        q: 'What does eShoot makeup cost in the GTA?',
        a: `${formatPrice(fullGlam.price)} per person per event on the ${fullGlam.name} package, with HD waterproof makeup, hairstyling, and premium mink lashes included. A ${policies.depositPercent}% deposit confirms the booking.`,
      },
      {
        q: 'Is an eShoot the same as a bridal makeup trial?',
        a: `No, but it's a genuinely useful preview of how a full face photographs on you. The formal bridal trial is a separate service (${trial.feeText}), booked around your consultation. Many brides treat the eShoot as the real-world test and the trial as the fine-tuning.`,
      },
      {
        q: 'Do you travel to photoshoot locations?',
        a: `When ${bookingPolicies.travelMinGroup} or more people are getting makeup, yes: ${travelFees}. If it's just one person, the appointment is at the studio (${site.address}), and you head to the shoot from there.`,
      },
      {
        q: 'Will the makeup hold up outdoors?',
        a: `That's what the HD waterproof base is for. It's designed to last through long, warm, emotional wedding days, and an outdoor shoot is a lighter test than that. Add a ${addOns.touchupKit.label.toLowerCase()} (${formatPrice(addOns.touchupKit.fee)}) if your session runs multiple hours or locations.`,
      },
      {
        q: 'Do you do editorial or brand-shoot makeup?',
        a: `Yes, editorial and brand/commercial shoots run on the same ${fullGlam.name} package (${formatPrice(fullGlam.price)} per person per event), with the same HD waterproof, camera-first finish. eShoot and pre-wedding sessions are the core of this service; send your shoot details through the inquiry form and I'll plan the chair time around your call sheet.`,
      },
    ],
    galleryTag: 'full-glam',
    ctaTitle:   'Ready to book your eShoot?',
  },
] as const

// Lookup helper — throws on unknown slug so a typo fails loudly at build
// (mirrors getPackage in config/packages.ts).
export function getServicePage(slug: string): ServicePage {
  const page = servicePages.find((p) => p.slug === slug)
  if (!page) throw new Error(`getServicePage: no service page with slug "${slug}"`)
  return page
}
