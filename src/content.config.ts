import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const platformSchema = z.object({
  platform: z.enum(["steam", "itch", "gog", "epic", "browser"]),
  tier: z.enum(["demo", "full", "free", "dlc"]),
  label: z.string(),
  url: z.string().url(),
  available: z.boolean(),
});

const games = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml}", base: "./src/content/games" }),
  schema: z.object({
    kind: z.literal("original"),
    title: z.string(),
    slug: z.string(),
    subtitle: z.string(),
    description: z.string(),
    phase: z.enum(["shipping", "released", "prototype", "paused", "legacy"]),
    featured: z.boolean(),
    sortOrder: z.number(),
    platforms: z.array(platformSchema),
    media: z.object({
      poster: z.string(),
      loop: z.string().optional(),
      trailer: z.string().url().optional(),
    }),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml}", base: "./src/content/portfolio" }),
  schema: z.object({
    kind: z.literal("portfolio"),
    title: z.string(),
    slug: z.string(),
    client: z.string(),
    year: z.number(),
    description: z.string(),
    sortOrder: z.number(),
    caseUrl: z.string().url().optional(),
    media: z.object({
      poster: z.string(),
    }),
  }),
});

export const collections = { games, portfolio };
