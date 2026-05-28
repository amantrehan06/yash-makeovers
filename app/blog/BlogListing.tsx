'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { BLOG_CATEGORIES, type BlogCategory, type BlogPost } from '@/lib/blogTypes'
import { CloudinaryImage } from '@/components/ui/CloudinaryImage'

type Filter = 'All' | BlogCategory

const FILTERS: readonly Filter[] = ['All', ...BLOG_CATEGORIES] as const

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
}

interface Props {
  posts: BlogPost[]
}

export function BlogListing({ posts }: Props) {
  const [active, setActive] = useState<Filter>('All')

  const featured = useMemo(() => posts.find((p) => p.featured) ?? posts[0], [posts])

  const rest = useMemo(() => {
    const tail = featured ? posts.filter((p) => p.slug !== featured.slug) : posts
    return active === 'All' ? tail : tail.filter((p) => p.category === active)
  }, [posts, featured, active])

  if (posts.length === 0) {
    return (
      <p className="text-center text-muted mt-16">
        Blog posts coming soon. Check back here for bridal tips and trend reports.
      </p>
    )
  }

  return (
    <>
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group block mt-10 rounded-2xl border border-ivory-4 overflow-hidden bg-ivory-2 hover:border-gold transition-colors"
        >
          <div className="grid md:grid-cols-[5fr_6fr]">
            {/* Portrait-friendly cover. Mobile shows aspect-[3/4]; desktop
                stretches to text-column height (looks like magazine spread). */}
            <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[420px] bg-ivory-3 flex items-center justify-center overflow-hidden">
              {featured.coverImage ? (
                <CloudinaryImage
                  publicId={featured.coverImage}
                  alt={featured.title}
                  width={600}
                  height={800}
                  crop="fill"
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              ) : (
                <span className="font-serif text-6xl text-gold-pale">✦</span>
              )}
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs uppercase tracking-widest text-gold-dim bg-gold-pale px-3 py-1 rounded-full">
                  Featured
                </span>
                <span className="text-xs text-gold uppercase tracking-widest">
                  {featured.category}
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-dark leading-tight mb-4 group-hover:text-gold transition-colors">
                {featured.title}
              </h2>
              <p className="text-muted leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex gap-4 text-xs text-muted-2">
                <span>{formatDate(featured.date)}</span>
                <span aria-hidden>·</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className="flex flex-wrap gap-3 mt-12 mb-10">
        {FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
              active === cat
                ? 'bg-gold text-ivory border-gold'
                : 'border-ivory-4 text-muted hover:border-gold hover:text-gold'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {rest.length === 0 ? (
        <p className="text-muted text-sm">No posts in this category yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-ivory-4 overflow-hidden hover:border-gold transition-colors bg-ivory-2 flex flex-col"
            >
              {/* Portrait-friendly thumbnail. aspect-[4/5] gives an
                  Instagram-grid feel that works with portrait bridal photos
                  without making the card excessively tall. */}
              <div className="relative aspect-[4/5] bg-ivory-3 flex items-center justify-center overflow-hidden">
                {post.coverImage ? (
                  <CloudinaryImage
                    publicId={post.coverImage}
                    alt={post.title}
                    width={480}
                    height={600}
                    crop="fill"
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 92vw, 360px"
                  />
                ) : (
                  <span className="font-serif text-4xl text-gold-pale">✦</span>
                )}
              </div>
              <div className="p-6">
                <span className="text-xs text-gold uppercase tracking-widest">{post.category}</span>
                <h3 className="font-serif text-xl text-dark mt-2 mb-3 group-hover:text-gold transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                <div className="flex gap-3 text-xs text-muted-2 mt-4">
                  <span>{formatDate(post.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
