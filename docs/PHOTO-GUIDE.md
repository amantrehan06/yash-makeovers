# How to upload photos to your website

This is your one-stop guide for managing every photo on **yashmakeovers.com**.
No code knowledge needed — just follow the folders and tags below.

---

## Where to upload photos

All photos live on **Cloudinary** — a service that stores and serves images
for your website.

### On a computer

1. Go to **[cloudinary.com](https://cloudinary.com)** and log in
2. Click **Media Library** in the left sidebar
3. You'll see this folder structure:
   ```
   yash-makeovers/
     about/         (your portrait on the About page)
     before-after/  (transformation slider — split into before/ and after/)
     blog/          (cover photos for blog posts)
     hero/          (the big photo at the top of the homepage)
     portfolio/     (ALL gallery photos — homepage + portfolio page)
   ```
4. Click into a folder, then drag photos onto the page to upload

### On your phone (recommended)

1. Install the **"Cloudinary Console"** app from the App Store / Google Play
2. Log in once — it remembers you
3. Tap a folder, then tap **+** and pick photos from your gallery

The phone app is the fastest way — you can upload right after a shoot
without moving photos to a computer.

---

## The big idea — one folder for ALL gallery photos

You used to need separate folders for "featured" vs "portfolio" photos.
**Not anymore.** Now all gallery photos go in **one folder**:
`yash-makeovers/portfolio/`

To control where each photo appears, you add **tags** in Cloudinary:

- Tag a photo with **`featured`** → it shows on the homepage spotlight
- Tag a photo with a category (`bridal`, `pre-bridal`, etc.) → it groups
  under that filter button on the `/portfolio` page

A photo can have **multiple tags**. Example: a wedding ceremony photo with
`featured` + `bridal` + `south-asian` shows in 4 places:

1. ✨ Homepage spotlight (because of `featured`)
2. 📂 Portfolio page → "All" tab
3. 📂 Portfolio page → "Bridal" filter
4. 📂 Portfolio page → "South Asian" filter

---

## The folders explained

### 1. `yash-makeovers/hero/` — the big photo at the top of the homepage

- **How many:** 1 photo
- **Shape:** landscape (wider than tall, like a movie screen)
- **Best size:** 1920 × 1080 pixels
- **What it shows:** the very first photo visitors see

### 2. `yash-makeovers/about/` — your portrait on the About page

- **How many:** 1 photo
- **Shape:** portrait (taller than wide, like a phone screen)
- **Best size:** 1200 × 1600 pixels
- **What it shows:** your photo next to your bio on `/about`

### 3. `yash-makeovers/portfolio/` — ALL gallery photos ⭐

- **How many:** up to 50 photos
- **Shape:** portrait (taller than wide)
- **Best size:** 1200 × 1600 pixels
- **What it shows:**
  - The full grid on `/portfolio` (all 50 photos)
  - The homepage spotlight section (the photos you tag with `featured`)

#### Tags to use

After uploading a photo, click on it in Cloudinary → scroll down to **"Tags"**
→ type one or more of these:

| Tag | What it does |
|---|---|
| `featured` | Photo appears on the homepage spotlight (up to 6 shown) |
| `bridal` | Shows under "Bridal" filter on the portfolio page |
| `pre-bridal` | Shows under "Pre-Bridal" filter (Rokah, Mehndi, Sangeet, etc.) |
| `full-glam` | Shows under "Full Glam" filter (shoots, baby showers, sister weddings) |
| `party` | Shows under "Party" filter (everyday events) |
| `south-asian` | Shows under "South Asian" filter |

You can add multiple tags to one photo. If you don't add a category tag,
the photo shows under **Bridal** by default.

### 4. `yash-makeovers/before-after/` — the transformation slider

Split into two folders:
- `yash-makeovers/before-after/before/` (up to 10 photos)
- `yash-makeovers/before-after/after/` (up to 10 photos)

- **Shape:** square (1:1)
- **Best size:** 1080 × 1080 pixels

#### Naming rule for pairs

The filename of the "before" and "after" photo **must match** to be paired.

✅ Correct:
```
before/priya-2026.jpg
after/priya-2026.jpg     ← same name → paired
```

❌ Broken:
```
before/priya-2026.jpg
after/priya-after.jpg    ← different name → website skips both
```

### 5. `yash-makeovers/blog/` — cover photos for blog articles

- **Shape:** landscape (1920 × 1080 pixels)
- **Naming:** filename must match the blog post URL.
  e.g. for `/blog/bridal-makeup-artist-brampton`, the file is named
  `bridal-makeup-artist-brampton`.

---

## How to make a photo "featured" on the homepage

The homepage has a section that spotlights your **best 6 photos**. Here's
how to add or remove a photo from that spotlight:

### To make a photo featured

1. Open the photo in Cloudinary
2. Click the **Tags** section
3. Type **`featured`** → press Enter
4. Done! Within an hour, the photo appears on the homepage spotlight.

### To remove a photo from featured

1. Open the photo in Cloudinary
2. Click the **`featured`** tag → click the **X** to remove it
3. Done! The photo disappears from the homepage spotlight, but stays in
   the portfolio gallery.

**No need to move or re-upload anything.** Just toggle the tag.

---

## How to control the order of photos

Photos are shown **alphabetically by filename**.

To force a specific order, rename photos with **two-digit prefixes**:

| Filename | Position |
|---|---|
| `01-jasmine-bride.jpg` | 1st |
| `02-priya-wedding.jpg` | 2nd |
| `03-mehndi-look.jpg` | 3rd |
| `10-sangeet-glow.jpg` | 10th |

⚠️ Use 2 digits (`01`, not `1`) — otherwise `10` sorts before `2`.

### To rename a photo in Cloudinary

1. Click the photo → side panel opens
2. Click the **three dots (⋮)** next to the filename
3. Click **"Rename"**
4. Type the new name → save

You can rename anytime — the photo stays at its current Cloudinary location,
just with a different name. The order on the website updates within an hour.

---

## Shapes explained simply

| Shape | Looks like | Used for |
|---|---|---|
| **Square** (1:1) | ⬜ Same width and height | before-after |
| **Portrait** (3:4) | 📱 Taller than wide, like a phone | about, portfolio |
| **Landscape** (16:9) | 🖥️ Wider than tall, like a TV | hero, blog covers |

Most phones can crop into any shape:

- **iPhone:** open photo → Edit → Crop → swap the ratio at the bottom
- **Android:** open photo → Edit → Crop → choose ratio

---

## What if I upload the wrong shape?

**Nothing breaks.** The website uses Cloudinary's smart-crop AI — it
auto-detects the subject (face) and crops around it. So even if you upload
a portrait photo to the hero folder, it'll still display, just less ideal.

For best quality, try to match the recommended shape. But don't stress —
the site won't break.

---

## How long until the website updates?

About **1 hour** after you upload. The site rebuilds itself on a schedule
to pick up new Cloudinary photos. If you need a faster update, message the
developer and they'll trigger a manual rebuild.

---

## Quick checklist before uploading

- [ ] Right folder?
- [ ] For portfolio photos: did you add a category tag (`bridal`, `pre-bridal`, etc.)?
- [ ] Want this on the homepage spotlight? Add the `featured` tag.
- [ ] For before-after pairs: do both files have the **same filename**?
- [ ] For blog covers: does the filename match the blog post slug?

---

## Need help?

Just text the developer with:
- A screenshot of the photo you're trying to upload
- The folder you're trying to upload to
- The error message (if any)
