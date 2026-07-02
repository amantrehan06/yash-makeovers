import type { Metadata } from 'next'
import { site } from '@/config/site'
import { content } from '@/config/content'
import { getAllPosts } from '@/lib/blog'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { BlogListing } from './BlogListing'

export const metadata: Metadata = {
  title: 'Bridal Beauty Blog',
  // Journal/tips angle — focus on content type, not credentials.
  description: `Bridal beauty tips, wedding-day prep, and South Asian makeup trends, written by ${site.artistName} from real GTA wedding experience.`,
  alternates: { canonical: `https://${site.canonicalHost}/blog` },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <section className="pt-32 pb-24 px-6 bg-ivory">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow={content.blogPage.eyebrow}
          title={content.blogPage.title}
          subtitle={`Insights from ${site.artistName} to help every bride look and feel her absolute best.`}
        />
        <BlogListing posts={posts} />
      </div>
    </section>
  )
}
