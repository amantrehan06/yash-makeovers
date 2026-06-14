import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

// iOS home-screen icon — must be raster, so generate a 180×180 PNG from the
// vendored Cormorant serif. No rounded corners (iOS masks its own).
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
