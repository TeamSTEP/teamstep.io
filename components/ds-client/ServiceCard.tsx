"use client";

// ServiceCard has no hooks itself, but it wires onInspect to Cta's onClick — and Cta renders
// a plain <button onClick> in that path. React doesn't allow a Server Component to attach
// event handlers to DOM output, so the boundary has to start here (or higher, at whatever
// owns the open/onClose state for ServiceInspectPanel in the Services section — marking it
// here too keeps this component safe to use even before that section-level wiring exists).
export { ServiceCard } from "@teamstep/design-system";
export type { ServiceCardProps } from "@teamstep/design-system";
