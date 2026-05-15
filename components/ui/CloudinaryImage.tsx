'use client'

import Image from 'next/image'
import { buildCloudinaryUrl } from '@/lib/cloudinaryUrl'

type Props = {
  publicId:  string    // e.g. 'yash-makeovers/hero/hero-bridal'
  alt:       string    // required — descriptive and keyword-rich
  width:     number
  height:    number
  priority?: boolean   // true for above-fold images only (LCP)
  className?: string
  crop?:     'fill' | 'fit' | 'limit' | 'thumb'
  sizes?:    string    // responsive sizes hint for srcSet
}

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
  const src = buildCloudinaryUrl(publicId, { width, height, crop })
  // Tiny blurred version pre-fetched from Cloudinary — 20 × 20 px, fill crop,
  // auto quality — used as the LQIP (Low Quality Image Placeholder).
  const blurUrl = buildCloudinaryUrl(publicId, {
    width:   20,
    height:  20,
    crop:    'fill',
    quality: 'auto',
    format:  'webp',
  })

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      placeholder="blur"
      blurDataURL={blurUrl}
      className={className}
      sizes={sizes}
    />
  )
}
