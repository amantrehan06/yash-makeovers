import { fillTemplate } from '@/config/content'

// Single "why brides choose us" item. Used on /about (plain rows) and on
// city pages (boxed cards). Caller owns the grid layout — this component
// owns the row/card itself.
//
// Both surfaces previously had this markup inline with tiny visual diffs
// (mb-1 vs mb-2, plain row vs card). Consolidated here with a `boxed` prop.

export interface WhyChooseItemProps {
  title: string
  body:  string
  boxed?: boolean   // false (default) = plain row (about). true = card (city).
}

export function WhyChooseItem({ title, body, boxed = false }: WhyChooseItemProps) {
  const containerClass = boxed
    ? 'flex gap-4 bg-ivory-2 rounded-2xl p-6 border border-ivory-4'
    : 'flex gap-4'
  const iconClass      = boxed ? 'text-gold mt-1 flex-shrink-0 text-lg' : 'text-gold mt-1 flex-shrink-0'
  const titleMargin    = boxed ? 'mb-2' : 'mb-1'

  return (
    <div className={containerClass}>
      <span aria-hidden className={iconClass}>✦</span>
      <div>
        <p className={`font-semibold text-dark ${titleMargin}`}>{fillTemplate(title)}</p>
        <p className="text-muted text-sm leading-relaxed">{fillTemplate(body)}</p>
      </div>
    </div>
  )
}
