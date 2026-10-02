import { site } from "../../site.config";
import type { UnifiedPost } from "./types";

const BASE = "https://public.api.bsky.app/xrpc";

export const fetchBluesky = async (): Promise<UnifiedPost[]> => {
  const handle = site.social.bluesky.handle;
  const res = await fetch(
    `${BASE}/app.bsky.feed.getAuthorFeed?actor=${handle}&limit=10`,
  );
  if (!res.ok) throw new Error(`Bluesky ${res.status}`);
  const { feed } = (await res.json()) as {
    feed: Array<{
      post: {
        cid: string;
        author: { handle: string };
        record: { text: string; createdAt: string };
        uri: string;
      };
    }>;
  };

  return feed.map(({ post }) => ({
    platform: "bluesky",
    id: post.cid,
    author: post.author.handle,
    text: post.record.text,
    url: `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split("/").pop()}`,
    date: post.record.createdAt,
  }));
}
