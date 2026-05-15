// Trend researcher — calls Claude with the web_search tool to discover what
// GTA brides are searching for *right now*. Falls back to seasonal defaults if
// the tool call fails or the model doesn't return valid JSON.

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const MODEL = 'claude-sonnet-4-6'

export async function researchTrends() {
  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1500,
      tools: [
        {
          type: 'web_search_20250305',
          name: 'web_search',
          max_uses: 5,
        },
      ],
      messages: [
        {
          role: 'user',
          content: `Research current bridal makeup trends for the GTA (Greater Toronto Area), Canada market. Search the web for:
1. Current South Asian bridal makeup trends 2025–2026
2. What brides in Brampton and Mississauga are searching for
3. Trending makeup looks on Instagram and Pinterest for South Asian weddings
4. Any upcoming wedding seasons or cultural events (e.g. peak Punjabi wedding season)
5. New makeup products or techniques brides are asking about

Return a JSON object with this exact shape:
{
  "trendingTopics":     ["topic1", "topic2", "topic3"],
  "seasonalContext":    "what's happening this season",
  "highValueKeywords":  ["keyword1", "keyword2"],
  "contentAngles":      ["angle1", "angle2", "angle3"],
  "researchSummary":    "2–3 sentence summary of what you found"
}

Focus on keywords with commercial intent that brides in the GTA would actually search. Return ONLY the JSON object — no markdown, no preamble.`,
        },
      ],
    })

    // Server-side tools (web_search) execute inside the API; final response
    // arrives as one or more text blocks. Concatenate all text blocks.
    const text = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('')

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return getDefaultTrends()

    const parsed = JSON.parse(jsonMatch[0])
    // Light shape validation — fall back if anything critical is missing.
    if (!Array.isArray(parsed.trendingTopics) || !Array.isArray(parsed.highValueKeywords)) {
      return getDefaultTrends()
    }
    return parsed
  } catch (err) {
    console.warn('⚠️  Trend research failed, using defaults:', err?.message ?? err)
    return getDefaultTrends()
  }
}

function getDefaultTrends() {
  // Seasonal defaults that work even with no web data.
  const month = new Date().getMonth() // 0–11
  const isWeddingSeason = month >= 3 && month <= 8
  const season = isWeddingSeason ? 'wedding' : 'holiday'

  return {
    trendingTopics: [
      `${season} season bridal makeup trends GTA`,
      'South Asian bridal looks 2026',
      'wedding makeup HD techniques',
    ],
    seasonalContext: isWeddingSeason
      ? 'Peak GTA wedding season — heavy booking demand for May–October dates.'
      : 'Off-season — engagement parties, intimate ceremonies, and 2026 trial bookings.',
    highValueKeywords: [
      'bridal makeup Brampton',
      'South Asian wedding makeup GTA',
      'bridal makeup artist Mississauga',
    ],
    contentAngles: [
      'trending bridal looks for the season',
      'product and technique recommendations',
      'how to book the right artist',
    ],
    researchSummary: `Default ${season}-season trends for the GTA bridal market (web search unavailable).`,
  }
}
