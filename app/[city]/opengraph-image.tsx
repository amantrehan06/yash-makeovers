import { createOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { cities } from '@/config/cities'
import { site } from '@/config/site'

export const runtime = 'edge'
export const alt = `Bridal Makeup Artist | ${site.name}`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateImageMetadata({ params }: { params: { city: string } }) {
  const city = cities.find((c) => c.slug === params.city)
  return [{ id: city?.slug ?? params.city, size, alt }]
}

export default function Image({ params }: { params: { city: string } }) {
  const city = cities.find((c) => c.slug === params.city)
  const cityName = city?.name ?? params.city

  return createOgImage({
    eyebrow:  `${cityName}, ON`,
    title:    `Bridal Makeup Artist in ${cityName}`,
    subtitle: `${site.experience} years · ${site.brideCount} brides · ${site.googleRating} stars on Google`,
  })
}
