import meltdown from "@/content/games/meltdown.json";
import witchOne from "@/content/games/witch-one.json";

// Plain data types mirroring the design system's own PlatformEntry/GameCardFeaturedProps
// shapes field-for-field (see PlatformAccess.tsx) — kept as a local, independent definition
// rather than importing the design system's types here, so this file has zero dependency on
// where/how @teamstep/design-system is installed. Same discipline the design system's own
// proposal doc established for the library side (never import astro:content); this is the
// app-side half of that same boundary.

export type GamePlatform = "steam" | "itch" | "gog" | "epic" | "browser";
export type GamePlatformTier = "demo" | "full" | "free" | "dlc";
export type GameStatus = "main-quest" | "side-quest" | "legacy";

export interface GamePlatformEntry {
  platform: GamePlatform;
  tier: GamePlatformTier;
  label: string;
  url: string;
  available: boolean;
}

export interface GameMedia {
  poster: string;
  loop?: string;
  trailer?: string;
}

export interface GameEntry {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  status: GameStatus;
  sortOrder: number;
  platforms: GamePlatformEntry[];
  media: GameMedia;
}

const GAME_PLATFORMS: readonly GamePlatform[] = ["steam", "itch", "gog", "epic", "browser"];
const GAME_TIERS: readonly GamePlatformTier[] = ["demo", "full", "free", "dlc"];
const GAME_STATUSES: readonly GameStatus[] = ["main-quest", "side-quest", "legacy"];

/**
 * Hand-rolled validation rather than a schema library (Zod, as the original spec called
 * for) — deliberately, for now: these are two hand-authored files, not user input, so the
 * goal is catching a typo with a clear error message, not defending against arbitrary
 * input. Swapping to Zod later is a drop-in change — this function's contract (unknown in,
 * GameEntry out, throws with a readable message on anything wrong) doesn't need to change,
 * only its body would.
 */
function assertGameEntry(data: unknown, source: string): GameEntry {
  const errors: string[] = [];
  const entry = data as Partial<GameEntry> & Record<string, unknown>;

  if (typeof entry.title !== "string") errors.push("title must be a string");
  if (typeof entry.slug !== "string") errors.push("slug must be a string");
  if (typeof entry.subtitle !== "string") errors.push("subtitle must be a string");
  if (typeof entry.description !== "string") errors.push("description must be a string");
  if (!GAME_STATUSES.includes(entry.status as GameStatus)) {
    errors.push(`status must be one of ${GAME_STATUSES.join(", ")}`);
  }
  if (typeof entry.sortOrder !== "number") errors.push("sortOrder must be a number");

  if (!Array.isArray(entry.platforms) || entry.platforms.length === 0) {
    errors.push("platforms must be a non-empty array");
  } else {
    entry.platforms.forEach((p: Partial<GamePlatformEntry>, i: number) => {
      if (!GAME_PLATFORMS.includes(p.platform as GamePlatform)) {
        errors.push(`platforms[${i}].platform is invalid`);
      }
      if (!GAME_TIERS.includes(p.tier as GamePlatformTier)) {
        errors.push(`platforms[${i}].tier is invalid`);
      }
      if (typeof p.label !== "string") errors.push(`platforms[${i}].label must be a string`);
      if (typeof p.url !== "string") errors.push(`platforms[${i}].url must be a string`);
      if (typeof p.available !== "boolean") {
        errors.push(`platforms[${i}].available must be a boolean`);
      }
    });
  }

  const media = entry.media as Partial<GameMedia> | undefined;
  if (typeof media?.poster !== "string") errors.push("media.poster must be a string");

  if (errors.length > 0) {
    throw new Error(`Invalid game entry in ${source}:\n  - ${errors.join("\n  - ")}`);
  }

  return entry as GameEntry;
}

const RAW_GAMES: Array<[unknown, string]> = [
  [meltdown, "content/games/meltdown.json"],
  [witchOne, "content/games/witch-one.json"],
];

/**
 * All games, validated and sorted by sortOrder. Throws at build/dev time on a bad entry
 * rather than shipping a broken card silently — the original design intent (v1.0 spec) was
 * a Zod schema doing the same job at Astro's content-collection layer.
 */
export function loadGames(): GameEntry[] {
  return RAW_GAMES.map(([data, source]) => assertGameEntry(data, source)).sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
}

/** Narrows a GameEntry to the two statuses GameCardArchive actually supports. */
export function isArchiveGame(
  game: GameEntry,
): game is GameEntry & { status: "side-quest" | "legacy" } {
  return game.status !== "main-quest";
}
