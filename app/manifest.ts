import type { MetadataRoute } from 'next'
import { site } from '@/config/site'

// Web app manifest — drives the "Add to home screen" experience on Android
// (app name, theme colour, icon) and is a standard professional polish signal.
// The SVG icon with sizes "any" covers modern Android; the Apple touch icon
// (app/apple-icon.tsx) and favicon (app/icon.svg) handle the other surfaces.
// Theme/background colours match the brand tokens in styles/globals.css.

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             `${site.name} — Bridal Makeup Artist`,
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
