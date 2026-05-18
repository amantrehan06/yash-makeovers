import 'server-only'
import { v2 as cloudinary } from 'cloudinary'
import { unstable_cache } from 'next/cache'

export {
  CLOUDINARY_FOLDERS,
  buildCloudinaryUrl,
  type CloudinaryFolder,
  type CloudinaryResource,
} from './cloudinaryUrl'

import { CLOUDINARY_FOLDERS, type CloudinaryFolder, type CloudinaryResource } from './cloudinaryUrl'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ─────────────────────────────────────────────────────────────────────────────
// Folder specs — single source of truth for what each Cloudinary folder is
// allowed to hold. Wrong-shape uploads are skipped at fetch time with a
// console.warn that tells Yashpreet exactly what to fix.
// ─────────────────────────────────────────────────────────────────────────────

type FolderSpec = {
  maxCount:    number
  aspectRatio: { w: number; h: number }
  tolerance:   number
  label:       string
}

const FOLDER_SPECS: Record<string, FolderSpec> = {
  'yash-makeovers/hero':                 { maxCount: 1,   aspectRatio: { w: 16, h: 9 }, tolerance: 0.2,  label: 'Hero photo' },
  'yash-makeovers/about':                { maxCount: 1,   aspectRatio: { w: 3,  h: 4 }, tolerance: 0.2,  label: 'About portrait' },
  'yash-makeovers/featured':             { maxCount: 9,   aspectRatio: { w: 1,  h: 1 }, tolerance: 0.25, label: 'Featured grid' },
  'yash-makeovers/portfolio':            { maxCount: 50,  aspectRatio: { w: 3,  h: 4 }, tolerance: 0.25, label: 'Portfolio' },
  'yash-makeovers/before-after/before':  { maxCount: 10,  aspectRatio: { w: 1,  h: 1 }, tolerance: 0.2,  label: 'Before photos' },
  'yash-makeovers/before-after/after':   { maxCount: 10,  aspectRatio: { w: 1,  h: 1 }, tolerance: 0.2,  label: 'After photos' },
  'yash-makeovers/blog':                 { maxCount: 999, aspectRatio: { w: 16, h: 9 }, tolerance: 0.25, label: 'Blog covers' },
}

function validateImages(resources: CloudinaryResource[], folder: string): CloudinaryResource[] {
  const spec = FOLDER_SPECS[folder]
  if (!spec) return resources

  // Note: we no longer reject photos based on aspect ratio. Cloudinary's
  // g_auto (smart-gravity) cropping handles any source ratio gracefully —
  // it auto-detects the subject (face) and crops around it. We still warn
  // on extreme mismatches so Yashpreet can spot a bad upload, but the
  // photo still displays.
  const valid: CloudinaryResource[] = []
  for (const img of resources) {
    if (!img.width || !img.height) {
      console.warn(`⚠️ [Cloudinary] ${spec.label}: ${img.public_id} — missing dimensions, skipped`)
      continue
    }
    const actual    = img.width / img.height
    const expected  = spec.aspectRatio.w / spec.aspectRatio.h
    const deviation = Math.abs(actual - expected) / expected
    if (deviation > spec.tolerance) {
      console.warn(
        `ℹ️ [Cloudinary] ${spec.label}: ${img.public_id} — source ratio differs from ideal ` +
        `(got ${actual.toFixed(2)}, ideal ~${expected.toFixed(2)}). ` +
        `Auto-cropped on display. For best results, upload ${spec.aspectRatio.w}:${spec.aspectRatio.h}.`
      )
    }
    valid.push(img)
  }

  if (valid.length > spec.maxCount) {
    console.warn(
      `⚠️ [Cloudinary] ${spec.label}: ${valid.length} images exceed max ${spec.maxCount}. ` +
      `Only first ${spec.maxCount} shown.`
    )
    return valid.slice(0, spec.maxCount)
  }
  return valid
}

// ─────────────────────────────────────────────────────────────────────────────
// Read-only fetchers
// ─────────────────────────────────────────────────────────────────────────────

// Caches the Cloudinary Search API call for 8 hours. Cloudinary's free tier
// allows 500 admin API calls/hour — without caching, every page render burns
// through them quickly during dev. With caching, one call per 8 hours per folder.
// Cache invalidates automatically on every new deploy (cache keyed to build ID).
// For an instant refresh after uploads, just redeploy on Vercel — no
// public endpoint is exposed so there's no abuse risk.
const CACHE_SECONDS = 60 * 60 * 8
async function _fetchFromCloudinary(folder: string): Promise<CloudinaryResource[]> {
  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by('public_id', 'asc')
      .with_field('tags')
      .max_results(100)
      .execute()
    return result.resources as CloudinaryResource[]
  } catch (err) {
    // Surface the actual error so we know when we're hitting rate limits etc.
    const message = (err as { error?: { message?: string }; message?: string })?.error?.message
                 ?? (err as { message?: string })?.message
                 ?? 'unknown error'
    console.error(`❌ [Cloudinary] ${folder}: ${message}`)
    return []
  }
}

export async function getImagesFromFolder(folder: CloudinaryFolder): Promise<CloudinaryResource[]> {
  const cached = unstable_cache(
    () => _fetchFromCloudinary(folder),
    [`cloudinary-${folder}`],
    { revalidate: CACHE_SECONDS }
  )
  // Filename-based ordering: rename files in Cloudinary to control order.
  // Tip: prefix names with 01-, 02-, 03- to force a specific sequence.
  return validateImages(await cached(), folder)
}

export async function getBeforeAfterPairs(): Promise<
  Array<{ id: string; before: CloudinaryResource; after: CloudinaryResource }>
> {
  const [befores, afters] = await Promise.all([
    getImagesFromFolder(CLOUDINARY_FOLDERS.beforeAfterBefore),
    getImagesFromFolder(CLOUDINARY_FOLDERS.beforeAfterAfter),
  ])

  const beforeMap = new Map(befores.map((img) => [img.public_id.split('/').pop(), img]))
  const afterMap  = new Map(afters.map((img)  => [img.public_id.split('/').pop(), img]))
  const pairs: Array<{ id: string; before: CloudinaryResource; after: CloudinaryResource }> = []

  beforeMap.forEach((beforeImg, filename) => {
    const afterImg = afterMap.get(filename!)
    if (afterImg) {
      pairs.push({ id: filename!, before: beforeImg, after: afterImg })
    } else {
      console.warn(
        `⚠️ [Cloudinary] Before/After: ${beforeImg.public_id} has no matching after photo. ` +
        `Upload one named "${filename}" to before-after/after/.`
      )
    }
  })
  return pairs
}
