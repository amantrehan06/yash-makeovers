// City landing-page data. Each city has a UNIQUE intro paragraph that leans
// into the city's specific community and wedding-scene angle — never duplicate
// of the homepage. FAQs are generated in the page component (standardised set
// across all cities, with city name interpolated) so there's one source of
// truth for the schema.
//
// Strings here use template tokens — see config/content.ts → fillTemplate().
// Tokens: {experience}, {brides}, {rating}, {reviewCount}, {seasonYears},
//         {brands}, {artistName}, {baseCity}
// They're substituted at render time so editing one value in site.ts
// updates all 10 city pages.
//
// ── OPTIONAL SEO FIELDS (fill in to boost local rankings) ────────────
// venues:        wedding venues you've worked at in the city. Renders a
//                "Popular Venues" section. Boosts local SEO — Google
//                associates the page with each named venue.
// neighborhoods: neighborhoods/areas within the city. Renders an
//                "Areas served" section. Captures hyperlocal queries
//                like "Springdale bridal makeup".
// nearbyCities:  slugs of neighboring city pages to cross-link at the
//                bottom of the page. Helps Google understand your full
//                service area and spreads internal link authority.
//
// All three are arrays — leave empty (default) to hide the section.
//
// ── CONTENT BLOCKS (hub-and-spoke SEO engine) ────────────────────────
// contentBlocks: short, unique "recent work" case studies appended over
//                time. Each block is a real job written up as ~150 words
//                of original copy — sourced from an Instagram caption and
//                transformed by the /transform-post Claude skill.
//                Renders a "Recent work in [City]" feed below the hero.
//                Growing this array over time keeps each city page fresh
//                and unique WITHOUT mass-generated text (which would trip
//                Google's Scaled Content Abuse filter). Add blocks slowly
//                and deliberately — quality over volume.

export interface ContentBlock {
  id:        string   // unique, e.g. 'brampton-2026-05-jasmine-bridal'
  date:      string   // ISO date 'YYYY-MM-DD' — used for sort + display
  service:   string   // package id: 'bridal' | 'pre-bridal' | 'full-glam' | 'party'
  title:     string   // short headline, ~6-10 words
  body:      string   // ~150 words of unique case-study copy
  imageUrl?: string   // optional Cloudinary public_id
  city:      string   // city slug — redundant when nested, but the
                      // transform skill emits it for routing
  sourceId?: string   // Instagram shortCode — used by SEO Engine to detect
                      // already-processed posts. Delete the block → post is eligible again.
}

export interface City {
  slug:            string
  name:            string
  province:        string
  isHome:          boolean
  angle:           string
  metaTitle:       string
  metaDescription: string
  h1:              string
  // Short keyword-rich line rendered directly below the H1. Used to bake
  // long-tail search phrases ("bridal makeup and hair {city}", specialty +
  // {city}) into the first 30 words of the page without stuffing them into
  // the H1 itself. Keep under ~20 words. Should contain the city name.
  subtitle:        string
  intro:           string
  // One unique city-specific sentence for the "Party, Prom & Event Makeup"
  // section (NonBridalSection). Reuses this city's venue/neighbourhood data —
  // never generic filler, never duplicated across cities. Shared surrounding
  // copy lives in content.ts → cityPage.nonBridalBody.
  nonBridalBlurb:  string
  // Geographic centroid — used by per-city Service schema (areaServed.geo)
  // for local-pack ranking. Approximate city center is fine here (not a
  // specific pin) — represents the service area. Get from maps.google.com
  // → search city → right-click center → copy "lat, lng" if you want to
  // refine the defaults.
  geo:             { latitude: number; longitude: number }
  venues:          readonly string[]
  neighborhoods:   readonly string[]
  nearbyCities:    readonly string[]
  contentBlocks:   readonly ContentBlock[]
}

export const cities: readonly City[] = [
  {
    slug: 'brampton',
    name: 'Brampton',
    province: 'ON',
    isHome: true,
    angle: 'home base, South Asian community hub',
    metaTitle: 'Makeup Artist in Brampton — South Asian Bridal & Party',
    metaDescription:
      "South Asian bridal, party & event makeup in Brampton. {experience} years and {brides} brides served, all from home base. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Brampton',
    subtitle: 'Bridal makeup and hair for Brampton brides. {experience} years and {brides} weddings, all from this city.',
    geo: { latitude: 43.6831, longitude: -79.7663 },
    intro:
      "Brampton is home. I built Yash Makeovers here because this is where South Asian wedding culture in the GTA actually lives. Eight of ten brides I work with have some connection to this city, whether it's a Brampton gurdwara ceremony, a thousand-guest reception at Embassy Grand, or family flying in from India and settling into a Castlemore Airbnb for the week.\n\nWhat I love about Brampton weddings is the scale and the heart. They run long. A typical day starts at 5am with hair and makeup for the Anand karaj wedding, then a reception that goes past midnight. The makeup has to hold for sixteen hours and survive crying, laughing, hugging, dancing under hot ballroom lights. From Springdale to Bramalea, every neighbourhood feels familiar. This city raised the standard for what a South Asian wedding can be, and I've spent ten years getting better at meeting it.",
    venues: [
      'Embassy Grand Convention Centre',
      'Pearson Convention Centre',
      'Grand Empire Banquet & Convention Centre',
      'Dreams Convention Centre',
      'Queen\'s Manor Event Centre',
      'Chandni Victoria',
      'Canadian Convention Centre',
      'Bombay Palace Banquet Hall'
    ],
    neighborhoods: [
      'Castlemore',
      'Springdale',
      'Bramalea',
      'Mount Pleasant',
      'Credit Valley',
      'Heart Lake',
      'Fletcher\'s Meadow',
      'Bram West'
    ],
    nonBridalBlurb:
      "With the studio right here in Brampton, solo party and prom appointments are the easiest of any city — no travel fee, just book a chair, whether you're coming from Springdale, Bramalea, or Mount Pleasant.",
    nearbyCities: ['mississauga', 'toronto', 'vaughan', 'etobicoke'],
    contentBlocks: [

    {
      id: `brampton-202303-bridal-goals-gold`,
      date: `2023-03-09`,
      city: `brampton`,
      service: `bridal`,
      title: `Bridal Makeup Goals in Brampton with Yash Makeovers`,
      body: `A bridal look featuring gold tones for an event in Brampton. Makeup was done by Yash Makeovers. The outfit was provided by Svelegance. Jewelry was sourced from Lazevartoronto. Photography was captured by Aniket Sananse Weddings.`,
      imageUrl: `yash-makeovers/work-blocks/brampton/bridal-makeup-brampton-bridal-goals-gold-202303`,
      sourceId: `Cpk-mvrueGb`,
    }
  ,
    {
      id: `brampton-202202-bridal-goals-pakistani-nikkah`,
      date: `2022-02-17`,
      city: `brampton`,
      service: `bridal`,
      title: `Bridal Goals for a Pakistani Nikkah in Brampton`,
      body: `A bridal look created by Yash Makeovers for a Pakistani nikkah. The makeup artist was @yashmakeovers, and the outfit was provided by @noorani_baksa. Jewelry was supplied by @jewellerybynusrat. Photography was done by @forevercreationsca.`,
      imageUrl: `yash-makeovers/work-blocks/brampton/bridal-makeup-brampton-bridal-goals-pakistani-nikkah-202202`,
      sourceId: `CaFzGpuv9x3`,
    }
  ,
    {
      id: `brampton-202606-red-gown-dreamy-brown-makeup`,
      date: `2026-06-17`,
      city: `brampton`,
      service: `bridal`,
      title: `Bridal makeup for a red gown in Brampton`,
      body: `A look featuring a stunning red silhouette gown was created for a bridal event. The makeup included soft, dreamy brown shades of chocolate, designed to provide a romantic glow. This service reflects the artistry in creating looks that complement the beauty of the moment.`,
      imageUrl: `yash-makeovers/work-blocks/brampton/bridal-makeup-brampton-red-gown-dreamy-brown-202606`,
      sourceId: `DZqqciwFOmJ`,
    }
  ,
    {
      id: `brampton-202606-red-gold-bridal-lehenga`,
      date: `2026-06-15`,
      city: `brampton`,
      service: `bridal`,
      title: `Red and Gold Embroidered Lehenga for Bridal Ceremony in Brampton`,
      body: `A red and gold embroidered lehenga was created for the bride, Jeeval, for her wedding ceremony. The outfit was provided by Frontier Brampton and Frontier Heritage. Yash Makeovers applied the bridal makeup, while Fotos by Anum captured the event. Jewelry was sourced from Queens Shingar.`,
      imageUrl: `yash-makeovers/work-blocks/brampton/bridal-makeup-brampton-red-gold-bridal-lehenga-202606`,
      sourceId: `DZnCZb2jjvV`,
    }
  ,
    {
      id: `brampton-202605-ayushi-bridal-makeup`,
      date: `2026-05-14`,
      city: `brampton`,
      service: `bridal`,
      title: `Ayushi's Bridal Makeup by Yash Makeovers in Brampton`,
      body: `A bridal look was created for Ayushi by Yash Makeovers. The makeup artist focused on enhancing Ayushi's features while ensuring a glamorous appearance. The event type is not specified, but it is aligned with traditional bridal celebrations. Ayushi's Instagram handle is Ayushib55.`,
      imageUrl: `yash-makeovers/work-blocks/brampton/bridal-makeup-brampton-ayushi-bridal-makeup-202605`,
      sourceId: `DYVRB3giVKX`,
    }
  ,
    {
      id: `brampton-202605-bridal-makeup-hair`,
      date: `2026-05-06`,
      city: `brampton`,
      service: `bridal`,
      title: `Bridal Makeup and Hair for Manjot in Brampton`,
      body: `Makeup and hair services were provided by Yash Makeovers for Manjot. The styling was done for a bridal event, featuring a cohesive look tailored to her needs. Collaborators who contributed to this look were tagged in the content.`,
      imageUrl: `yash-makeovers/work-blocks/brampton/bridal-makeup-brampton-bridal-makeup-hair-202605`,
      sourceId: `DYALnOUEbmK`,
    }

  ],
  },
  {
    slug: 'mississauga',
    name: 'Mississauga',
    province: 'ON',
    isHome: false,
    angle: 'multicultural, premium clientele',
    metaTitle: 'Makeup Artist in Mississauga — Bridal, Party & On-Site',
    metaDescription:
      "Pakistani and Afghan bridal makeup in Mississauga — plus party and guest looks. {experience} years across Mehndi, Nikkah and reception. Book {artistName}.",
    h1: 'Bridal Makeup Artist in Mississauga',
    subtitle: 'Pakistani and Afghan bridal makeup and hair specialist for Mississauga brides.',
    geo: { latitude: 43.5890, longitude: -79.6441 },
    intro:
      "Mississauga is where I do most of my Pakistani and Afghan bridal work. The community here is large, the families are tight, and word-of-mouth from one Mehndi or reception goes a long way. Pakistani and Afghan bridal makeup has its own rhythm: softer pastels for the Mehndi or Henna nights, traditional red and gold for the Nikkah, then a fresh evolved look for the reception. The dupatta drape, the jewellery setting, and the makeup intensity all shift across the events.\n\nThe venue mix in Mississauga ranges from grand banquet halls like Pearson Convention Centre to intimate hotel ballrooms or private estates near Mineola and Lorne Park. Each calls for different makeup choices. Larger spaces need more visible structure and pigment. Smaller spaces let the makeup go softer, more skin-forward.\n\nI travel to wherever you're getting ready. Whether that's a hotel near the airport or your parents' home in Streetsville, the kit comes to you.",
    venues: [
      'Mississauga Convention Centre',
      'Apollo Convention Centre',
      'Sagan Banquet Hall and Convention Centre',
      'Mississauga Grand Banquet & Event Centre',
      'Chandni Victoria',
      'Red Rose Convention Centre',
      'Palacio Event Centre',
      'Pearl Banquet & Convention Centre',
      'Grand Metropolitan Premium Event Venue'
    ],
    neighborhoods: [
      'Port Credit',
      'Streetsville',
      'Churchill Meadows',
      'Lorne Park',
      'Clarkson',
      'Erin Mills',
      'Meadowvale',
      'Cooksville'
    ],
    nonBridalBlurb:
      'Guest and party glam runs on the same Mehndi-and-reception circuit I already work across Mississauga, from Streetsville homes to the halls around Pearson Convention Centre.',
    nearbyCities: ['brampton', 'toronto', 'etobicoke', 'oakville'],
    contentBlocks: [
    {
      id: `mississauga-202606-soft-glam-timeless-elegance`,
      date: `2026-06-15`,
      city: `mississauga`,
      service: `bridal`,
      title: `Soft Glam Bridal Makeup for Nikkah in Mississauga`,
      body: `A soft glam bridal look for a nikkah was created for Bride Fariha. The makeup showcased timeless elegance, emphasizing grace from every angle. Hair and makeup services were provided by @yashmakeovers, while the saree draping was done by @pleatingbyvj.`,
      imageUrl: `yash-makeovers/work-blocks/mississauga/bridal-makeup-mississauga-soft-glam-timeless-elegance-202606`,
      sourceId: `DZnsSshCDm1`,
    }
  ,
    {
      id: `brampton-202603-pakistani-bridal-makeup-hair`,
      date: `2026-03-09`,
      city: `brampton`,
      service: `bridal`,
      title: `Pakistani Bridal Makeup and Hair in Mississauga`,
      body: `A deep maroon and gold bridal look for a Pakistani bride. The makeup and hair services were provided by Yash Makeovers, focusing on traditional elements suitable for the ceremony and reception. The techniques used highlighted the bride’s features while complementing her attire. Collaborators included various bridal makeup artists.`,
      imageUrl: `yash-makeovers/work-blocks/mississauga/bridal-makeup-brampton-pakistani-bridal-makeup-hair-202603`,
      sourceId: `DVq_rsFEVbB`,
    }
  ],
  },
  {
    slug: 'toronto',
    name: 'Toronto',
    province: 'ON',
    isHome: false,
    angle: 'editorial, modern South Asian brides',
    metaTitle: 'Makeup Artist in Toronto — Bridal & Party Makeup + Hair',
    metaDescription:
      "Bridal, party and event makeup artist for Toronto. On-site service across the city. {rating}★ · {reviewCount} Google reviews. Book {artistName}.",
    h1: 'Bridal Makeup Artist in Toronto',
    subtitle: 'Bridal makeup and hair for Toronto brides. On-site service across the city.',
    geo: { latitude: 43.6532, longitude: -79.3832 },
    intro:
      "The first question Toronto brides usually ask is whether I travel into the city. The answer is yes, and most mornings I'm already on the way before sunrise. Almost every Toronto bride prefers at-home service for the morning of the wedding. The hair, the makeup, the dupatta setting all happen where the family is, not in a hotel suite or a rented studio.\n\nWorking across Toronto means adapting to the lighting in every venue. Casa Loma is golden and forgiving. Liberty Grand turns sharp white the moment the DJ starts. A downtown ceremony might move from a Yorkville cocktail patio to a Distillery District reception in the same afternoon, with three different light temperatures to navigate. My job is to build a face that reads beautifully across all of them.\n\nThe Toronto bride is usually balancing two pressures: looking modern enough for the editorial photos she's been dreaming about for years, and looking like herself enough that her family recognizes her. That balance is the work.",
    venues:        ['Liberty Grand Entertainment Complex',
                      'The Carlu',
                      'One King West Hotel & Residence',
                      'The Fairmont Royal York',
                      'Casa Loma',
                      'The Omni King Edward Hotel',
                      'The Eglinton Grand',
                      'The Palais Royale'],
    neighborhoods: ['Yorkville',
                      'The Distillery District',
                      'The Beaches',
                      'Rosedale',
                      'High Park',
                      'Leslieville',
                      'Downtown Core',
                      'Liberty Village'],
    nonBridalBlurb:
      'For downtown events — a reception at Liberty Grand, a party in Yorkville or Liberty Village — bookings of two or more bring the kit into Toronto to you.',
    nearbyCities:  ['mississauga', 'etobicoke', 'vaughan', 'scarborough'],
    contentBlocks: [

  
    {
      id: `toronto-202205-regal-bridal-look`,
      date: `2022-05-09`,
      city: `toronto`,
      service: `bridal`,
      title: `Regal Bridal Look for an Indian Wedding in Toronto`,
      body: `A regal bridal look was created for an Indian wedding. The makeup was done by HMUA @yashmakeovers, showcasing skilled artistry for the occasion. This look was designed for a ceremony, reception, Nikkah, Walima, and Baraat, highlighting traditional elements in bridal beauty.`,
      imageUrl: `yash-makeovers/work-blocks/toronto/bridal-makeup-toronto-regal-bridal-look-202205`,
      sourceId: `CdVpo1XrE9C`,
    }
  ,
    {
      id: `toronto-202606-pakistani-bridal-maroon-gold`,
      date: `2026-06-19`,
      city: `toronto`,
      service: `bridal`,
      title: `Maroon and Gold Bridal Look for a Pakistani Nikkah in Toronto`,
      body: `A deep maroon and gold bridal look was created for a Pakistani nikkah in Toronto. The outfit featured intricate embroidery, designed by Dulhan by Raziya. Collaborators included photography by Burhan Photo, videography by Evince Films, and decor by Sira Decor.`,
      imageUrl: `yash-makeovers/work-blocks/toronto/bridal-makeup-toronto-pakistani-bridal-maroon-gold-202606`,
      sourceId: `DZyE5Rtokpa`,
    }
  ,

    {
      id: `toronto-202605-walima-glam`,
      date: `2026-05-03`,
      city: `toronto`,
      service: `bridal`,
      title: `Vania's Walima Glam in Toronto`,
      body: `A glamorous bridal look for Vania's walima. Makeup and hair were expertly done by Yash Makeovers. The focus was on creating a polished and sophisticated appearance suitable for the event.`,
      imageUrl: `yash-makeovers/work-blocks/toronto/bridal-makeup-toronto-walima-glam-202605`,
      sourceId: `DX5J1ZJEboS`,
    }
  ,
    {
      id: `toronto-202604-bridal-makeup-amrita`,
      date: `2026-04-29`,
      city: `toronto`,
      service: `bridal`,
      title: `Bridal Makeup for Amrita by Yash Makeovers in Toronto`,
      body: `A bridal makeup look for Amrita, created by Yash Makeovers, was showcased in Toronto. The makeup emphasized Amrita's features, fitting for her bridal celebration. Collaborators included Yash Makeovers, highlighting their expertise in bridal makeup.`,
      imageUrl: `yash-makeovers/work-blocks/toronto/bridal-makeup-toronto-bridal-makeup-amrita-202604`,
      sourceId: `DXuztcIlPAc`,
    }
  ,
    {
      id: `toronto-202603-bridal-look-for-nikkah`,
      date: `2026-03-06`,
      city: `toronto`,
      service: `bridal`,
      title: `Bridal Makeup for Nikkah in Toronto`,
      body: `A bridal look for a Nikkah in Toronto is now available for bookings. Yash Makeovers invites brides to create their dream look for 2026. Collaborating closely, Yash Makeovers aims to capture the essence of modern bridal beauty.`,
      imageUrl: `yash-makeovers/work-blocks/toronto/bridal-makeup-toronto-bridal-look-for-nikkah-202603`,
      sourceId: `DVjim28EdCJ`,
    },
{
      id: `brampton-202606-soft-pink-glam-bridal`,
      date: `2026-06-05`,
      city: `toronto`,
      service: `bridal`,
      title: `Soft Pink Glam Bridal Makeup in Toronto`,
      body: `Soft pink glam was created for the bridal look, just as envisioned by the bride. Makeup was done by Yash Makeovers, with hair styled by Sandy B Beauty Lounge. This look was tailored for the bridal ceremony.`,
      imageUrl: `yash-makeovers/work-blocks/toronto/bridal-makeup-toronto-soft-pink-glam-bridal-202606`,
      sourceId: `DZNljrlFI6m`,
    }
  ],
  },
  {
    slug: 'etobicoke',
    name: 'Etobicoke',
    province: 'ON',
    isHome: false,
    angle: 'intimate, community feel',
    metaTitle: 'Makeup Artist in Etobicoke — Bridal & Party, On-Location',
    metaDescription:
      "Bridal, party and prom makeup for Etobicoke. On-location service, {experience} years experience, luxury products. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Etobicoke',
    subtitle: 'Bridal makeup and hair for Etobicoke brides. On-location service across the area.',
    geo: { latitude: 43.6205, longitude: -79.5132 },
    intro:
      "Etobicoke is one of the easier cities to reach from the Brampton studio. 427 south, no 401, no morning gridlock. That changes how I plan the day. We don't need a 4am start to beat rush hour, which means the morning gets to breathe.\n\nBrides here often choose Etobicoke specifically because family is close. The venue is fifteen minutes from the parents' house, not ninety. Ceremonies skew smaller and more intentional, not because budgets are smaller but because the priorities are different.\n\nMost Etobicoke weddings split between two worlds. The heritage charm of the Old Mill calls for softer makeup that catches the warm natural light. The banquet halls out near Rexdale run cooler and brighter, so the makeup needs more structure to push back without looking heavy on camera.",
    venues: [
      'Grand Metropolitan Premium Event Venue',
      'Old Mill Toronto',
      'Toronto Congress Centre',
      'Woodbine Banquet Hall',
      'The Woodbine Club',
      'Spazio Event-Concept',
      'Oasis Convention Centre'
    ],
    neighborhoods: [
      'The Kingsway',
      'Humber Bay Shores',
      'Mimico',
      'Long Branch',
      'Islington Village',
      'Rexdale',
      'New Toronto',
      'Markland Wood'
    ],
    nonBridalBlurb:
      'The quick 427 run from the studio makes Etobicoke one of the easiest group bookings — a Kingsway dinner party, prom photos along Humber Bay Shores, or a hall out by Rexdale.',
    nearbyCities: ['mississauga', 'toronto', 'brampton', 'vaughan'],
    contentBlocks: [],
  },
  {
    slug: 'oakville',
    name: 'Oakville',
    province: 'ON',
    isHome: false,
    angle: 'luxury, high-budget weddings',
    metaTitle: 'Makeup Artist in Oakville — Luxury Bridal & Event Makeup',
    metaDescription:
      "Luxury bridal and event makeup artist in Oakville. {experience} years across Sikh ceremonies, white-wedding receptions and parties. Book {artistName}.",
    h1: 'Bridal Makeup Artist in Oakville',
    subtitle: 'Luxury bridal makeup artist offering bridal makeup and hair for Oakville brides.',
    geo: { latitude: 43.4675, longitude: -79.6877 },
    intro:
      "A wedding in Oakville is a statement before the bride says a word. The venue choice alone signals it. Glen Abbey Golf Club, the Oakville Conference Centre, or one of the estate properties along the lake. These are spaces built for editorial photography, and the makeup has to live up to the setting.\n\nMany of the Oakville brides I work with are planning two ceremonies in one day. The morning is a Sikh ceremony at the gurdwara, traditional and red toned for the Anand Karaj. The evening is a white wedding at one of the lakeside venues, softer and more editorial to work with the white dress and the cooler reception lighting. Two distinct looks, one bride, and a tight window in between. The makeup has to be planned as a complete day, not two unrelated appointments.\n\nTravel to Oakville is built into how I work. Whether the morning starts in Bronte Village or at a parents' place in Old Oakville, the kit travels with me.",
    venues: [
      'Oakville Conference & Banquet Centre',
      'Glen Abbey Golf Club',
      'Harbour Banquet & Conference Centre',
      'Le Dome Banquet Hall',
      'The Oakville Club',
      'RattleSnake Point Golf Club'
    ],
    neighborhoods: [
      'Old Oakville',
      'Bronte Village',
      'Glen Abbey',
      'Joshua Creek',
      'Clearview',
      'River Oaks',
      'Westmount',
      'Morrison'
    ],
    nonBridalBlurb:
      'Event and eShoot glam finished for the same lakeside settings Oakville brides book — Glen Abbey, Bronte Village, and the estate properties along the water.',
    nearbyCities: ['mississauga', 'brampton', 'etobicoke'],
    contentBlocks: [],
  },
  {
    slug: 'vaughan',
    name: 'Vaughan',
    province: 'ON',
    isHome: false,
    angle: 'South Asian diaspora, temple weddings',
    metaTitle: 'Makeup Artist in Vaughan — Bridal, Party & Temple Weddings',
    metaDescription:
      "Bridal, party and Sangeet makeup artist in Vaughan. {experience} years specializing in Sikh and Hindu temple weddings. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Vaughan',
    subtitle: 'Luxury bridal makeup artist for Vaughan brides. Bridal makeup and hair specialist for Sikh and Hindu temple weddings.',
    geo: { latitude: 43.8361, longitude: -79.4982 },
    intro:
      "Vaughan weddings are some of the longest and most layered ceremonies in the GTA. The Sikh and Hindu communities here run multi-day events that include Sangeet, Mehndi, Anand Karaj or Vivah ceremony, lunch reception, and evening reception, sometimes across three days. The makeup has to hold across all of it, and the looks have to evolve so each event has its own visual identity.\n\nThe temple weddings I do most often happen at the larger gurdwaras and mandirs north of Highway 7. The lighting is bright and even, which is forgiving for skin but unforgiving for harsh contouring. I keep the makeup luminous and clean. The reception venues like Paramount, Universal, or Château Le Jardin lean more dramatic, so we can build up for evening looks.\n\nIf you're in Woodbridge, Kleinburg, or Concord, I come to you. The early morning ceremonies usually mean a 4am or 5am start, and I plan for it.",
    venues: [
      'Paramount EventSpace',
      'The Venetian Banquet & Hospitality Centre',
      'Universal EventSpace',
      'Riviera Event Space',
      'Château Le Jardin Event Venue',
      'The Doctor\'s House',
      'Da Vinci Banquet Halls',
      'Bellagio Boutique Event Venue'
    ],
    neighborhoods: [
      'Woodbridge',
      'Kleinburg',
      'Maple',
      'Thornhill',
      'Concord',
      'Vaughan Metropolitan Centre',
      'Vellore Village',
      'Sonoma Heights'
    ],
    nonBridalBlurb:
      "Sangeet and engagement bookings pair naturally with Vaughan's multi-day wedding circuit — from Woodbridge and Kleinburg homes to receptions at Paramount or Universal EventSpace.",
    nearbyCities: ['brampton', 'toronto', 'richmond-hill', 'north-york'],
    contentBlocks: [],
  },
  {
    slug: 'scarborough',
    name: 'Scarborough',
    province: 'ON',
    isHome: false,
    angle: 'Pakistani + Afghan bridal hub',
    metaTitle: 'Makeup Artist in Scarborough — Pakistani & Afghan Bridal',
    metaDescription:
      "Pakistani and Afghan bridal makeup in Scarborough — plus party and guest glam. {experience} years of expertise. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Scarborough',
    subtitle: 'Pakistani and Afghan bridal makeup and hair specialist for Scarborough brides.',
    geo: { latitude: 43.7764, longitude: -79.2318 },
    intro:
      "Scarborough is my second hub for Pakistani and Afghan bridal work, alongside Mississauga. The community here is rooted deep, and family networks stretch across multiple generations. Pakistani and Afghan weddings move across several events, each with its own visual identity: softer pastels for the Mehndi or Henna nights, traditional red and gold for the Nikkah, a fresh evolved look for the reception. The makeup evolves event to event, but the constant is durability under bright photography and long ceremonies.\n\nThe venues range from the high-capacity Scarborough Convention Centre to smaller community halls in Wexford and Milliken that work well for Nikkah ceremonies. Each setting shapes the makeup approach: bigger rooms need stronger pigment, smaller spaces let the look stay soft.\n\nScarborough is the longest drive from the Brampton studio, all of it on the 401, so I plan around it. Early call times, extra buffer for traffic, kit packed the night before. I travel into Scarborough weekly through peak wedding season.",
    venues: [
      'Scarborough Convention Centre',
      'The Estate Banquet and Event Centre',
      'Delta Hotels by Marriott Toronto East',
      'Grandeur Palace',
       'Remembrance Banquet Hall',
      'St. Peter and Paul Banquet Hall'
    ],
    neighborhoods: [
      'Agincourt',
      'Wexford',
      'Scarborough Bluffs',
      'Rouge',
      'Malvern',
      'Guildwood',
      'Milliken',
      'West Hill'
    ],
    nonBridalBlurb:
      'Party and guest makeup slots into the same Scarborough runs as my Nikkah and reception work — Agincourt, Milliken, and the halls around the Scarborough Convention Centre.',
    nearbyCities: ['toronto', 'markham', 'north-york', 'vaughan'],
    contentBlocks: [
    {
      id: `brampton-202605-bridal-makeup-nikkah`,
      date: `2026-05-23`,
      city: `scarborough`,
      service: `bridal`,
      title: `Bridal Makeup for a Nikkah Ceremony in Scarborough`,
      body: `A bridal makeup look for a Nikkah ceremony in Scarborough. The service highlighted the trust between the artist and the bride, enhancing the bride's natural beauty. Yash Makeovers provided the makeup transformation, ensuring a polished finish for the occasion.`,
      imageUrl: `yash-makeovers/work-blocks/scarborough/bridal-makeup-brampton-bridal-makeup-nikkah-202605`,
      sourceId: `DYslaNbFG6c`,
    }

  ,
    {
      id: `brampton-202604-engagement-bridal-makeup`,
      date: `2026-04-09`,
      city: `scarborough`,
      service: `bridal`,
      title: `Engagement Bridal Makeup for Vanshika in Scarborough`,
      body: `A beautiful bridal makeup look for Vanshika's engagement. The makeup was done by Yash Makeovers. The outfit was provided by Velvet Room. The style reflects a combination of traditional and contemporary elements suitable for the engagement ceremony.`,
      imageUrl: `yash-makeovers/work-blocks/scarborough/bridal-makeup-engagement-bridal-makeup-202604`,
      sourceId: `DW6h22BkfeM`,
    }
  ,
    {
      id: `brampton-202603-punjabi-bridal-makeup`,
      date: `2026-03-04`,
      city: `scarborough`,
      service: `bridal`,
      title: `Punjabi Bridal Makeup by Yash Makeovers in Scarborough`,
      body: `A Punjabi bridal look created for a ceremony in Scarborough. The makeup was done by Yash Makeovers, showcasing traditional techniques suitable for the event. The bride's Instagram handle is Shabnam Sharma.`,
      imageUrl: `yash-makeovers/work-blocks/scarborough/bridal-makeup-brampton-punjabi-bridal-makeup-202603`,
      sourceId: `DVetSgBEWGh`,
    }
  ],
  },
  {
    slug: 'markham',
    name: 'Markham',
    province: 'ON',
    isHome: false,
    angle: 'South Asian + East Asian multicultural',
    metaTitle: 'Makeup Artist in Markham — Multicultural Bridal & Party',
    metaDescription:
      "Bridal, party and event makeup for Markham's multicultural weddings. {experience} years at venues across the city. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Markham',
    subtitle: 'Bridal makeup and hair for Markham brides. Trusted across multicultural weddings.',
    geo: { latitude: 43.8561, longitude: -79.3370 },
    intro:
      "Markham is one of the newer wedding markets in the GTA, and it shows in the venues. Crystal Fountain, the Markham Convention Centre, Angus Glen, Hilton Toronto/Markham. These spaces were built in the last fifteen or twenty years, designed for high-fashion bridal photography under crisp modern lighting. The makeup approach has to match that polish.\n\nThe Markham bride is usually planning for a large, multicultural extended family. The community here is one of the most diverse in Canada, and the wedding guest list reflects that. The bridal look has to read beautifully under intense ballroom spotlights and high-resolution photography, without losing the warmth that makes the family portraits feel real.\n\nMarkham from Brampton means 401 east and then 404 or 407 north. That's a real drive, especially before sunrise. I plan an earlier start and build in buffer for traffic. Whether the morning is in Unionville, Angus Glen, or Downtown Markham, the kit gets there on time.",
    venues: [
      'Markham Convention Centre',
      'Crystal Fountain',
      'Hilton Toronto/Markham Suites Conference Centre & Spa',
      'Toronto Marriott Markham',
      'Angus Glen Golf Club',
      'Shangri-La Banquet Hall',
      'Savoy Event Centre',
      'Casa Victoria Fine Dining and Banquet'
    ],
   neighborhoods: [
     'Unionville',
     'Angus Glen',
     'Downtown Markham',
     'Cachet',
     'Berczy Village',
     'Cornell',
     'Greensborough',
     'Cathedraltown'
   ],
    nonBridalBlurb:
      "Full-glam finishes built for Markham's crisp modern venues — Crystal Fountain, Angus Glen, and the ballrooms around Downtown Markham and Unionville.",
    nearbyCities: ['toronto', 'richmond-hill', 'scarborough', 'vaughan'],
    contentBlocks: [],
  },
  {
    slug: 'north-york',
    name: 'North York',
    province: 'ON',
    isHome: false,
    angle: 'urban, multicultural, accessible',
    metaTitle: 'Makeup Artist in North York — Bridal, Party & Hair Service',
    metaDescription:
      "Bridal, party and event makeup for North York and the Yonge corridor. {artistName} travels into Don Mills and Bayview. Book for {seasonYears}.",
    h1: 'Bridal Makeup Artist in North York',
    subtitle: 'Bridal makeup and hair for North York brides and the Yonge corridor.',
    geo: { latitude: 43.7615, longitude: -79.4111 },
    intro: "North York weddings are family centrepieces by accident. The city sits at the geographic centre of the GTA, which means relatives drive in from every direction and the reception often becomes a logistical pivot for the whole region. The venues have evolved to handle that scale.\n\nWhat I notice about North York brides is the mix of urban polish and traditional values. Many are second-generation professionals working downtown but planning ceremonies that honour their parents' expectations. The makeup vision tends to thread that needle: refined enough for the editorial portraits, traditional enough for the elders.\n\nThe drive from the Brampton studio cuts through the 401 corridor, so North York mornings need an earlier start than a hometown wedding does. I build that into the schedule. Whether you're in Willowdale, Don Mills, or the Bridle Path, the kit arrives on time.",
    venues: [
      'Parkview Manor',
      'The Grand Luxe Event Boutique',
      'Julius Event Centre',
      'York Mills Gallery',
      'Paradise Banquet Hall',
      'The Warehouse Event Venue',
      'Bellamy Loft',
      'Toronto Don Valley Hotel & Suites'
    ],
    neighborhoods: [
      'Willowdale',
      'Don Mills',
      'The Bridle Path',
      'Bayview Village',
      'Newtonbrook',
      'York Mills',
      'Downsview',
      'Lawrence Park North'
    ],
   nonBridalBlurb:
     'North York sits at the centre of the GTA, so family events land here from every direction — Willowdale, Don Mills, or a hall along the Yonge corridor, group bookings travel easily.',
   nearbyCities: ['vaughan', 'toronto', 'richmond-hill', 'markham'],
   contentBlocks: [],
  },
  {
    slug: 'richmond-hill',
    name: 'Richmond Hill',
    province: 'ON',
    isHome: false,
    angle: 'affluent, destination-adjacent',
    metaTitle: 'Makeup Artist in Richmond Hill — Luxury Bridal, Party & Hair',
    metaDescription:
      "Luxury bridal, party and eShoot makeup in Richmond Hill. {experience} years with brides planning multi-country weddings. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Richmond Hill',
    subtitle: 'Luxury bridal makeup artist for Richmond Hill brides. Premium bridal makeup and hair service.',
    geo: { latitude: 43.8828, longitude: -79.4403 },
    intro:
      "Richmond Hill brides often plan multi-country weddings. The trousseau is from Delhi. The jewellery is shipped from Mumbai. The destination shoot happened in Udaipur in November. The actual wedding is here. Working with these brides means understanding that the GTA event is one chapter in a longer story, and the makeup needs to integrate with the photography and videography from every other chapter.\n\nThe aesthetic in Richmond Hill skews refined and high-finish. Bayview Hill estates, the Richmond Hill Country Club, Lusso Luxury Banquet Hall. These are spaces where details matter and craftsmanship is visible. The makeup needs to hold the same standard.\n\nI work especially carefully with the photography teams that these brides have flown in or contracted from elsewhere. We talk about light, lens, and finish before the day. Whether you're getting ready in Bayview Hill, Mill Pond, or Oak Ridges, the morning runs on a schedule that protects the photographer's golden-hour window.",
    venues: [
    'Richmond Hill Country Club',
  'Sheraton Parkway Toronto North Hotel & Suites',
  'Lusso Luxury Banquet Hall',
  'Oakview Terrace Reception Centre',
  'Persian Palace',
  'Fox Den Farms'
],
    neighborhoods: [
      'Bayview Hill',
      'Mill Pond',
      'Jefferson',
      'Oak Ridges',
      'Rouge Woods',
      'Devonsleigh',
      'South Richvale',
      'Doncrest'
    ],
   nonBridalBlurb:
     "Engagement shoots and event glam finished to the same standard Richmond Hill's venues expect — Bayview Hill, Mill Pond, and the Richmond Hill Country Club.",
   nearbyCities: ['vaughan', 'markham', 'north-york', 'toronto'],
   contentBlocks: [],
  },
]
