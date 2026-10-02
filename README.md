# Team STEP landing site

Astro + Vercel marketing site. Experience: [`plans/wireframe-v3-hybrid.html`](plans/wireframe-v3-hybrid.html). Spec: [`plans/teamstep-landing-spec.md`](plans/teamstep-landing-spec.md).

## Quick start

```bash
# Sibling clone of brand-assets required for local design-system mode
pnpm install
pnpm ds:use-local   # already default on this WIP branch
pnpm dev:all        # DS watch + Astro
```

Open the URL Astro prints (usually `http://localhost:4321`).

## Design system

See [`docs/design-system-workflow.md`](docs/design-system-workflow.md).

- **Local:** `pnpm ds:use-local` → `pnpm dev:all`
- **Published (CI/prod):** `pnpm ds:use-published` + GitHub Packages token (`.npmrc.example`)

## Stack

- Astro 7 (static pages + `/api/feed` on Vercel)
- `@teamstep/design-system` (React components / tokens)
- Content: YAML collections under `src/content/`
