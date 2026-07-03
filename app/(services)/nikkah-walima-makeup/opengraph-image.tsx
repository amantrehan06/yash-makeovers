import { createOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { getServicePage } from '@/config/servicePages'
import { site } from '@/config/site'

export const runtime = 'edge'

const page = getServicePage('nikkah-walima-makeup')

export const alt = `${page.name} | ${site.name}`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return createOgImage({
    eyebrow:  page.eyebrow,
    title:    page.h1,
    subtitle: `${site.experience} years · ${site.brideCount} brides · ${site.googleRating} stars on Google`,
  })
}
