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

export const cities = [
  {
    slug: 'brampton',
    name: 'Brampton',
    province: 'ON',
    isHome: true,
    angle: 'home base, South Asian community hub',
    metaTitle: 'Bridal Makeup Artist in Brampton, ON | Yash Makeovers',
    metaDescription:
      "Yash Makeovers is Brampton's most trusted bridal makeup artist. {experience} years of experience and {brides} happy brides — South Asian and multicultural specialist. Book your {seasonYears} wedding.",
    h1: 'Bridal Makeup Artist in Brampton, ON',
    intro:
      "Brampton isn't just where Yash Makeovers is based — it's the heart of South Asian wedding culture in the GTA. Yashpreet has spent over a decade understanding what Brampton brides want: looks that honour tradition, photograph beautifully under traditional venue lighting, and last from a 6 AM Anand Karaj to the late-night reception. As locals serving locals, no travel fees apply within Peel Region.",
  },
  {
    slug: 'mississauga',
    name: 'Mississauga',
    province: 'ON',
    isHome: false,
    angle: 'multicultural, premium clientele',
    metaTitle: 'Bridal Makeup Artist in Mississauga, ON | Yash Makeovers',
    metaDescription:
      'Bridal makeup artist serving Mississauga\'s premium banquet halls and intimate venues. {experience} years of experience and luxury-grade products. Book {artistName} for your {seasonYears} wedding.',
    h1: 'Bridal Makeup Artist in Mississauga, ON',
    intro:
      "From Lakeshore weddings at Mississauga's premium banquet halls to elegant intimate ceremonies in Port Credit, Mississauga brides expect a polished, photo-ready bridal look that holds up to top-tier wedding photography. Yashpreet brings the same luxury-grade products and exacting attention used by editorial artists — without the editorial markup.",
  },
  {
    slug: 'toronto',
    name: 'Toronto',
    province: 'ON',
    isHome: false,
    angle: 'editorial, modern South Asian brides',
    metaTitle: 'Bridal Makeup Artist in Toronto, ON | Yash Makeovers',
    metaDescription:
      "Toronto's go-to bridal makeup artist for modern South Asian brides who want editorial, photo-forward looks. {rating} stars · {reviewCount} Google reviews. Book your {seasonYears} wedding.",
    h1: 'Bridal Makeup Artist in Toronto, ON',
    intro:
      "Toronto's modern South Asian brides aren't asking for the same bridal look their cousins wore five years ago. They want editorial — dewy skin, sculpted but soft, with eye looks that feel intentional in every Distillery District photograph. Yashpreet is one of the few GTA artists comfortable in both worlds: deeply traditional and unapologetically contemporary.",
  },
  {
    slug: 'etobicoke',
    name: 'Etobicoke',
    province: 'ON',
    isHome: false,
    angle: 'intimate, community feel',
    metaTitle: 'Bridal Makeup Artist in Etobicoke, ON | Yash Makeovers',
    metaDescription:
      "Calm, family-feel bridal makeup for Etobicoke weddings. {artistName} brings {experience} years of expertise and luxury products to your venue. Book for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Etobicoke, ON',
    intro:
      "Etobicoke weddings have a different rhythm — quieter, more intimate, often family-led. Yashpreet has been the trusted bridal artist for many Etobicoke brides who wanted someone calm in the chair and someone who feels like family by the time the doli leaves. Mobile to your venue or your mother's living room — Etobicoke is comfortably within the GTA service area.",
  },
  {
    slug: 'oakville',
    name: 'Oakville',
    province: 'ON',
    isHome: false,
    angle: 'luxury, high-budget weddings',
    metaTitle: 'Bridal Makeup Artist in Oakville, ON | Yash Makeovers',
    metaDescription:
      "Luxury bridal makeup for Oakville weddings at Glen Abbey, Le Dôme, and Oakville's grand estate venues. HD-rated luxury formulas. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Oakville, ON',
    intro:
      "Oakville's grand wedding venues — from Glen Abbey to Le Dôme — host some of the most photographed weddings in the province. Yashpreet brings the products and the technique these venues call for: HD-rated formulas from {brands} that look as crisp in the bridal portrait as they do in the candid 11 PM dance shot.",
  },
  {
    slug: 'vaughan',
    name: 'Vaughan',
    province: 'ON',
    isHome: false,
    angle: 'South Asian diaspora, temple weddings',
    metaTitle: 'Bridal Makeup Artist in Vaughan, ON | Yash Makeovers',
    metaDescription:
      "Bridal makeup for Vaughan's South Asian community — gurdwara, temple, and grand ballroom weddings. {experience} years of experience, mobile to your venue. Book {seasonYears}.",
    h1: 'Bridal Makeup Artist in Vaughan, ON',
    intro:
      "Vaughan's tightly knit South Asian community — and the temples, gurdwaras, and banquet halls that anchor it — has trusted Yashpreet for years. Whether your wedding starts at the gurdwara at sunrise or runs late at the Premiere Ballroom, the look she designs is built to outlast the day, the tears, and the hugs.",
  },
  {
    slug: 'scarborough',
    name: 'Scarborough',
    province: 'ON',
    isHome: false,
    angle: 'South Asian + Caribbean multicultural',
    metaTitle: 'Bridal Makeup Artist in Scarborough, ON | Yash Makeovers',
    metaDescription:
      "Bridal makeup serving Scarborough's diverse South Asian and Caribbean wedding scene. Skilled across every skin tone, hair texture, and tradition. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Scarborough, ON',
    intro:
      "Scarborough's beautifully diverse wedding scene — South Asian, Caribbean, and everything in between — calls for an artist who works comfortably across skin tones, hair textures, and traditions. Yashpreet has been booked by Scarborough brides from every background and brings the same care and craft to each one.",
  },
  {
    slug: 'markham',
    name: 'Markham',
    province: 'ON',
    isHome: false,
    angle: 'South Asian + East Asian multicultural',
    metaTitle: 'Bridal Makeup Artist in Markham, ON | Yash Makeovers',
    metaDescription:
      "Bridal makeup for Markham's South Asian and East Asian wedding traditions. Fusion bridal looks done with care and a deep cross-cultural eye. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Markham, ON',
    intro:
      "Markham's vibrant blend of South Asian and East Asian wedding traditions makes it one of the most creatively interesting markets in the GTA. Yashpreet has done everything from Punjabi reception looks to fusion bridal sets honouring two cultures in one day — and brings the same calm, prepared energy to every Markham booking.",
  },
  {
    slug: 'north-york',
    name: 'North York',
    province: 'ON',
    isHome: false,
    angle: 'urban, multicultural, accessible',
    metaTitle: 'Bridal Makeup Artist in North York, ON | Yash Makeovers',
    metaDescription:
      "Bridal makeup for North York weddings — urban, multicultural, accessible. {artistName} travels into Don Mills, Bayview, and the Yonge corridor regularly. Book for {seasonYears}.",
    h1: 'Bridal Makeup Artist in North York, ON',
    intro:
      "North York brides want the polish of downtown Toronto without the Toronto travel logistics. {artistName} travels into North York regularly — Don Mills, Bayview Village, the Yonge corridor — and delivers the same flawless HD bridal finish that's earned her {rating} stars across {reviewCount} Google reviews.",
  },
  {
    slug: 'richmond-hill',
    name: 'Richmond Hill',
    province: 'ON',
    isHome: false,
    angle: 'affluent, destination-adjacent',
    metaTitle: 'Bridal Makeup Artist in Richmond Hill, ON | Yash Makeovers',
    metaDescription:
      "Bridal makeup for Richmond Hill's affluent neighbourhoods and estate venues. Trusted by brides planning multi-country weddings. Book {artistName} for {seasonYears}.",
    h1: 'Bridal Makeup Artist in Richmond Hill, ON',
    intro:
      "Richmond Hill's affluent neighbourhoods and beautiful estate venues attract brides who often plan destination receptions abroad and a Canadian ceremony at home. Yashpreet understands the bridal-artist-first-day-of-many feel and tailors every Richmond Hill booking to set the tone for everything that follows.",
  },
] as const

export type City = (typeof cities)[number]
