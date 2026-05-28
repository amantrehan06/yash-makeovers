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
  intro:           string
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
    metaTitle: 'Brampton Bridal Makeup Artist — South Asian Specialist',
    metaDescription:
      "Yash Makeovers is Brampton's most trusted bridal makeup artist. {experience} years of experience and {brides} happy brides — South Asian and multicultural specialist. Book your {seasonYears} wedding.",
    h1: 'Bridal Makeup Artist in Brampton, ON',
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
    nearbyCities: ['mississauga', 'toronto', 'vaughan', 'etobicoke'],
    contentBlocks: [
    {
      id: `brampton-202605-glowing-bride-magic`,
      date: `2026-05-21`,
      city: `brampton`,
      service: `bridal`,
      title: `A Glowing Bride's Magical Transformation in Brampton`,
      body: `On May 21, 2026, a beautiful bride from Brampton entrusted Yash Makeovers to create her dream look for her Nikkah ceremony. Known for understanding the intricacies of South Asian bridal aesthetics, Yash and the talented team at Sandy B Beauty Lounge collaborated to craft a stunning appearance that radiated elegance and cultural authenticity. The bride's look featured an enchanting blend of traditional and modern elements, perfectly complementing her intricately designed outfit. With a focus on longevity, the makeup was tailored to withstand the joy-filled hours of celebration, ensuring she looked flawless in every photograph taken at the iconic Brampton Banquet Hall. The result was a breathtaking transformation that captured the essence of her special day, leaving her glowing with confidence and ready to celebrate this significant milestone surrounded by family and friends.`,
      imageUrl: ``,
    }
  ,
    {
      id: `brampton-202605-ayushi-bridalmakeup`,
      date: `2026-05-18`,
      city: `brampton`,
      service: `bridal`,
      title: `Ayushi's Beautiful Bridal Look in Brampton`,
      body: `On May 18, 2026, Ayushi celebrated her special day with a stunning bridal look created by Yash Makeovers. This talented team worked closely with Ayushi to achieve a look that embraced her Punjabi heritage while ensuring every detail was perfect for her ceremony and reception. Collaborating with @sandybbeautylounge for her hair, Ayushi radiated confidence throughout her events, capturing the essence of her culture with grace. The makeup was designed for longevity, ensuring she looked flawless for her photographers and guests alike. Ayushi’s choice of makeup, complemented by her bridal attire, created a timeless aesthetic that perfectly suited the vibrant atmosphere of her Brampton celebrations. It was a joy to be part of her journey, helping to make her vision come to life.`,
      imageUrl: ``,
    }
  ],
  },
  {
    slug: 'mississauga',
    name: 'Mississauga',
    province: 'ON',
    isHome: false,
    angle: 'multicultural, premium clientele',
    metaTitle: 'Mississauga Wedding Makeup Artist — On-Site & Studio',
    metaDescription:
      'Bridal makeup artist serving Mississauga\'s premium banquet halls and intimate venues. {experience} years of experience and luxury-grade products. Book {artistName} for your {seasonYears} wedding.',
    h1: 'Bridal Makeup Artist in Mississauga, ON',
    geo: { latitude: 43.5890, longitude: -79.6441 },
    intro:
      "Mississauga brides know what they want. They've usually done their research, compared portfolios, and arrived at our first call with a clear vision and a refined eye for product quality. I love that. It makes the consultation efficient and the trial productive.\n\nWhat's specific to Mississauga weddings is the venue mix. The premier banquet halls like Pearson Convention Centre run grand and chandelier-heavy, while a growing share of brides choose intimate ceremonies at sophisticated hotel ballrooms or even private estates near Mineola and Lorne Park. The makeup approach shifts accordingly. Bigger venues need more visible structure, more pigment, more lash. Smaller spaces let you go softer, more skin-forward.\n\nEither way, I bring everything to you. Whether you're getting ready at a hotel near the airport or at your parents' home in Streetsville, the kit comes to the venue. No bridal party hauling outfits across the city in morning traffic.",
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
    nearbyCities: ['brampton', 'toronto', 'etobicoke', 'oakville'],
    contentBlocks: [],
  },
  {
    slug: 'toronto',
    name: 'Toronto',
    province: 'ON',
    isHome: false,
    angle: 'editorial, modern South Asian brides',
    metaTitle: 'Toronto Bridal Makeup & Hair — HD Editorial Looks',
    metaDescription:
      "Toronto's go-to bridal makeup artist for modern South Asian brides who want editorial, photo-forward looks. {rating} stars · {reviewCount} Google reviews. Book your {seasonYears} wedding.",
    h1: 'Bridal Makeup Artist in Toronto, ON',
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
    nearbyCities:  ['mississauga', 'etobicoke', 'vaughan', 'scarborough'],
    contentBlocks: [],
  },
  {
    slug: 'etobicoke',
    name: 'Etobicoke',
    province: 'ON',
    isHome: false,
    angle: 'intimate, community feel',
    metaTitle: 'Bridal Makeup Artist in Etobicoke, ON',
    metaDescription:
      "Calm, family-feel bridal makeup for Etobicoke weddings. {artistName} brings {experience} years of expertise and luxury products to your venue. Book for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Etobicoke, ON',
    geo: { latitude: 43.6205, longitude: -79.5132 },
    intro:
      "Etobicoke is the quieter cousin of Toronto, and that's exactly why brides here choose to stay close to home. Family lives around the corner. The venue is fifteen minutes away, not ninety. Ceremonies skew smaller and more intentional, not because budgets are smaller but because the priorities are different.\n\nMost Etobicoke weddings I do split between two worlds. The heritage charm of the Old Mill with its riverside ceremony spaces calls for softer, more romantic makeup, finishes that catch the warm natural light. The grand banquet halls out near Rexdale run cooler and brighter, so the makeup needs more structure to push back against the lighting without ever looking heavy on camera.\n\nThe short distance from The Kingsway, Mimico, or Humber Bay Shores means we can start later and take our time. The morning becomes part of the celebration rather than a rush to beat traffic.",
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
    nearbyCities: ['mississauga', 'toronto', 'brampton', 'vaughan'],
    contentBlocks: [],
  },
  {
    slug: 'oakville',
    name: 'Oakville',
    province: 'ON',
    isHome: false,
    angle: 'luxury, high-budget weddings',
    metaTitle: 'Bridal Makeup Artist in Oakville, ON',
    metaDescription:
      "Luxury bridal makeup for Oakville weddings at Glen Abbey, Le Dôme, and Oakville's grand estate venues. HD-rated luxury formulas. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Oakville, ON',
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
    nearbyCities: ['mississauga', 'brampton', 'etobicoke'],
    contentBlocks: [],
  },
  {
    slug: 'vaughan',
    name: 'Vaughan',
    province: 'ON',
    isHome: false,
    angle: 'South Asian diaspora, temple weddings',
    metaTitle: 'Vaughan Bridal Makeup — Sikh & Hindu Temple Weddings',
    metaDescription:
      "Bridal makeup for Vaughan's South Asian community — gurdwara, temple, and grand ballroom weddings. {experience} years of experience, mobile to your venue. Book {seasonYears}.",
    h1: 'Bridal Makeup Artist in Vaughan, ON',
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
    nearbyCities: ['brampton', 'toronto', 'richmond-hill', 'north-york'],
    contentBlocks: [],
  },
  {
    slug: 'scarborough',
    name: 'Scarborough',
    province: 'ON',
    isHome: false,
    angle: 'South Asian + Caribbean multicultural',
    metaTitle: 'Scarborough Bridal Makeup — South Asian & Caribbean',
    metaDescription:
      "Bridal makeup serving Scarborough's diverse South Asian and Caribbean wedding scene. Skilled across every skin tone, hair texture, and tradition. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Scarborough, ON',
    geo: { latitude: 43.7764, longitude: -79.2318 },
    intro:
      "Scarborough is one of the most diverse wedding markets in Canada, and it shows in my booking calendar. Punjabi brides in Agincourt, Tamil brides in Malvern, Caribbean brides in Guildwood, fusion couples blending traditions across cultures. The skin tones range across the full spectrum and the hair textures even more so. This is where ten years of working with every skin tone actually matters.\n\nMy approach in Scarborough is to start every consultation from the bride's actual tradition, not a generic template. The Tamil bridal look has different priorities than the Punjabi one. Sindhi and Gujarati ceremonies have their own jewelry-setting rhythms. Caribbean weddings often blend Indo-Caribbean and traditional African elements with their own visual language.\n\nThe venues from Scarborough Convention Centre to the smaller community halls in Wexford and Milliken cover the full range. I travel into Scarborough weekly through peak wedding season. The community here built itself, and the weddings reflect that pride.",
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
    nearbyCities: ['toronto', 'markham', 'north-york', 'vaughan'],
    contentBlocks: [],
  },
  {
    slug: 'markham',
    name: 'Markham',
    province: 'ON',
    isHome: false,
    angle: 'South Asian + East Asian multicultural',
    metaTitle: 'Bridal Makeup Artist in Markham, ON',
    metaDescription:
      "Bridal makeup for Markham's South Asian and East Asian wedding traditions. Fusion bridal looks done with care and a deep cross-cultural eye. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Markham, ON',
    geo: { latitude: 43.8561, longitude: -79.3370 },
    intro:
      "Markham is one of the newer wedding markets in the GTA, and it shows in the venues. Crystal Fountain, the Markham Convention Centre, Angus Glen, Hilton Toronto/Markham. These spaces were built in the last fifteen or twenty years, designed for high-fashion bridal photography under crisp modern lighting. The makeup approach has to match that polish.\n\nThe Markham bride is usually planning for a large, multicultural extended family. The community here is one of the most diverse in Canada, and the wedding guest list reflects that. The bridal look has to read beautifully under intense ballroom spotlights and high-resolution photography, without losing the warmth that makes the family portraits feel real.\n\nI travel into Markham regularly. Whether the morning starts in Unionville, Angus Glen, or Downtown Markham, the kit comes to the venue. The drive up Highway 7 is part of the rhythm of the day.",
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
    nearbyCities: ['toronto', 'richmond-hill', 'scarborough', 'vaughan'],
    contentBlocks: [],
  },
  {
    slug: 'north-york',
    name: 'North York',
    province: 'ON',
    isHome: false,
    angle: 'urban, multicultural, accessible',
    metaTitle: 'Bridal Makeup Artist in North York, ON',
    metaDescription:
      "Bridal makeup for North York weddings — urban, multicultural, accessible. {artistName} travels into Don Mills, Bayview, and the Yonge corridor regularly. Book for {seasonYears}.",
    h1: 'Bridal Makeup Artist in North York, ON',
    geo: { latitude: 43.7615, longitude: -79.4111 },
    intro: "Most North York weddings are family centerpieces by accident. The city sits at the geographic centre of the GTA, which means relatives drive in from every direction and the reception becomes a logistical pivot for the whole region. The venues have evolved to handle that scale.\n\nWhat I notice about North York brides is the mix of urban polish and traditional values. Many are second-generation professionals working downtown but planning ceremonies that honour their parents' expectations. The makeup vision tends to thread that needle: refined enough for the editorial portraits, traditional enough for the elders.\n\nVenues like Parkview Manor, The Grand Luxe, and Paradise Banquet Hall span the full range from intimate to grand. Whether the morning starts in Willowdale, Don Mills, or the Bridle Path, the travel is manageable. North York's accessibility is its quiet advantage, and it shows up in how relaxed the morning of the wedding can feel.",
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
   nearbyCities: ['vaughan', 'toronto', 'richmond-hill', 'markham'],
   contentBlocks: [],
  },
  {
    slug: 'richmond-hill',
    name: 'Richmond Hill',
    province: 'ON',
    isHome: false,
    angle: 'affluent, destination-adjacent',
    metaTitle: 'Bridal Makeup Artist in Richmond Hill, ON',
    metaDescription:
      "Bridal makeup for Richmond Hill's affluent neighbourhoods and estate venues. Trusted by brides planning multi-country weddings. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Richmond Hill, ON',
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
   nearbyCities: ['vaughan', 'markham', 'north-york', 'toronto'],
   contentBlocks: [],
  },
]
