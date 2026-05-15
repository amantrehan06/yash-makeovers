// Single source of truth for every Cloudinary public_id used on the site.
// Change a value here → updates every component that references it.
//
// Naming convention:
//   hero / about images  → named manually when uploaded to Cloudinary Media Library
//   blog cover images    → named to match the post slug
//
// Portfolio images: manually upload to Cloudinary yash-makeovers/portfolio/
// Tag with: bridal, pre-bridal, full-glam, party, south-asian for filter categories.

export const images = {
  hero: {
    main:   'yash-makeovers/hero/hero-bridal',
    mobile: 'yash-makeovers/hero/hero-bridal-mobile',
  },
  about: {
    portrait: 'yash-makeovers/about/yashpreet-portrait',
  },
  blog: {
    // Add entries as blog posts are created, matching the post slug.
    // Example: 'south-asian-bridal-makeup-trends-2026': 'yash-makeovers/blog/south-asian-bridal-makeup-trends-2026'
  } as Record<string, string>,
  placeholders: {
    // Shown in portfolio grid before any photos are uploaded.
    portfolio: 'yash-makeovers/hero/hero-bridal',
  },
} as const
