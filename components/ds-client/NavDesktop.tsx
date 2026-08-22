"use client";

// NavDesktop uses useState + useEffect internally (scroll listener for the frosted-glass
// state) — needs its own client boundary.
export { NavDesktop } from "@teamstep/design-system";
export type { NavDesktopLink, NavDesktopProps } from "@teamstep/design-system";
