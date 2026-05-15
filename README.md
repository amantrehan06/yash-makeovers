# Yash Makeovers

A marketing + lead-generation website for **Yashpreet**, a bridal makeup artist
based in Brampton, ON serving the Greater Toronto Area. The site exists to (1)
rank in Google for searches like *"bridal makeup artist Brampton"* across 10 GTA
cities, (2) showcase the artist's portfolio, and (3) capture inquiries via a
4-step form that emails Yashpreet directly. The only third-party services the
site depends on are Vercel (hosting), Cloudinary (images), Resend (email),
and Anthropic (autonomous blog engine) — no database.

Production: **yashmakeovers.com** on Vercel.

---

## For developers — orientation

> If you're a backend engineer who hasn't worked with Next.js before, read this
> section first. It will save you an hour of poking at the codebase.

### Next.js in 60 seconds (for backend devs)

| Concept | What it means |
|---|---|
| **File-based routing** | `app/about/page.tsx` becomes the URL `/about`. No route tables, no `app.use()`, no router definitions. The filesystem *is* the router. |
| **Server components (default)** | Every `page.tsx` and component is rendered on the server by default. You can `await fetch(...)` directly at the top of the file like in a controller. No browser APIs (`window`, `document`) work here. |
| **Client components** | Components with `'use client'` at the top render on the server first, then hydrate in the browser. Required for `useState`, `useEffect`, event handlers, and Framer Motion. |
| **API routes** | `app/api/foo/route.ts` exports `GET` / `POST` functions. Like a normal HTTP handler. |
| **`generateMetadata()`** | Per-page function that returns the page's `<title>`, OG tags, canonical URL, etc. |
| **`generateStaticParams()`** | For dynamic routes (`app/[city]/page.tsx`), this returns the list of param values to pre-render at build time. The 10 city pages are made this way. |
| **`export const revalidate = 3600`** | "Rebuild this page server-side at most once an hour, even though it's static." This is **ISR** (Incremental Static Regeneration). Used by the portfolio page so it picks up new Cloudinary photos without a deploy. |
| **`server-only`** | Importing `'server-only'` at the top of a file makes the bundler error out if a client component tries to import from it. Used to fence off code that touches `fs` or secrets. |

### Mental model of this codebase

```
                                ┌──────────────────────┐
                                │  config/*.ts         │   Editable content
                                │  (site, packages,    │   (non-dev safe to edit)
                                │   cities, reviews)   │
                                └──────────┬───────────┘
                                           │ imported by
                                           ▼
   ┌────────────────────┐         ┌──────────────────────┐         ┌─────────────────┐
   │  components/       │ ◀────── │  app/*/page.tsx      │ ──────▶ │  lib/*.ts       │
   │  (UI building      │ render  │  (routes)            │ uses    │  (data fetch,   │
   │   blocks)          │         │                      │         │   email, etc.)  │
   └────────────────────┘         └──────────────────────┘         └────────┬────────┘
                                                                            │
                                                                            ▼
                                                          ┌──────────────────────────────┐
                                                          │  External services           │
                                                          │  Cloudinary · Resend         │
                                                          │  Anthropic (blog engine only)│
                                                          └──────────────────────────────┘
```

Three rules everything in this repo follows:

1. **Content lives in `config/` — never hardcoded in a component.** This lets
   Yashpreet (or an editor) change prices, reviews, city pages without touching
   React code.
2. **Server-only modules import `'server-only'` at the top.** When a server
   module needs to share types/constants with client code, the types go in a
   parallel `*Types.ts` or `*Url.ts` file that's client-safe.
3. **No hardcoded hex colors anywhere.** All colors are CSS custom properties
   in `styles/globals.css`, mapped to Tailwind tokens in `tailwind.config.ts`.

### "I want to change X — where do I go?"

| If you want to change… | Edit this file |
|---|---|
| **Turn a feature off** (WhatsApp, price estimator, etc.) | Set the matching `FEATURE_*` env var in Vercel (see §8) |
| **A Cloudinary folder spec** (max count, required shape) | `lib/cloudinary.ts` (`FOLDER_SPECS` const) |
| **Business info** (phone, email, address, social links) | `config/site.ts` |
| **Service prices / what's included in each package** | `config/packages.ts` |
| **The 3 review cards** | `config/reviews.ts` |
| **A city landing page** (intro text, meta tags, focus angle) | `config/cities.ts` |
| **The Cloudinary image used for hero / about / blog cover** | `config/images.ts` |
| **The "Now booking 2026" badge** | Vercel env var `NEXT_PUBLIC_AVAILABILITY_MSG` |
| **The brand color palette** | `styles/globals.css` (CSS variables only) |
| **The H1 / typography sizes** | `tailwind.config.ts` (`fontSize` block) |
| **Add a brand-new page** | Create `app/{slug}/page.tsx` — that's the whole step |
| **Add a new API endpoint** | Create `app/api/{name}/route.ts` exporting `GET` or `POST` |
| **Inquiry form fields or validation** | `components/sections/InquiryForm.tsx` |
| **The two email templates** (owner notification + client auto-reply) | `lib/resend.ts` (`buildOwnerEmailHtml`, `buildClientEmailHtml`) |
| **The inquiry form's server handler** | `app/api/inquiry/route.ts` |
| **The navbar links or logo** | `components/layout/Navbar.tsx` |
| **The footer** | `components/layout/Footer.tsx` |
| **The floating WhatsApp button** | `components/layout/FloatingWhatsApp.tsx` |
| **The portfolio filter categories** | `app/portfolio/PortfolioGrid.tsx` (`CATEGORIES` const) |
| **What's shown in the homepage section order** | `app/page.tsx` (just the JSX) |
| **The OG (social share) image design** | `lib/og.tsx` |
| **The price estimator math** | `components/sections/PriceEstimator.tsx` |
| **Add or remove a Google Analytics event** | `lib/analytics.ts` (add to the union type) + call `trackEvent()` from a component |
| **A blog post — manually** | Create `content/blog/{slug}.mdx` with frontmatter |
| **The autonomous blog engine's writing style** | `scripts/post-writer.mjs` (`SYSTEM_PROMPT` const) |
| **What the blog engine researches** | `scripts/trend-researcher.mjs` (user prompt) |
| **When the blog engine runs** | `.github/workflows/autonomous-blog.yml` (`cron` line) |
| **301 redirects (e.g. an old URL)** | `next.config.mjs` (`redirects()` function) |
| **Security headers / cache headers** | `vercel.json` |
| **What domains `next/image` is allowed to load from** | `next.config.mjs` (`images.remotePatterns`) |
| **Pre-launch SEO checks (sitemap rules)** | `next-sitemap.config.js` |

### Data flow examples

Two example request paths so you can mentally trace what's happening:

**A visitor loading `/services`:**

1. Vercel CDN serves the pre-rendered HTML (the page is fully static).
2. The HTML was built once at deploy time by running `app/services/page.tsx`
   on the server — that file imports from `config/packages.ts` and `config/site.ts`.
3. Hydration: a small JS bundle for `FAQAccordion.tsx` ships to the browser
   so the accordion can be interactive. Nothing else needs JS.

**A visitor submitting the inquiry form:**

1. They land on `/contact` — pre-rendered HTML from `app/contact/page.tsx`.
2. The form (`components/sections/InquiryForm.tsx`, marked `'use client'`)
   collects 4 steps of input in React state.
3. Submit fires `fetch('/api/inquiry', { method: 'POST', body: ... })`.
4. That hits `app/api/inquiry/route.ts` running on Vercel's serverless runtime.
5. The handler calls `getResend()` (lazy-initialised in `lib/resend.ts`) and
   sends two emails — one to `info@yashmakeovers.com`, one auto-reply to the client.
6. Response goes back to the browser, form switches to success state.

### Where the "magic" actually happens

- **Pre-rendering / sitemap / robots.txt**: `npm run build` runs `next build &&
  next-sitemap`. The sitemap config is in `next-sitemap.config.js`.
- **Image optimization**: `next/image` + Cloudinary do this automatically. Every
  image gets a WebP/AVIF variant, lazy loading, and a Cloudinary-generated
  20×20 blur placeholder.
- **JSON-LD (Rich Results)**: Each page that needs structured data renders an
  inline `<script type="application/ld+json">` tag — search `application/ld+json`
  in the codebase to find them all.
- **Dynamic OG images**: Next.js auto-discovers `app/**/opengraph-image.tsx` files
  and serves them as PNGs. They run on the Edge runtime (or Node for the blog).
- **City pages**: `app/[city]/page.tsx` + `generateStaticParams()` reading from
  `config/cities.ts` — adding a new city is just adding an entry to that file.

### Local debugging tips

- **Server-component errors** show up in your terminal (the `npm run dev` process), not the browser console.
- **Client-component errors** show up in the browser DevTools console.
- **API route errors** show up in your terminal — add `console.log` to the route handler.
- **Hot reload** works for everything in `app/`, `components/`, `lib/`, `styles/`.
  Changes to `next.config.mjs`, `tailwind.config.ts`, or env vars require a server restart.
- **MDX frontmatter changes** require a hard refresh (filesystem reads are cached).

---

## What's in the box

- **Homepage** — Hero with photo, marquee, trust bar, About preview, Services (4 packages), Portfolio preview, Before/After slider, Price Estimator, Reviews, City grid, Inquiry form, Featured work grid
- **About page** — full artist bio, "why choose us" cards, luxury brands chip row
- **Services page** — all 4 packages, transparent pricing, policies, FAQ accordion
- **Portfolio page** — masonry grid fed by Cloudinary, filter tabs (All / Bridal / Pre-Bridal / Full Glam / Party / South Asian), Framer Motion transitions, hover overlay with category + look name, "Load more" pagination, Before/After slider
- **Contact page** — 4-step inquiry form, early-morning-fee warning, Resend-powered emails
- **Blog** — MDX posts, category filter, featured post hero, reading progress bar, author bio, related posts, Article JSON-LD per post
- **10 GTA city landing pages** — each with unique intro, standardised 3-FAQ block, services, why-choose, reviews, FAQPage JSON-LD
- **Featured work grid** — 6–9 hand-curated photos from `yash-makeovers/featured/` plus a plain "Follow on Instagram" link (no external API)
- **Feature toggles** — every optional section (WhatsApp, Featured grid, Before/After, Price estimator, Inquiry form, Blog engine, Notifier) can be turned off via `FEATURE_*` env vars without code changes
- **Cloudinary folder validation** — every photo is checked at fetch time against per-folder shape and count specs; wrong-shape uploads are skipped with a descriptive console warning telling Yashpreet exactly how to fix it
- **Autonomous blog engine** — writes and publishes a new SEO post every Monday at 9 AM EST via GitHub Actions + Claude API
- **Dynamic OG images** — per-page social cards generated with `next/og`
- **Google Analytics 4** — event tracking for form, WhatsApp, portfolio filters, price estimator
- **SEO** — sitemap, robots.txt, canonical URLs, LocalBusiness / BreadcrumbList / Article / FAQPage schemas, 301 redirects from old WordPress URLs
- **Polish** — sitewide scroll progress bar, gold focus rings, branded 404, portfolio loading skeleton, `prefers-reduced-motion` support, mobile drawer with slide-from-right animation

---

## 1. Quick start

```bash
cp .env.local.example .env.local
# Fill in real values (see section 4)

npm install
npm run dev          # http://localhost:3000

npm run build        # production build + sitemap generation
npm run start        # serve the production build locally
```

---

## 2. Tech stack

| Tool | Purpose |
|---|---|
| **Next.js 14 (App Router)** | Routing, server components, ISR, image optimisation |
| **TypeScript (strict)** | Type safety across config, components, APIs, scripts |
| **Tailwind CSS** | All styling via brand tokens (no inline hex values) |
| **Framer Motion** | Section fade-ins, portfolio filter transitions, mobile drawer |
| **Cloudinary** | Image hosting, CDN, on-the-fly transformations, LQIP blur placeholders |
| **Resend** | Transactional email (inquiry confirmations, blog notifications) |
| **next-mdx-remote** | MDX blog rendering in React Server Components |
| **next-sitemap** | Auto-generates `sitemap.xml` + `robots.txt` |
| **next/og** | Dynamic OG image generation at the edge |
| **@next/third-parties** | Google Analytics 4 script loader |
| **Anthropic SDK** | Powers the autonomous blog engine (Claude Sonnet 4.6) |
| **Vercel** | Hosting + auto SSL + GitHub-triggered deploys |
| **GitHub Actions** | Cron schedule for the blog engine |

---

## 3. Project structure

```
yash-makeovers/
├── app/                          ← Next.js App Router
│   ├── page.tsx                  ← Homepage
│   ├── layout.tsx                ← Root layout (fonts, GA, nav, footer)
│   ├── globals.css               ← imports styles/globals.css
│   ├── opengraph-image.tsx       ← Homepage OG image
│   ├── not-found.tsx             ← Branded 404
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx              ← Services + pricing
│   │   └── FAQAccordion.tsx      ← Client-side FAQ widget
│   ├── portfolio/
│   │   ├── page.tsx              ← Server fetches Cloudinary, passes to grid
│   │   ├── PortfolioGrid.tsx     ← Client component with filter + Load More
│   │   └── loading.tsx           ← Masonry skeleton
│   ├── contact/page.tsx          ← 4-step inquiry form
│   ├── blog/
│   │   ├── page.tsx              ← Listing
│   │   ├── BlogListing.tsx       ← Client filter component
│   │   └── [slug]/
│   │       ├── page.tsx          ← Full post + reading progress
│   │       └── opengraph-image.tsx
│   ├── [city]/
│   │   ├── page.tsx              ← Dynamic — generates 10 static pages
│   │   └── opengraph-image.tsx
│   └── api/inquiry/route.ts      ← Form handler → Resend emails
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            ← Sticky + slide-from-right mobile drawer
│   │   ├── Footer.tsx
│   │   └── FloatingWhatsApp.tsx  ← Pulse-animated WhatsApp CTA
│   ├── sections/                 ← Homepage section components
│   │   ├── Hero.tsx              About.tsx       Services.tsx
│   │   ├── Portfolio.tsx         BeforeAfter.tsx PriceEstimator.tsx
│   │   ├── Reviews.tsx           Cities.tsx      Marquee.tsx
│   │   ├── TrustBar.tsx          InquiryForm.tsx FeaturedWork.tsx
│   ├── ui/
│   │   ├── Button.tsx            SectionHeader.tsx  Badge.tsx
│   │   ├── CloudinaryImage.tsx   ScrollProgressBar.tsx
│   └── blog/
│       ├── ReadingProgress.tsx   AuthorBio.tsx   RelatedPosts.tsx
│
├── config/                       ← ALL editable content (never hardcode in components)
│   ├── site.ts                   ← Business info, contact, policies, "Why Choose Us"
│   ├── packages.ts               ← The 4 service packages and pricing
│   ├── reviews.ts                ← Testimonials
│   ├── cities.ts                 ← 10 GTA city pages (intro, meta, focus angle)
│   ├── images.ts                 ← Every Cloudinary public_id used on the site
│   └── features.ts               ← Feature toggle flags (read from env vars)
│
├── content/
│   └── blog/                     ← MDX blog posts (one .mdx file per post)
│
├── docs/
│   └── PHOTO-GUIDE.md            ← Photo upload guide written for Yashpreet
│
├── lib/
│   ├── cloudinaryUrl.ts          ← Pure URL builder (client-safe)
│   ├── cloudinary.ts             ← Server-only Cloudinary SDK + folder specs + validation
│   ├── resend.ts                 ← Email helpers (lazy client)
│   ├── blog.ts                   ← MDX reader (server-only)
│   ├── blogTypes.ts              ← Client-safe blog types
│   ├── og.tsx                    ← Shared OG image template
│   └── analytics.ts              ← GA4 event helper (typed event names)
│
├── scripts/                      ← Autonomous blog engine (runs in GitHub Actions)
│   ├── blog-engine.mjs           ← Orchestrator
│   ├── trend-researcher.mjs      ← Claude + web_search for current trends
│   ├── post-writer.mjs           ← Claude with brand brief → JSON post
│   ├── post-publisher.mjs        ← Writes MDX + git push
│   └── notifier.mjs              ← Resend email after publish
│
├── .github/workflows/
│   └── autonomous-blog.yml       ← Weekly cron + manual trigger
│
├── styles/globals.css            ← CSS custom properties (brand palette)
├── tailwind.config.ts            ← Maps brand tokens to Tailwind utilities
├── next.config.mjs               ← Image patterns, 301 redirects, security headers
├── next-sitemap.config.js
├── vercel.json                   ← Region (iad1), security headers
└── .env.local.example            ← Env var template
```

---

## 4. Environment variables

Every variable is in `.env.local.example`. After deploying, add them in **Vercel
Dashboard → Settings → Environment Variables** (Production + Preview + Development).

### Site env vars (Vercel)

| Variable | Purpose | Where to get it |
|---|---|---|
| `RESEND_API_KEY` | Inquiry-form + blog-engine emails | [resend.com](https://resend.com) → API Keys |
| `CLOUDINARY_CLOUD_NAME` | Server Cloudinary SDK | Cloudinary Dashboard |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Same value, exposed to browser for URL building | Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary uploads/search | Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary uploads/search | Cloudinary Dashboard |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID | [analytics.google.com](https://analytics.google.com) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Pre-filled in WhatsApp links | Manual (`16476547288`) |
| `NEXT_PUBLIC_AVAILABILITY_MSG` | The badge shown on Hero | Manual — change anytime, Vercel rebuilds |
| `CRON_SECRET` | Reserved for any future cron-protected route | `openssl rand -hex 32` |

### Feature toggle env vars

All default to ON. Set to the literal string `'false'` to disable. Server-only
env vars (no `NEXT_PUBLIC_` prefix) — the check happens in server components
or their parents. See section 8 ("Feature toggles") for what each one controls.

In **Vercel** (Settings → Environment Variables):

| Variable | Disables |
|---|---|
| `FEATURE_WHATSAPP` | Floating WhatsApp button |
| `FEATURE_FEATURED_GRID` | Homepage "Featured work" grid |
| `FEATURE_BEFORE_AFTER` | Before/After transformation slider |
| `FEATURE_PRICE_ESTIMATOR` | Homepage live price estimator |
| `FEATURE_ACCEPTING_BOOKINGS` | Inquiry form (replaced by "not accepting bookings" message) |

In **GitHub** (Settings → Variables — NOT Secrets, these aren't sensitive):

| Variable | Disables |
|---|---|
| `FEATURE_BLOG_ENGINE` | Weekly autonomous blog engine cron (job-level skip) |
| `FEATURE_BLOG_NOTIFY` | "New post published" notification email (engine still runs) |

### Blog engine env vars (GitHub Secrets, NOT Vercel)

| Variable | Purpose | Where to get it |
|---|---|---|
| `ANTHROPIC_API_KEY` | Powers research + writing | [console.anthropic.com](https://console.anthropic.com) → API Keys |
| `RESEND_API_KEY` | Already have it — duplicate the same value here | Same as above |
| `DEVELOPER_EMAIL` | Your inbox for "new post" notifications | Manual |

> **Never put secrets in `NEXT_PUBLIC_` variables.** Anything `NEXT_PUBLIC_` is
> inlined into the JavaScript bundle and visible to every site visitor.

---

## 5. Editing site content

All editable business content lives in `/config/` — **never hardcode strings in
components.** Edit, commit, push → Vercel redeploys in ~60 seconds.

| File | Contains |
|---|---|
| `config/site.ts` | Business info, contact, policies, "Why Choose Us" cards |
| `config/packages.ts` | The 4 service packages and what they include |
| `config/reviews.ts` | Testimonials shown on home + city pages |
| `config/cities.ts` | 10 GTA city pages — slug, meta, h1, intro, focus angle |
| `config/images.ts` | Cloudinary `public_id` for hero, about portrait, blog covers |

### Updating the availability badge without a code change

The "Now booking 2026 & 2027 weddings" badge reads from `NEXT_PUBLIC_AVAILABILITY_MSG`.

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Edit `NEXT_PUBLIC_AVAILABILITY_MSG` — e.g. `Now booking 2027 weddings — limited 2026 dates`
3. Click **Redeploy** on the latest production deployment

---

## 6. Managing images (Cloudinary)

> **For Yashpreet:** a non-technical guide for managing photos lives at
> [`docs/PHOTO-GUIDE.md`](docs/PHOTO-GUIDE.md). Send her that file.

All images live in one Cloudinary cloud. Every folder has a **strict shape and
max-count spec** — wrong-shape uploads are skipped at fetch time with a
descriptive `console.warn` (visible in Vercel logs).

The specs are defined once in `lib/cloudinary.ts` (`FOLDER_SPECS`) and enforced
by `getValidatedImages()`.

| Folder | Max | Shape | Best size | Used by |
|---|---|---|---|---|
| `yash-makeovers/hero/` | 1 | 16:9 landscape | 1920×1080 | Homepage hero |
| `yash-makeovers/about/` | 1 | 3:4 portrait | 1200×1600 | About page portrait |
| `yash-makeovers/featured/` | 9 | 1:1 square | 1080×1080 | Homepage "Featured work" grid |
| `yash-makeovers/portfolio/` | 50 | 3:4 portrait | 1200×1600 | `/portfolio` masonry |
| `yash-makeovers/before-after/before/` | 10 | 1:1 square | 1080×1080 | Before/After slider (left) |
| `yash-makeovers/before-after/after/` | 10 | 1:1 square | 1080×1080 | Before/After slider (right) |
| `yash-makeovers/blog/` | — | 16:9 landscape | 1920×1080 | Blog cover images |

Tolerance: ±5%. Photos that fall outside the spec are silently skipped and
logged. The portfolio grid reads from `yash-makeovers/portfolio/` and revalidates
hourly via ISR, so changes appear within an hour of upload.

### Tagging for portfolio filter categories

To control which filter category a portfolio photo appears under, **tag it in
Cloudinary**:

| Tag | Filter category |
|---|---|
| `bridal` | Bridal |
| `pre-bridal` | Pre-Bridal |
| `full-glam` | Full Glam |
| `party` | Party |
| `south-asian` | South Asian |

Untagged images default to **Bridal**.

### Before/After pairing rule

Photos in `before-after/before/` and `before-after/after/` are matched by
**filename** — `before/priya-wedding.jpg` pairs with `after/priya-wedding.jpg`.
Unmatched orphans are logged with fix instructions and skipped.

### Replacing the hero or about photo

1. [cloudinary.com](https://cloudinary.com) → **Media Library** → navigate to the folder
2. Drag & drop the new photo
3. **Either** rename it to match the current `public_id` (no code change),
   **or** give it a new name and update `config/images.ts`
4. Commit + push if you changed `config/images.ts`

---

## 7. Managing the blog

### Adding a post manually

1. Create `content/blog/{your-slug}.mdx`
2. Add the frontmatter block at the top:
   ```mdx
   ---
   title: "Your Post Title"
   date: "2026-01-15"
   excerpt: "1–2 sentence summary, 150–160 chars — used for meta description."
   category: "Bridal Tips"   # or "South Asian Weddings" / "Makeup Trends" / "GTA Weddings"
   readTime: "5 min read"
   coverImage: "yash-makeovers/blog/your-slug"
   slug: "your-slug"
   featured: false           # set true to make it the listing hero
   ---
   ```
3. Write the body in Markdown / MDX below the frontmatter
4. Upload the cover to Cloudinary at `yash-makeovers/blog/{your-slug}`
5. Commit + push — the post auto-renders at `/blog/{your-slug}`

The listing page, related-posts strip, JSON-LD Article schema, and dynamic OG
image are all generated automatically from the frontmatter.

### Hiding a post without deleting it

Set `published: false` in the frontmatter. The post stays in the repo but
disappears from `/blog` and `/blog/{slug}` on the next deploy.

### Autonomous blog engine

A new SEO-optimised post is **written and published automatically every Monday
at 9 AM EST**. No human input required after initial setup.

How it works:

1. GitHub Actions fires `.github/workflows/autonomous-blog.yml` every Monday
2. `scripts/trend-researcher.mjs` calls Claude (Sonnet 4.6) with the `web_search`
   tool to find what GTA brides are searching for right now
3. `scripts/post-writer.mjs` calls Claude with the brand brief + research + the
   list of already-published topics, and gets back a complete 600–800 word post
4. `scripts/post-publisher.mjs` writes `content/blog/{slug}.mdx`, commits, pushes
   to `main` — Vercel deploys within ~60 seconds
5. `scripts/notifier.mjs` emails Yashpreet and the developer with the live URL

**Trigger manually:**

```bash
npm run blog:write       # writes + publishes for real
npm run blog:dry-run     # writes the MDX locally, skips git push + email
```

Or from GitHub: **Actions tab → Autonomous Blog Engine → Run workflow**.

**Cost:** ~$0.02–0.05 per post on Sonnet 4.6, so ~$1–3/year for 52 posts.

**Kill switches:**

- **Pause the cron** without losing the setup: GitHub → Actions tab →
  Autonomous Blog Engine → ••• → Disable workflow
- **Hide a published post**: set `published: false` in its frontmatter
- **Delete a post**: just delete its `.mdx` file from `content/blog/`

The publisher refuses to overwrite an existing slug, so a re-run on the same day
won't clobber a manual edit.

---

## 8. Feature toggles

Every optional section of the site can be turned off without touching code by
setting the matching `FEATURE_*` env var to the literal string
`'false'` in Vercel.

The toggle module is `config/features.ts` — a thin wrapper that reads each
env var with a default of ON. Both client and server components import from
it (hence the `NEXT_PUBLIC_` prefix — these values are inlined into the
browser bundle).

| Flag | What turns off |
|---|---|
| `whatsapp` | The floating WhatsApp button (bottom-right) |
| `featuredGrid` | Homepage "Featured work" 3×3 curated grid |
| `beforeAfter` | Before/After slider on homepage + `/portfolio` |
| `priceEstimator` | Live price estimator on homepage |
| `acceptingBookings` | Inquiry form (replaced by "Not accepting bookings — WhatsApp instead" CTA) |
| `blogEngine` | Weekly autonomous blog engine (the GitHub Actions cron still fires but the script exits immediately) |
| `blogNotify` | "New post published" notification email (engine still runs and publishes) |

### Common use cases

- **Going on holiday:** set `FEATURE_ACCEPTING_BOOKINGS=false` →
  redeploy. Site stays up, form is replaced with a clear "not accepting bookings"
  message that links to WhatsApp.
- **Pausing the AI blog:** `FEATURE_BLOG_ENGINE=false` → next
  Monday's cron will fire but exit without writing a post.
- **Muting yourself from notification spam:** `FEATURE_BLOG_NOTIFY=false`
  → posts still publish; you just don't get the email.

Changing any of these in Vercel requires a redeploy (NEXT_PUBLIC_ vars are
inlined at build time).

---

## 9. Inquiry form & emails (Resend)

The 4-step inquiry form posts to `/api/inquiry`, which sends two emails via Resend:

1. **To `info@yashmakeovers.com`** — a detailed inquiry record with all form fields
2. **To the client** — a branded auto-reply confirming receipt with next steps

Both templates live in `lib/resend.ts`. The Resend client is **lazy-initialised**
so the site builds successfully even when `RESEND_API_KEY` is unset locally.

To customise the templates, edit `buildOwnerEmailHtml` and `buildClientEmailHtml`
in `lib/resend.ts`.

---

## 10. Analytics (GA4)

Google Analytics 4 is loaded via `@next/third-parties/google`, mounted in
`app/layout.tsx`. Only renders when `NEXT_PUBLIC_GA_ID` is set, so it no-ops
cleanly in local dev.

Custom events fired:

| Event | Trigger |
|---|---|
| `inquiry_form_started` | First interaction with any inquiry form field |
| `inquiry_form_completed` | Successful form submit (params: `service`, `city`) |
| `whatsapp_clicked` | Floating WhatsApp button click |
| `portfolio_filtered` | Portfolio category chip click (param: `category`) |
| `estimator_used` | First interaction with the price estimator |

The event helper is in `lib/analytics.ts` — typed event names so reports stay clean.

---

## 11. SEO & performance

Everything below is **automatic** — no per-page action needed:

- **`sitemap.xml` + `robots.txt`** — generated by next-sitemap on every build
- **Canonical URLs** — set in `generateMetadata()` on every page
- **`lang="en-CA"`** — set on the html element
- **Structured data (JSON-LD)**:
  - `LocalBusiness` (BeautyStudio) on the homepage with aggregateRating
  - `BreadcrumbList` on every inner page
  - `FAQPage` on each city page
  - `Article` + `BreadcrumbList` on each blog post
- **Dynamic OG images** — `next/og` generates 1200×630 cards per route
- **301 redirects** from 7 years of WordPress URLs (in `next.config.mjs`)
- **Image optimisation** — WebP/AVIF, lazy loading, Cloudinary LQIP blur placeholders
- **Security headers** — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy` (set in `vercel.json`)
- **Immutable cache headers** for `/fonts/*` and `/_next/static/*`

Before launch, verify with [Google Rich Results Test](https://search.google.com/test/rich-results).

---

## 12. Deploying to Vercel (zero-downtime migration plan)

The existing `yashmakeovers.com` WordPress site has 7 years of SEO equity.
Do not touch DNS until the new site is fully tested.

### Step 1 — Deploy to Vercel

1. Push the repo to GitHub
2. [vercel.com/new](https://vercel.com/new) → import the repo
3. Framework preset: **Next.js** (auto-detected)
4. Add all environment variables from section 4
5. Click **Deploy** — site goes live at `yash-makeovers.vercel.app`

### Step 2 — Test everything on the vercel.app URL

- [ ] All pages load
- [ ] Inquiry form submits → email arrives at `info@yashmakeovers.com`
- [ ] Auto-reply arrives at the test address
- [ ] WhatsApp floating button opens chat with the prefilled message
- [ ] Featured work grid loads (if photos exist in `yash-makeovers/featured/`)
- [ ] Mobile layout works on a real phone
- [ ] Redirects: `/packages` → `/services`, `/bridal-hair-and-makeup-artist-in-brampton` → `/brampton`
- [ ] Run Lighthouse — target **90+** on Performance / Accessibility / Best Practices / SEO

### Step 3 — Add custom domain in Vercel

- Vercel Dashboard → Project → Settings → Domains
- Add `yashmakeovers.com` and `www.yashmakeovers.com`
- Vercel shows the DNS records to add (see section 13)

### Step 4 — Update DNS at the domain registrar

Add the records in section 13. Propagation: 5–30 minutes typically.
Vercel auto-provisions the SSL certificate — no action needed.

### Step 5 — Verify live

- Visit `https://yashmakeovers.com` — confirm the new site loads
- Confirm the SSL padlock shows
- Submit a test inquiry — confirm emails arrive
- Re-test all redirects on the live domain

### Step 6 — Google Search Console

- [search.google.com/search-console](https://search.google.com/search-console)
- Submit the sitemap: `https://yashmakeovers.com/sitemap.xml`

### Step 7 — Cancel WordPress hosting

Wait **2 weeks**, monitor traffic and inquiries, then cancel the old plan.

---

## 13. DNS records

Add these at the domain registrar where `yashmakeovers.com` is registered.

| Type | Host | Value | TTL |
|---|---|---|---|
| **A** | `@` (root) | `76.76.21.21` | 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 |

Once these are added, Vercel detects them within a few minutes, validates the
domain, and issues an SSL certificate automatically.

If your registrar uses Cloudflare proxy:

- Set both records to **DNS only** (grey cloud) during initial validation
- After Vercel verifies, you can re-enable the orange cloud (proxy)

---

## 14. npm scripts reference

```bash
npm run dev            # local dev server (http://localhost:3000)
npm run build          # production build + sitemap generation
npm run start          # serve the production build locally
npm run lint           # next/eslint check
npm run blog:write     # autonomous blog engine — full run (writes, commits, pushes, emails)
npm run blog:dry-run   # autonomous blog engine — writes MDX locally only
```

---

## 15. Troubleshooting

**Build fails with `Missing API key. Pass it to the constructor`:**
You're running a build with a route that touches Resend without `RESEND_API_KEY`
set. The client is lazy — should only fail at request time. If it fails at build
time, you likely added a top-level `new Resend()` call somewhere. Move it into
the request handler.

**Portfolio grid shows placeholder cards:**
Either `CLOUDINARY_CLOUD_NAME` is unset, or the `yash-makeovers/portfolio/`
folder is empty. Upload at least one photo and tag it.

**Featured work grid is empty:**
The Cloudinary folder `yash-makeovers/featured/` has no images that pass shape
validation. Either upload some 1:1 square photos, or check Vercel logs for the
`[cloudinary] Skipping ...` warnings — they tell you exactly which uploads
were the wrong shape and what to fix.

**Section disappeared after a deploy:**
Check Vercel env vars for any `FEATURE_*` flag set to `'false'`.
Toggle it back to `'true'` and redeploy.

**Autonomous blog engine workflow fails:**
Check the GitHub Actions log. Common causes:
- `ANTHROPIC_API_KEY` not set in repo Secrets
- Claude returned non-JSON (rare with Sonnet 4.6, but possible) — re-run manually
- `git push` rejected because the branch protection rules require PRs.
  Solution: relax `main` branch protection or change the workflow to open a PR.

**`.env.local` changes aren't picked up:**
Next.js reads env files only at startup. Stop the dev server (`Ctrl+C`) and
run `npm run dev` again.

---
