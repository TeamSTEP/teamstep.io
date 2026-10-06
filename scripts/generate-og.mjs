import { readFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import sharp from "sharp";

// Build-time default OG image: Team STEP logo centered on the brand
// background, with the slogan as a subtext below. Runs before `astro build`.

const LOGO = "public/teamstep-logo.png";
const OUT = "public/og/default.png";
const SIZE = { width: 1200, height: 630 };
const BG = "#231630"; // --color-void (site background)
const ACCENT = "#8591C9"; // brand lavender (logo text / ring)

// Slogan is the single source of truth in site.config.ts (site.tagline).
const config = readFileSync("src/site.config.ts", "utf8");
const slogan = config.match(/tagline:\s*"([^"]+)"/)?.[1] ?? "One step at a time.";

const logo = readFileSync(LOGO).toString("base64");
const logoW = 480;
const logoH = Math.round((logoW * 170) / 320); // preserve 320:170 aspect -> 255
const logoX = Math.round((SIZE.width - logoW) / 2);
const logoY = 150;
const sloganY = logoY + logoH + 72; // text baseline below the logo

const svg = `<svg width="${SIZE.width}" height="${SIZE.height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${SIZE.width}" height="${SIZE.height}" fill="${BG}"/>
  <image href="data:image/png;base64,${logo}" x="${logoX}" y="${logoY}" width="${logoW}" height="${logoH}"/>
  <text x="${SIZE.width / 2}" y="${sloganY}" text-anchor="middle" fill="${ACCENT}" font-family="DejaVu Sans, sans-serif" font-size="40" letter-spacing="1">${slogan}</text>
</svg>`;

mkdirSync(dirname(OUT), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log(`[generate-og] wrote ${OUT} (slogan: "${slogan}")`);
