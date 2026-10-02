# Design system development workflow

`@teamstep/design-system` lives in the sibling repo [`TeamSTEP/brand-assets`](https://github.com/TeamSTEP/brand-assets). This site consumes it as an npm package. Two modes keep local iteration and production deploys clean.

## Modes

| Mode | When | Command |
|---|---|---|
| **Local link** | Co-developing DS + landing page | `pnpm ds:use-local` |
| **Published** | CI / preview / production | `pnpm ds:use-published` |

Clone layout expected for local mode:

```text
Projects/
  brand-assets/          ← design system monorepo
  teamstep.io/           ← this site
```

## Daily loop (recommended while building the landing page)

```bash
# once
pnpm ds:use-local

# every session — watches DS (tsup) + Astro together
pnpm dev:all
```

1. Edit components/tokens in `brand-assets/packages/design-system`.
2. `tsup --watch` rebuilds `dist/`.
3. Astro Vite picks up the symlink and hot-reloads the page.
4. Fix DS issues in Storybook (`pnpm storybook` in brand-assets) *or* against this live page.

## Ship DS before the site

When a DS change should land independently of the landing page:

1. Finish and verify with `pnpm dev:all` against this repo.
2. In **brand-assets**: changeset → version → `pnpm release` (publishes to GitHub Packages).
3. In **teamstep.io**: `pnpm ds:use-published` (or bump `@teamstep/design-system` in `package.json`).
4. Commit the version bump and deploy the site on Vercel.

Preview deploys of the site always use the **published** package (CI must not use `file:`).

## Auth for published installs

```bash
cp .npmrc.example .npmrc
# set GITHUB_TOKEN with read:packages (classic) or fine-grained Packages read
```

CI: set `NODE_AUTH_TOKEN` / `GITHUB_TOKEN` as in brand-assets `CONSUMER.md`.

## Do not

- Commit a `file:../brand-assets/...` dependency on the branch that Vercel builds from production — switch to published first, or keep local mode only on a private WIP branch.
- Import DS **source** files via relative paths from this repo — always go through the package exports (`@teamstep/design-system`, `/tokens.css`, `/styles.css`).
