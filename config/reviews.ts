// Real Google reviews — surfaced in the Reviews section on the homepage,
// city pages via CityReviews, AND emitted as schema.org Review JSON-LD.
//
// Two curation controls on every review:
//   show:       true/false — master switch. false = stored for reference / schema
//               only, never rendered anywhere on the site.
//   placements: which pages this review appears on. Values:
//               'home' | city slugs ('brampton', 'mississauga', 'toronto', etc.)
//               A review can appear in multiple places: ['home', 'brampton']
//
// Workflow for new Google reviews (takes ~2 min):
//   1. Copy review verbatim from Google Business profile
//   2. Add entry below with show: true and the right placements
//   3. Push → Vercel deploys → live
//
// To hide a review without deleting it: set show: false.
// Schema JSON-LD uses all show: true reviews regardless of placements.

export type Review = {
  id:            number
  author:        string
  rating:        number
  datePublished: string   // ISO date e.g. '2024-08-15'
  show:          boolean  // master display switch
  placements:    string[] // 'home' | city slug — a review can have both
  body:          string
}

export const reviews: Review[] = [
  {
    id:            1,
    author:        'Jasmin Sandhu',
    rating:        5,
    datePublished: '2026-01-14',
    show:          true,
    placements:    ['home', 'brampton','mississauga'],
    body:          `Yash absolutely killed my wedding looks! I loved working with her from start to finish. Not only did she make me feel incredibly beautiful, but she also made me feel so comfortable, calm, and confident during one of the most important and emotional weekends of my life. Her professionalism, talent, and attention to detail truly stand out. Yash is extremely trustworthy, kind, and a pleasure to be around — I couldn't have asked for a better artist for my wedding. Highly recommend her to any bride!`,
  },
  {
    id:            2,
    author:        'Saina Tanwar',
    rating:        5,
    datePublished: '2026-04-23',
    show:          true,
    placements:    ['home', 'mississauga'],
    body:          `I really appreciate the amazing job you did on my makeup for my wedding events. You made me look and feel absolutely beautiful. I am so grateful for your expertise. From the initial consultation to final touches you listened to my preference. I received so many compliments and it all thanks to your hardwork. Thank you for helping me create unforgettable memories.`,
  },
  {
    id:            3,
    author:        'Shabnam Kaushik',
    rating:        5,
    datePublished: '2026-04-07',
    show:          true,
    placements:    ['home', 'brampton'],
    body:          `Yash did an amazing job on my wedding day! Her behaviour was so kind and professional, which instantly made me feel comfortable and relaxed. She was very confident in her work, and it really showed in the final look. My makeup stayed flawless the entire day even through sweating and emotional moments. I couldn't have asked for a better artist. Highly recommended!`,
  },
  {
    id:            4,
    author:        'Jasmine Parmar',
    rating:        5,
    datePublished: '2025-12-08',
    show:          true,
    placements:    ['home', 'toronto'],
    body:          `I had the absolute pleasure of having Yashpreet do my makeup and hair for my wedding events and I cannot express how incredibly talented she is. From our very first consultation, she took the time to understand my vision and made sure every detail was perfect. On my wedding day, she transformed me into the most beautiful version of myself. Her skill, patience, and attention to detail are unmatched. I received so many compliments from guests and family. Yash made me feel so comfortable and confident — I would recommend her to every bride without hesitation!`,
  },
  {
    id:            5,
    author:        'Chandra Sukhdeo',
    rating:        5,
    datePublished: '2025-09-19',
    show:          true,
    placements:    ['home','mississauga'],
    body:          `I had the pleasure of having Yashpreet do my makeup for my wedding and it was absolutely wonderful. She is so professional, calm, and talented. She listened carefully to what I wanted and delivered beyond my expectations. My makeup lasted the entire day and through all the tears! Her products are top quality and she really knows how to work with different skin tones. I felt like a queen. I would 100% book her again and recommend her to anyone looking for an exceptional makeup artist.`,
  },
  {
    id:            6,
    author:        'Ayushi',
    rating:        5,
    datePublished: '2026-06-02',
    show:          true,
    placements:    ['home', 'toronto'],
    body:          `Yash is absolutely amazing at what she does. She is on time, professional and easy to work with. She takes your vision into account and also suggests makeup looks which will look good on you. As a brown girly, it's important to go with someone who understands your skin tone better and can make you look fabulous for your big day. All my pictures came out so nice. Yash is great. I would totally recommend you hire her for bridal and non-bridal makeup and hair. She brought Sandy with her for my reception look and Sandy is amazing as well!!!!`,
  },
]
