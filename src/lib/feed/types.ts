export interface UnifiedPost {
  platform: "bluesky" | "substack" | "youtube";
  id: string;
  author: string;
  text: string;
  url: string;
  date: string;
  thumb?: string;
}

export interface RssItem {
  guid?: { "#text": string } | string;
  link?: string;
  title?: string;
  pubDate?: string;
}