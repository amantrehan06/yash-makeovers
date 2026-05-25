import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'
import { site } from '@/config/site'
import { features } from '@/config/features'

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
  description: `${site.name} is ${site.addressStructured.addressLocality}'s most trusted bridal makeup artist. ${site.experience} years of experience, ${site.brideCount} brides served across the GTA. Book your ${site.seasonYears} wedding date.`,
  // Note: meta keywords intentionally not set. Google has ignored them since
  // ~2009 and identical site-wide values add no SEO value. site.seo.keywords
  // is still consumed by the homepage LocalBusiness `areaServed` schema.
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
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
