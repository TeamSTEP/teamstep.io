// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

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
  },
});
