import type { CollectionEntry } from "astro:content";
import type {
  FeaturedStageCta,
  FeaturedStageProps,
  GameCardArchiveProps,
  QuestLogGroup,
  QuestLogProps,
} from "@teamstep/design-system";

type Game = CollectionEntry<"games">;

function platformIcon(platform: Game["data"]["platforms"][number]["platform"]) {
  if (platform === "itch" || platform === "browser") return "gamepad" as const;
  return "hexagon" as const;
}

export function getFeaturedGame(games: Game[]) {
  return games.find((game) => game.data.featured);
}

export function toFeaturedStage(
  game: Game,
): Omit<FeaturedStageProps, "media"> {
  const playable = game.data.platforms.filter((p) => p.available);
  const pending = game.data.platforms.filter((p) => !p.available);

  const ctas: FeaturedStageCta[] = [
    ...playable.map((p) => ({
      variant: "primary" as const,
      label: p.label.toUpperCase(),
      href: p.url,
      icon: platformIcon(p.platform),
    })),
    ...pending.map((p) => ({
      variant: "secondary" as const,
      label: p.label.toUpperCase(),
      href: p.url,
      icon: platformIcon(p.platform),
    })),
  ];

  return {
    title: game.data.title,
    subtitle: game.data.subtitle.toUpperCase(),
    description: game.data.description.trim(),
    ctas,
    inDevelopment: pending.some((p) => p.tier === "full"),
  };
}

function toArchiveCard(game: Game): GameCardArchiveProps | null {
  const { phase } = game.data;
  if (phase !== "released" && phase !== "prototype" && phase !== "legacy" && phase !== "paused") {
    return null;
  }

  const status = phase === "paused" ? "legacy" : phase;
  const primary = game.data.platforms.find((p) => p.available) ?? game.data.platforms[0];
  if (!primary) return null;

  return {
    title: game.data.title,
    description: game.data.description.trim(),
    status,
    posterSrc: game.data.media.poster,
    posterAlt: `${game.data.title} key art`,
    cta: {
      icon: status === "legacy" ? "download" : platformIcon(primary.platform),
      label: primary.label.toUpperCase(),
      url: primary.url,
    },
  };
}

export function toQuestLog(games: Game[]): QuestLogProps {
  const catalog = games
    .filter((game) => !game.data.featured)
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder);

  const buckets: Record<"released" | "prototype" | "legacy", GameCardArchiveProps[]> = {
    released: [],
    prototype: [],
    legacy: [],
  };

  for (const game of catalog) {
    const card = toArchiveCard(game);
    if (!card) continue;
    buckets[card.status].push(card);
  }

  const groups: QuestLogGroup[] = [
    { phase: "released", label: "Released", items: buckets.released },
    { phase: "prototype", label: "Prototypes", items: buckets.prototype },
    { phase: "legacy", label: "Archive", items: buckets.legacy },
  ];

  return {
    heading: "More from Team Step",
    lede: "Released titles, live prototypes, and paused projects. One featured stage above — everything else lives here.",
    groups,
  };
}
