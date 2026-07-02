// Post writer — calls Claude with the full Yash Makeovers brand brief and the
// research output, asks for a complete publish-ready post as a JSON object.

import { readFileSync } from 'node:fs'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const MODEL = 'claude-sonnet-4-6'

// Parse prices and names out of config/packages.ts so this script stays in
// lockstep with the website. Regex over the TS source is enough — we're not
// running the file, just extracting a few literal strings.
function readPackagePriceList() {
  try {
    const raw = readFileSync('config/packages.ts', 'utf-8')
    const nameMatches  = [...raw.matchAll(/name:\s*'([^']+)'/g)]
    const priceMatches = [...raw.matchAll(/price:\s*(\d+),/g)]
    if (nameMatches.length === 0) return 'Bridal $600, Pre-Bridal $450, Full Glam $350, Regular Party $250'
    return nameMatches
      .map((m, i) => `${m[1]} $${priceMatches[i]?.[1] ?? 'TBD'}`)
      .join(', ')
  } catch {
    return 'Bridal $600, Pre-Bridal $450, Full Glam $350, Regular Party $250'
  }
}

// Pull stats from config/site.ts so the prompt always reflects current values.
function readSiteStats() {
  try {
    const raw = readFileSync('config/site.ts', 'utf-8')
    const grab = (key) => raw.match(new RegExp(`${key}:\\s*'([^']+)'`))?.[1]
    return {
      artistName:        grab('artistName')          ?? 'Yashpreet',
      experience:        grab('experience')          ?? '10+',
      brideCount:        grab('brideCount')          ?? '2,000+',
      googleRating:      grab('googleRating')        ?? '4.9',
      googleReviewCount: grab('googleReviewCount')   ?? '162',
      address:           grab('address')             ?? '',
      domain:            grab('domain')              ?? 'yashmakeovers.com',
    }
  } catch {
    return {
      artistName:        'Yashpreet',
      experience:        '10+',
      brideCount:        '2,000+',
      googleRating:      '4.9',
      googleReviewCount: '162',
      address:           '',
      domain:            'yashmakeovers.com',
    }
  }
}

// Pull real GTA venue names from config/cities.ts so posts can cite places
// the artist actually works at (a business-specific-fact requirement — see
// WRITING RULES). Same regex-over-source approach as the price list.
function readVenueList() {
  try {
    const raw = readFileSync('config/cities.ts', 'utf-8')
    const venues = []
    for (const block of raw.matchAll(/venues:\s*\[([\s\S]*?)\]/g)) {
      for (const v of block[1].matchAll(/'((?:[^'\\]|\\.)+)'/g)) venues.push(v[1].replace(/\\'/g, "'"))
    }
    return [...new Set(venues)]
  } catch {
    return []
  }
}

const PRICE_LIST = readPackagePriceList()
const STATS      = readSiteStats()
const VENUES     = readVenueList()

const SYSTEM_PROMPT = `You are an expert SEO content strategist and blog writer for Yash Makeovers, a luxury bridal makeup artist in Brampton, Ontario, Canada.

BUSINESS CONTEXT:
- Artist: ${STATS.artistName} | ${STATS.experience} years experience | ${STATS.brideCount} brides | ${STATS.googleRating} stars on Google (${STATS.googleReviewCount} reviews)
- Services and prices (per person per event): ${PRICE_LIST}
- Cities served: Brampton, Mississauga, Toronto, Etobicoke, Oakville, Vaughan, Scarborough, Markham, North York, Richmond Hill
- Products used: DIOR, Charlotte Tilbury, Chanel, YSL Beauty, Gucci, Too Faced
- Website: ${STATS.domain}
- Studio: ${STATS.address}

WRITING RULES:
- Canadian English spellings (colour, favour, centre, licence, grey, organisation)
- 600–800 words — no more, no less
- Short paragraphs — 2–3 sentences max
- Use ## for every H2, ### for sub-points; one H2 every 150–200 words
- FAQ section at the end with at least 3 questions phrased as Google searches
- Final paragraph is a CTA linking to /contact
- Mention Yashpreet by name 1–2 times only (no more)
- Never name competitors
- Warm, reassuring tone — brides are nervous, make them feel safe
- Primary keyword appears in: title, first H2, first paragraph, meta description
- Include internal links (Markdown style) to: /services, /portfolio, /contact, and one city page
- Write in Yashpreet's first person ("In 10 years of Brampton weddings, I…") — she is the author, not an anonymous blog
- Every post must include AT LEAST 3 business-specific facts: exact package prices from the price list above, named GTA venues (see VENUES below), seasonal booking patterns (e.g. May–October peak, summer weekends filling months ahead), or product names from the brand list
- Every post must include AT LEAST 1 concrete stated opinion or recommendation ("I recommend X over Y because…") — hedge-free
- VENUES you may cite (real venues from the artist's city pages — never invent one): ${VENUES.join(', ')}
- BANNED PHRASES (a validator rejects the post if any appear): "In today's fast-paced world", "When it comes to", "Look no further", "Let's dive in", "delve", "elevate your look", "unmatched", "seamless", "transformative journey", "Not only…but also" constructions, conclusions that restate the intro, and any advice generic enough to fit any city or any artist
- NO EM DASHES (—) OR EN DASHES (–) anywhere — title, excerpt, or body (validator rejects). Use a comma, period, or colon instead; write ranges as "6 to 12 months", never "6–12"

SEO RULES:
- Target keyword density: 1–2% naturally (do not stuff)
- Include related semantic keywords throughout
- FAQ answers: 2–3 sentences each — written for featured snippets
- Title format: "[Keyword-rich Title] | Yash Makeovers" is the meta title, but the blog title itself omits the brand suffix
- Meta description (excerpt field): 150–160 characters, contains primary keyword and a soft CTA

OUTPUT FORMAT — return ONLY a valid JSON object, no markdown fence, no explanation, no preamble. The object must match this exact shape:
{
  "title":         "Post title (no brand suffix)",
  "slug":          "url-friendly-slug-with-hyphens",
  "excerpt":       "Meta description, 150-160 chars, contains keyword + soft CTA",
  "category":      "Bridal Tips" | "South Asian Weddings" | "Makeup Trends" | "GTA Weddings",
  "readTime":      "X min read",
  "targetKeyword": "primary keyword",
  "body":          "Full MDX body — ## headings, paragraphs, FAQ section, closing CTA. Does NOT repeat the title."
}

The body must NOT include the frontmatter block or the title H1 — those are added by the publisher.`

// `rewriteOf` (optional): { post, violations } from a failed validator pass —
// triggers ONE corrective rewrite of the same topic instead of a fresh pick.
export async function writePost({ trends, publishedTopics, rewriteOf }) {
  const rewriteBlock = rewriteOf
    ? `

YOUR PREVIOUS ATTEMPT WAS REJECTED by the pre-publish validator. Rewrite the
SAME topic ("${rewriteOf.post.title}", keyword: "${rewriteOf.post.targetKeyword}"),
fixing every violation below. Do not switch topics.
VIOLATIONS:
${rewriteOf.violations.map((v) => `  - ${v}`).join('\n')}`
    : ''

  const userPrompt = `Write a blog post for Yash Makeovers.

CURRENT TRENDS RESEARCH:
${JSON.stringify(trends, null, 2)}

ALREADY PUBLISHED TOPICS — do NOT repeat or closely mirror any of these:
${publishedTopics.length ? publishedTopics.map((t) => `  - ${t}`).join('\n') : '  (none yet)'}

Choose the best topic based on:
1. Current trends from the research above
2. Topics NOT already covered
3. Seasonal relevance — current month is ${new Date().toLocaleString('en-CA', { month: 'long', year: 'numeric' })}
4. High commercial intent for GTA brides

Pick ONE category from the allowed list and write a complete, publication-ready post.
Return ONLY the JSON object — no markdown fence, no explanation.${rewriteBlock}`

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const text = response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('')

  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Claude did not return any JSON object. Raw response:\n' + text.slice(0, 500))
  }

  let post
  try {
    post = JSON.parse(jsonMatch[0])
  } catch (err) {
    throw new Error('Failed to parse Claude JSON: ' + (err?.message ?? err))
  }

  // Validate the critical fields up front — fail fast rather than write a
  // malformed MDX file the build will choke on.
  const required = ['title', 'slug', 'excerpt', 'category', 'readTime', 'targetKeyword', 'body']
  for (const field of required) {
    if (typeof post[field] !== 'string' || post[field].trim() === '') {
      throw new Error(`Generated post missing required field: ${field}`)
    }
  }
  const allowedCategories = ['Bridal Tips', 'South Asian Weddings', 'Makeup Trends', 'GTA Weddings']
  if (!allowedCategories.includes(post.category)) {
    throw new Error(`Invalid category "${post.category}". Must be one of: ${allowedCategories.join(', ')}`)
  }
  // Normalise slug — lowercase, hyphens, alphanumeric only.
  post.slug = post.slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return post
}
