export const reviews = [
  {
    id: 1,
    author: 'Jasmin Sandhu',
    rating: 5,
    body: `Yash absolutely killed my wedding looks! I loved working with her from start to finish. Not only did she make me feel incredibly beautiful, but she also made me feel so comfortable, calm, and confident during one of the most important and emotional weekends of my life. Her professionalism, talent, and attention to detail truly stand out. Yash is extremely trustworthy, kind, and a pleasure to be around — I couldn't have asked for a better artist for my wedding. Highly recommend her to any bride!`,
  },
  {
    id: 2,
    author: 'Jasmine Parmar',
    rating: 5,
    body: `I had the absolute pleasure of having Yashpreet do my makeup and hair for my wedding events and I cannot express how incredibly talented she is. From our very first consultation, she took the time to understand my vision and made sure every detail was perfect. On my wedding day, she transformed me into the most beautiful version of myself. Her skill, patience, and attention to detail are unmatched. I received so many compliments from guests and family. Yash made me feel so comfortable and confident — I would recommend her to every bride without hesitation!`,
  },
  {
    id: 3,
    author: 'Chandra Sukhdeo',
    rating: 5,
    body: `I had the pleasure of having Yashpreet do my makeup for my wedding and it was absolutely wonderful. She is so professional, calm, and talented. She listened carefully to what I wanted and delivered beyond my expectations. My makeup lasted the entire day and through all the tears! Her products are top quality and she really knows how to work with different skin tones. I felt like a queen. I would 100% book her again and recommend her to anyone looking for an exceptional makeup artist.`,
  },
] as const

export type Review = (typeof reviews)[number]
