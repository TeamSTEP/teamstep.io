// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

const repoRoot = path.dirname(fileURLToPath(import.meta.url));
/** Sibling DS checkout used by `pnpm ds:use-local` — Vite must serve its nested @fontsource files. */
const localDesignSystemRepo = path.resolve(repoRoot, "../brand-assets");

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site: "https://teamstep.io",
  output: "static",
  adapter: vercel(),
  integrations: [react(), sitemap()],
  vite: {
    resolve: {
      dedupe: ["react", "react-dom", "motion"],
    },
    server: {
      fs: {
        allow: [repoRoot, localDesignSystemRepo],
      },
    },
  },
});
