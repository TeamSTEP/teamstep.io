// @ts-check
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

const root = path.dirname(fileURLToPath(import.meta.url));
const dsPackageRoot = path.resolve(root, "../brand-assets/packages/design-system");
const usingLocalDs =
  fs.existsSync(path.join(root, "node_modules/@teamstep/design-system")) &&
  fs.lstatSync(path.join(root, "node_modules/@teamstep/design-system")).isSymbolicLink();

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site: "https://teamstep.gg",
  output: "static",
  adapter: vercel(),
  integrations: [react(), sitemap()],
  vite: {
    server: {
      fs: {
        allow: usingLocalDs ? [root, dsPackageRoot] : [root],
      },
      watch: usingLocalDs
        ? {
            // Pick up tsup --watch rebuilds of the linked package.
            ignored: ["!**/node_modules/@teamstep/design-system/**"],
          }
        : undefined,
    },
    optimizeDeps: usingLocalDs
      ? {
          exclude: ["@teamstep/design-system"],
        }
      : undefined,
    resolve: {
      dedupe: ["react", "react-dom", "motion"],
    },
  },
});
