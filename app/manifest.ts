import type { MetadataRoute } from 'next'
import { site } from '@/config/site'

// Web app manifest — Android add-to-home-screen (name, theme colour, icon).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             `${site.name} | Bridal Makeup Artist`,
    short_name:       site.name,
    description:      `Luxury bridal makeup and hair across the GTA by ${site.artistName}.`,
    start_url:        '/',
    display:          'standalone',
    background_color: '#FAF8F4',
    theme_color:      '#A8834A',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
