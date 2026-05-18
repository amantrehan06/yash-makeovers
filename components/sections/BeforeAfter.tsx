'use client'

import { useState } from 'react'
import { features } from '@/config/features'
import { site } from '@/config/site'
import { content } from '@/config/content'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CloudinaryImage } from '@/components/ui/CloudinaryImage'

interface Props {
  beforePublicId?: string
  afterPublicId?:  string
}

export function BeforeAfter({ beforePublicId, afterPublicId }: Props) {
  const [position, setPosition] = useState(50)
  if (!features.beforeAfter) return null
  const hasImages = Boolean(beforePublicId && afterPublicId)

  return (
    <section className="py-24 px-6 bg-dark">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow={content.beforeAfter.eyebrow}
          title={content.beforeAfter.title}
          subtitle={content.beforeAfter.subtitle}
          centered
          light
        />

        <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden select-none mt-12 bg-dark-2">
          {/* "After" layer underneath — visible on the right side */}
          <div className="absolute inset-0">
            {afterPublicId ? (
              <CloudinaryImage
                publicId={afterPublicId}
                alt={`After ${site.artistName}'s bridal makeup`}
                width={1600}
                height={900}
                crop="fill"
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-ivory-4 text-sm bg-dark-2">
                <p className="text-center">
                  <span className="font-serif text-4xl block mb-2 text-gold-light">After</span>
                  Add the after image via Cloudinary
                </p>
              </div>
            )}
          </div>

          {/* "Before" layer on top, clipped to reveal the after below */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            {beforePublicId ? (
              <CloudinaryImage
                publicId={beforePublicId}
                alt="Before makeup"
                width={1600}
                height={900}
                crop="fill"
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-2 text-sm bg-dark-3">
                <p className="text-center">
                  <span className="font-serif text-4xl block mb-2 text-gold-dim">Before</span>
                  Add the before image via Cloudinary
                </p>
              </div>
            )}
          </div>

          {/* Visual divider */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-gold pointer-events-none"
            style={{ left: `${position}%` }}
            aria-hidden
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-lg">
              <span className="text-ivory text-sm">⇆</span>
            </div>
          </div>

          {/* Range input drives the position — gives us keyboard + touch + mouse for free */}
          <input
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            aria-label="Reveal before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            className="absolute inset-0 w-full h-full cursor-col-resize opacity-0"
          />
        </div>

        {!hasImages && (
          <p className="text-center text-muted-2 text-xs mt-6">
            Tip: pass <code className="text-gold-light">beforePublicId</code> and{' '}
            <code className="text-gold-light">afterPublicId</code> props once you upload a pair.
          </p>
        )}
      </div>
    </section>
  )
}
