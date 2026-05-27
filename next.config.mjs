import { redirects as redirectList } from './config/redirects.mjs'

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

  // 301/302 redirects — sourced from config/redirects.ts so non-developers
  // can extend the list without touching build config.
  async redirects() {
    return redirectList.map((r) => {
      // The apex→www rule is the only one that needs a host condition.
      // Detect it by destination shape and inject `has` here.
      if (r.destination.startsWith('https://www.yashmakeovers.com')) {
        return { ...r, has: [{ type: 'host', value: 'yashmakeovers.com' }] }
      }
      return r
    })
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
