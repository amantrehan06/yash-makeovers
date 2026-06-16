import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cities, type ContentBlock } from '@/config/cities'
import { site } from '@/config/site'
import { packages } from '@/config/packages'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CloudinaryImage } from '@/components/ui/CloudinaryImage'

const BLOCKS_PER_PAGE = 12

// Only the cities prerendered below are valid — unknown cities 404 instead of
// triggering an on-demand render.
export const dynamicParams = false

interface Props {
  params: { city: string }
  searchParams: { page?: string }
}

export async function generateStaticParams() {
  return cities
    .filter((c) => c.contentBlocks.length > 0)
    .map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cities.find((c) => c.slug === params.city)
  if (!city) return {}
  return {
    title:       `All Work in ${city.name}`,
    description: `Browse every bridal and event makeup job ${site.artistName} has completed in ${city.name}. Real clients, real transformations.`,
    alternates:  { canonical: `https://${site.canonicalHost}/${city.slug}/work` },
  }
}

export default function CityWorkArchive({ params, searchParams }: Props) {
  const city = cities.find((c) => c.slug === params.city)
  if (!city) notFound()

  const pageParam = searchParams.page

  const sorted = [...city.contentBlocks].sort((a, b) => b.date.localeCompare(a.date))
  if (sorted.length === 0) notFound()

  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10))
  const totalPages  = Math.ceil(sorted.length / BLOCKS_PER_PAGE)
  const pageBlocks  = sorted.slice(
    (currentPage - 1) * BLOCKS_PER_PAGE,
    currentPage * BLOCKS_PER_PAGE,
  )

  return (
    <main className="min-h-screen bg-ivory">
      {/* ── Breadcrumb ── */}
      <nav className="px-6 pt-8 pb-2 max-w-5xl mx-auto text-xs text-muted-2 flex items-center gap-2">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span aria-hidden>›</span>
        <Link href={`/${city.slug}`} className="hover:text-gold transition-colors">{city.name}</Link>
        <span aria-hidden>›</span>
        <span className="text-dark">All work</span>
      </nav>

      {/* ── Header ── */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Portfolio"
            title={`All work in ${city.name}`}
            subtitle={`Every bridal and event transformation ${site.artistName} has completed in ${city.name} — real clients, real results.`}
          />
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {pageBlocks.map((block) => (
            <WorkCard key={block.id} block={block} />
          ))}
        </div>
      </section>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <nav className="pb-16 px-6 flex justify-center items-center gap-3" aria-label="Pagination">
          {currentPage > 1 && (
            <PaginationLink
              href={`/${city.slug}/work${currentPage - 1 > 1 ? `?page=${currentPage - 1}` : ''}`}
              label="← Newer"
            />
          )}
          <span className="text-sm text-muted-2">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <PaginationLink
              href={`/${city.slug}/work?page=${currentPage + 1}`}
              label="Older →"
            />
          )}
        </nav>
      )}

      {/* ── Back link ── */}
      <div className="pb-16 text-center">
        <Link
          href={`/${city.slug}`}
          className="text-sm text-gold hover:underline"
        >
          ← Back to {city.name} page
        </Link>
      </div>
    </main>
  )
}

// ── Work card ────────────────────────────────────────────────────────────────
function WorkCard({ block }: { block: ContentBlock }) {
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
        <h2 className="font-serif text-2xl text-dark leading-tight mb-3">{block.title}</h2>
        <p className="text-muted text-sm leading-relaxed">{block.body}</p>
      </div>
    </article>
  )
}

// ── Pagination link ───────────────────────────────────────────────────────────
function PaginationLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-gold border border-gold/40 rounded-full px-5 py-2 hover:bg-gold/5 transition-colors"
    >
      {label}
    </Link>
  )
}
