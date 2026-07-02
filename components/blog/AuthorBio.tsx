import Link from 'next/link'
import { site } from '@/config/site'

export function AuthorBio() {
  return (
    <div className="mt-16 p-8 rounded-2xl bg-ivory-2 border border-ivory-4 flex flex-col sm:flex-row gap-6 items-start">
      <div className="w-20 h-20 rounded-full bg-gold-pale flex items-center justify-center flex-shrink-0">
        <span className="font-serif text-3xl text-gold-dim">Y</span>
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-gold mb-2">About the author</p>
        <p className="font-serif text-2xl text-dark mb-2">{site.artistName}</p>
        <p className="text-muted text-sm leading-relaxed mb-4">
          {site.artistName} is the founder of {site.name}, with {site.experience} years of bridal
          artistry and {site.brideCount} brides served across the GTA. Based in {site.baseCity}.
        </p>
        <Link
          href="/contact"
          className="text-gold text-sm font-medium hover:text-gold-dim transition-colors"
        >
          Book a consultation →
        </Link>
      </div>
    </div>
  )
}
