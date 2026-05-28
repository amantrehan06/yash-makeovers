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
    metaTitle: 'Bridal Makeup Artist in Brampton, ON',
    metaDescription:
      "Yash Makeovers is Brampton's most trusted bridal makeup artist. {experience} years of experience and {brides} happy brides — South Asian and multicultural specialist. Book your {seasonYears} wedding.",
    h1: 'Bridal Makeup Artist in Brampton, ON',
    geo: { latitude: 43.6831, longitude: -79.7663 },
    intro:
      "Brampton isn't just where Yash Makeovers is based — it's the heart of South Asian wedding culture in the GTA. Brampton weddings are legendary for their magnificent scale, vibrant energy, and deep cultural traditions, anchoring the very heart of the Greater Toronto Area's multicultural celebration scene. From grand, high-capacity sangeets and receptions at the lavish Embassy Grand Convention Centre to elegant, impeccably catered galas at the Pearson Convention Centre or the castle-like Grand Empire Banquet & Convention Centre, these vast spaces demand a masterclass in high-impact bridal beauty. Whether your multi-day celebration brings family together in the scenic enclaves of Castlemore, the bustling streets of Springdale, or the established avenues of Bramalea, your look must command the room while remaining effortlessly timeless. Yashpreet understands the unique rhythm of a Brampton wedding, where early morning gurdwara ceremonies seamlessly transition into late-night reception dancing under bright ballroom lights. Her signature approach pairs long-wear, camera-ready techniques with a calm, grounding presence, ensuring you look breathtakingly radiant through every ritual and celebratory milestone.",
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
    metaTitle: 'Bridal Makeup Artist in Mississauga, ON',
    metaDescription:
      'Bridal makeup artist serving Mississauga\'s premium banquet halls and intimate venues. {experience} years of experience and luxury-grade products. Book {artistName} for your {seasonYears} wedding.',
    h1: 'Bridal Makeup Artist in Mississauga, ON',
    geo: { latitude: 43.5890, longitude: -79.6441 },
    intro:
      "Mississauga weddings beautifully reflect the city’s dynamic blend of sophisticated waterfront charm and expansive, high-energy cultural gatherings. From grand, high-capacity celebrations at the iconic Mississauga Convention Centre or the modern, tech-forward Apollo Convention Centre to elegant, luxury galas at the Sagan Banquet Hall and Convention Centre, the city’s premier venues demand flawless execution in bridal beauty. Whether your multi-day festivities wind through the scenic lakeside avenues of Port Credit, the historic village streets of Streetsville, or the vibrant, family-centric neighborhoods of Churchill Meadows and Lorne Park, your makeup must transition seamlessly from outdoor portraits to bright ballroom spotlights. Yashpreet understands that a Mississauga bride requires a perfectly tailored balance of timeless cultural artistry and modern, editorial luxury. Her signature approach pairs impeccable, long-wear techniques with a calming presence, ensuring you look captivatingly radiant and camera-ready from your early morning ceremonies through to the final late-night dance.",
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
    metaTitle: 'Bridal Makeup Artist in Toronto, ON',
    metaDescription:
      "Toronto's go-to bridal makeup artist for modern South Asian brides who want editorial, photo-forward looks. {rating} stars · {reviewCount} Google reviews. Book your {seasonYears} wedding.",
    h1: 'Bridal Makeup Artist in Toronto, ON',
    geo: { latitude: 43.6532, longitude: -79.3832 },
    intro:
      "Toronto weddings are a magnificent tapestry of global traditions, where stunning skyline views meet deeply rooted cultural celebrations. From grand, high-capacity galas at the Liberty Grand Entertainment Complex to sophisticated, modern celebrations at The Carlu or the One King West Hotel & Residence, the city demands a bridal look that transitions seamlessly from natural daylight to dramatic ballroom lighting. Whether you are hosting a multi-day South Asian celebration spanning vibrant downtown spots or an intimate gathering tucked away in historic Yorkville or the Distillery District, your makeup should feel uniquely yours. Yashpreet understands that a Toronto bride needs an effortless blend of modern luxury and timeless cultural heritage. Her signature approach ensures your look remains flawless, radiant, and camera-ready from your early morning portraits right through to the final dance.",
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
      "Etobicoke weddings offer a spectacular blend of scenic waterfront charm along Lake Ontario and grand, high-capacity venues perfect for large-scale multicultural celebrations. From the opulent, sprawling ballrooms of the Grand Metropolitan Premium Event Venue to the beautifully manicured estate settings at the Toronto Congress Centre or the historic, riverside elegance of the Old Mill Toronto, this vibrant area demands a versatile and masterful approach to bridal beauty. Whether your multi-day traditional festivities feature outdoor portraits along the picturesque shores of Humber Bay Shores, intimate family gatherings in the upscale enclaves of The Kingsway, or a massive gala near Rexdale, your makeup must transition flawlessly from bright daylight to dramatic evening venue lighting. Yashpreet understands the sophisticated rhythm of an Etobicoke bride, where classical cultural heritage effortlessly meets modern, urban refinement. Her signature approach combines elite, long-wear techniques with a deeply calming presence, ensuring you look breathtakingly radiant and camera-ready from your early morning rituals right through to the final midnight celebration.",
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
      "Oakville weddings are synonymous with prestigious lakeside charm, manicured estates, and an elegant, high-end atmosphere that provides a spectacular backdrop for multicultural celebrations. From the sprawling, immaculate greens of the Glen Abbey Golf Club to the luxury, high-capacity ballrooms at the Oakville Conference & Banquet Centre or the sophisticated settings at the Harbour Banquet & Conference Centre, the local venue landscape requires an expert eye for timeless bridal beauty. Whether your multi-day traditional festivities lead you along the scenic, historic streets of Old Oakville, the breathtaking waterfront views of Bronte Village, or the exclusive enclaves of Glen Abbey and Joshua Creek, your makeup must look effortlessly flawless in both bright coastal sunlight and soft evening ballroom lighting. Yashpreet understands the discerning tastes of an Oakville bride, expertly blending modern, editorial luxury with rich, vibrant cultural heritage. Her signature approach combines premium, long-wear techniques with a deeply reassuring presence, ensuring you remain breathtakingly radiant and camera-ready from your early morning portraits through to your final midnight send-off.",
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
    metaTitle: 'Bridal Makeup Artist in Vaughan, ON',
    metaDescription:
      "Bridal makeup for Vaughan's South Asian community — gurdwara, temple, and grand ballroom weddings. {experience} years of experience, mobile to your venue. Book {seasonYears}.",
    h1: 'Bridal Makeup Artist in Vaughan, ON',
    geo: { latitude: 43.8361, longitude: -79.4982 },
    intro:
      "Vaughan weddings are defined by an undeniable sense of luxury, grand architecture, and high-end elegance that sets a spectacular stage for multicultural celebrations. From the opulent, crystal-chandeliered ballrooms of the Paramount EventSpace and The Venetian Banquet & Hospitality Centre to the sophisticated, modern aesthetics of the Universal EventSpace, the city’s premier venues demand a commanding and flawless bridal look. Whether you are exchanging vows amidst the historic charm of Kleinburg, hosting a massive multi-day gala near Woodbridge, or capturing editorial portraits in Maple, your makeup needs to withstand high-intensity venue lighting and high-definition lenses. Yashpreet understands the sophisticated tastes of a Vaughan bride, where traditional cultural elements meet contemporary, high-fashion sensibilities. Her signature approach blends long-wear, premium artistry with a serene, organized presence, ensuring your skin looks entirely luminous and perfectly camera-ready from your first morning look to your midnight send-off.",
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
    metaTitle: 'Bridal Makeup Artist in Scarborough, ON',
    metaDescription:
      "Bridal makeup serving Scarborough's diverse South Asian and Caribbean wedding scene. Skilled across every skin tone, hair texture, and tradition. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Scarborough, ON',
    geo: { latitude: 43.7764, longitude: -79.2318 },
    intro:
      "Scarborough weddings are celebrated for their immense cultural richness, coastal park backdrops, and deeply communal gatherings that bring families together from across the Greater Toronto Area. From high-capacity, grand cultural galas at the versatile Scarborough Convention Centre or the elegant Estate Banquet and Event Centre to sophisticated hotel ballroom celebrations at the Delta Hotels Toronto East, the local venue landscape requires a masterful touch in long-wear bridal beauty. Whether your multi-day festivities capture the scenic natural beauty of the Scarborough Bluffs, wind through the bustling neighborhoods of Agincourt and Wexford, or gather families in Rouge, your makeup must look breathtakingly radiant across all environments. Yashpreet deeply respects the vibrant traditions of Scarborough’s diverse communities, where classical cultural motifs effortlessly merge with modern Canadian style. Her signature approach pairs premium, flawless artistry with a calm, reassuring presence, ensuring you remain effortlessly luminous and camera-ready from the early morning rituals to the final evening reception.",
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
      "Markham weddings represent a stunning intersection of timeless heritage and elite, modern luxury, making it one of the premier destination areas for grand multicultural celebrations in Ontario. From the high-capacity, crystal-lit ballrooms of the Markham Convention Centre and the lavishly updated spaces at Crystal Fountain to the sophisticated, luxury setups at the Hilton Toronto/Markham Suites Conference Centre & Spa, the city’s top-tier venues demand an exceptional eye for high-impact, long-wear bridal style. Whether your multi-day celebration takes place along the picturesque, historic storefronts of Unionville, the newly developed urban avenues of Downtown Markham, or the pristine, upscale enclaves of Angus Glen and Cachet, your look must effortlessly captivate under intensive ballroom spotlights and high-definition lenses. Yashpreet understands the nuanced aesthetic required for a Markham bride, perfectly marrying classical cultural elegance with contemporary, polished execution. Her signature approach pairs premium, camera-ready techniques with a deeply grounding presence, ensuring you look breathtakingly luminous from the very first morning portrait to your final evening reception send-off.",
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
    intro: "North York weddings balance urban sophistication with grand, upscale spaces, making it a highly desirable destination for premier multicultural celebrations. From the towering, luxury layout of Parkview Manor—capable of hosting magnificent, large-scale galas—to the high-end contemporary elegance of The Grand Luxe Event Boutique or the spacious Julius Event Centre, the area's premier venues demand a flawless approach to bridal design. Whether your multi-day traditional festivities are captured against the picturesque greenery of the Bridle Path, wind through the bustling streets of Willowdale, or gather extended family in the heart of Don Mills, your makeup must transition flawlessly from midday sun to intense ballroom spotlights. Yashpreet knows the aesthetic expectations of a North York bride, where high-fashion city refinement meets deep cultural heritage. Her signature approach pairs elite, high-definition techniques with a deeply grounding presence, ensuring your look remains entirely radiant and camera-ready from your early morning rituals through to your late-night reception.",
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
      "Richmond Hill weddings are characterized by an upscale, exclusive elegance that blends prestigious estate charm with grand, high-capacity ballroom celebrations. From the sprawling, picturesque vistas at the Richmond Hill Country Club to the bright, luxurious settings within the Sheraton Parkway Toronto North Hotel & Suites or the beautifully styled halls of Lusso Luxury Banquet Hall, venues in this region demand an exceptionally polished and editorial approach to bridal beauty. Whether you are hosting a multi-day South Asian gala near the multi-million dollar estates of Bayview Hill, exchanging vows near the scenic heritage backdrops of Mill Pond, or celebrating with loved ones in the newer enclaves of Jefferson and Oak Ridges, your look must transition flawlessly from soft outdoor daylight to high-intensity evening spotlights. Yashpreet deeply appreciates the sophisticated aesthetic of Richmond Hill brides, expertly balancing rich cultural traditions with contemporary, high-fashion refinement. Her signature approach combines elite, camera-ready artistry with a calming, organized presence, ensuring you remain breathtakingly radiant from your early morning rituals to the final reception dance.",
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
