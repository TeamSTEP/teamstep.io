# Team STEP — Landing Page Project Specification

> Handoff document for implementation. Covers design system, page structure, component architecture, data model, and tech stack.  
> **Experience source of truth:** [`wireframe-v3-hybrid.html`](./wireframe-v3-hybrid.html) (approved).  
> **Tech stack:** Astro 7 + Vercel + git Content Collections — locked in §9.

---

## 1. Project Overview

**Studio:** Team STEP — indie game studio  
**Output:** Single-page marketing site (landing page)  
**Wireframe:** Hybrid boot chapter scroll (v3)

**Primary goals:**
- Land studio identity, then convert on Meltdown (demo play + wishlist)
- Scale a catalog of original games (released, prototypes, archive) without stacking more full-viewport stages
- Keep portfolio / client work visually and structurally separate from originals
- Communicate vision and outsourcing services
- Surface live social content (Bluesky, Substack, YouTube, Discord)
- Feel like a mini game — interactive, animated, retro-punk — without obscuring content

---

## 2. Brand & Design System

Consume tokens and primitives from `@teamstep/design-system` where available. Local overrides only when the landing page needs page-specific composition.

### 2.1 Colour Tokens

```css
/* Brand foundation */
--color-void:      #231630; /* page background — always dark */
--color-void-deep: #060610; /* BBS / Signal section */
--color-shadow:    #2d1e3e;
--color-mid:       #4F476D;
--color-muted:     #8a8db2; /* WCAG-adjusted secondary text */
--color-accent:    #8591C9; /* primary lilac */
--color-ice:       #E9F1F2; /* near-white text */

/* Game-world accents — scoped to original-game UI only */
--color-green:     #3C7A45;
--color-green-hi:  #5CBA6A;
--color-amber:     #9a6a18;
--color-amber-hi:  #D4A830;
--color-blood:     #6B2020;
--color-blood-hi:  #C94040;

/* UI chrome — portfolio + non-game chrome */
--color-teal:      #2a6070;
--color-teal-hi:   #4A9BAF;
```

**Rules:**
- Background is always `--color-void` or darker. Never light backgrounds.
- Logo must always sit on a background darker than itself.
- Game accents (green, blood, amber-as-game-status) are used only within original-game card / stage scope.
- Portfolio uses teal chrome only — never green/blood game accents.
- Gradient (`--color-accent` → `--color-muted`) used subtly and sparingly.

### 2.2 Typography

Self-host all fonts. Use `font-display: swap`.

| Role | Brand font | Web equivalent | Usage |
|---|---|---|---|
| Headings / wordmark | Carbon | **Rajdhani Bold** | Uppercase only, section titles, boot H1, game titles |
| Subtitles / italic accent | Acumin | **Nunito Italic** | Taglines, secondary labels |
| Body / UI text | Bahnschrift | **Barlow Condensed** | Body copy, BBS feed, badges |

### 2.3 Corner Radius Rule

**Top-left + bottom-right corners only.** Never all four.  
Apply via: `border-radius: 2px 12px 2px 12px` (scale by component size).  
Mirrors the logo geometry. Apply consistently to cards, CTAs, and badges.

### 2.4 Key Effects

**Pixel grid** (boot background):
```css
background-image:
  repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(79,71,109,0.12) 20px),
  repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(79,71,109,0.12) 20px);
```

**Scanline overlay** (non-interactive, `pointer-events: none`):
```css
background: repeating-linear-gradient(
  0deg, transparent, transparent 2px,
  rgba(10,8,24,0.10) 2px, rgba(10,8,24,0.10) 4px
);
```

**Vignette overlay** (same wrapper as scanline on Signal panels):
```css
background: radial-gradient(ellipse at center, transparent 55%, rgba(6,6,16,0.7) 100%);
```

### 2.5 CTA Hierarchy

| Type | Style | Use case |
|---|---|---|
| Primary | Green fill + border | Playable original-game CTAs |
| Secondary | Amber border only, `--color-amber-hi` text | Wishlist / prototype follow / contact |
| Ghost | Dark border, muted text | Boot Enter, archive download, inspect, portfolio “View case” |

### 2.6 Sizing principles

- Section padding ~64–96px desktop.
- Boot H1 ~`clamp(56px, 8vw, 88px)`; Meltdown title ~`clamp(48px, 6vw, 72px)`; body ~18–22px.
- Text content max-width ~1120–1280px; Meltdown media full-bleed within the stage.
- One focal job per chapter; secondary UI stays quiet.
- Catalog grows in **density** (more compact cards), not more ~100vh stages.

---

## 3. Page Structure

Single scroll page. Chapter IDs used for HUD / anchor navigation.

```
#boot → #meltdown → #quest-log → #bbs-board → #manifesto → #services → #footer
```

`#portfolio` is an in-section anchor inside `#services` (Selected work), not a separate HUD item.

### Experience arc

| Chapter | ID | Viewport | Job | Primary CTA |
|---|---|---|---|---|
| Boot | `#boot` | ~55–65vh | Land brand | Ghost: ▶ Enter |
| Meltdown | `#meltdown` | ~100vh | Convert (featured original) | Play + Wishlist |
| Quest Log | `#quest-log` | auto | Catalog other originals | Per-card play / download |
| Signal | `#bbs-board` | ~70vh | Live social presence | Open platform post |
| Manifesto | `#manifesto` | ~70vh | Values / emotion | none |
| Work | `#services` | ~70vh | Services + portfolio | Get in touch / View case |
| Credits | `#footer` | auto | End | Social icons |

### Section 01 — Boot `#boot`

- **Height:** ~55–65vh (not 80/100vh). Bottom edge peeks Meltdown key art for continuity.
- **Layout:** Brand-first. Eyebrow italic (“indie game studio”), wordmark **TEAM STEP**, one tagline, one ghost CTA **▶ Enter**, scroll cue. Desktop: logo mark with idle float ring on the right. Full-bleed `--color-void` + pixel grid (not inset cards).
- **Mobile:** No floating logo mark. “Tap anywhere to explore” replaces scroll cue.
- **Note:** Enter is ambient studio navigation into the experience — not a game CTA. Conversion is `#meltdown`.

### Section 02 — Meltdown stage `#meltdown`

- **Height:** ~100vh conversion stage for the single `featured: true` original.
- **Content:** Badges (Main Quest + In Development as applicable), full-bleed key art / looping WebM (VideoFacade → trailer on click), subtitle, title, short description.
- **CTAs:** Flat row — primary play CTAs (available platforms) + secondary wishlist / coming-soon. **No nested Platform Access panel** with section headers.
- **Accent:** Green scoped to this stage only.
- **Rule:** At most one featured stage on the page. A second shipping title becomes a high-emphasis Quest Log card, not a second full-bleed stage.
- **Mobile:** Stack art → copy → full-width CTA column (always visible, no hover).

### Section 03 — Quest Log `#quest-log`

- **Content:** All **original** games where `featured !== true`, grouped by `phase`.
- **Groups (omit empty groups):**
  1. **Released** — green-leaning compact cards, play/store CTAs
  2. **Prototypes** — amber compact cards, play-build / follow CTAs
  3. **Archive** — legacy/paused, reduced opacity (~0.72), blood accent when game-scoped, ghost download CTA
- **Layout:** Compact cards (2-col desktop where multiple; stack on mobile). Never full-viewport.
- **Ownership:** `kind: original` only. Portfolio never appears here.

### Section 04 — Signal (BBS) `#bbs-board`

- **Background:** `--color-void-deep` (`#060610`)
- **Interaction:** Tab switching; one feed panel visible at a time. Desktop: plain platform names (Bluesky · Substack · YouTube · Discord). Mobile: short pills (Bsky / Sub / YT / DC) + swipe.
- **Platforms:** Bluesky [API], Substack [API], YouTube [API], Discord [iframe]
- **Chrome:** Quiet terminal (dots, title bar, scanline + vignette). **No F-key labels. No API / WIDGET badges.**
- **Discord:** CSS filter on iframe: `brightness(0.85) saturate(0.65) hue-rotate(225deg)`. Scanline on top. Test Chrome **and** Safari.

### Section 05 — Manifesto `#manifesto`

- **Background:** `--color-void` full bleed
- **Layout:** Large uppercase display line centred (“Creativity is a human right.”). Below: dialogue box with logo mark avatar + mission copy.
- **Animation:** Typewriter on dialogue text, first scroll into view.
- **Values:** “Creativity is a human right.” · “One step at a time.” · “Building the home for the indie game world.”

### Section 06 — Work `#services`

Two blocks in one chapter:

1. **Services (“What we build”)** — Game Development · Gamification · Visual Art. Lean items (not heavy cards). “Inspect ↗” → slide-up modal (desktop) / bottom sheet (mobile). Desktop 3-col; mobile 2-col with odd item full-width.
2. **Selected work (`#portfolio`)** — Client / commission projects (`kind: portfolio`). Teal chrome, Portfolio badge, client + year, “View case ↗”. Never mixed into Quest Log.

- **Footer CTA:** “Get in touch →” centred below both blocks, secondary (amber border) style.

### Section 07 — Credits `#footer`

- **Background:** `--color-void` blending to near-black
- **Layout:** Centred logo mark, studio name, tagline, social icons (Bluesky, Substack, YouTube, Discord)
- **Aesthetic:** End-credits screen

---

## 4. Navigation

### Desktop — Sticky Top Bar

- 64px · transparent → frosted glass (`--color-void` ~80% + `backdrop-filter: blur`) on scroll
- Left: logo · Centre: HOME · GAMES · FEED · WORK · Right: ghost CONTACT

### Mobile — Bottom HUD

- Replaces hamburger
- HOME · GAMES · FEED · WORK — 44px min tap targets, labels always visible, lilac active dot
- Active state via `IntersectionObserver` on `[data-section]`

### Anchor mapping

| Nav item | Scroll target |
|---|---|
| HOME | `#boot` |
| GAMES | `#meltdown` (Quest Log is continuation of the same nav intent) |
| FEED | `#bbs-board` |
| WORK | `#services` |
| CONTACT | `mailto:` or simple contact link (form optional later) |

---

## 5. Content Data Model

Content lives in git as Astro Content Collections (YAML). Field names below are authoritative.

### 5.1 Originals (`kind: original`)

```typescript
{
  kind: 'original'
  title: string
  slug: string
  subtitle: string
  description: string
  phase: 'shipping' | 'released' | 'prototype' | 'paused' | 'legacy'
  featured: boolean        // at most one true site-wide; drives #meltdown stage
  sortOrder: number        // order within phase group
  platforms: Array<{
    platform: 'steam' | 'itch' | 'gog' | 'epic' | 'browser'
    tier: 'demo' | 'full' | 'free' | 'dlc'
    label: string
    url: string            // URL
    available: boolean     // false → secondary/wishlist or “coming soon” treatment
  }>
  media: {
    poster: string         // /games/{slug}/poster.webp (public path)
    loop?: string          // WebM under public/
    trailer?: string       // YouTube URL
  }
}
```

**Phase → UI**

| `phase` | Where | Opacity | Badge | Default CTA tone |
|---|---|---|---|---|
| `shipping` + `featured` | `#meltdown` stage | 100% | Main Quest (+ In Development if needed) | Primary play + secondary wishlist |
| `shipping` (not featured) | Quest Log (top of Released or own “Shipping” group) | 100% | Shipping | Primary |
| `released` | Quest Log · Released | 100% | Released | Primary |
| `prototype` | Quest Log · Prototypes | 100% | Prototype | Secondary |
| `paused` / `legacy` | Quest Log · Archive | ~72% | Legacy / Paused | Ghost |

### 5.2 Portfolio (`kind: portfolio`)

```typescript
{
  kind: 'portfolio'
  title: string
  slug: string
  client: string
  year: number
  description: string
  sortOrder: number
  caseUrl?: string         // external or internal case study
  media: { poster: string }
}
```

Renders only under Work → Selected work. Badge: **Portfolio**. Chrome: teal. CTA: ghost “View case”.

### 5.3 Seed originals (current)

**Meltdown** — `phase: shipping`, `featured: true`, sortOrder 1  
Platforms: itch demo (available), Steam demo (available), Steam full / wishlist (`available: false` until release).

**Witch One: Crucible** — `phase: legacy`, `featured: false`, sortOrder 1 within archive  
Platform: itch free download (available).

Quest Log wireframe also shows placeholder Released / Prototype cards to document density; replace with real entries when available. Empty groups are omitted in production.

### 5.4 CTA derivation (replaces nested Platform Access panel)

```typescript
const playable = platforms.filter(p => p.available)   // → primary CTAs
const pending  = platforms.filter(p => !p.available)  // → secondary CTAs
// Hide either set if empty — no empty headings
```

---

## 6. Social Feed API Integrations

All three API sources share a `UnifiedPost` interface. Discord is iframe-only.

### 6.1 UnifiedPost

```typescript
export interface UnifiedPost {
  platform: 'bluesky' | 'substack' | 'youtube'
  id: string
  author: string
  text: string
  url: string
  date: string   // ISO 8601
  thumb?: string // YouTube only
}
```

### 6.2 Sources

| Platform | Source | Auth |
|---|---|---|
| Bluesky | AT Protocol public API — `teamstep.bsky.social` | None |
| Substack | RSS — `https://teamstep.substack.com/feed` | None |
| YouTube | RSS — `feeds/videos.xml?channel_id=` | Channel ID env |
| Discord | Official widget iframe | Server ID env |

Cache target: ~5 minutes (`s-maxage=300, stale-while-revalidate`) on `GET /api/feed` (Astro server endpoint on Vercel).

### 6.3 Discord iframe treatment

```html
<iframe
  src="https://discord.com/widget?id={SERVER_ID}&theme=dark"
  style="filter: brightness(0.85) saturate(0.65) hue-rotate(225deg)"
  loading="lazy"
  title="Team STEP Discord server"
/>
<!-- scanline + vignette overlays on top -->
```

---

## 7. Component Map

Prefer `.astro` for static sections; hydrate only Signal (and minimal nav scripts) as needed.

| Component | Notes |
|---|---|
| `BaseLayout` | Head, fonts, OG meta, JSON-LD, global CSS |
| `NavDesktop` | Sticky top bar, anchor links |
| `NavHUD` | Mobile bottom HUD + IntersectionObserver |
| `Boot` | Pixel grid, brand, Enter CTA, Meltdown peek |
| `FeaturedStage` | Featured original conversion stage + flat CTA row |
| `QuestLog` | Groups originals by phase; omits empty groups |
| `GameCardCompact` | Released / prototype / archive cards |
| `Badge` | Variant → colour + label + optional pulse |
| `VideoFacade` | Poster + WebM; YouTube iframe on click |
| `SocialFeed` | Client tab UI + feed fetch / cache |
| `BBSTerminal` | Quiet terminal chrome, tabs, scanline/vignette |
| `BBSPanelAPI` | Renders `UnifiedPost[]` |
| `BBSPanelIframe` | Filtered Discord iframe |
| `DialogueBox` | Manifesto NPC dialogue |
| `ServiceCard` | Inventory item → modal / bottom sheet |
| `PortfolioCard` | Teal portfolio case card |
| `Footer` | Credits end screen |

**Removed vs v1 spec:** nested `PlatformAccess` panel UI; F-key / API-WIDGET BBS chrome; single `GameCardFeatured` used as the only game layout (featured is now `FeaturedStage`).

---

## 8. Client Behaviour

Vanilla or light framework islands — prefer minimal client JS.

| Concern | Behaviour |
|---|---|
| Animations | Scroll boot-in per chapter; logo idle float; dialogue typewriter. All gated by `prefers-reduced-motion`. |
| Cursor | Pixel trail on fine pointers only; skip on coarse/touch. |
| HUD | `IntersectionObserver` on `[data-section]` → active nav item. |
| BBS | Tab switch; lazy-fetch feed per platform; session `Map` cache. |

---

## 9. Tech stack (locked)

| Layer | Choice |
|---|---|
| Framework | **Astro 7** (TypeScript, strict) |
| Hosting | **Vercel** via `@astrojs/vercel` |
| Rendering | **Hybrid** — prerender `index` at build; `GET /api/feed` as a Vercel serverless/server endpoint (`prerender: false`) |
| Content | **Astro Content Collections** — git YAML (`src/content/games/*.yaml`, `src/content/portfolio/*.yaml`); optional MD for long copy. PR to update content is the editorial workflow. |
| Design system | **`@teamstep/design-system`** from `brand-assets` (tokens + primitives); page composition in Astro |
| Client JS | Minimal — vanilla scripts and/or one Astro island for Signal tabs; static HTML for all other chapters |
| Feeds | Colocated **`/api/feed?platform=`** proxy (Bluesky AT Proto, Substack RSS, YouTube RSS) with `Cache-Control: s-maxage=300, stale-while-revalidate` |
| Discord | Official widget **iframe** only (no API route) |
| Long-form blog | **Substack** (surfaced in Signal); no second blog on this site unless added later as MD collection |
| Motion | **`motion`** (or equivalent WAAPI wrapper), gated by `prefers-reduced-motion` |
| Images | Astro `<Image>` + **`sharp`** |
| SEO | **`@astrojs/sitemap`** + OG/JSON-LD in `BaseLayout` |
| XML parsing | **`fast-xml-parser`** in the feed route (Node) |

### Explicitly out of scope

- Headless CMS (Sanity, Contentful, etc.) — content stays in git
- Supabase Edge for feeds — backend lives on Vercel with the site
- Decap/Tina — optional later if a non-git UI is needed on the same files

### Runtime shape

```text
Git (YAML/MD + assets)
        │
        ▼
   Astro build on Vercel
        │
        ├─ / (prerendered)  ← Boot → Meltdown → Quest Log → Signal → …
        │
        └─ /api/feed        ← Bluesky / Substack RSS / YouTube RSS
                 ▲
         Signal island (client)
```

Content change = merge PR → Vercel rebuild.  
Feed freshness = cache on `/api/feed` (no rebuild).

### Directory skeleton

```text
src/
  content/
    config.ts
    games/*.yaml
    portfolio/*.yaml
  pages/
    index.astro
    api/feed.ts
  layouts/BaseLayout.astro
  components/
    sections/   Boot · FeaturedStage · QuestLog · SocialFeed · Manifesto · Services · Footer
    game/       GameCardCompact · VideoFacade
    bbs/        BBSTerminal · BBSPanelAPI · BBSPanelIframe
    ui/         Badge · ServiceCard · PortfolioCard · DialogueBox
    nav/        NavDesktop · NavHUD
  lib/feed/     bluesky.ts · substack.ts · youtube.ts · types.ts
  scripts/      animations.ts · cursor.ts · hud.ts · bbs.ts
  styles/       global.css (DS tokens imported)
public/
  fonts/
  games/{slug}/poster.webp · gameplay.webm
  og/default.png
```

### Dependencies (install baseline)

```bash
npm create astro@latest . -- --template minimal --typescript strict
npx astro add vercel sitemap react
npm install motion fast-xml-parser
# @teamstep/design-system — see docs/design-system-workflow.md (local file: link or GitHub Packages)
```

### Design system co-development

Sibling repo `brand-assets` + local link. See [`docs/design-system-workflow.md`](../docs/design-system-workflow.md).

- `pnpm ds:use-local` / `pnpm dev:all` while iterating on DS + site together
- Publish DS to GitHub Packages first, then `pnpm ds:use-published` and bump for production deploys

---

## 10. Environment Variables

```bash
PUBLIC_DISCORD_SERVER_ID=   # Discord widget embed
YOUTUBE_CHANNEL_ID=         # YouTube RSS feed
# Public social feeds need no secret API keys
```

---

## 11. SEO

```html
<meta property="og:title"       content={title} />
<meta property="og:description" content={description} />
<meta property="og:image"       content="/og/default.png" />
<meta name="twitter:card"       content="summary_large_image" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Team STEP",
  "url": "https://teamstep.gg",
  "sameAs": [
    "https://bsky.app/profile/teamstep.bsky.social",
    "https://teamstep.itch.io",
    "https://teamstep.substack.com",
    "https://discord.gg/JPUaPmQvSZ"
  ]
}
</script>
```

---

## 12. Build order

1. Scaffold Astro + Vercel adapter + sitemap; wire `@teamstep/design-system` / tokens + `BaseLayout` (confirm void background).
2. Content Collections schema + seed Meltdown / Witch One (+ portfolio optional).
3. FeaturedStage + QuestLog + GameCardCompact + Badge + flat CTAs.
4. Boot, Manifesto, Work (services + portfolio), Footer, NavDesktop, NavHUD.
5. VideoFacade + game media assets.
6. `/api/feed` + BBS components (Discord iframe last; Safari filter check).
7. Animations + HUD + reduced-motion guards.
8. SEO + Vercel deploy + verify feed cache headers.

---

## Changelog

| Version | Notes |
|---|---|
| 1.0 | Initial design-session spec (v2 wireframe, Astro-assumed). |
| 2.0 | Hybrid boot wireframe v3 approved. Featured Meltdown stage, scalable Quest Log phases, portfolio under Work, flat CTAs, quiet BBS. Tech stack deferred to §9. |
| 2.1 | Tech stack locked: Astro 7 + Vercel hybrid + git Content Collections + colocated `/api/feed`. No CMS; Substack remains long-form. |
| 2.2 | Scaffold + design-system local link workflow (`ds:use-local` / `ds:use-published` / `dev:all`). |

---

*Document version: 2.2 — experience locked to wireframe v3; stack locked; DS co-dev workflow documented.*
