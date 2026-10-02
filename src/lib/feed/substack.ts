import { XMLParser } from "fast-xml-parser";
import { site } from "../../site.config";
import type { UnifiedPost, RssItem } from "./types";



export const fetchSubstack = async (): Promise<UnifiedPost[]> => {
  const xml = await fetch(site.social.substack.feed).then((r) => {
    if (!r.ok) throw new Error(`Substack ${r.status}`);
    return r.text();
  });
  const data = new XMLParser({ ignoreAttributes: false }).parse(xml);
  const items = ([] as RssItem[]).concat(data?.rss?.channel?.item ?? []).slice(0, 5);

  return items.map((item) => ({
    platform: "substack" as const,
    id: String(typeof item.guid === "object" && item.guid ? item.guid["#text"] : (item.guid ?? item.link)),
    author: site.name,
    text: String(item.title ?? ""),
    url: String(item.link ?? ""),
    date: new Date(String(item.pubDate ?? Date.now())).toISOString(),
  }));
}
