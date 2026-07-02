import type { Metadata } from 'next'
import { site } from '@/config/site'
import { fillTemplate } from '@/config/content'
import { getServicePage } from '@/config/servicePages'
import { ServicePageContent } from '@/components/sections/ServicePageContent'

// Thin route wrapper — all copy lives in config/servicePages.ts and the
// layout in components/sections/ServicePageContent.tsx (see cities pattern).

const page = getServicePage('party-makeup')

// ISR: match the Cloudinary unstable_cache TTL (see app/[city]/page.tsx).
export const revalidate = 28800

export const metadata: Metadata = {
  title:       page.metaTitle,
  description: fillTemplate(page.metaDescription),
  alternates:  { canonical: `https://${site.canonicalHost}/${page.slug}` },
  openGraph: {
    title:       page.metaTitle,
    description: fillTemplate(page.metaDescription),
    type:        'website',
    locale:      'en_CA',
  },
}

export default function PartyMakeupPage() {
  return <ServicePageContent page={page} />
}
