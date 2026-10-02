#!/usr/bin/env node
/**
 * Run design-system tsup --watch alongside Astro.
 * Expects a local file: link (pnpm ds:use-local).
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const linked = path.join(repoRoot, "node_modules/@teamstep/design-system");

if (!fs.existsSync(linked) || !fs.lstatSync(linked).isSymbolicLink()) {
  console.error("@teamstep/design-system is not linked locally.");
  console.error("Run: pnpm ds:use-local");
  process.exit(1);
}

const children = [
  spawn("pnpm", ["ds:watch"], { cwd: repoRoot, stdio: "inherit", shell: true }),
  spawn("pnpm", ["exec", "astro", "dev"], { cwd: repoRoot, stdio: "inherit", shell: true }),
];

function shutdown(code = 0) {
  for (const child of children) {
    child.kill("SIGTERM");
  }
  process.exit(code);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

for (const child of children) {
  child.on("exit", (code) => {
    if (code && code !== 0) shutdown(code);
  });
}
