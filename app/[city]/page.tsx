import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cities, type City, type ContentBlock } from '@/config/cities'
import { site } from '@/config/site'
import { packages } from '@/config/packages'
import { content, fillTemplate } from '@/config/content'
import { getImagesFromFolder, CLOUDINARY_FOLDERS } from '@/lib/cloudinary'
import { buildCloudinaryUrl } from '@/lib/cloudinaryUrl'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { CloudinaryImage } from '@/components/ui/CloudinaryImage'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PackageCard } from '@/components/ui/PackageCard'
import { WhyChooseItem } from '@/components/ui/WhyChooseItem'
import { CityReviews } from '@/components/sections/CityReviews'
import { buildCityServiceSchema } from '@/lib/schema'

interface Props {
  params: { city: string }
}

// ISR: rebuild every 8h to match the Cloudinary unstable_cache TTL in
// lib/cloudinary.ts. Combined with generateStaticParams below, every city
// page is pre-rendered at build and served statically from the edge — fixes
// the TTFB bottleneck (was 47% Good in CrUX field data) without re-running
// the Cloudinary search on every request.
export const revalidate = 28800

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cities.find((c) => c.slug === params.city)
  if (!city) return {}
  const description = fillTemplate(city.metaDescription)
  return {
    title:       city.metaTitle,
    description,
    alternates:  { canonical: `https://${site.canonicalHost}/${city.slug}` },
    openGraph: {
      title:       city.metaTitle,
      description,
      type:        'website',
      locale:      'en_CA',
    },
  }
}

function cityFaqs(cityName: string) {
  // All prices + fees derive from config — change once in config/packages.ts
  // or config/site.ts and every city FAQ reflects it.
  const bridal    = packages.find((p) => p.id === 'bridal')!
  const preBridal = packages.find((p) => p.id === 'pre-bridal')!
  const fullGlam  = packages.find((p) => p.id === 'full-glam')!
  const party     = packages.find((p) => p.id === 'party')!

  return [
    {
      q: `How much does bridal makeup cost in ${cityName}?`,
      a: `${site.artistName}'s bridal packages start at ${bridal.price} per person per event for the full Bridal package — including ${bridal.includes.slice(0, 4).join(', ')}, and more. Pre-Bridal events are ${preBridal.price}, Full Glam is ${fullGlam.price}, and Regular Party is ${party.price} per person.`,
    },
    {
      q: `Does ${site.artistName} travel to ${cityName}?`,
      a: `Yes — ${site.artistName} travels to all venues across the GTA. Travel fees: $${site.policies.travelPeel} within Peel Region, up to $${site.policies.travelGTA} for the wider GTA. Alternatively, visit the studio at ${site.address}.`,
    },
    {
      q: 'How far in advance should I book?',
      a: `${site.artistName} is currently ${site.availability.toLowerCase()}, with popular dates filling up quickly (especially May through October). We recommend reaching out 6–12 months before your wedding. A ${site.policies.depositPercent}% non-refundable deposit via e-transfer secures your date.`,
    },
  ]
}

// Cloudinary URL for a content block's image — reuses the shared URL builder
// (face-aware fill crop) so we never hardcode a Cloudinary path here.
function blockImageUrl(publicId: string): string {
  return buildCloudinaryUrl(publicId, { width: 1200, height: 900, crop: 'fill' })
}

export default async function CityPage({ params }: Props) {
  const city = cities.find((c) => c.slug === params.city)
  if (!city) notFound()

  const faqs = cityFaqs(city.name)
  // Pick a hero image for this city: first portfolio photo tagged with the
  // city slug (e.g., 'brampton'). Yashpreet adds the tag in Cloudinary on
  // any portfolio photo she wants associated with that city. If no photo is
  // tagged, falls back to the first 'featured' photo, then any portfolio
  // photo — so the layout never breaks.
  const portfolioImages = await getImagesFromFolder(CLOUDINARY_FOLDERS.portfolio)
  const cityHeroImage =
    portfolioImages.find((img) => img.tags.includes(city.slug)) ??
    portfolioImages.find((img) => img.tags.includes('featured')) ??
    portfolioImages[0]

  // Recent-work feed: newest blocks first. Each block is a unique ~150-word
  // case study sourced from a real Instagram post (see /transform-post skill).
  const BLOCKS_ON_CITY_PAGE = 6
  const allWork = [...city.contentBlocks].sort((a, b) => b.date.localeCompare(a.date))
  const recentWork = allWork.slice(0, BLOCKS_ON_CITY_PAGE)
  const hasMoreWork = allWork.length > BLOCKS_ON_CITY_PAGE

  // ImageGallery schema — one ImageObject per content block that has an image.
  // Skipped entirely when no block has an image.
  const blocksWithImage = city.contentBlocks.filter((b) => b.imageUrl)
  const imageGallerySchema = blocksWithImage.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type':    'ImageGallery',
        name:       `Bridal makeup and hair work in ${city.name}`,
        url:        `https://${site.canonicalHost}/${city.slug}`,
        image: blocksWithImage.map((block) => ({
          '@type':          'ImageObject',
          contentUrl:       blockImageUrl(block.imageUrl!),
          name:             block.title,
          description:      block.body,
          dateCreated:      block.date,
          creator:          { '@type': 'Person', name: site.artistName },
          creditText:       site.name,
          copyrightNotice:  site.name,
          contentLocation: {
            '@type': 'Place',
            name:    `${city.name}, ${city.province}`,
            geo: {
              '@type':   'GeoCoordinates',
              latitude:  city.geo.latitude,
              longitude: city.geo.longitude,
            },
          },
        })),
      }
    : null

  return (
    <>
      {/* Per-city Service schema — chains to homepage BeautyStudio via @id.
          Tells Google this studio explicitly serves THIS city with these
          coordinates as the service area. Biggest local-pack ranking lever
          for "bridal makeup in {city}" queries. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCityServiceSchema(city)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name:    faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />
      {imageGallerySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
        />
      )}

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            currentPath={`/${city.slug}`}
            items={[{ label: 'Home', href: '/' }, { label: city.name }]}
          />
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left: city intro + CTAs */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-4">
                {city.name}, {city.province}
              </p>
              <h1 className="font-serif text-4xl md:text-[56px] text-dark leading-[1.05] tracking-tight mb-4">
                {city.h1}
              </h1>
              {/* Keyword-rich subtitle below H1. Bakes "bridal makeup and hair
                  {city}" and specialty keywords into the first 30 words of the
                  page for long-tail SEO matching. */}
              <p className="text-gold-dim text-lg md:text-xl font-medium leading-snug mb-8">
                {fillTemplate(city.subtitle)}
              </p>
              {/* Split intro on \n\n boundaries and render each as its own
                  <p>. Real paragraph semantics (better for SEO + a11y) instead
                  of one big block with `whitespace-pre-line`. */}
              <div className="space-y-4 mb-8">
                {fillTemplate(city.intro).split('\n\n').map((para, i) => (
                  <p key={i} className="text-muted text-lg leading-relaxed">{para}</p>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact" size="lg">
                  Book in {city.name}
                </Button>
                <Button href="/portfolio" variant="outline" size="lg">
                  View portfolio
                </Button>
              </div>
            </div>

            {/* Right: bride photo tagged with this city (or fallback). Hidden
                if there's nothing in the portfolio folder yet. */}
            {cityHeroImage && (
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-ivory-3">
                <CloudinaryImage
                  publicId={cityHeroImage.public_id}
                  alt={`Bridal makeup by ${site.artistName} for a ${city.name} bride`}
                  width={480}
                  height={640}
                  priority
                  crop="fill"
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 92vw, 480px"
                />
              </div>
            )}
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Years of expertise', value: site.experience },
              { label: 'Brides served',      value: site.brideCount },
              { label: 'Google rating',      value: `⭐ ${site.googleRating}` },
              { label: 'Google reviews',     value: site.googleReviewCount },
            ].map((s) => (
              <div key={s.label} className="bg-ivory-2 rounded-2xl p-6 border border-ivory-4 text-center">
                <p className="font-serif text-3xl text-gold">{s.value}</p>
                <p className="text-muted text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT WORK — hub-and-spoke content feed. Only renders once at least
          one contentBlock has been added for this city. */}
      {recentWork.length > 0 && (
        <section className="py-16 px-6 bg-ivory">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              eyebrow="Recent work"
              title={`Recent work in ${city.name}`}
              subtitle={`A look at real ${city.name} brides and events ${site.artistName} has worked with.`}
            />
            <div className="flex flex-col gap-8 mt-10">
              {recentWork.map((block) => (
                <RecentWorkCard key={block.id} block={block} />
              ))}
            </div>
            {hasMoreWork && (
              <div className="mt-10 text-center">
                <Link
                  href={`/${city.slug}/work`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold border border-gold/40 rounded-full px-6 py-2.5 hover:bg-gold/5 transition-colors"
                >
                  See all {city.name} work
                  <span aria-hidden>→</span>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SERVICES */}
      <section className="py-16 px-6 bg-ivory-2">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow={content.cityPage.servicesEyebrow}
            title={`Bridal packages for ${city.name} brides`}
            subtitle={content.cityPage.servicesSubtitle}
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                ctaText={`Book in ${city.name}`}
                showIncludes={false}
                showPopularBadge={false}
                compact
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 px-6 bg-ivory">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow={`Why ${city.name} brides choose ${site.artistName}`}
            title={content.cityPage.whyChooseTitle}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {site.whyChoose.map((item) => (
              <WhyChooseItem key={item.title} title={item.title} body={item.body} boxed />
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR VENUES (only renders if data is filled in) */}
      {city.venues.length > 0 && (
        <section className="py-16 px-6 bg-ivory-2">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              eyebrow="Venues"
              title={`Popular wedding venues in ${city.name}`}
              subtitle={`${site.artistName} has worked at the venues ${city.name} brides love most.`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
              {city.venues.map((venue) => (
                <div
                  key={venue}
                  className="bg-ivory rounded-xl border border-ivory-4 p-4 flex items-center gap-3"
                >
                  <span className="text-gold flex-shrink-0">✦</span>
                  <p className="text-dark text-sm">{venue}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEIGHBOURHOODS (only renders if data is filled in) */}
      {city.neighborhoods.length > 0 && (
        <section className="py-16 px-6 bg-ivory">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              eyebrow="Areas served"
              title={`Neighbourhoods within ${city.name}`}
              subtitle={`Mobile to your venue, your home, or your getting-ready suite.`}
            />
            <div className="flex flex-wrap gap-3 mt-10">
              {city.neighborhoods.map((hood) => (
                <span
                  key={hood}
                  className="px-4 py-2 rounded-full border border-gold-pale text-gold-dim text-sm"
                >
                  {hood}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REVIEWS */}
      <CityReviews citySlug={city.slug} cityName={city.name} />

      {/* FAQ */}
      <section className="py-16 px-6 bg-ivory">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow={content.cityPage.faqEyebrow}
            title={`${content.cityPage.faqTitle} — ${city.name}`}
          />
          <div className="divide-y divide-ivory-4">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <p className="font-medium text-dark mb-2">{faq.q}</p>
                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY CITIES — internal link block for SEO */}
      {city.nearbyCities.length > 0 && (
        <section className="py-16 px-6 bg-ivory">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              eyebrow="Also serving"
              title={`Bridal makeup near ${city.name}`}
              subtitle={`${site.artistName} services brides across the entire GTA. Explore other cities we serve.`}
            />
            <div className="flex flex-wrap gap-3 mt-10">
              {city.nearbyCities
                .map((slug) => cities.find((c) => c.slug === slug))
                .filter((c): c is City => Boolean(c))
                .map((nearby) => (
                  <Link
                    key={nearby.slug}
                    href={`/${nearby.slug}`}
                    className="px-5 py-3 rounded-full border border-ivory-4 bg-ivory-2 text-dark text-sm hover:border-gold hover:text-gold transition-colors inline-flex items-center gap-2"
                  >
                    {nearby.name}
                    <span className="text-gold">→</span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-gold">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-3xl md:text-4xl text-ivory mb-4">
            Ready to look stunning in {city.name}?
          </p>
          <p className="text-gold-pale mb-8">{site.availability}</p>
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="border-ivory text-ivory hover:bg-ivory hover:text-gold"
          >
            Book your {city.name} date →
          </Button>
        </div>
      </section>
    </>
  )
}

// ── Recent-work card ────────────────────────────────────────────────────
// Renders one contentBlock — a real job written up as a unique mini case
// study. Image is optional; layout adapts when it's absent.
function RecentWorkCard({ block }: { block: ContentBlock }) {
  const pkg = packages.find((p) => p.id === block.service)
  const serviceLabel = pkg?.name ?? block.service
  const dateLabel = new Date(`${block.date}T00:00:00`).toLocaleDateString('en-CA', {
    month: 'long',
    year:  'numeric',
  })

  return (
    <article className="bg-ivory-2 rounded-2xl border border-ivory-4 overflow-hidden flex flex-col md:flex-row">
      {block.imageUrl && (
        <div className="relative md:w-2/5 aspect-[4/3] md:aspect-auto bg-ivory-3 flex-shrink-0">
          <CloudinaryImage
            publicId={block.imageUrl}
            alt={block.title}
            width={640}
            height={480}
            crop="fill"
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      )}
      <div className="p-6 sm:p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-widest">
          <span className="text-gold font-medium">{serviceLabel}</span>
          <span className="text-muted-2" aria-hidden>·</span>
          <span className="text-muted-2">{dateLabel}</span>
        </div>
        <h3 className="font-serif text-2xl text-dark leading-tight mb-3">{block.title}</h3>
        <p className="text-muted text-sm leading-relaxed">{block.body}</p>
      </div>
    </article>
  )
}
