import type { APIRoute } from "astro";
import { fetchSourceItems, hasFetcher } from "../../lib/feed/fetchers";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const source = url.searchParams.get("source");

  if (!source || !hasFetcher(source)) {
    return new Response(JSON.stringify({ error: "Invalid source" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const items = await fetchSourceItems(source);
    return new Response(JSON.stringify(items), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=300, stale-while-revalidate",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Feed fetch failed";
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};
