#!/usr/bin/env node
// Unit-style fixtures for the pre-publish validator (D2 acceptance).
// Run: node scripts/post-validator.test.mjs   (exit 0 = all pass)

import assert from 'node:assert/strict'
import { validatePost } from './post-validator.mjs'

// Injected context so the fixtures don't depend on the config files.
const context = {
  brands: ['DIOR', 'Charlotte Tilbury'],
  venues: ['Embassy Grand Convention Centre', 'Pearson Convention Centre'],
}

// ── Fixture 1: a post that should PASS ─────────────────────────────────
const para = (n) => Array.from({ length: n }, (_, i) =>
  `Sentence ${i} about bridal timing, skin prep, and what actually happens in the chair on a Brampton wedding morning.`
).join(' ')

const passingPost = {
  title: 'Bridal Makeup Cost in Brampton: What Your Quote Actually Covers',
  targetKeyword: 'bridal makeup cost in Brampton',
  excerpt: 'What bridal makeup cost in Brampton includes: real package prices and where the money goes. Get a quote for your date.',
  body: `The first question I hear is about bridal makeup cost in Brampton, so let me answer it with real numbers instead of a range: my Bridal package is $600 per person per event, and Pre-Bridal events are $450.

## What the price includes

${para(8)} I recommend booking the trial rather than skipping it. Seeing the look under your own bathroom lighting beats any Instagram reference.

## Venues change the makeup

A reception at Embassy Grand Convention Centre runs hotter and brighter than a hall half its size, and at Pearson Convention Centre the stage lighting is cooler. ${para(8)}

## Products that survive a 16-hour day

I work with DIOR and Charlotte Tilbury because they hold through crying and dancing. ${para(8)}

## FAQ

**How much is bridal makeup in Brampton?** My Bridal package is $600 per person per event; guests can book from $250. ${para(3)}

**When should I book?** Summer weekends fill months ahead; May through October is peak. ${para(3)}

**Do you travel?** Yes, across the GTA. ${para(3)}

See the full breakdown on [services](/services), browse recent looks in the [portfolio](/portfolio), or [book your date](/contact).`,
}

// ── Fixture 2: a post that should FAIL ─────────────────────────────────
const failingPost = {
  title: 'Elevate Your Look This Season',
  targetKeyword: 'bridal makeup tips',
  excerpt: 'Tips to elevate your look.',
  body: `In today's fast-paced world, every bride wants to elevate your look. When it comes to makeup, look no further — let's dive in.

## Why makeup matters

Makeup is important for weddings. It should be seamless and unmatched. A transformative journey awaits every bride who wants to delve into beauty.`,
}

// ── Assertions ──────────────────────────────────────────────────────────
const pass = validatePost(passingPost, context)
assert.equal(pass.ok, true, `Expected passing fixture to pass, got: ${pass.violations.join(' | ')}`)

const fail = validatePost(failingPost, context)
assert.equal(fail.ok, false, 'Expected failing fixture to fail')
const text = fail.violations.join('\n')
assert.match(text, /Banned phrase/,              'should flag banned phrases')
assert.match(text, /business-specific/,          'should flag missing business facts')
assert.match(text, /Word count/,                 'should flag word count')
assert.match(text, /internal link/,              'should flag missing internal links')
assert.match(text, /missing from title/,         'should flag keyword missing from title')

// ── Fixture 3: identical to the passing post except for ONE em dash ─────
// Isolates the no-dash style rule: this must be the only reason it fails.
const emDashPost = {
  ...passingPost,
  body: passingPost.body.replace(
    'so let me answer it with real numbers instead of a range:',
    'so let me answer it with real numbers — not a range:'
  ),
}
assert.notEqual(emDashPost.body, passingPost.body, 'em-dash fixture must differ from passing fixture')
const dash = validatePost(emDashPost, context)
assert.equal(dash.ok, false, 'Expected em-dash fixture to fail')
assert.equal(dash.violations.length, 1, `em dash should be the ONLY violation, got: ${dash.violations.join(' | ')}`)
assert.match(dash.violations[0], /—/, 'violation should name the em dash')

console.log('✓ post-validator: passing fixture accepted')
console.log(`✓ post-validator: failing fixture rejected with ${fail.violations.length} violations`)
console.log('✓ post-validator: em-dash fixture rejected with exactly 1 violation')
