import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phase 0: static export — no server, deployable to GitHub Pages exactly like the old
  // Astro build was. See teamstep-landing-framework-recommendation.md for why.
  output: "export",
  images: {
    // next/image's on-demand optimization needs a server, which static export doesn't have.
    // The design system's own components (VideoFacade, GameCardArchive, etc.) already use
    // plain <img> tags, so next/image isn't load-bearing here — this just keeps the option
    // open without breaking the build if it's used later.
    unoptimized: true,
  },
};

export default nextConfig;
