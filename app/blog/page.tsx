import type { Metadata } from 'next'
import { site } from '@/config/site'
import { getAllPosts } from '@/lib/blog'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { BlogListing } from './BlogListing'

export const metadata: Metadata = {
  title: `Bridal Beauty Blog | ${site.name}`,
  description: `Tips, inspiration, and advice for brides from ${site.artistName} at ${site.name} — ${site.baseCity}'s most trusted bridal makeup artist.`,
  alternates: { canonical: `https://${site.domain}/blog` },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <section className="pt-32 pb-24 px-6 bg-ivory">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Bridal beauty journal"
          title="Tips, trends & advice"
          subtitle={`Insights from ${site.artistName} to help every bride look and feel her absolute best.`}
        />
        <BlogListing posts={posts} />
      </div>
    </section>
  )
}
