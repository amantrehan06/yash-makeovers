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
  // Short keyword-rich line rendered directly below the H1. Used to bake
  // long-tail search phrases ("bridal makeup and hair {city}", specialty +
  // {city}) into the first 30 words of the page without stuffing them into
  // the H1 itself. Keep under ~20 words. Should contain the city name.
  subtitle:        string
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
      "South Asian bridal makeup and hair specialist in Brampton. {experience} years and {brides} brides served, all from home base. Book {artistName} for {seasonYears}.",
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
    nearbyCities: ['mississauga', 'toronto', 'vaughan', 'etobicoke'],
    contentBlocks: [
    {
      id: `brampton-202605-glowing-bride-magic`,
      date: `2026-05-21`,
      city: `brampton`,
      service: `bridal`,
      title: `A Glowing Bride's Magical Transformation in Brampton`,
      body: `On May 21, 2026, I had the absolute pleasure of working with a beautiful Brampton bride to create her dream look for her Nikkah ceremony. Because Muslim bridal aesthetics call for a specific balance of striking elegance and soft traditional refinement, my team and I collaborated closely with the talented hairstylists at Sandy B Beauty Lounge to craft a cohesive, flawless appearance. We paired a deeply radiant, long-wear HD skin base with classic, clean definition to perfectly complement her intricately detailed bridal attire. Knowing how long multi-day South Asian celebrations run, I focused heavily on elite longevity techniques, ensuring her makeup looked entirely fresh, luminous, and camera-ready under the bright ballroom spotlights during her reception. It was an honor to help her step into this major milestone feeling completely comfortable, confident, and beautiful.`,
      imageUrl: ``,
    }
  ,
    {
      id: `brampton-202605-ayushi-bridalmakeup`,
      date: `2026-05-18`,
      city: `brampton`,
      service: `bridal`,
      title: `Ayushi's Beautiful Bridal Look in Brampton`,
      body: `On May 18, 2026, I had the pleasure of styling Ayushi for her beautiful multi-day Punjabi wedding celebrations right here in Brampton. For her morning Anand Karaj ceremony, we focused on building an incredibly durable, luminous HD skin finish designed to withstand early morning gurdwara lighting and stay completely flawless through hours of hugging and family portraits. Collaborating with the talented team at Sandy B Beauty Lounge for her hair design, we curated a look that honored her traditional heritage while maintaining a clean, modern aesthetic. Seeing her step out toward the ballroom doors radiating that level of confidence is exactly why I love doing what I do in my hometown.`,
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
      "Pakistani and Afghan bridal makeup and hair specialist in Mississauga. {experience} years across Mehndi, Nikkah, and reception. Book {artistName} for {seasonYears}.",
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
    nearbyCities: ['brampton', 'toronto', 'etobicoke', 'oakville'],
    contentBlocks: [],
  },
  {
    slug: 'toronto',
    name: 'Toronto',
    province: 'ON',
    isHome: false,
    angle: 'editorial, modern South Asian brides',
    metaTitle: 'Toronto Bridal Makeup & Hair - HD Editorial Looks',
    metaDescription:
      "Bridal makeup and hair artist for Toronto brides. On-site morning service across the city. {rating}★ · {reviewCount} Google reviews. Book {artistName} for {seasonYears}.",
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
    nearbyCities:  ['mississauga', 'etobicoke', 'vaughan', 'scarborough'],
    contentBlocks: [
    {
      id: `toronto-202606-soft-pink-glam`,
      date: `2026-06-05`,
      city: `toronto`,
      service: `bridal`,
      title: `Amber's Soft Pink Glam for Her Toronto Wedding`,
      body: `Amber envisioned a soft pink glam look for her special day, perfectly capturing her personality and style. On June 5, 2026, she entrusted Yash Makeovers to bring her vision to life for her Toronto wedding festivities. The delicate blush tones complemented her bridal attire, enhancing her natural beauty while ensuring she looked flawless in HD. This look was not only striking but also ideal for the intimate ceremonies and celebrations that reflect the rich cultural traditions of South Asian weddings. Amber felt confident and radiant, ready to celebrate her love with family and friends. A true testament to the artistry of Yash Makeovers, this soft glam look was crafted to last through the emotional moments of the day, from the ceremony to the reception.  

    #softglam #pink #blush #makeupartist #bridalmakeup`,
      imageUrl: ``,
    }
  ],
  },
  {
    slug: 'etobicoke',
    name: 'Etobicoke',
    province: 'ON',
    isHome: false,
    angle: 'intimate, community feel',
    metaTitle: 'Etobicoke Bridal Makeup Artist — On-Location Service',
    metaDescription:
      "Bridal makeup and hair for Etobicoke brides. On-location service, {experience} years experience, luxury products. Book {artistName} for {seasonYears}.",
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
    nearbyCities: ['mississauga', 'toronto', 'brampton', 'vaughan'],
    contentBlocks: [],
  },
  {
    slug: 'oakville',
    name: 'Oakville',
    province: 'ON',
    isHome: false,
    angle: 'luxury, high-budget weddings',
    metaTitle: 'Oakville Luxury Bridal Makeup Artist & Hair',
    metaDescription:
      "Luxury bridal makeup artist for Oakville brides. {experience} years across Sikh ceremonies and white-wedding receptions. Book {artistName} for {seasonYears}.",
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
      "Luxury bridal makeup artist for Vaughan brides. {experience} years specializing in Sikh and Hindu temple weddings. Book {artistName} for {seasonYears}.",
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
    nearbyCities: ['brampton', 'toronto', 'richmond-hill', 'north-york'],
    contentBlocks: [],
  },
  {
    slug: 'scarborough',
    name: 'Scarborough',
    province: 'ON',
    isHome: false,
    angle: 'Pakistani + Afghan bridal hub',
    metaTitle: 'Scarborough Pakistani & Afghan Bridal Makeup Artist',
    metaDescription:
      "Pakistani and Afghan bridal makeup and hair specialist in Scarborough. {experience} years of expertise. Book {artistName} for {seasonYears}.",
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
    nearbyCities: ['toronto', 'markham', 'north-york', 'vaughan'],
    contentBlocks: [],
  },
  {
    slug: 'markham',
    name: 'Markham',
    province: 'ON',
    isHome: false,
    angle: 'South Asian + East Asian multicultural',
    metaTitle: 'Markham Bridal Makeup Artist for Multicultural Weddings',
    metaDescription:
      "Bridal makeup and hair for Markham's multicultural weddings. {experience} years of experience at venues across the city. Book {artistName} for {seasonYears}.",
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
    nearbyCities: ['toronto', 'richmond-hill', 'scarborough', 'vaughan'],
    contentBlocks: [],
  },
  {
    slug: 'north-york',
    name: 'North York',
    province: 'ON',
    isHome: false,
    angle: 'urban, multicultural, accessible',
    metaTitle: 'North York Bridal Makeup Artist & Hair Service',
    metaDescription:
      "Bridal makeup and hair for North York brides and the Yonge corridor. {artistName} travels into Don Mills and Bayview. Book for {seasonYears}.",
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
   nearbyCities: ['vaughan', 'toronto', 'richmond-hill', 'markham'],
   contentBlocks: [],
  },
  {
    slug: 'richmond-hill',
    name: 'Richmond Hill',
    province: 'ON',
    isHome: false,
    angle: 'affluent, destination-adjacent',
    metaTitle: 'Richmond Hill Luxury Bridal Makeup Artist & Hair',
    metaDescription:
      "Luxury bridal makeup artist for Richmond Hill brides. {experience} years with brides planning multi-country weddings. Book {artistName} for {seasonYears}.",
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
   nearbyCities: ['vaughan', 'markham', 'north-york', 'toronto'],
   contentBlocks: [],
  },
]
