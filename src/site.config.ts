/** Site-wide identity, social IDs, and landing-page knobs. */

export const site = {
  name: "Team STEP",
  url: "https://teamstep.io",
  title: "Team STEP | Making Indie Games",
  description:
    "Building the home for the indie game world.",
  tagline: "One step at a time.",
  contactEmail: "hello@teamstep.io",
  contactHref: "mailto:hello@teamstep.io",

  // todo: this is still using the placeholder logo
  logoMark:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='112' height='112'%3E%3Ccircle cx='56' cy='56' r='52' fill='none' stroke='%238591C9' stroke-width='2'/%3E%3Ccircle cx='56' cy='56' r='28' fill='%234f476d'/%3E%3C/svg%3E",

  boot: {
    eyebrow: "brought to you by passionate creators",
    tagline: "When the world feels too crazy, a bit of gaming calms the nerves",
    ctaHref: "#meltdown",
    ctaLabel: "ENTER",
    peekLabel: "Current project",
  },

  manifesto: {
    display: "Creativity is a human right.",
    dialogue: "One step at a time. Building the home for the indie game world.",
  },

  feed: {
    endpoint: "/api/feed",
    heading: "Live from the guild",
  },

  nav: [
    { label: "HOME", href: "#boot", sectionId: "boot" },
    { label: "GAMES", href: "#meltdown", sectionId: "meltdown" },
    { label: "FEED", href: "#bbs-board", sectionId: "bbs-board" },
    { label: "WORK", href: "#services", sectionId: "services" },
  ],

  social: {
    bluesky: {
      handle: "teamstep.io",
      href: "https://bsky.app/profile/teamstep.io",
      label: "Team STEP on Bluesky",
    },
    substack: {
      href: "https://teamstep.substack.com",
      feed: "https://teamstep.substack.com/feed",
      label: "Team STEP on Substack",
    },
    youtube: {
      /** Numeric channel ID for RSS (`feeds/videos.xml?channel_id=`). */
      channelId: "UC8NXPq0Zd2ueAJ6r6vhhXfw",
      href: "https://www.youtube.com/@teamstep",
      label: "Team STEP on YouTube",
    },
    discord: {
      /** Snowflake ID for the Discord widget embed. */
      serverId: "773053159270514728",
      href: "https://discord.gg/JPUaPmQvSZ",
      label: "Team STEP on Discord",
    },
    itch: {
      href: "https://teamstep.itch.io",
    },
  },
} as const;

export const socialLinks = [
  {
    platform: "bluesky" as const,
    href: site.social.bluesky.href,
    label: site.social.bluesky.label,
  },
  {
    platform: "substack" as const,
    href: site.social.substack.href,
    label: site.social.substack.label,
  },
  {
    platform: "youtube" as const,
    href: site.social.youtube.href,
    label: site.social.youtube.label,
  },
  {
    platform: "discord" as const,
    href: site.social.discord.href,
    label: site.social.discord.label,
  },
];

export const sameAs = [
  site.social.bluesky.href,
  site.social.itch.href,
  site.social.substack.href,
  site.social.discord.href,
];
