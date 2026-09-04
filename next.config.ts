import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phase 0: static export — no server, deployable to GitHub Pages exactly like the old
  // Astro build was. See teamstep-landing-framework-recommendation.md for why.
  output: "export",
  // Required because @teamstep/design-system is a `file:` dependency: npm/yarn symlink it
  // into node_modules pointing OUTSIDE this project directory (../brand-assets/...), and
  // Next refuses to resolve modules outside the project root unless this is set. Verified by
  // an actual build — without it, the design-system import fails to resolve under both
  // Turbopack and webpack.
  experimental: {
    externalDir: true,
  },
  images: {
    // next/image's on-demand optimization needs a server, which static export doesn't have.
    // The design system's own components (VideoFacade, GameCardArchive, etc.) already use
    // plain <img> tags, so next/image isn't load-bearing here — this just keeps the option
    // open without breaking the build if it's used later.
    unoptimized: true,
  },
};

export default nextConfig;
