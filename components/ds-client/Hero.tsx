"use client";

// Hero uses useRef + the useIdleFloat hook internally (idle-float animation on the logo
// ring) — Server Components can't use hooks, so this needs its own client boundary.
export { Hero } from "@teamstep/design-system";
export type { HeroProps } from "@teamstep/design-system";
