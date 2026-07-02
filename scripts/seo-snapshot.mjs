#!/usr/bin/env node
// SEO snapshot — scrapes a running local server and records, per route:
// <title>, canonical URL, first H1, meta description, and every JSON-LD block.
//
// Baseline:  npm run build && npx next start -p 4321
//            node scripts/seo-snapshot.mjs seo/baseline/pages.json
// Diff:      node scripts/seo-snapshot.mjs seo/current.json
//            then compare against seo/baseline/pages.json — any unintended
//            change to a protected field (h1, canonical, existing titles)
//            means revert the task that caused it.
//
// Routes are derived from the same sources the site uses: config/cities.ts
// slugs, content/blog filenames, and the static page list.

import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const BASE = process.env.SNAPSHOT_BASE_URL ?? 'http://localhost:4321'
const OUT  = process.argv[2] ?? 'seo/baseline/pages.json'

function cityRoutes() {
  const src   = readFileSync('config/cities.ts', 'utf-8')
  const slugs = [...src.matchAll(/^\s{4}slug:\s*'([^']+)'/gm)].map((m) => m[1])
  // /work archive exists only for cities with contentBlocks — snapshot the
  // city page itself for all; /work pages are covered via the city diff.
  return slugs.map((s) => `/${s}`)
}

function blogRoutes() {
  return readdirSync('content/blog')
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => `/blog/${f.replace(/\.mdx?$/, '')}`)
}

const STATIC_ROUTES = [
  '/', '/services', '/portfolio', '/about', '/contact', '/blog',
  '/terms-and-conditions',
]

const decodeEntities = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")

function extract(html) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? null

  const canonical =
    html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1] ??
    html.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/)?.[1] ?? null

  const description =
    html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/)?.[1] ??
    html.match(/<meta[^>]+content="([^"]*)"[^>]+name="description"/)?.[1] ?? null

  const h1raw = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? null
  const h1 = h1raw ? decodeEntities(h1raw.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()) : null

  const jsonLd = []
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  for (const m of html.matchAll(re)) {
    try { jsonLd.push(JSON.parse(m[1])) } catch { jsonLd.push({ parseError: m[1].slice(0, 200) }) }
  }
  // Stable order so diffs don't flag reordering: sort by @type then @id.
  const typeOf = (b) => Array.isArray(b) ? 'Array:' + b.map((x) => x['@type']).join(',') : String(b['@type'] ?? '?')
  jsonLd.sort((a, b) => (typeOf(a) + (a['@id'] ?? '')).localeCompare(typeOf(b) + (b['@id'] ?? '')))

  return {
    title: title ? decodeEntities(title.trim()) : null,
    canonical,
    description: description ? decodeEntities(description) : null,
    h1,
    jsonLdTypes: jsonLd.map(typeOf),
    jsonLd,
  }
}

async function snapshotRoute(route) {
  const res = await fetch(`${BASE}${route}`, { redirect: 'manual' })
  if (res.status !== 200) return { route, status: res.status }
  return { route, status: 200, ...extract(await res.text()) }
}

const routes = [...STATIC_ROUTES, ...cityRoutes(), ...blogRoutes()]
const pages = {}
for (const route of routes) {
  pages[route] = await snapshotRoute(route)
  process.stdout.write(`  ${pages[route].status === 200 ? '✓' : '✗ ' + pages[route].status} ${route}\n`)
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify({ base: BASE, routes: pages }, null, 2) + '\n')
console.log(`\nSnapshot of ${routes.length} routes → ${OUT}`)
