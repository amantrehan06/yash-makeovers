/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import { site } from '@/config/site'

export const OG_SIZE = { width: 1200, height: 630 } as const
export const OG_CONTENT_TYPE = 'image/png'

// Brand palette — duplicated here as raw hex values since this file runs in
// the Edge runtime and can't read CSS custom properties.
const COLORS = {
  ivory:    '#FAF8F4',
  ivory2:   '#F3EFE8',
  dark:     '#1C1410',
  gold:     '#A8834A',
  goldPale: '#EAD9BC',
  muted:    '#7A6A58',
} as const

interface OgInput {
  eyebrow?: string
  title:    string
  subtitle?: string
}

// Reusable OG template — render with createOgImage({ title, ... }) from any
// route's opengraph-image.tsx file.
export function createOgImage({ eyebrow, title, subtitle }: OgInput): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          height:         '100%',
          width:          '100%',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'space-between',
          backgroundColor: COLORS.ivory,
          padding:        '72px 80px',
          backgroundImage: `radial-gradient(circle at 90% 10%, ${COLORS.goldPale} 0%, transparent 45%), radial-gradient(circle at 10% 90%, ${COLORS.ivory2} 0%, transparent 50%)`,
        }}
      >
        {/* Brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width:           48,
              height:          48,
              borderRadius:    24,
              backgroundColor: COLORS.gold,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              color:           COLORS.ivory,
              fontFamily:      'serif',
              fontSize:        22,
              letterSpacing:   1,
            }}
          >
            YM
          </div>
          <div
            style={{
              color:           COLORS.dark,
              fontFamily:      'serif',
              fontSize:        32,
              letterSpacing:   '-0.01em',
            }}
          >
            {site.name}
          </div>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow && (
            <div
              style={{
                color:          COLORS.gold,
                fontSize:       18,
                letterSpacing:  '0.18em',
                textTransform:  'uppercase',
                marginBottom:   20,
                fontFamily:     'sans-serif',
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              color:          COLORS.dark,
              fontFamily:     'serif',
              fontSize:       title.length > 60 ? 60 : 76,
              lineHeight:     1.05,
              letterSpacing:  '-0.02em',
              maxWidth:       980,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                color:        COLORS.muted,
                fontSize:     26,
                marginTop:    24,
                fontFamily:   'sans-serif',
                maxWidth:     920,
                lineHeight:   1.4,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            color:          COLORS.muted,
            fontSize:       20,
            fontFamily:     'sans-serif',
          }}
        >
          <div>{site.domain}</div>
          <div style={{ color: COLORS.gold }}>★ {site.googleRating} · {site.googleReviewCount} Google reviews</div>
        </div>
      </div>
    ),
    OG_SIZE
  )
}
