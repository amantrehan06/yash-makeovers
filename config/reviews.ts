// Real Google reviews — surfaced in the Reviews section AND emitted as
// schema.org Review JSON-LD on the homepage. The schema makes the
// AggregateRating (4.9★ from 158 reviews) policy-safe by attaching it to
// concrete reviews rather than floating on its own.
//
// To add a review: copy from your Google Business profile verbatim. Real
// reviewer name (initials OK for surname) + ISO date are both required by
// Google for rich-results eligibility.

export const reviews = [
  {
    id: 1,
    author: 'Jasmin Sandhu',
    rating: 5,
    datePublished: '2026-01-14', // ← FILL ISO date e.g. '2024-08-15' (date from Google review)
    body: `Yash absolutely killed my wedding looks! I loved working with her from start to finish. Not only did she make me feel incredibly beautiful, but she also made me feel so comfortable, calm, and confident during one of the most important and emotional weekends of my life. Her professionalism, talent, and attention to detail truly stand out. Yash is extremely trustworthy, kind, and a pleasure to be around — I couldn't have asked for a better artist for my wedding. Highly recommend her to any bride!`,
  },
{
    id: 2,
    author: 'Saina Tanwar',
    rating: 5,
    datePublished: '2026-04-23', // ← FILL ISO date e.g. '2024-08-15' (date from Google review)
    body: `I really appreciate the amazing job you did on my makeup for my wedding events. You made me look and feel absolutely beautiful. I am so grateful for your expertise. From the initial consultation to final touches you listened to my preference. I received so many compliments and it all thanks to your hardwork. Thank you for helping me create unforgettable memories.`,
  },
{
    id: 3,
    author: 'Shabnam Kaushik',
    rating: 5,
    datePublished: '2026-04-07', // ← FILL ISO date e.g. '2024-08-15' (date from Google review)
    body: `Yash did an amazing job on my wedding day! Her behaviour was so kind and professional, which instantly made me feel comfortable and relaxed. She was very confident in her work, and it really showed in the final look. My makeup stayed flawless the entire day even through sweating and emotional moments. I couldn’t have asked for a better artist. Highly recommended!`,
  },
  {
    id: 4,
    author: 'Jasmine Parmar',
    rating: 5,
    datePublished: '2025-12-08', // ← FILL ISO date
    body: `I had the absolute pleasure of having Yashpreet do my makeup and hair for my wedding events and I cannot express how incredibly talented she is. From our very first consultation, she took the time to understand my vision and made sure every detail was perfect. On my wedding day, she transformed me into the most beautiful version of myself. Her skill, patience, and attention to detail are unmatched. I received so many compliments from guests and family. Yash made me feel so comfortable and confident — I would recommend her to every bride without hesitation!`,
  },
  {
    id: 5,
    author: 'Chandra Sukhdeo',
    rating: 5,
    datePublished: '2025-09-19', // ← FILL ISO date
    body: `I had the pleasure of having Yashpreet do my makeup for my wedding and it was absolutely wonderful. She is so professional, calm, and talented. She listened carefully to what I wanted and delivered beyond my expectations. My makeup lasted the entire day and through all the tears! Her products are top quality and she really knows how to work with different skin tones. I felt like a queen. I would 100% book her again and recommend her to anyone looking for an exceptional makeup artist.`,
  },
  // Add 2 more for maximum rich-results eligibility (Google likes 5+).
] as const

export type Review = (typeof reviews)[number]
