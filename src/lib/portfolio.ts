import type { CollectionEntry } from "astro:content";
import type { PortfolioCardProps } from "@teamstep/design-system";

type Portfolio = CollectionEntry<"portfolio">;

export const toPortfolioCards = (entries: Portfolio[]): PortfolioCardProps[] => {
  return [...entries]
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder)
    .map((entry) => ({
      title: entry.data.title,
      client: entry.data.client,
      year: entry.data.year,
      description: entry.data.description.trim(),
      posterSrc: entry.data.media.poster,
      posterAlt: `${entry.data.title} case art`,
      caseHref: entry.data.caseUrl ?? "#",
    }));
}
