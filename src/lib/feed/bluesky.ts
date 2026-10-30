import type { BBSItem } from "@teamstep/design-system";
import { site } from "../../site.config";

const BASE = "https://public.api.bsky.app/xrpc";

export const fetchBluesky = async (): Promise<BBSItem[]> => {
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
    id: post.cid,
    name: post.author.handle,
    href: `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split("/").pop()}`,
    body: post.record.text,
    publishedAt: post.record.createdAt,
  }));
};
