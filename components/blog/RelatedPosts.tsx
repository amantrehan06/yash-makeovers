import Link from 'next/link'
import type { BlogPost } from '@/lib/blogTypes'

interface Props {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t border-ivory-4">
      <p className="text-xs uppercase tracking-widest text-gold mb-6">Keep reading</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-ivory-4 overflow-hidden hover:border-gold transition-colors bg-ivory-2"
          >
            <div className="aspect-[16/9] bg-ivory-3 flex items-center justify-center">
              <span className="font-serif text-3xl text-gold-pale">✦</span>
            </div>
            <div className="p-6">
              <span className="text-xs text-gold uppercase tracking-widest">{post.category}</span>
              <p className="font-serif text-lg text-dark mt-2 group-hover:text-gold transition-colors leading-snug">
                {post.title}
              </p>
              <p className="text-muted-2 text-xs mt-3">{post.readTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
