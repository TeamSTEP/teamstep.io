import { Hero } from "@/components/ds-client/Hero";

// Phase 0/1 smoke test only — proves the design-system dependency resolves, tokens/styles
// load, and a client-boundary-wrapped component renders and hydrates correctly. Phase 3
// replaces this with the real six-section page per teamstep-landing-wireframe-v2.md.
export default function Home() {
  return (
    <Hero
      eyebrow="indie game studio"
      tagline="Building the home for the indie game world — one step at a time."
      ctaHref="#quest-log"
      logoMarkSrc="/favicon.svg"
      logoMarkAlt="Team STEP logo mark (placeholder — swap for the real logo mark asset)"
    />
  );
}
