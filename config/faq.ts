import { site } from './site'
import { getPackage, formatPrice } from './packages'

// Site-wide FAQ — rendered as a visible section AND emitted as FAQPage JSON-LD
// on every page that surfaces an FAQ (homepage + /services). Single array so
// the schema is identical across pages and there's no risk of stale content.
//
// All prices, names, fees, brands, and policy values are pulled from `site` and
// `packages` so this file stays in sync with the rest of the config. To change
// a number (e.g. deposit %, travel fee, package price), edit the source config
// — never the answer text below.

const bridal    = getPackage('bridal')
const preBridal = getPackage('pre-bridal')
const fullGlam  = getPackage('full-glam')
const party     = getPackage('party')

const { policies, brands, artistName, name, address, brideCount } = site
const { addOns, trial, consultation } = policies

export const faqs = [
  {
    q: 'How much does a bridal makeup artist cost in the GTA?',
    a: `Bridal packages at ${name} start at ${formatPrice(bridal.price)} ${bridal.priceNote} — this includes HD waterproof makeup, hairstyling, premium mink lashes, dupatta and jewelry setting, a touchup kit, and a consultation call. Pre-bridal events (Mehndi, Sangeet, Engagement) are ${formatPrice(preBridal.price)}, Full Glam is ${formatPrice(fullGlam.price)}, and Regular Party is ${formatPrice(party.price)}. All prices are ${bridal.priceNote}.`,
  },
  {
    q: 'How far in advance should I book my wedding makeup?',
    a: `We recommend booking 6–12 months in advance, especially for peak wedding season (May through October) when dates fill up fast. A ${policies.depositPercent}% non-refundable deposit via e-transfer secures your date — no payment is required until we've spoken and you're ready to move forward.`,
  },
  {
    q: 'Do you travel to my venue?',
    a: `Yes — ${artistName} travels to venues across the entire GTA. Travel fees are ${formatPrice(policies.travelPeel)} within Peel Region and up to ${formatPrice(policies.travelGTA)} for the wider GTA. Alternatively, you're welcome to visit the studio at ${address}.`,
  },
  {
    q: 'Do you offer a trial before the wedding day?',
    a: `All Bridal and Pre-Bridal packages include a consultation call ${consultation.timing} to discuss your look and review inspiration pictures. If you'd also like a full makeup trial, the fee is ${trial.feeText}. Trials are scheduled ${trial.scheduling.toLowerCase()} ${trial.refundCondition}`,
  },
  {
    q: 'What makeup brands and products do you use?',
    a: `${artistName} works exclusively with professional-grade luxury brands — ${brands.join(', ')}. These formulas are chosen specifically for all-day wear through the long hours of wedding.`,
  },
  {
    q: 'Do you do hair styling as well as makeup?',
    a: `Yes, every package includes both makeup and hairstyling. The Bridal package includes full hairstyling with hair padding, pins, and dupatta and jewelry setting. For best results, please ${policies.terms.hairPrep.charAt(0).toLowerCase() + policies.terms.hairPrep.slice(1)}`,
  },
  {
    q: 'What events does the Bridal package cover?',
    a: `The Bridal package (${formatPrice(bridal.price)}) is designed for main ceremony events — ${bridal.tagline}. For pre-wedding events like ${preBridal.tagline}, the Pre-Bridal package (${formatPrice(preBridal.price)}) is the right fit.`,
  },
  {
    q: 'Is there an extra charge for early morning appointments?',
    a: `Yes, a ${formatPrice(policies.earlyMorningFee)} early morning fee applies for start times between ${policies.earlyMorningThreshold}, as these require significantly earlier preparation and travel.`,
  },
  {
    q: 'Can I add services like airbrush or hair extensions?',
    a: `Yes, several add-ons are available: ${addOns.airbrush.label.toLowerCase()} (${formatPrice(addOns.airbrush.fee)}), ${addOns.clientHairExtensions.label.toLowerCase()} (${formatPrice(addOns.clientHairExtensions.fee)}), ${addOns.studioHairExtensions.label.toLowerCase()} (${formatPrice(addOns.studioHairExtensions.fee)} ${addOns.studioHairExtensions.unit}), ${addOns.blowDryWetHair.label.toLowerCase()} (${formatPrice(addOns.blowDryWetHair.fee)}), ${addOns.bridalDupattaSetting.label.toLowerCase()} (${formatPrice(addOns.bridalDupattaSetting.fee)}), ${addOns.partyDupattaSetting.label.toLowerCase()} (${formatPrice(addOns.partyDupattaSetting.fee)}), ${addOns.jewelrySetting.label.toLowerCase()} (${formatPrice(addOns.jewelrySetting.fee)}), ${addOns.premiumMinkLashes.label.toLowerCase()} (${formatPrice(addOns.premiumMinkLashes.fee)}), and ${addOns.touchupKit.label.toLowerCase()} (${formatPrice(addOns.touchupKit.fee)}).`,
  },
  {
    q: 'What is your cancellation and deposit policy?',
    a: `A ${policies.depositPercent}% deposit is required to confirm your booking and is non-refundable and non-transferable. Partial cancellation of a booked package is not permitted — all included services must be completed. The one exception is the trial-linked refund: if a trial is booked immediately after confirmation and you choose not to proceed, the deposit is fully refundable.`,
  },
  {
    q: 'How should I prepare for my appointment?',
    a: `For makeup: ${policies.terms.facePrep.charAt(0).toLowerCase() + policies.terms.facePrep.slice(1)} For hair: ${policies.terms.hairPrep.charAt(0).toLowerCase() + policies.terms.hairPrep.slice(1)} This gives ${artistName} the best possible base to work with and ensures the longest-lasting results.`,
  },
  {
    q: 'Do you work with all skin tones and cultural wedding traditions?',
    a: `Absolutely. ${artistName} specializes in South Asian and multicultural bridal looks and has worked with ${brideCount} brides across Indian, Pakistani and other traditions. She has deep experience with all skin tones, undertones, and cultural styling requirements from gurdwara ceremonies to grand ballroom receptions.`,
  },
] as const
