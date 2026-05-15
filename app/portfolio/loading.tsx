import { SectionHeader } from '@/components/ui/SectionHeader'

const SKELETON_ITEMS = Array.from({ length: 9 }, (_, i) => ({
  id:    i,
  tall:  i % 4 === 0,
}))

export default function PortfolioLoading() {
  return (
    <section className="pt-32 pb-24 px-6 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Portfolio"
          title="The work speaks for itself"
          subtitle="Browse looks from bridal ceremonies to full glam events."
          centered
        />

        {/* Filter chip skeletons */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 mb-12">
          {['All', 'Bridal', 'Pre-Bridal', 'Full Glam', 'Party', 'South Asian'].map((label) => (
            <div
              key={label}
              className="px-5 py-2 rounded-full border border-ivory-4 bg-ivory-2 text-muted-2 text-sm animate-pulse"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Image skeletons */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {SKELETON_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`${item.tall ? 'aspect-[3/4]' : 'aspect-square'} w-full rounded-xl bg-ivory-3 break-inside-avoid animate-pulse`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
