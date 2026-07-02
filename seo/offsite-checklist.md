# Off-Site SEO Checklist — Yash Makeovers (owner tasks)

These are the tasks that happen **outside the website** — Google Business
Profile, directories, and link building. None of them require code changes.
Work top-to-bottom; the GBP items move rankings fastest.

On-site support already live on the `seo-improvements` branch: 4 occasion
pages (`/party-makeup`, `/prom-makeup`, `/engagement-makeup`,
`/photoshoot-makeup`), non-bridal sections on all 10 city pages, and
FAQ/Person structured data.

---

## 1. Google Business Profile (highest impact)

- [ ] **Confirm primary category is "Make-up artist"** — it must stay in sync
      with the site (`site.businessCategory`) and the schema the site emits.
- [ ] **Add ALL services** to the GBP Services section, matching the site's
      package and page names: Bridal Makeup & Hair, Pre-Bridal (Mehndi /
      Sangeet / Engagement), Full Glam, Regular Party, **Party Makeup, Prom
      Makeup & Hair, Engagement & Reception Makeup, eShoot / Pre-Wedding
      Photoshoot Makeup**.
- [ ] **Post weekly** — one photo post per week (recent work, no client names
      without permission). Posts keep the profile "active" in local ranking.
- [ ] **Review asks that mention service + city.** When asking a happy client
      for a review, ask them to mention what they booked and where, e.g.
      "party makeup in Brampton", "engagement makeup in Mississauga".
      Non-bridal review text is what unlocks non-bridal local-pack visibility.
- [ ] **Consider switching to a Service Area Business** (hides the home
      address, shows the service area instead). ⚠️ Risk: triggers
      re-verification and a temporary ranking wobble — do this in **low
      season (Nov–Feb)**, never mid-summer.
- [ ] **Verify the live review count/rating** shown on the site (currently
      4.9★ / 162 in `config/site.ts`) still matches GBP at each deploy.

## 2. Citation cleanup (NAP consistency)

The old studio address (**45 Devonsleigh Dr**) still exists on some
third-party sites. Every listing must say **27 Divinity Circle, Brampton, ON
L7A 3Y3** — or city-only ("Brampton, ON") where a street address is optional.

- [ ] ZoomInfo — request correction / removal of the old address
- [ ] Yelp — claim the listing, update address, category "Makeup Artists"
- [ ] Flickr — old address in profile/photo metadata; update or remove
- [ ] WeddingWire — update address; refresh packages to match current pricing
- [ ] Search `"45 Devonsleigh" "Yash"` monthly to catch stragglers

## 3. Directory listings (one per city focus)

Add or claim listings with the exact same NAP + a link to the matching city
page (not just the homepage):

- [ ] WeddingWire.ca (link `/brampton`)
- [ ] Weddingful / Todaysbride.ca
- [ ] Fresha / StyleSeat-type booking directories (if used, keep NAP exact)
- [ ] Local chamber / Brampton Board of Trade
- [ ] Instagram bio link check — points at the canonical `www` host

## 4. Link building (steady drip, not a blitz)

- [ ] **Venue vendor lists** — the site's city pages name the venues worked
      at (Embassy Grand, Pearson Convention Centre, Paramount EventSpace,
      Crystal Fountain, etc.). Ask each venue's events team to be added to
      their "preferred/recommended vendors" page — that's a local, relevant
      backlink Google trusts.
- [ ] **Photographer cross-links** — the photographers credited in the
      Instagram work (and in city-page work blocks) each have websites;
      swap "vendors I work with" links.
- [ ] **GTA wedding blogs** — pitch one real wedding (with the couple's
      permission) per season to a GTA wedding blog; the vendor credit links
      back.

## 5. Google Search Console (monthly, 15 minutes)

- [ ] Submit the sitemap once the branch deploys (it now includes the 4 new
      service pages): `https://www.yashmakeovers.com/sitemap.xml`
- [ ] Request indexing for the 4 new URLs on launch day.
- [ ] **Monitor non-bridal queries monthly**: filter Performance report for
      queries containing "makeup artist", "party", "prom", "eshoot" —
      watch impressions grow before clicks; that's normal.
- [ ] **Rollback tripwire** (applies to the Phase A title changes when they
      ship): if any bridal query drops >3 average positions for 2 consecutive
      weeks, revert that page's metaTitle to the value recorded in
      `seo/baseline/pages.json`.

---

*Generated 2026-07-02 as part of the SEO plan v2 rollout (Phase E). On-site
phases C, B, D are implemented in code on the `seo-improvements` branch;
Phase A (title changes) ships separately after owner approval.*
