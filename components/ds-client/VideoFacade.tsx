"use client";

// VideoFacade uses useState (poster -> loop -> click-to-load trailer) — needs its own
// client boundary. It also renders IconButton internally (always onClick, never href) —
// no separate wrapper needed for IconButton since its only usages (here and inside
// ServiceInspectPanel) are already inside a client boundary.
export { VideoFacade } from "@teamstep/design-system";
export type { VideoFacadeProps } from "@teamstep/design-system";
