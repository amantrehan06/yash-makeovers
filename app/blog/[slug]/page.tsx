import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { site } from '@/config/site'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { buildCloudinaryUrl } from '@/lib/cloudinaryUrl'
import { CloudinaryImage } from '@/components/ui/CloudinaryImage'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { AuthorBio } from '@/components/blog/AuthorBio'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

// Rough word count for Article schema. ~200 words/min × readTime, or split
// the content body when readTime isn't a clean integer.
function estimateWordCount(content: string): number {
  return content.trim().split(/\s+/).length
}

interface Props {
  params: { slug: string }
}

// Static — blog posts rebuild only on deploy, not on a timer.
export const revalidate = false

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  const coverUrl = post.coverImage
    ? buildCloudinaryUrl(post.coverImage, { width: 1200, height: 630, crop: 'fill' })
    : undefined

  return {
    title:       post.title,
    description: post.excerpt,
    alternates:  { canonical: `https://${site.canonicalHost}/blog/${post.slug}` },
    openGraph: {
      title:         post.title,
      description:   post.excerpt,
      type:          'article',
      publishedTime: post.date,
      modifiedTime:  post.updated ?? post.date,
      authors:       [site.artistName],
      section:       post.category,
      ...(coverUrl ? { images: [{ url: coverUrl, width: 1200, height: 630, alt: post.title }] } : {}),
    },
    twitter: {
      card:        'summary_large_image',
      title:       post.title,
      description: post.excerpt,
      ...(coverUrl ? { images: [coverUrl] } : {}),
    },
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
}

// MDX prose styling — applied to every element rendered from the markdown body.
const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-serif text-3xl text-dark mt-12 mb-4 leading-tight" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-serif text-2xl text-dark mt-10 mb-3 leading-snug" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-muted text-base leading-relaxed mb-5" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="text-muted list-disc list-outside pl-6 mb-5 leading-relaxed space-y-2" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="text-muted list-decimal list-outside pl-6 mb-5 leading-relaxed space-y-2" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-gold underline-offset-4 underline hover:text-gold-dim transition-colors" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gold pl-6 my-8 italic font-serif text-xl text-dark-2" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-dark font-semibold" {...props} />
  ),
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related     = getRelatedPosts(post)
  const businessUrl = `https://${site.canonicalHost}`
  const postUrl     = `${businessUrl}/blog/${post.slug}`

  // Publisher logo: prefer Cloudinary brand logo, fall back to bundled icon.
  const publisherLogoUrl = site.branding.logoPublicId
    ? buildCloudinaryUrl(site.branding.logoPublicId, { width: 512, height: 512, crop: 'fill' })
    : `${businessUrl}/icon.png`

  // Cover image — used for Article.image (required for rich-result eligibility)
  // and for the hero render below.
  const coverUrl = post.coverImage
    ? buildCloudinaryUrl(post.coverImage, { width: 1200, height: 675, crop: 'fill' })
    : undefined

  return (
    <>
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context':         'https://schema.org',
            '@type':            'Article',
            headline:           post.title,
            description:        post.excerpt,
            datePublished:      post.date,
            dateModified:       post.updated ?? post.date,
            articleSection:     post.category,
            wordCount:          estimateWordCount(post.content),
            ...(coverUrl ? { image: [coverUrl] } : {}),
            author: {
              '@type': 'Person',
              '@id':   `${businessUrl}/about#artist`,
              name:    site.artistName,
            },
            publisher: {
              '@type': 'Organization',
              '@id':   `${businessUrl}#business`,
              name:    site.name,
              logo:    { '@type': 'ImageObject', url: publisherLogoUrl },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: businessUrl },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${businessUrl}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
            ],
          }),
        }}
      />

      <article className="pt-32 pb-24 px-6 bg-ivory">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />
          <Link href="/blog" className="text-gold text-sm hover:text-gold-dim transition-colors">
            ← Back to blog
          </Link>

          <div className="mt-8 aspect-[16/9] rounded-2xl bg-ivory-3 flex items-center justify-center mb-10 overflow-hidden">
            {post.coverImage ? (
              <CloudinaryImage
                publicId={post.coverImage}
                alt={post.title}
                width={1200}
                height={675}
                crop="fill"
                priority
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            ) : (
              <span className="font-serif text-6xl text-gold-pale">✦</span>
            )}
          </div>

          <p className="text-xs uppercase tracking-widest text-gold mb-3">{post.category}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-dark leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex gap-3 text-sm text-muted mb-12">
            <span>By {site.artistName}</span>
            <span aria-hidden>·</span>
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readTime}</span>
          </div>

          <div className="text-base">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          <AuthorBio />
          <RelatedPosts posts={related} />
        </div>
      </article>
    </>
  )
}
