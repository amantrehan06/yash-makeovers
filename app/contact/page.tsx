import type { Metadata } from 'next'
import { site } from '@/config/site'
import { content } from '@/config/content'
import { InquiryForm } from '@/components/sections/InquiryForm'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: `Book Your Date | ${site.name}`,
  description: `Inquire about bridal makeup services with ${site.artistName} at ${site.name}. ${site.availability}. Based in ${site.addressStructured.addressLocality}, serving all of the GTA.`,
  alternates: { canonical: `https://${site.domain}/contact` },
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}` },
              { '@type': 'ListItem', position: 2, name: 'Contact', item: `https://${site.domain}/contact` },
            ],
          }),
        }}
      />

      <section className="pt-32 pb-8 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow={content.contactPage.eyebrow}
            title={content.contactPage.title}
            subtitle={site.availability}
            centered
          />
        </div>
      </section>

      <InquiryForm />

      <section className="pb-24 px-6 bg-ivory">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-ivory-2 rounded-2xl p-6 border border-ivory-4">
            <p className="text-gold mb-2">📱</p>
            <p className="text-xs uppercase tracking-widest text-muted mb-1">{content.contactPage.cards.whatsapp}</p>
            <a href={`https://wa.me/${site.whatsapp}`} className="text-dark font-medium text-sm hover:text-gold transition-colors">
              {site.phone}
            </a>
          </div>
          <div className="bg-ivory-2 rounded-2xl p-6 border border-ivory-4">
            <p className="text-gold mb-2">✉️</p>
            <p className="text-xs uppercase tracking-widest text-muted mb-1">{content.contactPage.cards.email}</p>
            <a href={`mailto:${site.email}`} className="text-dark font-medium text-sm hover:text-gold transition-colors">
              {site.email}
            </a>
          </div>
          <div className="bg-ivory-2 rounded-2xl p-6 border border-ivory-4">
            <p className="text-gold mb-2">📍</p>
            <p className="text-xs uppercase tracking-widest text-muted mb-1">{content.contactPage.cards.studio}</p>
            <p className="text-dark font-medium text-sm">{site.address}</p>
          </div>
        </div>
      </section>
    </>
  )
}
