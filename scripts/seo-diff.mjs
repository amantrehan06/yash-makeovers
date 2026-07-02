#!/usr/bin/env node
// Compares two seo-snapshot outputs and prints per-route field diffs.
// Usage: node scripts/seo-diff.mjs seo/baseline/pages.json seo/current.json

import { readFileSync } from 'node:fs'

const [aPath = 'seo/baseline/pages.json', bPath = 'seo/current.json'] = process.argv.slice(2)
const a = JSON.parse(readFileSync(aPath, 'utf-8')).routes
const b = JSON.parse(readFileSync(bPath, 'utf-8')).routes

const FIELDS = ['status', 'title', 'canonical', 'description', 'h1']
let changes = 0

for (const route of new Set([...Object.keys(a), ...Object.keys(b)])) {
  const pa = a[route], pb = b[route]
  if (!pa) { console.log(`+ NEW ROUTE ${route}: "${pb.title}" h1="${pb.h1}"`); changes++; continue }
  if (!pb) { console.log(`- REMOVED ROUTE ${route}`); changes++; continue }

  for (const f of FIELDS) {
    if (pa[f] !== pb[f]) {
      console.log(`~ ${route} ${f}:\n    baseline: ${JSON.stringify(pa[f])}\n    current:  ${JSON.stringify(pb[f])}`)
      changes++
    }
  }
  const ja = JSON.stringify(pa.jsonLd), jb = JSON.stringify(pb.jsonLd)
  if (ja !== jb) {
    const ta = (pa.jsonLdTypes ?? []).join(','), tb = (pb.jsonLdTypes ?? []).join(',')
    console.log(`~ ${route} jsonLd ${ta === tb ? `content changed (types unchanged: ${ta})` : `types: [${ta}] → [${tb}]`}`)
    changes++
  }
}

console.log(changes === 0 ? '\n✓ No SEO-visible changes vs baseline.' : `\n${changes} change(s) vs baseline.`)
