import { site } from '@/config/site'
import { cities } from '@/config/cities'
import { packages } from '@/config/packages'

// /llms.txt — guidance for LLM/AI crawlers. Built from config so it never
// drifts. Markdown with an H1 per the llms.txt recommendation.
export const dynamic = 'force-static'

export function GET() {
  const base = `https://${site.canonicalHost}`
  const cityLinks = cities.map((c) => `- [${c.name}](${base}/${c.slug})`).join('\n')
  const packageList = packages.map((p) => `- ${p.name} — ${p.tagline}`).join('\n')

  const body = `# ${site.name} — Bridal Makeup Artist in ${site.serviceAreaFull}

> ${site.tagline}. ${site.experience} years of experience and ${site.brideCount} brides across ${site.serviceAreaFull}, based in ${site.baseCity}. Specialising in South Asian and multicultural bridal makeup and hair.

## Key pages
- [Home](${base}/)
- [Services & pricing](${base}/services)
- [Portfolio](${base}/portfolio)
- [Blog](${base}/blog)
- [About ${site.artistName}](${base}/about)
- [Contact](${base}/contact)

## Packages
${packageList}

## Service areas
${cityLinks}

## Contact
- WhatsApp: ${site.phone}
- Email: ${site.email}
- Studio: ${site.address}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
