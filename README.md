# Team STEP landing site

Astro + Vercel marketing site for [teamstep.io](https://teamstep.io).

## Quick start

```bash
pnpm install
pnpm dev
```

Open the URL Astro prints (usually `http://localhost:4321`).

## Design system

See [`docs/design-system-workflow.md`](docs/design-system-workflow.md).

- **Published (default / CI / prod):** `pnpm ds:use-published` — needs a GitHub Packages token (`.npmrc.example`)
- **Local co-dev** (sibling `brand-assets` clone): `pnpm ds:use-local` → `pnpm dev:all`

## Adding content

### Games

1. Copy an existing file under `src/content/games/` (e.g. `meltdown.yaml`).
2. Fill in `title`, `slug`, copy, `phase`, `platforms`, and `media`.
3. Put art under `public/games/<slug>/` and point `media.poster` (and optional `loop` / `trailer`) at those paths.
4. Set `featured: true` on at most one game for the landing hero / featured stage. Use `sortOrder` for Quest Log order.

The game also gets a static page at `/games/<slug>/` from `src/pages/games/[slug].astro` — no extra routing step.

Schema lives in `src/content.config.ts`.

### Pages

- Landing composition: `src/pages/index.astro` (sections + site knobs from `src/site.config.ts`).
- New static route: add `src/pages/<name>.astro` (or a folder with `index.astro`).
- Dynamic routes: add `src/pages/.../[param].astro` with `getStaticPaths`, same pattern as games.
- Shared chrome (layout, meta): `src/layouts/BaseLayout.astro`.

### Feeds (BBS board)

Tabs are driven by a registry — you do not touch the design system package.

1. **List source** (API-backed, e.g. Bluesky / YouTube / Substack):
   - Add a fetcher in `src/lib/feed/` that returns `BBSItem[]`.
   - Register it in `src/lib/feed/fetchers.ts`.
   - Add a `kind: "list"` entry to `FEED_SOURCES` in `src/lib/feed/sources.ts` (labels, icon, optional list layout).
2. **Iframe source** (e.g. Discord widget):
   - Add a `kind: "iframe"` entry with `buildSrc()` (and `title`) in `FEED_SOURCES`.
3. Put handles / channel IDs / server IDs in `src/site.config.ts` when the fetcher or embed needs them.

The client island is `src/components/SignalBoard.tsx`; the proxy is `GET /api/feed?source=<id>`.

Substack already has a fetcher — enable it by adding a tab entry in `FEED_SOURCES`.

## Stack

- Astro 7 (static pages + `/api/feed` on Vercel)
- `@teamstep/design-system` (React components / tokens)
- Content: YAML collections under `src/content/`
