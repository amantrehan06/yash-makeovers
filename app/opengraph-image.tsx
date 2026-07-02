import { createOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { site } from '@/config/site'

export const runtime = 'edge'
export const alt = `${site.name} | Bridal Makeup Artist in ${site.baseCity}`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return createOgImage({
    eyebrow:  'Bridal Makeup Artist',
    title:    site.tagline,
    subtitle: `${site.experience} years · ${site.brideCount} brides · Serving the GTA from ${site.baseCity}`,
  })
}
