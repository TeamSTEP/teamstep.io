"use client";

// ServiceInspectPanel uses useRef + useEffect (native <dialog> open/close wiring) — needs
// its own client boundary.
export { ServiceInspectPanel } from "@teamstep/design-system";
export type { ServiceInspectPanelProps } from "@teamstep/design-system";
