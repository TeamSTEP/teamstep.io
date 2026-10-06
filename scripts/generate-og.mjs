import { readdirSync, readFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import sharp from "sharp";

// Build-time default OG image: the featured game's cover art with the
// Team STEP logo overlaid in the bottom-right corner (1/4 of the poster).
// Runs before `astro build` so /og/default.png always reflects the game
// currently flagged `featured: true`.

const GAMES_DIR = "src/content/games";
const LOGO = "public/teamstep-logo.png";
const OUT = "public/og/default.png";
const SIZE = { width: 1200, height: 630 };
const LOGO_WIDTH = 600; // half the poster width -> bottom-right quadrant (1/4 area)

function findFeaturedPoster() {
  for (const f of readdirSync(GAMES_DIR)) {
    if (!f.endsWith(".yaml") && !f.endsWith(".yml")) continue;
    const text = readFileSync(join(GAMES_DIR, f), "utf8");
    if (!/featured:\s*true/i.test(text)) continue;
    const m = text.match(/poster:\s*(\S+)/);
    if (m) return m[1].trim();
  }
  return null;
}

const poster = findFeaturedPoster();
if (!poster) {
  console.warn("[generate-og] no featured game found; leaving /og/default.png unchanged");
  process.exit(0);
}

const coverPath = join("public", poster.replace(/^\//, ""));

mkdirSync(dirname(OUT), { recursive: true });

const logo = await sharp(LOGO).resize(LOGO_WIDTH, null).png().toBuffer();

await sharp(coverPath)
  .resize(SIZE.width, SIZE.height, { fit: "cover", position: "centre" })
  .composite([{ input: logo, gravity: "southeast" }])
  .png()
  .toFile(OUT);

console.log(`[generate-og] wrote ${OUT} (cover: ${coverPath})`);
