import { XMLParser } from "fast-xml-parser";
import type { UnifiedPost } from "./types";

export async function fetchYouTube(): Promise<UnifiedPost[]> {
  const channelId = import.meta.env.YOUTUBE_CHANNEL_ID;
  if (!channelId) return [];

  const rss = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const xml = await fetch(rss).then((r) => {
    if (!r.ok) throw new Error(`YouTube ${r.status}`);
    return r.text();
  });
  const data = new XMLParser({ ignoreAttributes: false }).parse(xml);
  const entries = ([] as unknown[]).concat(data?.feed?.entry ?? []).slice(0, 5);

  return entries.map((entry: Record<string, unknown>) => {
    const id = String(entry["yt:videoId"] ?? entry.id ?? "");
    const media = entry["media:group"] as Record<string, unknown> | undefined;
    const thumb = media?.["media:thumbnail"] as Record<string, string> | undefined;
    return {
      platform: "youtube" as const,
      id,
      author: "Team STEP",
      text: String(entry.title ?? ""),
      url: `https://www.youtube.com/watch?v=${id}`,
      date: new Date(String(entry.published ?? Date.now())).toISOString(),
      thumb: thumb?.["@_url"],
    };
  });
}
