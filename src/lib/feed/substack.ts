import { XMLParser } from "fast-xml-parser";
import type { BBSItem } from "@teamstep/design-system";
import { site } from "../../site.config";
import type { RssItem } from "./types";

export const fetchSubstack = async (): Promise<BBSItem[]> => {
  const xml = await fetch(site.social.substack.feed).then((r) => {
    if (!r.ok) throw new Error(`Substack ${r.status}`);
    return r.text();
  });
  const data = new XMLParser({ ignoreAttributes: false }).parse(xml);
  const items = ([] as RssItem[])
    .concat(data?.rss?.channel?.item ?? [])
    .slice(0, 5);

  return items.map((item) => ({
    id: String(
      typeof item.guid === "object" && item.guid
        ? item.guid["#text"]
        : (item.guid ?? item.link),
    ),
    name: String(item.title ?? ""),
    href: String(item.link ?? ""),
    publishedAt: new Date(String(item.pubDate ?? Date.now())).toISOString(),
  }));
};
