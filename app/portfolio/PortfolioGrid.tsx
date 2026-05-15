'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import type { CloudinaryResource } from '@/lib/cloudinaryUrl'
import { buildCloudinaryUrl } from '@/lib/cloudinaryUrl'
import { trackEvent } from '@/lib/analytics'
import { site } from '@/config/site'

const CATEGORIES = ['All', 'Bridal', 'Pre-Bridal', 'Full Glam', 'Party', 'South Asian'] as const
type Category = (typeof CATEGORIES)[number]

// Tag → category label. Add lowercase variants of expected Cloudinary tags.
const TAG_TO_CATEGORY: Record<string, Category> = {
  bridal:        'Bridal',
  'pre-bridal':  'Pre-Bridal',
  'full-glam':   'Full Glam',
  party:         'Party',
  'south-asian': 'South Asian',
}

function imageCategory(resource: CloudinaryResource): Category {
  for (const tag of resource.tags) {
    const cat = TAG_TO_CATEGORY[tag.toLowerCase()]
    if (cat) return cat
  }
  return 'Bridal'
}

// Extracts a short look name from Cloudinary tags or public_id.
function imageLookName(resource: CloudinaryResource): string {
  const meaningful = resource.tags.find((t) => !TAG_TO_CATEGORY[t.toLowerCase()])
  if (meaningful) return meaningful.replace(/-/g, ' ')
  // Fall back to the last segment of public_id without the ig- prefix.
  const base = resource.public_id.split('/').pop() ?? ''
  return base.replace(/^ig-/, '').replace(/[-_]/g, ' ')
}

const PAGE_SIZE = 12

// Placeholder grid shown when Cloudinary folder has no curated photos yet.
const PLACEHOLDERS = Array.from({ length: 18 }, (_, i) => ({
  id:       i + 1,
  category: CATEGORIES[1 + (i % (CATEGORIES.length - 1))] as Category,
  tall:     i % 4 === 0,
}))

interface Props {
  images: CloudinaryResource[]
}

export function PortfolioGrid({ images }: Props) {
  const [active, setActive] = useState<Category>('All')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const hasImages = images.length > 0

  const filtered = useMemo(() => {
    if (!hasImages) return []
    return active === 'All' ? images : images.filter((img) => imageCategory(img) === active)
  }, [images, active, hasImages])

  const filteredPlaceholders = useMemo(() => {
    if (hasImages) return []
    return active === 'All' ? PLACEHOLDERS : PLACEHOLDERS.filter((p) => p.category === active)
  }, [active, hasImages])

  const list   = hasImages ? filtered : filteredPlaceholders
  const shown  = list.slice(0, visible)
  const canLoadMore = visible < list.length

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mt-10 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActive(cat)
              setVisible(PAGE_SIZE)
              trackEvent('portfolio_filtered', { category: cat })
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
              active === cat
                ? 'bg-gold text-ivory border-gold'
                : 'border-ivory-4 text-muted hover:border-gold hover:text-gold'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="columns-2 md:columns-3 gap-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {hasImages
            ? (shown as CloudinaryResource[]).map((img, i) => {
                const isPortrait = img.height > img.width
                const displayW   = 600
                const displayH   = isPortrait ? 800 : 600
                const src        = buildCloudinaryUrl(img.public_id, {
                  width: displayW, height: displayH, crop: 'fill', quality: 'auto:good', format: 'webp',
                })
                const blurSrc    = buildCloudinaryUrl(img.public_id, {
                  width: 20, height: 20, crop: 'fill', quality: 'auto', format: 'webp',
                })
                const category   = imageCategory(img)
                const lookName   = imageLookName(img)

                return (
                  <motion.div
                    key={img.public_id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={`${isPortrait ? 'aspect-[3/4]' : 'aspect-square'} relative w-full rounded-xl overflow-hidden break-inside-avoid group`}
                  >
                    <Image
                      src={src}
                      alt={`${site.name} — ${category} look ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={blurSrc}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-xs uppercase tracking-widest text-gold-light mb-1">
                        {category}
                      </span>
                      <span className="text-ivory font-serif text-lg capitalize leading-tight">
                        {lookName}
                      </span>
                    </div>
                  </motion.div>
                )
              })
            : (shown as typeof PLACEHOLDERS).map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`${item.tall ? 'aspect-[3/4]' : 'aspect-square'} w-full rounded-xl overflow-hidden bg-ivory-3 break-inside-avoid flex items-center justify-center`}
                >
                  <p className="text-center text-muted text-xs px-4">
                    <span className="font-serif text-3xl block mb-2 text-gold-pale">✦</span>
                    {item.category}
                    <br />
                    <span className="text-muted-2">Image {item.id}</span>
                  </p>
                </motion.div>
              ))}
        </AnimatePresence>
      </motion.div>

      {canLoadMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="px-8 py-3 rounded-full border border-gold text-gold hover:bg-gold hover:text-ivory text-sm font-medium tracking-wide transition-colors"
          >
            Load more ({list.length - visible} remaining)
          </button>
        </div>
      )}
    </>
  )
}
