import { XMLParser } from "fast-xml-parser";
import type { BBSItem } from "@teamstep/design-system";
import { site } from "../../site.config";

export const fetchYouTube = async (): Promise<BBSItem[]> => {
  const channelId = site.social.youtube.channelId;
  if (!channelId) return [];

  const rss = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const xml = await fetch(rss).then((r) => {
    if (!r.ok) throw new Error(`YouTube ${r.status}`);
    return r.text();
  });
  const data = new XMLParser({ ignoreAttributes: false }).parse(xml);
  const entries = ([] as Record<string, unknown>[])
    .concat(data?.feed?.entry ?? [])
    .slice(0, 5);

  return entries.map((entry: Record<string, unknown>) => {
    const id = String(entry["yt:videoId"] ?? entry.id ?? "");
    const media = entry["media:group"] as Record<string, unknown> | undefined;
    const thumb = media?.["media:thumbnail"] as
      | Record<string, string>
      | undefined;
    const title = String(entry.title ?? "");
    return {
      id,
      name: title,
      href: `https://www.youtube.com/watch?v=${id}`,
      publishedAt: new Date(String(entry.published ?? Date.now())).toISOString(),
      thumbnail: thumb?.["@_url"]
        ? { src: thumb["@_url"], alt: "" }
        : undefined,
    };
  });
};
