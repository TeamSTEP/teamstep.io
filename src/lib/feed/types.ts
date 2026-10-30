export type { BBSItem } from "@teamstep/design-system";

export interface RssItem {
  guid?: { "#text": string } | string;
  link?: string;
  title?: string;
  pubDate?: string;
}
