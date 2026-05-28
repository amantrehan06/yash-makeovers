'use client'

import Image, { type ImageLoaderProps } from 'next/image'
import { buildCloudinaryUrl } from '@/lib/cloudinaryUrl'

type Props = {
  publicId:  string    // e.g. 'yash-makeovers/hero/hero-bridal'
  alt:       string    // required — descriptive and keyword-rich
  width:     number    // intrinsic width — used for layout/aspect ratio
  height:    number
  priority?: boolean   // true for above-fold images only (LCP)
  className?: string
  crop?:     'fill' | 'fit' | 'limit' | 'thumb'
  sizes?:    string    // responsive sizes hint for srcSet
}

// Static SVG placeholder (single ivory-tone rect, matches site bg). Replaces
// the previous 20×20 Cloudinary fetch which was hitting the transform API on
// every image render. Pre-encoded base64 → zero network cost.
//   SVG: <svg xmlns="..." width="40" height="40"><rect ... fill="#F5F0E8"/></svg>
const BLUR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0Y1RjBFOCIvPjwvc3ZnPg=='

export function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  priority = false,
  className,
  crop = 'limit',
  sizes,
}: Props) {
  // Intelligent per-device srcSet. Next/image generates srcSet entries at
  // widths from its `deviceSizes` config (640, 750, 828, 1080, 1200, 1920,
  // 2048, 3840 by default). For each entry, this loader builds a Cloudinary
  // URL at that exact width. The browser then picks the right one based on:
  //   • the `sizes` attribute (what we tell it the display size will be)
  //   • the device pixel ratio (2x retina, 3x iPhone Pro, etc.)
  //
  // Result: small file on a 1x laptop, sharp 1920w on a 3x retina phone.
  // Same source, different served resolution per device. Lighthouse stays
  // happy on every device because each gets the smallest sufficient image.
  const cloudinaryLoader = ({ src, width: w }: ImageLoaderProps) =>
    buildCloudinaryUrl(src, { width: w, crop })

  return (
    <Image
      loader={cloudinaryLoader}
      src={publicId}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR_PLACEHOLDER}
      className={className}
      sizes={sizes}
    />
  )
}
