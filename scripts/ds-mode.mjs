#!/usr/bin/env node
/**
 * Switch @teamstep/design-system between sibling-repo file: link and GitHub Packages.
 *
 *   pnpm ds:use-local       → develop against ../brand-assets (symlink)
 *   pnpm ds:use-published   → consume published ^0.5.x from GitHub Packages
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const mode = process.argv[2];
const root = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(root, "..");
const pkgPath = path.join(repoRoot, "package.json");
const localDs = path.resolve(repoRoot, "../brand-assets/packages/design-system");
const publishedRange = "^0.5.1";

if (mode !== "local" && mode !== "published") {
  console.error("Usage: node scripts/ds-mode.mjs <local|published>");
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
pkg.dependencies ??= {};

if (mode === "local") {
  if (!fs.existsSync(path.join(localDs, "package.json"))) {
    console.error(`Design system not found at ${localDs}`);
    console.error("Clone TeamSTEP/brand-assets as a sibling of teamstep.io.");
    process.exit(1);
  }
  console.log("Building local @teamstep/design-system…");
  execSync("CI=true pnpm --dir ../brand-assets --filter @teamstep/design-system build", {
    cwd: repoRoot,
    stdio: "inherit",
  });
  pkg.dependencies["@teamstep/design-system"] = `file:${path.relative(repoRoot, localDs)}`;
  console.log("Linked to local design system (file:../brand-assets/packages/design-system).");
} else {
  pkg.dependencies["@teamstep/design-system"] = publishedRange;
  console.log(`Using published @teamstep/design-system@${publishedRange}`);
  console.log("Requires GitHub Packages auth — see .npmrc.example");
}

fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
execSync("pnpm install", { cwd: repoRoot, stdio: "inherit" });
