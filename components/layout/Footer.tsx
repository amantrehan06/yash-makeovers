import Link from 'next/link'
import { site } from '@/config/site'

export function Footer() {
  return (
    <footer className="bg-dark text-ivory-4 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-serif text-2xl text-ivory mb-3">{site.name}</p>
            <p className="text-muted-2 text-sm leading-relaxed">{site.tagline}</p>
            <p className="text-muted-2 text-sm mt-4">{site.address}</p>
            <p className="text-muted-2 text-sm mt-1">
              <a href={`tel:${site.phone}`} className="hover:text-gold-light transition-colors">
                {site.phone}
              </a>
            </p>
            <p className="text-muted-2 text-sm mt-1">
              <a href={`mailto:${site.email}`} className="hover:text-gold-light transition-colors">
                {site.email}
              </a>
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gold mb-6">Quick links</p>
            <nav className="flex flex-col gap-3">
              {[
                ['About', '/about'],
                ['Portfolio', '/portfolio'],
                ['Services', '/services'],
                ['Blog', '/blog'],
                ['Contact', '/contact'],
                ['Terms & Conditions', '/terms-and-conditions'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-muted-2 text-sm hover:text-gold-light transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gold mb-6">Cities served</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                'Brampton',
                'Mississauga',
                'Toronto',
                'Etobicoke',
                'Oakville',
                'Vaughan',
                'Scarborough',
                'Markham',
                'North York',
                'Richmond Hill',
              ].map((city) => (
                <Link
                  key={city}
                  href={`/${city.toLowerCase().replace(' ', '-')}`}
                  className="text-muted-2 text-sm hover:text-gold-light transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <a
                href={`https://instagram.com/${site.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-2 hover:text-gold-light transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-2 hover:text-gold-light transition-colors text-sm"
              >
                Facebook
              </a>
              <a
                href={site.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-2 hover:text-gold-light transition-colors text-sm"
              >
                Google
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-3 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.availability}</p>
          <p>
            Website by{' '}
            <a
              href="https://spotive.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-light transition-colors"
            >
              Spotive
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
