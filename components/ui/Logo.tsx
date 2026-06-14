import Link from 'next/link'
import { site } from '@/config/site'

// Brand logo lockup: a gold "YM" monogram + the wordmark. Live text (not an
// image) so it stays crawlable, scales perfectly, and adapts to light/dark
// surfaces. The monogram is always gold; the wordmark inherits the parent's
// text colour (text-dark in the navbar, text-ivory in the footer).
//
// The matching favicon / schema logo lives at app/icon.svg — keep the two
// visually in sync if you restyle the monogram.

interface LogoProps {
  className?:         string  // applied to the <Link> — set the wordmark colour here
  wordmarkClassName?: string  // size/utility classes for the wordmark text
  showWordmark?:      boolean // false → monogram only
  onClick?:           () => void
}

export function Logo({
  className = '',
  wordmarkClassName = 'text-2xl',
  showWordmark = true,
  onClick,
}: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name} — home`}
      className={`inline-flex items-center gap-2.5 transition-colors ${className}`}
    >
      <span className="text-gold flex-shrink-0" aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18.75" stroke="currentColor" strokeWidth="1" />
          <text
            x="20"
            y="20"
            textAnchor="middle"
            dominantBaseline="central"
            fill="currentColor"
            style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', letterSpacing: '0.5px' }}
          >
            YM
          </text>
        </svg>
      </span>
      {showWordmark && (
        <span className={`font-serif tracking-wide leading-none ${wordmarkClassName}`}>
          {site.name}
        </span>
      )}
    </Link>
  )
}
