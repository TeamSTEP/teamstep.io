import type { UnifiedPost } from "./types";

const BASE = "https://public.api.bsky.app/xrpc";
const HANDLE = "teamstep.bsky.social";

export async function fetchBluesky(): Promise<UnifiedPost[]> {
  const res = await fetch(
    `${BASE}/app.bsky.feed.getAuthorFeed?actor=${HANDLE}&limit=10`,
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
