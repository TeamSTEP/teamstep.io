import type {
  BBSListDensity,
  BBSTab,
  BBSTabIconName,
  BBSThumbnailFit,
  BBSThumbnailPlacement,
} from "@teamstep/design-system";
import { site } from "../../site.config";

type FeedSourceBase = {
  id: string;
  desktopLabel: string;
  mobileLabel: string;
  icon?: BBSTabIconName;
};

export type ListFeedSource = FeedSourceBase & {
  kind: "list";
  density?: BBSListDensity;
  thumbnailPlacement?: BBSThumbnailPlacement;
  thumbnailFit?: BBSThumbnailFit;
};

export type IframeFeedSource = FeedSourceBase & {
  kind: "iframe";
  title: string;
  buildSrc: () => string;
};

export type FeedSource = ListFeedSource | IframeFeedSource;

/** Ordered BBS tabs. Add a source here (+ fetcher or buildSrc) to extend the board. */
export const FEED_SOURCES: readonly FeedSource[] = [
  {
    id: "bluesky",
    kind: "list",
    desktopLabel: "Bluesky",
    mobileLabel: "BSKY",
    icon: "bluesky",
    density: "comfortable",
  },
  {
    id: "youtube",
    kind: "list",
    desktopLabel: "YouTube",
    mobileLabel: "YT",
    icon: "youtube",
    thumbnailPlacement: "leading",
    thumbnailFit: "cover",
  },
  {
    id: "discord",
    kind: "iframe",
    desktopLabel: "Discord",
    mobileLabel: "DC",
    icon: "discord",
    title: "Team STEP Discord server",
    buildSrc: () =>
      `https://discord.com/widget?id=${site.social.discord.serverId}&theme=dark`,
  },
] as const;

export const getSource = (id: string): FeedSource | undefined =>
  FEED_SOURCES.find((source) => source.id === id);

export const listSourceIds = (): string[] =>
  FEED_SOURCES.filter((source) => source.kind === "list").map((source) => source.id);

export const toBBSTabs = (): BBSTab[] =>
  FEED_SOURCES.map(({ id, desktopLabel, mobileLabel, icon }) => ({
    id,
    desktopLabel,
    mobileLabel,
    icon,
  }));
