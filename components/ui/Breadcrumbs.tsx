import Link from 'next/link'

// Visible breadcrumb trail. Google often shows breadcrumbs in SERPs only
// when both the visible UI and the BreadcrumbList JSON-LD are present —
// the pair should always ship together (callers emit the schema, this
// renders the UI).
//
// Render this ABOVE the page H1 so it sets navigation context before the
// main heading. Last item is the current page (not a link, not bold).

export interface Crumb {
  label: string
  href?: string   // omit on the last item (current page)
}

export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-2 mb-4">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-2">
              {c.href && !isLast ? (
                <Link href={c.href} className="hover:text-gold transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="text-muted">
                  {c.label}
                </span>
              )}
              {!isLast && <span aria-hidden className="text-ivory-4">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
