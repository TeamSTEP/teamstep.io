import type { APIRoute } from "astro";
import { fetchBluesky } from "../../lib/feed/bluesky";
import { fetchSubstack } from "../../lib/feed/substack";
import { fetchYouTube } from "../../lib/feed/youtube";
import type { UnifiedPost } from "../../lib/feed/types";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const platform = url.searchParams.get("platform");
  let posts: UnifiedPost[] = [];

  try {
    if (platform === "bluesky") posts = await fetchBluesky();
    else if (platform === "substack") posts = await fetchSubstack();
    else if (platform === "youtube") posts = await fetchYouTube();
    else {
      return new Response(JSON.stringify({ error: "Invalid platform" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Feed fetch failed";
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(posts), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
    },
  });
};
