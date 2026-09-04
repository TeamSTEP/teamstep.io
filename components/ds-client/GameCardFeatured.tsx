"use client";

// GameCardFeatured has no hooks of its own — but @teamstep/design-system's tsup build
// bundles every component into a single dist/index.js (see tsup.config.ts: one entry point,
// no code-splitting). Next's Server/Client boundary checker analyzes that whole file, finds
// hook usage from OTHER components bundled in it (NavHUD, SocialFeed), and refuses ANY
// import from the package root in a Server Component — confirmed by an actual build, not a
// guess. Real fix belongs in brand-assets: give tsup per-component output (e.g.
// `entry: ["src/**/*.tsx"]` with `bundle: false`, or explicit per-component entries) so
// hook-free exports can be tree-shaken and imported server-side again. Flagging this rather
// than fixing it now — it's a design-system build change, out of scope for the landing
// page's Phase 2. Wrapping here unblocks Phase 2 today at the cost of this card shipping
// client JS it doesn't actually need yet.
export { GameCardFeatured } from "@teamstep/design-system";
export type { GameCardFeaturedProps } from "@teamstep/design-system";
