import type { APIRoute } from "astro";

export const prerender = false;

/** Placeholder — Bluesky / Substack / YouTube fetchers land in a later step. */
export const GET: APIRoute = async ({ url }) => {
  const platform = url.searchParams.get("platform");

  if (!platform || !["bluesky", "substack", "youtube"].includes(platform)) {
    return new Response(JSON.stringify({ error: "Invalid platform" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify([]), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
    },
  });
};
