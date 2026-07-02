import { createOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { getPostBySlug } from '@/lib/blog'
import { site } from '@/config/site'

// Note: must be Node runtime (not edge) because lib/blog reads the local
// filesystem to parse MDX frontmatter. Next.js handles caching either way.
export const runtime = 'nodejs'
export const alt = `${site.name} | Bridal Beauty Blog`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  return createOgImage({
    eyebrow:  post?.category ?? 'Bridal Beauty Journal',
    title:    post?.title ?? 'Bridal Beauty Journal',
    subtitle: post?.excerpt,
  })
}
