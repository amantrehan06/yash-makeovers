import { SectionHeader } from '@/components/ui/SectionHeader'
import { FAQAccordion, type FaqItem } from '@/components/ui/FAQAccordion'

// Homepage / general-purpose FAQ section. Wraps the shared accordion with a
// SectionHeader and ivory background so it visually matches sibling sections.
// The same `items` array should also drive the page's FAQPage JSON-LD — see
// app/page.tsx for the pattern.
export function FAQ({
  items,
  eyebrow = 'FAQ',
  title   = 'Frequently asked',
}: {
  items:    readonly FaqItem[]
  eyebrow?: string
  title?:   string
}) {
  return (
    <section className="py-24 px-6 bg-ivory">
      <div className="max-w-3xl mx-auto">
        <SectionHeader eyebrow={eyebrow} title={title} centered />
        <FAQAccordion faqs={items} />
      </div>
    </section>
  )
}
