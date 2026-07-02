#!/usr/bin/env node
// Yash Makeovers — Autonomous Blog Engine
//
// Runs every Monday at 9am EST via GitHub Actions:
//   1. Reads previously published posts to avoid duplicates
//   2. Researches current bridal trends (Claude + web search)
//   3. Writes a 600–800 word SEO post (Claude)
//   4. Commits the MDX, pushes to main, Vercel deploys
//   5. Emails Yashpreet and the developer
//
// Local usage:
//   ANTHROPIC_API_KEY=... RESEND_API_KEY=... node scripts/blog-engine.mjs
//   DRY_RUN=true node scripts/blog-engine.mjs   # writes file, no git push or email

import { readdir, readFile, appendFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { researchTrends } from './trend-researcher.mjs'
import { writePost } from './post-writer.mjs'
import { validatePost } from './post-validator.mjs'
import { publishPost } from './post-publisher.mjs'
import { sendNotification } from './notifier.mjs'

const BLOG_DIR = 'content/blog'

async function getPublishedTopics() {
  try {
    const files = await readdir(BLOG_DIR)
    const topics = []
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue
      const content = await readFile(join(BLOG_DIR, file), 'utf-8')
      const titleMatch   = content.match(/^title:\s*"(.+)"/m)
      const keywordMatch = content.match(/^targetKeyword:\s*"(.+)"/m)
      if (titleMatch)   topics.push(titleMatch[1])
      if (keywordMatch) topics.push(keywordMatch[1])
    }
    return topics
  } catch {
    return []
  }
}

async function main() {
  const dryRun = process.env.DRY_RUN === 'true'

  console.log('🌸 Yash Makeovers Blog Engine starting...')
  console.log('📅 Date:', new Date().toDateString())
  if (dryRun) console.log('🧪 DRY RUN — no git push, no email')

  // Feature flag — set FEATURE_BLOG_ENGINE=false to skip the run.
  // Useful when you want to pause auto-publishing without disabling the
  // entire GitHub Actions workflow.
  if (process.env.FEATURE_BLOG_ENGINE === 'false') {
    console.log('🚫 Blog engine disabled by FEATURE_BLOG_ENGINE=false. Exiting.')
    return
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY is not set. Aborting.')
    process.exit(1)
  }

  // 1. Existing topics — fed to Claude so it doesn't repeat itself
  const publishedTopics = await getPublishedTopics()
  console.log(`📚 Found ${publishedTopics.length} existing posts`)

  // 2. Research current trends
  console.log('🔍 Researching current trends...')
  const trends = await researchTrends()
  console.log('   Topics:', trends.trendingTopics?.join(', ') ?? '(none)')

  // 3. Write the post
  console.log('✍️  Writing post with Claude...')
  let post = await writePost({ trends, publishedTopics })
  console.log(`   Title: ${post.title}`)
  console.log(`   Slug:  ${post.slug}`)

  // 3b. Validate — one corrective rewrite allowed, then skip (never ship filler).
  let check = validatePost(post)
  if (!check.ok) {
    console.warn(`⚠️  Validator rejected the post (${check.violations.length} violations) — one rewrite attempt...`)
    check.violations.forEach((v) => console.warn(`   - ${v}`))
    post = await writePost({ trends, publishedTopics, rewriteOf: { post, violations: check.violations } })
    check = validatePost(post)
  }
  if (!check.ok) {
    const entry = [
      `## ${new Date().toISOString()} — post skipped by validator`,
      `Title: ${post.title}`,
      `Keyword: ${post.targetKeyword}`,
      ...check.violations.map((v) => `- ${v}`),
      '',
    ].join('\n')
    await mkdir('seo', { recursive: true })
    await appendFile('seo/issues.md', entry + '\n', 'utf-8')
    console.error('❌ Validator rejected the rewrite too. Logged to seo/issues.md — NOT publishing.')
    return
  }
  console.log('✅ Validator passed')

  // 4. Publish (or skip in dry-run)
  console.log(dryRun ? '🧪 Writing MDX only (dry run)' : '🚀 Publishing post...')
  const { slug, url, filePath } = await publishPost(post, { dryRun })

  // 5. Notify (skipped in dry-run)
  if (!dryRun) {
    console.log('📧 Sending notification...')
    try {
      await sendNotification({ post, slug, url })
    } catch (err) {
      // Email failure shouldn't fail the workflow — post is already live.
      console.error('⚠️  Notification failed:', err?.message ?? err)
    }
  }

  console.log(`✅ Done! ${dryRun ? `File at: ${filePath}` : `Post live at: ${url}`}`)
}

main().catch((err) => {
  console.error('❌ Blog engine failed:', err)
  process.exit(1)
})
