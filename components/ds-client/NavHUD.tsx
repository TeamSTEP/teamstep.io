"use client";

// NavHUD uses useState + useEffect (IntersectionObserver for active-section highlighting) —
// needs its own client boundary.
export { NavHUD } from "@teamstep/design-system";
export type { NavHUDItem, NavHUDProps } from "@teamstep/design-system";
