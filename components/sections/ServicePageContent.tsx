import Link from 'next/link'
import { site } from '@/config/site'
import { cities } from '@/config/cities'
import { content, fillTemplate } from '@/config/content'
import { servicePages, type ServicePage } from '@/config/servicePages'
import { getPackage } from '@/config/packages'
import { getImagesFromFolder, CLOUDINARY_FOLDERS } from '@/lib/cloudinary'
import { buildServicePageSchema, buildFaqSchema } from '@/lib/schema'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PackageCard } from '@/components/ui/PackageCard'
import { CloudinaryImage } from '@/components/ui/CloudinaryImage'

// Shared renderer for the occasion service pages (/party-makeup, /prom-makeup,
// /engagement-makeup, /photoshoot-makeup). ALL copy comes from the page's
// config/servicePages.ts entry — this component owns layout only, mirroring
// how app/[city]/page.tsx renders config/cities.ts.

const GALLERY_MAX = 6

// Renders a paragraph string, turning any [text](/path) markdown link into a
// Next <Link> so a section body can cross-link other pages from config.
// Paragraphs without a link render identically (split returns the whole string).
function renderSectionLinks(text: string) {
  return text.split(/(\[[^\]]+\]\(\/[a-z0-9/-]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((\/[a-z0-9/-]+)\)$/)
    if (!m) return part
    return (
      <Link key={i} href={m[2]} className="text-gold underline underline-offset-2 hover:text-gold-dim">
        {m[1]}
      </Link>
    )
  })
}

export async function ServicePageContent({ page }: { page: ServicePage }) {
  const pagePackages = page.packageIds.map(getPackage)

  // Gallery: portfolio photos carrying this page's tag (full-glam at launch —
  // see the TODO in config/servicePages.ts). Section hides when none exist.
  const portfolioImages = await getImagesFromFolder(CLOUDINARY_FOLDERS.portfolio)
  const galleryImages = portfolioImages
    .filter((img) => img.tags.includes(page.galleryTag))
    .slice(0, GALLERY_MAX)

  const related = servicePages.filter((p) => p.slug !== page.slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServicePageSchema(page)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(page.faq)) }}
      />

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            currentPath={`/${page.slug}`}
            items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: page.name }]}
          />
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-gold mb-4">{page.eyebrow}</p>
            <h1 className="font-serif text-4xl md:text-[56px] text-dark leading-[1.05] tracking-tight mb-4">
              {page.h1}
            </h1>
            <p className="text-gold-dim text-lg md:text-xl font-medium leading-snug mb-8">
              {fillTemplate(page.subtitle)}
            </p>
            <div className="space-y-4 mb-8">
              {fillTemplate(page.intro).split('\n\n').map((para, i) => (
                <p key={i} className="text-muted text-lg leading-relaxed">{para}</p>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contact" size="lg">
                {content.hero.ctaPrimary}
              </Button>
              <Button href="/portfolio" variant="outline" size="lg">
                {content.hero.ctaSecondary}
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: content.hero.statExperience, value: site.experience },
              { label: content.hero.statBrides,     value: site.brideCount },
              { label: 'Google rating',             value: `⭐ ${site.googleRating}` },
              { label: content.hero.statReviews,    value: site.googleReviewCount },
            ].map((s) => (
              <div key={s.label} className="bg-ivory-2 rounded-2xl p-6 border border-ivory-4 text-center">
                <p className="font-serif text-3xl text-gold">{s.value}</p>
                <p className="text-muted text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-16 px-6 bg-ivory-2">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow={content.servicePage.servicesEyebrow}
            title={page.packagesTitle}
            subtitle={content.servicePage.servicesSubtitle}
            centered
          />
          {/* Single-package pages (prom, photoshoot, nikkah-walima) render one
              centered card; only multi-package pages use the 2-up grid.
              Applying sm:grid-cols-2 to a lone card left it at half width,
              squeezing it into a tall, narrow column. */}
          <div className={`grid gap-6 mt-10 mx-auto ${pagePackages.length === 1 ? 'grid-cols-1 max-w-md' : 'grid-cols-1 sm:grid-cols-2 max-w-3xl'}`}>
            {pagePackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                ctaText={content.servicesSection.bookCTA}
                showPopularBadge={false}
                forceHighlight={pagePackages.length === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <section className="py-16 px-6 bg-ivory">
        <div className="max-w-3xl mx-auto space-y-14">
          {page.sections.map((section) => (
            // Optional deep-link anchor from config (e.g. #mehndi-makeup);
            // scroll-mt clears the fixed navbar when jumping to it.
            <div key={section.heading} id={section.id} className={section.id ? 'scroll-mt-24' : undefined}>
              <h2 className="font-serif text-3xl md:text-4xl text-dark leading-tight mb-5">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {fillTemplate(section.body).split('\n\n').map((para, i) => (
                  <p key={i} className="text-muted text-base leading-relaxed">{renderSectionLinks(para)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY (hidden until tagged photos exist) */}
      {galleryImages.length > 0 && (
        <section className="py-16 px-6 bg-ivory-2">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              eyebrow={content.servicePage.galleryEyebrow}
              title={content.servicePage.galleryTitle}
              subtitle={content.servicePage.gallerySubtitle}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
              {galleryImages.map((img) => (
                <div key={img.public_id} className="relative aspect-[3/4] rounded-xl overflow-hidden bg-ivory-3">
                  <CloudinaryImage
                    publicId={img.public_id}
                    alt={`${page.name} look by ${site.artistName}`}
                    width={480}
                    height={640}
                    crop="fill"
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ — open list (matches city pages) so answers count as page copy */}
      <section className="py-16 px-6 bg-ivory">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow={content.servicePage.faqEyebrow}
            title={`${content.servicePage.faqTitle}: ${page.name.toLowerCase()}`}
          />
          <div className="divide-y divide-ivory-4">
            {page.faq.map((faq, i) => (
              <div key={i} className="py-6">
                <p className="font-medium text-dark mb-2">{faq.q}</p>
                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CITY LINKS — every service page links all 10 city pages */}
      <section className="py-16 px-6 bg-ivory-2">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow={content.servicePage.citiesEyebrow}
            title={content.servicePage.citiesTitle}
          />
          <div className="flex flex-wrap gap-3 mt-10">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="px-5 py-3 rounded-full border border-ivory-4 bg-ivory text-dark text-sm hover:border-gold hover:text-gold transition-colors inline-flex items-center gap-2"
              >
                {city.name}
                <span className="text-gold">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="py-16 px-6 bg-ivory">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow={content.servicePage.relatedEyebrow}
            title={content.servicePage.relatedTitle}
          />
          <div className="flex flex-wrap gap-3 mt-10">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="px-5 py-3 rounded-full border border-ivory-4 bg-ivory-2 text-dark text-sm hover:border-gold hover:text-gold transition-colors inline-flex items-center gap-2"
              >
                {p.name}
                <span className="text-gold">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gold">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-3xl md:text-4xl text-ivory mb-4">{page.ctaTitle}</p>
          <p className="text-gold-pale mb-8">{site.availability}</p>
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="border-ivory text-ivory hover:bg-ivory hover:text-gold"
          >
            {content.hero.ctaPrimary} →
          </Button>
        </div>
      </section>
    </>
  )
}
