import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { site } from '@/config/site'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { AuthorBio } from '@/components/blog/AuthorBio'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

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
  return {
    title:       `${post.title} | ${site.name} Blog`,
    description: post.excerpt,
    alternates:  { canonical: `https://${site.domain}/blog/${post.slug}` },
    openGraph: {
      title:       post.title,
      description: post.excerpt,
      type:        'article',
      publishedTime: post.date,
      authors:     [site.artistName],
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

  const related = getRelatedPosts(post)

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
            dateModified:       post.date,
            author:             { '@type': 'Person', name: site.artistName },
            publisher: {
              '@type': 'Organization',
              name:    site.name,
              logo:    { '@type': 'ImageObject', url: `https://${site.domain}/icon.png` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `https://${site.domain}/blog/${post.slug}` },
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
              { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://${site.domain}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: `https://${site.domain}/blog/${post.slug}` },
            ],
          }),
        }}
      />

      <article className="pt-32 pb-24 px-6 bg-ivory">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-gold text-sm hover:text-gold-dim transition-colors">
            ← Back to blog
          </Link>

          <div className="mt-8 aspect-[16/9] rounded-2xl bg-ivory-3 flex items-center justify-center mb-10 overflow-hidden">
            <span className="font-serif text-6xl text-gold-pale">✦</span>
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
