import { XMLParser } from "fast-xml-parser";
import { site } from "../../site.config";
import type { UnifiedPost } from "./types";

export async function fetchSubstack(): Promise<UnifiedPost[]> {
  const xml = await fetch(site.social.substack.feed).then((r) => {
    if (!r.ok) throw new Error(`Substack ${r.status}`);
    return r.text();
  });
  const data = new XMLParser({ ignoreAttributes: false }).parse(xml);
  const items = ([] as unknown[]).concat(data?.rss?.channel?.item ?? []).slice(0, 5);

  return items.map((item: Record<string, unknown>) => ({
    platform: "substack" as const,
    id: String(item.guid?.["#text"] ?? item.guid ?? item.link),
    author: site.name,
    text: String(item.title ?? ""),
    url: String(item.link ?? ""),
    date: new Date(String(item.pubDate ?? Date.now())).toISOString(),
  }));
}
