"use client";

// Same reason as ds-client/GameCardFeatured.tsx — see that file's comment. GameCardArchive
// has no hooks of its own either; this wrapper exists only because of how the design
// system's dist/index.js is currently bundled as one file.
export { GameCardArchive } from "@teamstep/design-system";
export type {
  GameCardArchiveCta,
  GameCardArchiveProps,
  GameCardArchiveStatus,
} from "@teamstep/design-system";
