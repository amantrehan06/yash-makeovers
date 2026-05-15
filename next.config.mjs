/** @type {import('next').NextConfig} */

// Pin the Cloudinary pathname to this cloud name for security.
// Falls back to a wildcard if env var is not set (dev without .env.local).
const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? '**'

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${cloudName}/**`,
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
  },

  // SEO — keep trailing-slash behaviour consistent.
  trailingSlash: false,

  // Performance.
  compress: true,
  poweredByHeader: false,

  // 301 REDIRECTS — preserve 7 years of SEO equity from the WordPress site.
  async redirects() {
    return [
      // Old WordPress city URLs → new dynamic city pages
      { source: '/bridal-hair-and-makeup-artist-in-brampton', destination: '/brampton',     permanent: true },
      { source: '/bridal-hair-and-makeup-artist-toronto',     destination: '/toronto',      permanent: true },
      { source: '/bridal-makeup-artist-mississauga',          destination: '/mississauga',  permanent: true },

      // Old WordPress page slugs → new pages
      { source: '/packages',          destination: '/services',  permanent: true },
      { source: '/portfolio/:path*',  destination: '/portfolio', permanent: true },

      // Residual WordPress traffic — kill admin paths (302, not 301).
      { source: '/wp-admin',            destination: '/', permanent: false },
      { source: '/wp-content/:path*',   destination: '/', permanent: false },
      { source: '/wp-includes/:path*',  destination: '/', permanent: false },
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ]
  },
}

export default nextConfig
