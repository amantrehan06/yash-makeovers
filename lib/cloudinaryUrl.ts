// Client-safe module — no Node.js SDK. Safe to import from 'use client' components.
// Server code should import from lib/cloudinary (which re-exports everything here).

export const CLOUDINARY_FOLDERS = {
  hero:               'yash-makeovers/hero',
  about:              'yash-makeovers/about',
  featured:           'yash-makeovers/featured',
  portfolio:          'yash-makeovers/portfolio',
  beforeAfterBefore:  'yash-makeovers/before-after/before',
  beforeAfterAfter:   'yash-makeovers/before-after/after',
  blog:               'yash-makeovers/blog',
  reviews:            'yash-makeovers/reviews',
} as const

export type CloudinaryFolder = typeof CLOUDINARY_FOLDERS[keyof typeof CLOUDINARY_FOLDERS]

export type CloudinaryResource = {
  public_id:  string
  secure_url: string
  width:      number
  height:     number
  created_at: string
  tags:       string[]
}

type BuildUrlOptions = {
  width?:   number
  height?:  number
  crop?:    'fill' | 'fit' | 'limit' | 'thumb'
  quality?: 'auto' | 'auto:good' | 'auto:best'
  format?:  'webp' | 'avif' | 'auto'
}

export function buildCloudinaryUrl(publicId: string, options: BuildUrlOptions = {}): string {
  const {
    width,
    height,
    crop    = 'limit',
    quality = 'auto:good',
    format  = 'webp',
  } = options

  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ??
    process.env.CLOUDINARY_CLOUD_NAME ??
    'placeholder'

  const parts: string[] = [`f_${format}`, `q_${quality}`, `c_${crop}`]
  if (width)  parts.push(`w_${width}`)
  if (height) parts.push(`h_${height}`)

  return `https://res.cloudinary.com/${cloudName}/image/upload/${parts.join(',')}/${publicId}`
}
