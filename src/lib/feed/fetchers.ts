import type { BBSItem } from "@teamstep/design-system";
import { fetchBluesky } from "./bluesky";
import { fetchReddit } from "./reddit";
import { fetchSubstack } from "./substack";
import { fetchYouTube } from "./youtube";

type FeedFetcher = () => Promise<BBSItem[]>;

/** Server-only fetchers keyed by list source id. */
const FETCHERS: Record<string, FeedFetcher> = {
  bluesky: fetchBluesky,
  youtube: fetchYouTube,
  reddit: fetchReddit,
  substack: fetchSubstack,
};

export const hasFetcher = (id: string): boolean => id in FETCHERS;

export const fetchSourceItems = async (id: string): Promise<BBSItem[]> => {
  const fetcher = FETCHERS[id];
  if (!fetcher) {
    throw new Error(`No fetcher for source "${id}"`);
  }
  return fetcher();
};
