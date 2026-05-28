import type { Metadata } from 'next'
import { site } from '@/config/site'
import { content } from '@/config/content'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { InquiryForm } from '@/components/sections/InquiryForm'

export const metadata: Metadata = {
  title: 'Book Your Date',
  description: `Inquire about bridal makeup services with ${site.artistName} at ${site.name}. ${site.availability}. Based in ${site.addressStructured.addressLocality}, serving all of the GTA.`,
  alternates: { canonical: `https://${site.canonicalHost}/contact` },
}

export default function ContactPage() {
  return (
    <>
      {/* Spacer for the fixed navbar — form's own SectionHeader is the page title. */}
      <div className="pt-20" />

      <div className="px-6 pt-4">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs
            currentPath="/contact"
            items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
          />
        </div>
      </div>

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
            <a
              href={site.googleBusiness}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark font-medium text-sm hover:text-gold transition-colors"
            >
              {site.address}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
