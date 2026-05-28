# SEO & Framework TODO — yashmakeovers

Generated from the deep technical audit (Round 3) on 2026-05-27.
Pick items as needed; ordered by ROI.

---

## 🚀 Performance wins (~3 hours total)

### P1 — Portfolio images double-fetched
**Where:** `app/portfolio/page.tsx:23` + `app/[city]/page.tsx:87` both call `getImagesFromFolder(CLOUDINARY_FOLDERS.portfolio)`
**Why:** Burns Cloudinary admin API quota (500/hour free tier) — ~50% of those calls are duplicates
**Fix:** Extract to shared `unstable_cache`-wrapped helper, import in both pages
**Effort:** 30 min

### P2 — Framer Motion grid overkill
**Where:** `app/portfolio/PortfolioGrid.tsx:86-147` — every grid item animates in on mount; AnimatePresence re-triggers 12+ simultaneous animations on filter change
**Why:** Mid-range Android dips to ~20fps on filter; hurts INP (Interaction to Next Paint)
**Fix:** Remove per-item motion; keep only filter button transitions (CSS already handles those). Possibly drop framer-motion entirely (~40KB bundle savings) if no other consumer remains.
**Effort:** 1 hour

### P3 — blurDataURL fetches real 20×20 from Cloudinary per image
**Where:** `components/ui/CloudinaryImage.tsx:30-36`
**Why:** Portfolio page = 18 images = 36 separate Cloudinary transform requests just for blur. Bypasses Next/Image optimization, hits Cloudinary rate limits.
**Fix:** Replace with SVG data URI (single-color rect using `site.branding.themeColor`). Zero network cost.
**Effort:** 45 min

### P4 — Images served 800×800 to mobile
**Where:** `components/sections/FeaturedWork.tsx:33-39` (and portfolio grid)
**Why:** `sizes` attribute is set but Cloudinary `src` URL is same regardless of breakpoint. Phones download ~400KB/image they don't need.
**Fix:** Build 2-3 Cloudinary URLs in srcSet (400 mobile / 800 tablet / 1200 desktop) OR use Cloudinary's `w_auto` responsive transform.
**Effort:** 1 hour

---

## ⚙️ Performance polish (MEDIUM, ~2.5 hours total)

### P5 — Hardcoded "bridal" default in PriceEstimator state
**Where:** `components/sections/PriceEstimator.tsx:30` — `useState('bridal')`
**Fix:** Read from `packages[0].id` so it survives any package rename or new client clone.
**Effort:** 20 min

### P6 — Verify CloudinaryImage dimensions everywhere (layout shift)
**Where:** All CloudinaryImage usages across components/sections + city pages
**Fix:** Confirm every call has explicit width/height + aspect-ratio container. Flag any missing.
**Effort:** 30 min

### P7 — Marquee infinite loop missing GPU hint
**Where:** `tailwind.config.ts:57-58` + `components/sections/Marquee.tsx:19`
**Fix:** Add `will-change: transform; transform: translate3d(0,0,0)` to animated div. Forces GPU layer promotion → stable framerate on older devices.
**Effort:** 15 min

### P8 — BeforeAfter slider re-renders on every range tick
**Where:** `components/sections/BeforeAfter.tsx:92-103` (step={0.5} = 200 ticks across slider)
**Fix:** Move clipPath to CSS custom property; throttle state updates with `requestAnimationFrame`.
**Effort:** 45 min

### P9 — Inconsistent ISR revalidate values
**Where:** Homepage 8h, city 8h, portfolio 1h, blog never
**Fix:** Align portfolio to 8h (matches Cloudinary cache) OR document why it's shorter in a comment.
**Effort:** 20 min

### P10 — Tailwind content glob missing /lib
**Where:** `tailwind.config.ts:4-8`
**Fix:** Add `'./lib/**/*.{ts,tsx}'` so future utility components don't get purged.
**Effort:** 5 min

### P11 — Make ScrollProgressBar a feature flag
**Where:** Always rendered in `app/layout.tsx:103`
**Fix:** Add `scrollProgress` to `config/features.ts`; default true.
**Effort:** 20 min

### P12 — Font fallback adjustments
**Where:** `app/layout.tsx:27-40` (Google Fonts setup)
**Fix:** Add `adjustFontFallback: false` to disable swap-induced reflow.
**Effort:** 10 min

---

## 🏗️ Framework-readiness (becoming a multi-client template)

Currently 85% generic; these get you to 95%+. Skip unless you'll deploy this for 2+ more clients.

### F1 — `BeautyStudio` schema type hardcoded everywhere ⭐ HIGH VALUE / LOW COST
**Where:** `app/page.tsx:78`, `app/about/page.tsx` (worksFor), `app/services/page.tsx` (provider)
**Why:** Wrong schema type for Spa, Salon, Photographer (Google validator complains)
**Fix:** Add `config/business.ts` with `businessType: 'BeautyStudio'|'Spa'|'Salon'|...`; create `buildLocalBusinessSchema()` helper in `lib/schema.ts` (file already exists). All 3 pages call helper.
**Effort:** 1.5 hours

### F2 — Marquee keywords hardcoded
**Where:** `components/sections/Marquee.tsx:1-12` — "South Asian Weddings · Mehndi · Sangeet · Baraat · Walima · Nikkah"
**Fix:** Add `config/marquee.ts` with customizable strings; component reads from it.
**Effort:** 1 hour

### F3 — PortfolioGrid filter categories hardcoded
**Where:** `app/portfolio/PortfolioGrid.tsx:15-22` — TAG_TO_CATEGORY locked to `bridal`/`pre-bridal`/`full-glam`/`party`
**Fix:** Add `portfolioCategories` to `config/content.ts`; component derives mapping dynamically.
**Effort:** 1.5 hours

### F4 — Hardcoded package id assumptions ⭐ HIGH VALUE
**Where:** `app/[city]/page.tsx:53-56` references `'bridal'`, `'pre-bridal'`, `'full-glam'`, `'party'` by id; `components/sections/PriceEstimator.tsx:30` defaults to `'bridal'`
**Why:** Even single-tenant — if Yash renames "bridal" → "wedding" tomorrow, 3 pages break with undefined errors
**Fix:** Add `getPopularPackages()`, `getDefaultPackageId()` to `config/packages.ts`. Pages use helpers, not raw ids.
**Effort:** 1 hour

### F5 — City routing model is service-area-specific
**Where:** `app/[city]/page.tsx`, `app/[city]/work/page.tsx` — assumes travel + venues + neighborhoods
**Why:** A studio-only business with no travel can't reuse this structure
**Fix:** Add `config/routing.ts` with `cityPageTemplate: 'service-area'|'showcase'|'disabled'`. Conditionally render template language.
**Effort:** 2 hours

### F6 — Meta descriptions + copy hardcode "bridal", "wedding", "GTA"
**Where:** layout, page, about, blog, contact + `app/blog/BlogListing.tsx:34` ("Check back here for bridal tips")
**Fix:** Add `content.businessVocabulary` with role noun + key terms; replace hardcoded strings.
**Effort:** 1 hour

### F7 — `next.config.mjs` hardcodes `www.yashmakeovers.com`
**Where:** `next.config.mjs:35` — apex→www redirect uses literal domain string
**Fix:** Import `site` from config, use `site.canonicalHost` in the condition.
**Effort:** 30 min

### F8 — InquiryForm SERVICE_OPTIONS uses package names directly
**Where:** `components/sections/InquiryForm.tsx:38-41`
**Fix:** Add optional `displayName` to Package interface; form uses displayName if present.
**Effort:** 30 min

### F9 — Hero `site.tagline` baked into Hero section
**Where:** `components/sections/Hero.tsx:20-22`
**Fix:** Move tagline to `content.hero.tagline` (separate from site.tagline which is business data).
**Effort:** 20 min

### F10 — Portfolio meta description hardcodes "South Asian, multicultural"
**Where:** `app/portfolio/page.tsx:15`
**Fix:** Build dynamically from config tokens.
**Effort:** 30 min

---

## 📋 Recommended path forward (Option C — hybrid)

**Now (~5 hours):**
- P1, P2, P3, P4 (all 4 perf wins — real impact on Yash's site today)
- F1 (schema builder — costs nothing extra, future-proofs)
- F4 (package id helpers — fixes a real fragility even single-tenant)

**Later, when you actually have a 2nd client:**
- F2, F3, F5, F6, F7 (will be informed by what's genuinely generic vs accidentally specific)

**Skip unless asked:**
- F8, F9, F10 (minor)
- P10, P11, P12 (polish)

---

## 📝 Hardcoded copy audit (Round 4 — added 2026-05-27)

Codebase is clean overall — no dead code, no unused imports, no console.logs.
9 new microcopy strings should move to `config/content.ts`.

### MEDIUM

- **H2.** `app/blog/BlogListing.tsx:34` — "Blog posts coming soon. Check back here for bridal tips and trend reports." → `content.blogPage.emptyState`
- **H3.** `components/sections/PriceEstimator.tsx:153,156` — "Estimated total" / "Final quote confirmed after consultation" → `content.priceEstimator.totalLabel` / `content.priceEstimator.disclaimer`
- **H4.** `components/sections/PriceEstimator.tsx:111-113` — Travel zone button labels "Studio / No travel" / "Peel Region" / "Greater GTA" → `content.priceEstimator.travelZones` (also "Greater GTA" wording duplicates business-specific geography — config helps multi-client too)

### LOW

- **H5.** `components/blog/RelatedPosts.tsx:13` — "Keep reading" → `content.blogPage.relatedHeading`
- **H6.** `components/blog/AuthorBio.tsx:11` — "About the author" → `content.blogPage.authorBioHeading`
- **H7.** `components/sections/PriceEstimator.tsx:73-74,90-91` — Form labels "Service type" / "Number of people" → `content.priceEstimator.fields.*`
- **H8.** `components/layout/Footer.tsx:98` — `https://spotive.ca` hardcoded (acceptable for attribution; could move to a `site.poweredBy` config if you ever white-label)

### Intentional (no action needed)

- `components/sections/InquiryForm.tsx:258` — Honeypot "Website (leave blank)" label is intentionally hardcoded (spam-bot deterrent — content-key would be predictable)

---

## 🚦 Roadmap items still pending from earlier audits

- Upload OG image (1200×630) + square logo to Cloudinary → paste public_ids into `site.branding`
- Add `geo: { latitude, longitude }` to each city in `config/cities.ts`
- Add per-city `Service` schema using new geo data (big local-SEO win)
- Sitemap `<image:image>` entries for portfolio + city Cloudinary images
- `Product`/`Offer` schema with `priceValidUntil` for bridal discount
- 3-5 more blog posts with internal links to city/service pages (topical authority)
- Submit to hstspreload.org (one-time external action)
- Consolidate Navbar + Footer nav links → `config/nav.ts`
