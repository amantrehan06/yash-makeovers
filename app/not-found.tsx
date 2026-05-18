import Link from 'next/link'
import { site } from '@/config/site'
import { content } from '@/config/content'

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 bg-ivory pt-24 pb-16">
      <div className="text-center max-w-xl">
        <p className="font-serif text-7xl md:text-8xl text-gold mb-6">404</p>
        <p className="text-xs uppercase tracking-widest text-gold mb-4">{site.name}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-dark leading-tight mb-6">
          {content.notFound.title}
        </h1>
        <p className="text-muted leading-relaxed mb-10">
          {content.notFound.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold text-ivory text-sm font-medium hover:bg-gold-dim transition-colors"
          >
            {content.notFound.primaryCTA}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-ivory transition-colors"
          >
            {content.notFound.secondaryCTAPrefix} {site.artistName}
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-4 text-sm text-muted-2 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/portfolio" className="hover:text-gold transition-colors">
            {content.notFound.portfolioLink}
          </Link>
          <span aria-hidden className="hidden sm:inline">·</span>
          <Link href="/services" className="hover:text-gold transition-colors">
            {content.notFound.servicesLink}
          </Link>
          <span aria-hidden className="hidden sm:inline">·</span>
          <Link href="/blog" className="hover:text-gold transition-colors">
            {content.notFound.blogLink}
          </Link>
        </div>
      </div>
    </section>
  )
}
