# Team STEP landing page — Phase 3 build plan

> **Status (2026-09-16): Phase 3 implemented.** All five sections in this plan — nav, Manifesto, Services, Footer, BBS Board — were wired into `app/layout.tsx`/`app/page.tsx` on 2026-09-04, using this doc as the spec. Content gaps below are still open (placeholders shipped, matching Phase 2's precedent); structure and wiring are done. See `components/ServicesSection.tsx`, `components/ds-client/Footer.tsx`, `lib/services.ts`, `content/services/*.json`.
>
> **Wireframe source recovered (2026-09-16):** `teamstep-landing-wireframe-v2.md`/`.html`, referenced throughout this plan as the section-id and layout authority, was never committed to this repo or to `brand-assets`' working tree — it only exists in `brand-assets` git history at commit `efa4ffef` ("add token tiers"), alongside `ref/teamstep-landing-spec.md` and `ref/teamstep-react-design-system-proposal.md`. The actual wireframe file there is named `ref/teamstep_final_wireframe_v2.html` (not `.md` — this plan's references to a `.md` wireframe file are inaccurate). Recover it with `git show efa4ffef:ref/teamstep_final_wireframe_v2.html`. It's an HTML fragment (no `<html>`/`<head>`/`<body>`), meant to be embedded, not opened standalone.

Manifesto, Services, Footer, BBS Board, real nav. Written against the actual repo state (checked directly, not from memory): Phase 2 already built `NavDesktop`, `NavHUD`, `DialogueBox`, `ServiceCard`, `ServiceInspectPanel`, and `SocialFeed` as `ds-client` wrappers — **but none of them are imported into `app/page.tsx` or `app/layout.tsx` yet.** Phase 3 is mostly wiring + content, not new wrapper components, with one exception (Footer has no wrapper yet).

## Sequencing

Do these in order — each has a reason to come before the next, not just wireframe order:

1. **Real nav** — cheapest, no content dependency, and every other section needs a stable `id` to navigate to, so get the section-id contract locked first.
2. **Manifesto** (`DialogueBox`) — single component, no interaction state, lowest complexity.
3. **Services** (`ServiceCard` + `ServiceInspectPanel`) — needs new app-level state management (see below), so do it once nav/manifesto have re-established the page's rhythm.
4. **Footer** — needs a new wrapper component (doesn't exist yet), do last since it's the simplest addition once the pattern's warm.
5. **BBS Board** (`SocialFeed`) — deliberately last. It depends on the still-open Phase 4 hosting decision (build-time GitHub Action fetch vs. serverless function for `fetchEndpoint`). Wiring the component itself is cheap; making it show real posts is a separate phase. Recommend building it now against a stub/empty feed so the section exists visually, and treat live data as Phase 4's job — don't let Phase 4 block Phase 3 completion.

## 1. Real nav

**Section ids first.** Every section `page.tsx` renders needs a stable `id` matching what nav will link to. Current state: only `<section id="quest-log">` exists; Hero has none. Assign ids for all six wireframe sections (`hero`, `quest-log`, `bbs`, `manifesto`, `services`) plus footer as the `NavDesktop` contact/`NavHUD` terminus — confirm the exact id set against `teamstep-landing-wireframe-v2.md` rather than inventing new ones here.

**Where to render.** `NavDesktop` and `NavHUD` are both already built as `ds-client` wrappers. Render both in `app/layout.tsx` (not `page.tsx` — nav is chrome, not page content), passing `children` through. Confirm via Storybook or a quick local render whether the design system's own CSS handles desktop/mobile visibility switching internally (the AGENTS.md governance doc states "responsiveness lives inside the component" as a rule for this repo) — if so this is a pure wire-up; if not, that's a design-system-side gap to flag back to `brand-assets`, not something to patch from the consumer side.

**Content needed from Hoon**: the `NavDesktopLink[]` label/href pairs (likely `HOME`, `GAMES`, `BBS`, `MANIFESTO`, `SERVICES` off the section ids above) and `contactHref` (mailto, a contact section anchor, or Discord invite — TBD). `NavHUDItem[]` mirrors the same set minus contact.

## 2. Manifesto (`DialogueBox`)

Single `<DialogueBox>` inside a `<section id="manifesto">`. Wrapper already exists at `components/ds-client/DialogueBox.tsx`. Content-only task:

- `avatarSrc` / `avatarAlt`: reuse `/logo-mark-placeholder.svg` (same placeholder used in Hero) until real art lands, or source real studio avatar art if it exists in `brand-assets`.
- `text`: the actual manifesto copy — this is a content gap, not an engineering one. **Needed from Hoon** before this section can go beyond a placeholder.
- `animated`: leave the default (`true`) unless there's a reason to disable the typewriter effect.

No new data file needed — this is static enough to inline directly in `page.tsx`, unlike the games/services data which follow the `lib/*.ts` pattern.

## 3. Services (`ServiceCard` × N + `ServiceInspectPanel`)

This is the one section needing new client-side state, not just a wrapper. `ServiceCard.onInspect` and `ServiceInspectPanel.open`/`onClose` are both owned by the consumer — the design system deliberately keeps them decoupled (see `ServiceCard.tsx`'s own doc comment). That means:

- **New component**: `components/ServicesSection.tsx` (a real app-level Client Component, not a thin `ds-client` re-export) that owns `const [activeServiceId, setActiveServiceId] = useState<string | null>(null)`, renders the `ServiceCard` grid, and renders one `ServiceInspectPanel` wired to whichever service is active. This is different in kind from the existing `ds-client` wrappers, which exist only to satisfy the "hooks taint the whole bundle" build issue — call this out in the file's own comment so a future pass doesn't mistake it for another instance of that same workaround.
- **New data file**: `lib/services.ts`, following the same hand-rolled-validation pattern as `lib/games.ts` (`ServiceEntry` type + `assertServiceEntry`), backed by `content/services/*.json`. Three entries expected per the wireframe's `ServiceCard × 3`.
- **Content needed from Hoon**: the three services' titles, descriptions, icons (the design system exports `ArrowRightIcon`/`GamepadIcon`/`HexagonIcon`/`PlayIcon`/`StarIcon` etc. from `primitives/icons` — pick per service, or confirm these aren't the right icon set), and each `ServiceInspectPanel`'s longer description + `contactHref`.

## 4. Footer

No wrapper exists yet — this is the one net-new `ds-client` file needed in Phase 3: `components/ds-client/Footer.tsx`, following the exact pattern of the other nine files in that folder (client boundary re-export, same doc-comment convention citing the tsup single-bundle issue).

Render it in `app/layout.tsx`, after `children`, matching Nav's chrome placement.

**Content needed from Hoon**: `studioName`, `tagline`, and the `FooterSocialLink[]` array — real URLs for Bluesky, Substack, YouTube, and Discord (platform set is closed to exactly those four per `FooterSocialPlatform`).

## 5. BBS Board (`SocialFeed`)

Wrapper already exists at `components/ds-client/SocialFeed.tsx`. Wiring it into `page.tsx` inside `<section id="bbs">` is cheap. The two props are `fetchEndpoint` (optional, defaults to `/api/feed`) and `discordServerId` (required).

**Recommendation**: build and render this section now, but don't block Phase 3 on making it functional — `fetchEndpoint` has no backing route yet (that's the still-open Phase 4 decision between a build-time GitHub Action fetch and a small serverless function), and `output: 'export'` static export can't host a real Next.js API route at `/api/feed` regardless of which Phase 4 option is picked. `BBSPanelAPI` already renders a clean `// NO SIGNAL` empty state when `posts` is empty, so shipping this section pointed at a route that 404s (or omitting `fetchEndpoint` entirely for now) degrades gracefully rather than breaking the page.

**Content needed from Hoon**: the real Discord server ID (required prop, no default) — everything else here is Phase 4's problem, not Phase 3's.

## Content gaps — summary (blocking, not engineering)

Before Phase 3 can ship real (not placeholder) content, this needs to come from Hoon:

1. Manifesto copy (`DialogueBox.text`)
2. Nav link labels/hrefs and contact destination
3. Three services' names, short + long descriptions, icon choice, contact destination
4. Footer studio name, tagline, four social URLs
5. Discord server ID for BBS Board

Engineering can proceed in parallel on structure/wiring with placeholder copy (matching how Phase 2 used placeholder poster art) and swap in real content once supplied — doesn't need to block the build.

## Explicitly out of scope for Phase 3

- Phase 4 (social-feed hosting decision + actual `/api/feed` implementation)
- Phase 5 (SEO via Metadata API)
- The `brand-assets` tsup per-component-output fix (still needs @hoonsubin sign-off per that repo's governance doc) — Phase 3's new `Footer` wrapper is written assuming this fix has *not* landed yet; if it lands mid-phase, drop the wrapper requirement for any newly-server-safe component at that point rather than leaving a now-unnecessary client boundary in place.
