"use client";

// SocialFeed owns tab-switching state and fetches on mount — needs its own client boundary.
// BBSTerminal/BBSPanelAPI/BBSPanelIframe don't need separate wrappers: they have no hooks of
// their own, they just ride along as part of SocialFeed's client subtree. If a future usage
// ever needs BBSTerminal standalone from a server context, it can import the package root
// directly — it's server-safe on its own.
export { SocialFeed } from "@teamstep/design-system";
export type { SocialFeedProps, SocialFeedTab } from "@teamstep/design-system";
