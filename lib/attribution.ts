// First-touch visitor attribution — captured once per session so we know
// where an inquiry came from even if the bride browses before submitting.

export interface Attribution {
  referrer:    string
  source:      string   // referrer hostname, '' if direct
  landingPath: string   // first page hit this session
  utmSource?:   string
  utmMedium?:   string
  utmCampaign?: string
  gclid?:       string   // present → Google Ads click
}

const KEY = 'ym_attribution'

// Client-only. Stores first-touch on the first page load; returns it after.
export function getOrInitAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null
  try {
    const existing = sessionStorage.getItem(KEY)
    if (existing) return JSON.parse(existing) as Attribution

    const params = new URLSearchParams(window.location.search)
    const referrer = document.referrer || ''
    const attr: Attribution = {
      referrer,
      source:      referrer ? new URL(referrer).hostname : '',
      landingPath: window.location.pathname,
      utmSource:   params.get('utm_source')   || undefined,
      utmMedium:   params.get('utm_medium')    || undefined,
      utmCampaign: params.get('utm_campaign')  || undefined,
      gclid:       params.get('gclid')         || undefined,
    }
    sessionStorage.setItem(KEY, JSON.stringify(attr))
    return attr
  } catch {
    return null
  }
}

// Pure — safe to call server-side (email builder). Returns a short, neutral
// technical label for the inquiry email's "Referral" row.
export function classifySource(a?: Attribution | null): string {
  if (!a) return 'Direct'
  if (a.gclid || a.utmMedium === 'cpc' || a.utmMedium === 'ppc') return 'Google Ads'
  if (a.utmSource) return a.utmSource
  const r = a.source.toLowerCase()
  if (!r) return 'Direct'
  if (r.includes('google'))    return 'Google'
  if (r.includes('bing'))      return 'Bing'
  if (r.includes('instagram')) return 'Instagram'
  if (r.includes('facebook') || r.startsWith('fb') || r.includes('l.facebook')) return 'Facebook'
  if (r.includes('youtube'))   return 'YouTube'
  if (r.includes('t.co') || r.includes('twitter') || r.includes('x.com')) return 'X'
  if (r.includes('pinterest')) return 'Pinterest'
  return 'Referral'
}
