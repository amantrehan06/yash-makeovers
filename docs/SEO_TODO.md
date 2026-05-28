# SEO Master TODO — yashmakeovers

Living document. Pick items, ship them, delete them from this file. Goal:
**rank top 3 for "bridal makeup artist [GTA city]" queries within 6 months.**

Organized by what actually moves rankings, then by code-quality items.
Each section is independent — work them in any order.

Last updated: 2026-05-27 · Status: ~9.2/10 technical SEO score

---

## ✅ Already shipped (reference / don't redo)

<details>
<summary>Click to expand</summary>

### Schema / structured data
- LocalBusiness (BeautyStudio): geo, openingHoursSpecification, sameAs (Instagram + Facebook + Google), real review[] array from reviews.ts, areaServed as City objects (from cities config), logo + image (graceful), aggregateRating
- Person schema on /about (E-E-A-T): name, jobTitle, description (from site.about), image from Cloudinary portrait folder, knowsAbout, hasOccupation, worksFor → BeautyStudio @id, sameAs
- Article schema enriched: image, articleSection, wordCount, dateModified from MDX `updated` field, publisher.logo
- **Per-city Service schema** with geo, areaServed.City, provider @id-chained to BeautyStudio, AggregateOffer derived from packages config — emitted on every /[city] page (S1 ✓)
- **Per-package Product + Offer schema** on /services — replaces generic Service schema. Each package gets seller @id-chain to BeautyStudio, AggregateRating inheritance (4.9★ from 158 reviews), availability: InStock. Unlocks Google's commercial SERP rich card. `priceValidUntil` intentionally omitted (open-ended discount); add `discountEndsOn?` to Package and uncomment in lib/schema.ts when a real end date exists (S2 ✓)
- FAQPage JSON-LD on /services only (concentrated for max rich-result eligibility — visible FAQ still on both / and /services for UX)
- BreadcrumbList: extracted to `lib/schema.ts` helper, auto-emitted by `<Breadcrumbs>` component on all 7 pages

### Metadata
- viewport export with themeColor (Next 14 split)
- hreflang en-CA + x-default
- Distinct meta descriptions per page (no more "most trusted" boilerplate on 5 pages)
- Default OG image fallback (graceful when publicId empty)
- Twitter card mirrors OG
- `/not-found` marked noindex

### Crawl / indexation
- Dynamic `app/sitemap.ts` with per-URL lastmod + priority (cities, blog posts, city /work archives)
- Dynamic `app/robots.ts` with Sitemap + Host directives
- Per-blog-post `updated` field drives Article dateModified + sitemap lastmod
- All redirects extracted to `config/redirects.mjs`
- Apex→www 301 enforced in code (in addition to Vercel platform)

### Security / headers
- HSTS (2-year, includeSubDomains, preload-eligible)
- X-Frame, X-Content-Type, Referrer-Policy, Permissions-Policy

### UX (impacts SEO indirectly)
- Visible breadcrumbs on /about, /[city], /blog/[slug], /portfolio, /terms-and-conditions, /contact, /services
- Blog cover image renders properly (was a ✦ placeholder)
- FAQ section on / and /services

### Codebase quality
- All business data centralized: site.ts, packages.ts (with helpers), reviews.ts, cities.ts, faq.ts, addOns
- Components extracted: PackageCard, ReviewCard, WhyChooseItem, FAQAccordion, Breadcrumbs (with auto-schema)
- Footer cities read from config/cities.ts
- Zero hardcoded business data outside config (verified)
- Single FAQ array used on both / and /services (no drift)

</details>

---

## 🔴 SEO RANKING WORK (the actual Google-ranking levers)

These are the items most likely to move SERP positions in 4-12 weeks.

### S3 — Upload OG image (1200×630) + square logo to Cloudinary
**Why:** Every WhatsApp / iMessage / LinkedIn / FB / X share currently has NO image preview card. This is the single biggest social-CTR lever you can pull. Once uploaded, every page automatically renders branded preview cards.

**Steps:**
1. Design a 1200×630 OG image in Canva (face on left + "Yash Makeovers — Bridal Makeup, GTA" on right)
2. Upload to Cloudinary at `yash-makeovers/og/og-default`
3. Design / upload a 512×512 square logo at `yash-makeovers/brand/logo-square`
4. Paste public_ids into `site.branding.ogImagePublicId` and `site.branding.logoPublicId`

**Effort:** 15 min (once assets exist). **Impact:** HIGH (every social share + Discover card + Article schema improves).

---

### S4 — Hand-vary 3-5 city page `metaTitle` values
**Why:** All 10 cities currently use the pattern `"Bridal Makeup Artist in {City}, ON"`. Google penalizes near-duplicate titles via SERP suppression — only one of the cities wins for any shared keyword. Varying the angle per city dodges this.

**Examples:**
- Brampton (home): `"Brampton Bridal Makeup — South Asian Specialist | Yash Makeovers"`
- Mississauga: `"Mississauga Wedding Makeup at Your Venue — On-Site Service"`
- Toronto: `"Toronto Bridal Makeup & Hair — HD Photography Ready"`
- Etobicoke: `"Etobicoke Bridal Beauty — Travel + Studio Service"`

**Steps:** Edit `metaTitle` field on 4-5 city entries in `config/cities.ts`.

**Effort:** 30 min. **Impact:** MEDIUM (resolves SERP suppression on shared keywords).

---

### S5 — Sitemap `<image:image>` entries for portfolio + city images
**Why:** Bridal photos are gold for visual search. Currently sitemap lists URLs but no image children. For an image-heavy beauty site, this is real lost traffic from Google Images.

**Steps:**
1. Extend `app/sitemap.ts` to enumerate Cloudinary `portfolio/` images per portfolio URL
2. Add city hero image per `/[city]` entry (when available)
3. Include `image:title` and `image:caption` where possible

**Effort:** ~1.5 hours. **Impact:** MEDIUM-HIGH (opens Google Images channel).

---

### S6 — Internal linking: blog → city/services
**Why:** Both MDX posts currently have ~0 internal contextual links to `/services`, `/[city]`, or `/portfolio`. Internal links are how PageRank flows. Even 2-3 well-placed contextual links per post lift the linked pages noticeably.

**Steps:**
1. Create MDX components: `<CityLink slug="brampton">` and `<ServiceLink id="bridal">`
2. Rewrite existing 2 posts to use them in 2-3 places each
3. Document the pattern in `content/blog/_template.mdx` for future posts

**Effort:** ~45 min. **Impact:** MEDIUM (long-term — improves linked-page authority).

---

### S7 — `Organization` schema as separate node + knowledge-graph signals
**Why:** Currently only `BeautyStudio` is emitted. Adding a sibling `Organization` (or `@id`-chaining BeautyStudio to extend Organization) helps Google build a knowledge-graph card for "Yash Makeovers" brand searches.

**Add to LocalBusiness/Organization schema:**
- `foundingDate` (e.g. `'2014-01-01'`)
- `paymentAccepted` (e.g. `'E-transfer, Cash'`)
- `currenciesAccepted` (`'CAD'`)
- `slogan` (from `site.tagline`)

**Effort:** ~30 min. **Impact:** MEDIUM (brand-name SERP enrichment).

---

### S8 — `WebSite` schema with `SearchAction`
**Why:** Even without site search, the bare `WebSite` schema helps brand-name SERP enrichment. If site search is ever added, unlocks the SERP sitelinks search box.

**Steps:** One-liner addition to root layout. Emit `{ '@type': 'WebSite', url, name, potentialAction?: SearchAction }`.

**Effort:** 15 min. **Impact:** LOW-MEDIUM.

---

### S9 — Descriptive anchor text on city/footer links
**Why:** Current city links say just the city name ("Brampton"). Descriptive anchors ("Bridal makeup in Brampton") flow ~30% more link equity per Google's anchor-text weighting. Footer + city cross-links are the biggest opportunity.

**Steps:**
1. Update footer cities map: `href={`/${city.slug}`} aria-label={`Bridal makeup in ${city.name}`}` — keep `{city.name}` visible but enrich the link
2. On city pages, update "nearby cities" section to use descriptive anchors
3. Consider grouped-keyword config (parked earlier) for variation

**Effort:** ~45 min. **Impact:** MEDIUM (compounds over time for city-page rankings).

---

### S10 — Hero image: upload 16:9 desktop version
**Why:** Build log warned: `hero-bridal_by29ts — source ratio 0.67 (portrait), ideal 1.78 (16:9). Auto-cropped on display.` Portrait-aspect hero being runtime-cropped = larger download + worse LCP.

**Steps:**
1. Crop existing hero to 16:9 at minimum 1920×1080
2. Upload as new public_id (e.g. `yash-makeovers/hero/hero-bridal-landscape`)
3. Optionally upload separate portrait 3:4 for mobile + use `<picture>` art-direction

**Effort:** 30 min (one upload), 2 hours (full art-direction). **Impact:** MEDIUM (LCP improvement + better mobile experience).

---

### S11 — Submit to HSTS preload list (one-time external)
**Why:** HSTS header is already set with `preload` directive. Submitting to [hstspreload.org](https://hstspreload.org/) gets the domain baked into Chrome/Firefox/Safari → never need an HTTP→HTTPS redirect for any browser. Trust signal + speed.

**Steps:** Visit hstspreload.org → enter domain → confirm. Takes ~2 minutes; review by Chromium team can take weeks.

**Effort:** 5 min. **Impact:** LOW (trust signal + minor perf).

---

### S12 — Per-portfolio `ImageObject` schema for visual search
**Why:** Each portfolio image could be its own `ImageObject` with `creator: { @id: '...about#artist' }`, `contentLocation: { @id: '...brampton' }`. Helps Google Images attribute and rank your work.

**Steps:** Generate dynamically from Cloudinary `portfolio/` folder. Optional — depends on S5 timing.

**Effort:** ~1 hour. **Impact:** LOW-MEDIUM.

---

## 📝 Content / topical authority (biggest 6-month lever)

### C1 — Publish 8-12 more blog posts forming a topical cluster ⭐ COMPOUNDS
**Why:** Two posts is thin. For "bridal makeup [city]" to rank, you need ~10-15 posts that internally interlink, all forming a topical cluster around "GTA bridal beauty". This is the **biggest 6-month SEO lever** — more impact than any single schema fix.

**Suggested topics (each ~800-1500 words):**
- "How to choose a bridal makeup artist in Brampton" (+ Toronto, Mississauga variants → S6 internal linking)
- "South Asian wedding makeup timeline — Mehndi to reception"
- "Sangeet vs Mehndi makeup: how the looks differ"
- "Bridal makeup at Embassy Grand Convention Centre" (per-venue post)
- "Bridal makeup at Pearson Convention Centre"
- "Indian bridal makeup vs Pakistani bridal makeup: regional traditions"
- "How long does HD bridal makeup last? Real testing on a 14-hour day"
- "Pre-bridal skincare: 3-month timeline for radiant skin"
- "Trial vs no-trial: when to book a bridal makeup trial"
- "What to bring to your bridal makeup appointment"

Each must internally link to relevant city + service page (S6).

**Effort:** 6-10 hours per post if writing from scratch; can be batched. **Impact:** HIGH — compounding.

---

### C2 — Refresh `reviews.ts` quarterly with newest GBP reviews
**Why:** You have 158 Google reviews but only emit 5 in schema. Recency in reviews matters for ranking AND CTR (Google sometimes shows review date in SERP). Setting a quarterly cadence keeps schema fresh without needing API integration.

**Effort:** 15 min/quarter. **Impact:** LOW-MEDIUM (compounding trust signal).

---

## 🚀 Performance / Core Web Vitals (~3 hours total — real revenue impact)

Faster page = higher conversion AND better rankings. These are real wins for Yash's current site.

### P1 — Portfolio images double-fetched
**Where:** `app/portfolio/page.tsx:23` + `app/[city]/page.tsx:87` both call `getImagesFromFolder(CLOUDINARY_FOLDERS.portfolio)`
**Why:** Burns Cloudinary admin API quota (500/hour free tier) — ~50% of those calls are duplicates
**Fix:** Extract to shared `unstable_cache`-wrapped helper, import in both pages
**Effort:** 30 min

### P2 — Framer Motion overkill on portfolio grid
**Where:** `app/portfolio/PortfolioGrid.tsx:86-147`
**Why:** Every grid item animates in on mount, AnimatePresence re-triggers 12+ simultaneous animations on filter change. Mid-range Android dips to ~20fps. Hurts INP (Interaction to Next Paint) Core Web Vital.
**Fix:** Remove per-item motion; keep only CSS filter button transitions. Possibly drop framer-motion entirely (~40KB bundle savings).
**Effort:** 1 hour

### P3 — `blurDataURL` fetches real 20×20 from Cloudinary per image
**Where:** `components/ui/CloudinaryImage.tsx:30-36`
**Why:** Portfolio page = 18 images = 36 separate Cloudinary transform requests JUST for blur. Bypasses Next/Image, hits rate limits.
**Fix:** Replace with SVG data URI (single-color rect using `site.branding.themeColor`). Zero network cost.
**Effort:** 45 min

### P4 — Images served 800×800 to phones
**Where:** `components/sections/FeaturedWork.tsx:33-39` (and portfolio grid)
**Why:** `sizes` attribute is set but Cloudinary `src` URL is same regardless of breakpoint. Phones download ~400KB/image they don't need. LCP impact on mobile.
**Fix:** Build 2-3 Cloudinary URLs in srcSet (400 / 800 / 1200) OR use Cloudinary's `w_auto` responsive transform.
**Effort:** 1 hour

---

## 🚀 Performance polish (MEDIUM, ~2.5 hours total)

### P5 — Hardcoded "bridal" default in PriceEstimator state
**Where:** `components/sections/PriceEstimator.tsx:30` — `useState('bridal')`
**Fix:** Read from `packages[0].id`. Survives package rename and clones cleanly.
**Effort:** 20 min

### P6 — Verify CloudinaryImage dimensions everywhere (CLS check)
**Where:** All CloudinaryImage usages
**Fix:** Confirm every call has explicit width/height + aspect-ratio container.
**Effort:** 30 min

### P7 — Marquee infinite loop needs GPU hint
**Where:** `tailwind.config.ts:57-58` + `components/sections/Marquee.tsx:19`
**Fix:** Add `will-change: transform; transform: translate3d(0,0,0)` to animated div.
**Effort:** 15 min

### P8 — BeforeAfter slider re-renders on every range tick
**Where:** `components/sections/BeforeAfter.tsx:92-103`
**Fix:** Move clipPath to CSS custom property; throttle state updates with rAF.
**Effort:** 45 min

### P9 — Inconsistent ISR `revalidate` values
**Where:** Homepage 8h, city 8h, portfolio 1h, blog never
**Fix:** Align portfolio to 8h (matches Cloudinary cache) OR document the difference.
**Effort:** 20 min

### P10 — Tailwind content glob missing `/lib`
**Where:** `tailwind.config.ts:4-8`
**Fix:** Add `'./lib/**/*.{ts,tsx}'`.
**Effort:** 5 min

### P11 — ScrollProgressBar always renders (no feature flag)
**Where:** `app/layout.tsx:103`
**Fix:** Add to `config/features.ts`, conditional in layout.
**Effort:** 20 min

### P12 — Font fallback CLS
**Where:** `app/layout.tsx:27-40` (Google Fonts)
**Fix:** Add `adjustFontFallback: false` to disable swap reflow.
**Effort:** 10 min

### P13 — `prefetch={false}` on tertiary links
**Where:** Footer city/quick-link map, possibly Navbar
**Why:** Next.js prefetches every visible `<Link>` by default — wastes mobile bandwidth on 20+ links per page
**Fix:** Add `prefetch={false}` to footer links.
**Effort:** 15 min

### P14 — Confirm hero image uses `priority` + `fetchPriority="high"`
**Where:** `components/sections/Hero.tsx`
**Why:** LCP element should never be lazy-loaded
**Fix:** Audit + add if missing.
**Effort:** 10 min

---

## 🏗️ Framework-readiness (make it a multi-client template)

Skip unless you'll deploy this for 2+ more clients. ~10 hours total to get to 95% generic.

### F1 — `BeautyStudio` schema type hardcoded everywhere ⭐ DO ANYWAY
**Where:** `app/page.tsx:78`, `app/about/page.tsx` (worksFor), `app/services/page.tsx` (provider)
**Why:** Wrong type for Spa/Salon/Photographer. Even single-tenant — pairs cleanly with S1/S2 helpers in `lib/schema.ts`.
**Fix:** Add `config/business.ts` with `businessType: 'BeautyStudio'|'Spa'|...`. Create `buildLocalBusinessSchema()` helper. All 3 pages call it.
**Effort:** 1.5 hours

### F2 — Marquee keywords hardcoded
**Where:** `components/sections/Marquee.tsx:1-12`
**Fix:** Add `config/marquee.ts` with customizable strings.
**Effort:** 1 hour

### F3 — PortfolioGrid filter categories hardcoded
**Where:** `app/portfolio/PortfolioGrid.tsx:15-22`
**Fix:** Add `portfolioCategories` to `config/content.ts`; derive mapping.
**Effort:** 1.5 hours

### F4 — Hardcoded package id assumptions ⭐ DO ANYWAY
**Where:** `app/[city]/page.tsx:53-56`, `components/sections/PriceEstimator.tsx:30`
**Why:** Fragile EVEN single-tenant — if Yash renames "bridal" → "wedding" tomorrow, 3 pages crash with undefined errors.
**Fix:** Add `getPopularPackages()`, `getDefaultPackageId()` helpers.
**Effort:** 1 hour

### F5 — City routing assumes service-area model
**Where:** `app/[city]/page.tsx`, `app/[city]/work/page.tsx`
**Fix:** Add `cityPageTemplate: 'service-area'|'showcase'|'disabled'` to config/routing.
**Effort:** 2 hours

### F6 — Meta descriptions hardcode "bridal", "wedding", "GTA"
**Where:** layout, page, about, blog, contact + `BlogListing.tsx:34`
**Fix:** Add `content.businessVocabulary` with role noun + key terms.
**Effort:** 1 hour

### F7 — `next.config.mjs` hardcodes `www.yashmakeovers.com`
**Where:** `next.config.mjs:35`
**Fix:** Import `site.canonicalHost`, use in condition.
**Effort:** 30 min

### F8 — InquiryForm SERVICE_OPTIONS uses package names directly
**Fix:** Add optional `displayName` to Package interface.
**Effort:** 30 min

### F9 — Hero `site.tagline` baked
**Fix:** Move to `content.hero.tagline`.
**Effort:** 20 min

### F10 — Portfolio meta description hardcodes "South Asian, multicultural"
**Fix:** Build dynamically from config tokens.
**Effort:** 30 min

---

## 📝 Microcopy → `config/content.ts` (LOW priority polish)

Small UI strings that should consolidate to content config. Functional today; clean up if/when touching the relevant file.

- `app/blog/BlogListing.tsx:34` — "Blog posts coming soon..." → `content.blogPage.emptyState`
- `components/sections/PriceEstimator.tsx:153,156` — "Estimated total" / "Final quote confirmed after consultation"
- `components/sections/PriceEstimator.tsx:111-113` — Travel zone buttons "Studio / No travel" / "Peel Region" / "Greater GTA"
- `components/sections/PriceEstimator.tsx:73-74,90-91` — "Service type" / "Number of people" form labels
- `components/blog/RelatedPosts.tsx:13` — "Keep reading"
- `components/blog/AuthorBio.tsx:11` — "About the author"
- `components/layout/Footer.tsx:98` — `https://spotive.ca` (acceptable for attribution; flag if white-labeling)
- **Bonus:** Navbar + Footer "Quick links" hardcoded arrays → consolidate to `config/nav.ts`

---

## ⏸️ Deferred / waiting on user inputs

### Asset uploads (15 min once available)
- 1200×630 social card OG image → upload to `yash-makeovers/og/og-default` → paste `site.branding.ogImagePublicId`
- 512×512 square brand logo → upload to `yash-makeovers/brand/logo-square` → paste `site.branding.logoPublicId`
- (Optional) Square artist headshot → upload to `yash-makeovers/team/yashpreet-portrait` if not auto-fetched from `about/` folder

### Optional data
- `site.artist.fullLegalName` — only if different from `site.artistName`
- Decision: keep 5 reviews in schema or expand to 10 (Google's sweet spot is 5)

---

## 🎯 Recommended next session — Option C (5 hours)

The "biggest ROI without over-engineering" path:

1. **P1** — Portfolio image dedupe (30min)
2. **P2** — Drop framer-motion from portfolio grid (1h)
3. **P3** — Static blur data URI (45min)
4. **P4** — Responsive image srcSet (1h)
5. **F1** — Schema builder + `businessType` config (1.5h) → pairs with S1/S2 next session
6. **F4** — Package id helpers (1h)

Skip F2/F3/F5/F6 until there's actually a 2nd client to inform what's truly generic.

Then in subsequent sessions, work the SEO ranking items (S1 → S7), then content (C1).

---

## 📊 Where to measure progress

- **Google Search Console** — track impressions/clicks per query, especially "bridal makeup [city]" variants. Watch for "Pages → Not indexed" warnings as redirects to add.
- **PageSpeed Insights** — run on / and /portfolio monthly; target LCP < 2.5s mobile, CLS < 0.1, INP < 200ms.
- **Schema validator** — [search.google.com/test/rich-results](https://search.google.com/test/rich-results) — paste each page URL after deploys.
- **Bing Webmaster Tools** — submit sitemap (small but free traffic source).
