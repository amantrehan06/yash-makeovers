// Pre-publish validator — sits between post-writer and post-publisher.
// Rejects filler before it ships: banned phrases, missing business-specific
// facts, wrong length, missing internal links, keyword absent from the
// title/first paragraph. Pure + synchronous so it's trivially unit-testable
// (see post-validator.test.mjs).

import { readFileSync } from 'node:fs'

export const WORD_COUNT_MIN = 600
export const WORD_COUNT_MAX = 900
export const MIN_BUSINESS_FACTS = 3
export const MIN_INTERNAL_LINKS = 2

// Phrases that mark a post as generic AI filler. Case-insensitive substring
// match (kept in lockstep with the BANNED list in post-writer's SYSTEM_PROMPT).
export const BANNED_PHRASES = [
  'in today’s fast-paced world',
  "in today's fast-paced world",
  'when it comes to',
  'look no further',
  "let's dive in",
  'let’s dive in',
  'delve',
  'elevate your look',
  'unmatched',
  'seamless',
  'transformative journey',
]

// ── Business-token sources (regex over config source, matching the approach
// in post-writer.mjs — .mjs scripts can't import .ts configs directly). ──

export function readBrands() {
  try {
    const raw = readFileSync('config/site.ts', 'utf-8')
    const m = raw.match(/brands:\s*\[([^\]]*)\]/)
    return m ? [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]) : []
  } catch { return [] }
}

export function readVenues() {
  try {
    const raw = readFileSync('config/cities.ts', 'utf-8')
    const venues = []
    for (const block of raw.matchAll(/venues:\s*\[([\s\S]*?)\]/g)) {
      for (const v of block[1].matchAll(/'((?:[^'\\]|\\.)+)'/g)) venues.push(v[1].replace(/\\'/g, "'"))
    }
    return [...new Set(venues)]
  } catch { return [] }
}

/**
 * Validate a generated post object ({ title, excerpt, targetKeyword, body }).
 * `context` lets tests inject brands/venues; production reads them from config.
 * Returns { ok, violations: string[] } — violations are human-readable and are
 * fed back to the writer verbatim on the single rewrite attempt.
 */
export function validatePost(post, context = {}) {
  const brands = context.brands ?? readBrands()
  const venues = context.venues ?? readVenues()
  const violations = []

  const body  = post.body ?? ''
  const lower = body.toLowerCase()

  // 1. Banned phrases.
  for (const phrase of BANNED_PHRASES) {
    if (lower.includes(phrase.toLowerCase())) {
      violations.push(`Banned phrase present: "${phrase}"`)
    }
  }

  // 2. Business-specific tokens — exact prices, known venues, known brands.
  const priceMentions = new Set(body.match(/\$\d[\d,]*/g) ?? [])
  const venueMentions = venues.filter((v) => body.includes(v))
  const brandMentions = brands.filter((b) => body.includes(b))
  const factCount = priceMentions.size + venueMentions.length + brandMentions.length
  if (factCount < MIN_BUSINESS_FACTS) {
    violations.push(
      `Only ${factCount} business-specific token(s) (need ≥${MIN_BUSINESS_FACTS}): ` +
      `prices [${[...priceMentions].join(', ') || 'none'}], venues [${venueMentions.join(', ') || 'none'}], ` +
      `brands [${brandMentions.join(', ') || 'none'}]. Add exact package prices, real GTA venues, or product brands.`
    )
  }

  // 3. Word count (body text, markdown syntax stripped).
  const words = body
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')  // keep link text, drop URL
    .replace(/[#*_>`]/g, ' ')
    .split(/\s+/).filter(Boolean).length
  if (words < WORD_COUNT_MIN || words > WORD_COUNT_MAX) {
    violations.push(`Word count ${words} outside ${WORD_COUNT_MIN}–${WORD_COUNT_MAX}`)
  }

  // 4. Internal links — markdown links to site-relative paths.
  const internalLinks = [...body.matchAll(/\]\((\/[a-z0-9/-]*)\)/g)].map((m) => m[1])
  if (internalLinks.length < MIN_INTERNAL_LINKS) {
    violations.push(
      `Only ${internalLinks.length} internal link(s) (need ≥${MIN_INTERNAL_LINKS}) — link /services, /portfolio, /contact, or a city page`
    )
  }

  // 5. Target keyword in title AND first paragraph.
  const keyword = (post.targetKeyword ?? '').toLowerCase()
  if (keyword) {
    if (!(post.title ?? '').toLowerCase().includes(keyword)) {
      violations.push(`Target keyword "${post.targetKeyword}" missing from title`)
    }
    const firstPara = body.split(/\n\s*\n/).find((p) => p.trim() && !p.trim().startsWith('#')) ?? ''
    if (!firstPara.toLowerCase().includes(keyword)) {
      violations.push(`Target keyword "${post.targetKeyword}" missing from first paragraph`)
    }
  } else {
    violations.push('targetKeyword field is empty')
  }

  return { ok: violations.length === 0, violations }
}
