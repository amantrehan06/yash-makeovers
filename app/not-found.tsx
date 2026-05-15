import Link from 'next/link'
import { site } from '@/config/site'

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 bg-ivory pt-24 pb-16">
      <div className="text-center max-w-xl">
        <p className="font-serif text-7xl md:text-8xl text-gold mb-6">404</p>
        <p className="text-xs uppercase tracking-widest text-gold mb-4">{site.name}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-dark leading-tight mb-6">
          This page slipped out of the kit.
        </h1>
        <p className="text-muted leading-relaxed mb-10">
          The page you&apos;re looking for may have moved or never existed.
          Let&apos;s get you back to something useful.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold text-ivory text-sm font-medium hover:bg-gold-dim transition-colors"
          >
            Back to homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-ivory transition-colors"
          >
            Contact {site.artistName}
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-4 text-sm text-muted-2 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/portfolio" className="hover:text-gold transition-colors">
            View portfolio
          </Link>
          <span aria-hidden className="hidden sm:inline">·</span>
          <Link href="/services" className="hover:text-gold transition-colors">
            Services & pricing
          </Link>
          <span aria-hidden className="hidden sm:inline">·</span>
          <Link href="/blog" className="hover:text-gold transition-colors">
            Bridal beauty blog
          </Link>
        </div>
      </div>
    </section>
  )
}
