// Lightweight spam detection for the inquiry form.
//
// Three invisible layers:
//   1. Honeypot — a hidden field bots auto-fill but humans never see.
//   2. Time check — bots submit forms in milliseconds; humans take seconds.
//   3. Content sanity — reject messages with too many URLs (a spam signal).
//
// All three are designed to silently drop bots WITHOUT adding any friction
// for real clients. No CAPTCHA, no checkbox, no challenge.

// If a submission takes less than this many milliseconds from form-mount
// to submit, it's almost certainly a bot. Real humans take 5+ seconds
// just to read and fill 5 fields.
export const MIN_FILL_MS = 2_000

// Real clients rarely include more than 1 URL in their message. Spam
// typically pastes 3+ promotional links.
export const MAX_URLS_IN_MESSAGE = 3

// Counts URLs in a string. Matches http://, https://, and bare domains like
// "example.com/path" (a common bot pattern that skips the protocol).
export function countUrls(text: string): number {
  if (!text) return 0
  const protocolUrls = text.match(/https?:\/\/\S+/gi) ?? []
  const bareDomains  = text.match(/\b[a-z0-9-]+\.[a-z]{2,}(\/\S*)?\b/gi) ?? []
  // De-dupe: a "http://example.com" matches both regexes, count it once.
  const all = new Set([...protocolUrls, ...bareDomains.map((d) => d.replace(/^https?:\/\//, ''))])
  return all.size
}

export interface SpamCheckInput {
  honeypot?:   string   // Hidden field — should always be empty
  formAgeMs?:  number   // ms between form mount and submit
  message?:    string
}

export interface SpamCheckResult {
  ok:     boolean
  reason?: 'honeypot' | 'too_fast' | 'too_many_urls'
}

export function checkForSpam(input: SpamCheckInput): SpamCheckResult {
  // Layer 1: honeypot. If a bot filled the hidden field, drop the request.
  if (input.honeypot && input.honeypot.trim() !== '') {
    return { ok: false, reason: 'honeypot' }
  }

  // Layer 2: time check. If the form was filled too fast, it's a bot.
  // We're lenient: missing/invalid formAgeMs still passes (in case the
  // client clock is wonky or someone has JS disabled mid-flight).
  if (typeof input.formAgeMs === 'number' && input.formAgeMs > 0 && input.formAgeMs < MIN_FILL_MS) {
    return { ok: false, reason: 'too_fast' }
  }

  // Layer 3: URL count in message.
  if (input.message && countUrls(input.message) > MAX_URLS_IN_MESSAGE) {
    return { ok: false, reason: 'too_many_urls' }
  }

  return { ok: true }
}
