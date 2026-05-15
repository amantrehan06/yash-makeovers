# How to upload photos to your website

This is your one-stop guide for managing every photo on **yashmakeovers.com**.
No code knowledge needed — just follow the folder names and shape rules below.

---

## Where to upload photos

All photos live on **Cloudinary** — a service that stores and serves images
for your website.

### On a computer

1. Go to **[cloudinary.com](https://cloudinary.com)** and log in
2. Click **Media Library** in the left sidebar
3. You'll see a list of folders that look like this:
   ```
   yash-makeovers/
     about/
     before-after/
     blog/
     featured/
     hero/
     portfolio/
   ```
4. Click into a folder, then drag photos onto the page to upload

### On your phone (recommended)

1. Install the **"Cloudinary Console"** app from the App Store / Google Play
2. Log in once — it remembers you
3. Tap the folder you want, then tap **+** and pick photos from your gallery

The phone app is the fastest way — you can upload right after a shoot
without moving photos to a computer.

---

## The six folders and what they're for

Every folder has a **maximum number of photos** and a **required shape**. If
you upload too many, the website only shows the most recent ones. If you upload
the wrong shape, the website will skip it (more on that at the bottom).

### 1. `yash-makeovers/hero/` — the big photo at the top of the homepage

- **Max:** 1 photo
- **Shape:** **landscape** (wider than tall, like a movie screen)
- **Best size:** 1920 × 1080 pixels (16:9)
- **What it shows:** the hero image visitors see first when they land on the site

### 2. `yash-makeovers/about/` — your portrait on the About page

- **Max:** 1 photo
- **Shape:** **portrait** (taller than wide)
- **Best size:** 1200 × 1600 pixels (3:4)
- **What it shows:** your photo next to the bio on the "About" page

### 3. `yash-makeovers/featured/` — the curated grid on the homepage

- **Max:** 9 photos
- **Shape:** **square**
- **Best size:** 1080 × 1080 pixels (1:1 — same shape as Instagram posts)
- **What it shows:** your best 6–9 looks in a tidy grid below the testimonials
- **Tip:** these are *handpicked* — they replace the old auto-pulled Instagram
  feed. Treat them like an Instagram "highlights" reel.

### 4. `yash-makeovers/portfolio/` — the big grid on the Portfolio page

- **Max:** 50 photos
- **Shape:** **portrait** (taller than wide)
- **Best size:** 1200 × 1600 pixels (3:4)
- **What it shows:** the masonry grid visitors browse on `/portfolio`
- **Tip:** add a **tag** to each photo in Cloudinary so it shows in the right
  filter category:

  | Tag | Filter category |
  |---|---|
  | `bridal` | Bridal |
  | `pre-bridal` | Pre-Bridal |
  | `full-glam` | Full Glam |
  | `party` | Party |
  | `south-asian` | South Asian |

  Untagged photos appear under **Bridal** by default.

### 5. `yash-makeovers/before-after/` — the transformation slider

This is split into **two folders side-by-side**:

- `yash-makeovers/before-after/before/` (max 10 photos)
- `yash-makeovers/before-after/after/`  (max 10 photos)

- **Shape:** **square**
- **Best size:** 1080 × 1080 pixels (1:1)
- **What it shows:** the drag-to-reveal slider in the homepage and `/portfolio`

#### Naming rule for pairs

**The filename has to match.** If your "before" photo is named `priya-2026`,
the "after" photo must also be named `priya-2026`. The website pairs them up
by name.

Example — correct:
```
before/priya-2026.jpg
after/priya-2026.jpg     ← same name → paired ✅
```

Example — broken:
```
before/priya-2026.jpg
after/priya-after.jpg    ← different name → website ignores both ❌
```

If a pair is broken, nothing crashes — the photo just won't appear, and the
developer can see a note in the logs telling them what's missing.

### 6. `yash-makeovers/blog/` — cover photos for blog articles

- **Shape:** **landscape**
- **Best size:** 1920 × 1080 pixels (16:9)
- **Naming:** the filename must match the blog post URL slug.
  e.g. for the post at `/blog/bridal-makeup-artist-brampton`, the file is
  `bridal-makeup-artist-brampton`.

---

## Shapes explained simply

A "shape" is whether the photo is square, taller than wide, or wider than tall.

| Shape | Looks like | Used for |
|---|---|---|
| **Square** (1:1) | ⬜ Same width and height | featured, before-after |
| **Portrait** (3:4) | 📱 Taller than wide, like a phone screen | about, portfolio |
| **Landscape** (16:9) | 🖥️ Wider than tall, like a TV | hero, blog covers |

Most phones can crop a photo into any shape:

- **iPhone:** open photo → Edit → Crop → swap the ratio at the bottom
- **Android:** open photo → Edit → Crop → choose ratio

---

## What happens if you upload the wrong shape

**Nothing breaks.** The website is built to handle this gracefully.

When the site rebuilds (within an hour), it checks the shape of every photo.
If a photo is the wrong shape for its folder, it's **silently skipped** — it
stays in Cloudinary but doesn't appear on the site.

The developer gets a clear log message that says exactly:

- Which photo was skipped
- Which folder it was in
- What shape it should have been
- What shape it actually is
- How to fix it (re-upload at the right ratio)

So if you accidentally upload a landscape photo to the portfolio folder
(which needs portrait), nothing visible breaks — just ask the developer or
log into Cloudinary, crop the photo, and re-upload.

---

## How long until the website updates?

About **1 hour** after you upload.

The website rebuilds itself on a schedule to pick up new Cloudinary photos —
this avoids needing the developer to "push a deploy" every time you swap a
photo. If you need a faster update, just message the developer and they can
trigger a rebuild manually.

The **only** photos that update instantly are blog cover images — those go
live the moment a blog post is published.

---

## Quick checklist before uploading

- [ ] Right folder?
- [ ] Right shape (square / portrait / landscape)?
- [ ] For portfolio: did you add a category tag (`bridal`, `pre-bridal`, etc.)?
- [ ] For before-after pairs: do both files have the **same filename**?
- [ ] For blog covers: does the filename match the blog post slug?

If all five are yes, your photo will appear on the site within an hour.

---

## Need help?

Just text the developer with:
- A screenshot of the photo you're trying to upload
- The folder you're trying to upload to
- The error message (if any)

The skipped-photo log will say what's wrong — usually it's just a quick crop fix.
