"use client";

// Footer has no hooks of its own, but rides the same tsup single-bundle issue documented in
// GameCardFeatured.tsx — importing anything from the package root in a Server Component
// fails until brand-assets ships per-component tsup output. Wrapping here for consistency
// with every other ds-client file, not because Footer itself needs client interactivity.
export { Footer } from "@teamstep/design-system";
export type { FooterProps, FooterSocialLink, FooterSocialPlatform } from "@teamstep/design-system";
