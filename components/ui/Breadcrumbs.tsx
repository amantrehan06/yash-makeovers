import Link from 'next/link'
import { buildBreadcrumbSchema, type BreadcrumbItem } from '@/lib/schema'

// Visible breadcrumb trail + matching schema.org JSON-LD in one component.
// Google often shows breadcrumbs in SERPs only when BOTH the visible UI and
// the BreadcrumbList schema are present — emitting them together guarantees
// they never drift apart.
//
// Render this ABOVE the page H1. Last item is the current page (not a link).
// Pass `currentPath` so the schema's last `item` URL is correct.

export type { BreadcrumbItem as Crumb } from '@/lib/schema'

export function Breadcrumbs({
  items,
  currentPath,
}: {
  items:       readonly BreadcrumbItem[]
  currentPath: string  // e.g. '/about' — used for the last item's schema URL
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(items, currentPath)) }}
      />
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
    </>
  )
}
