import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

// Apple touch icon — used when a visitor adds the site to their iOS home
// screen or saves a bookmark. iOS ignores SVG here and requires a raster
// image, so we generate a 180×180 PNG at build with next/og, drawing the
// YM monogram in the brand's Cormorant serif (vendored, no network fetch).
// No rounded corners — iOS applies its own rounded mask.

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

const cormorant = readFileSync(
  join(process.cwd(), 'assets/fonts/CormorantGaramond-SemiBold.ttf'),
)

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#A8834A',
          color: '#FAF8F4',
          fontSize: 104,
          fontFamily: 'Cormorant',
          letterSpacing: 4,
        }}
      >
        YM
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Cormorant', data: cormorant, style: 'normal', weight: 600 }],
    },
  )
}
