import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'
import { site } from '@/config/site'
import { features } from '@/config/features'
import { buildCloudinaryUrl } from '@/lib/cloudinaryUrl'

// Default social-share image — used as fallback on any page that doesn't
// declare its own openGraph.images. Empty publicId → omit entirely (Next
// falls back to the host's favicon for previews).
const defaultOgImage = site.branding.ogImagePublicId
  ? [
      {
        url:    buildCloudinaryUrl(site.branding.ogImagePublicId, { width: 1200, height: 630, crop: 'fill' }),
        width:  1200,
        height: 630,
        alt:    site.name,
      },
    ]
  : undefined

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.canonicalHost}`),
  title: {
    default: `${site.name} — Bridal Makeup Artist in ${site.baseCity}`,
    template: `%s | ${site.name}`,
  },
  // Inheritable fallback only — every public page declares its own
  // description. Keep this short and brand-only so any uncaught page
  // (e.g. /_error) still ships valid metadata.
  description: `${site.name} — luxury bridal makeup and hair across the GTA.`,
  // hreflang — tells Google this is the Canadian-English version. Even on a
  // single-locale site, the `x-default` self-reference clears Search Console's
  // "no hreflang" warning and helps disambiguate from US/UK results.
  alternates: {
    languages: {
      'en-CA':     `https://${site.canonicalHost}`,
      'x-default': `https://${site.canonicalHost}`,
    },
  },
  // Note: meta keywords intentionally not set. Google has ignored them since
  // ~2009 and identical site-wide values add no SEO value. The keyword list
  // in config/seo.ts is still consumed by the homepage LocalBusiness
  // `areaServed` schema.
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_CA',
    ...(defaultOgImage ? { images: defaultOgImage } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    ...(defaultOgImage ? { images: defaultOgImage.map((i) => i.url) } : {}),
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Next 14 split viewport/themeColor out of metadata. Driven by config so
// rebrand = change one hex in site.branding.themeColor.
export const viewport: Viewport = {
  themeColor:    site.branding.themeColor,
  width:         'device-width',
  initialScale:  1,
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-ivory text-dark font-sans antialiased">
        {/* Skip link — keyboard users press Tab on page load to surface this,
            then Enter to jump past the nav. Visually hidden until focused. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-ivory focus:rounded-full focus:font-medium"
        >
          Skip to content
        </a>
        <ScrollProgressBar />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        {features.whatsapp && <FloatingWhatsApp />}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  )
}
