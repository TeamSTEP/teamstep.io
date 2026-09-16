import type { Metadata } from "next";
import "@teamstep/design-system/tokens.css";
import "@teamstep/design-system/styles.css";
import "./globals.css";
import { NavDesktop } from "@/components/ds-client/NavDesktop";
import { NavHUD } from "@/components/ds-client/NavHUD";
import { Footer } from "@/components/ds-client/Footer";

// Placeholder copy — SEO/OG/JSON-LD is Phase 5 per the build plan. This just keeps the
// default create-next-app metadata from shipping to production by accident.
export const metadata: Metadata = {
  title: "Team STEP — Building the home for the indie game world",
  description:
    "Team STEP is an indie game studio. Building the home for the indie game world, one step at a time.",
};

// Nav/HUD link labels and contactHref are placeholders (Phase 3 content gap — see
// teamstep-landing-phase3-plan.md). Section ids here must stay in sync with the `id`s
// page.tsx actually renders (hero, quest-log, bbs, manifesto, services) plus #footer.
const NAV_LINKS = [
  { label: "HOME", href: "#hero" },
  { label: "GAMES", href: "#quest-log" },
  { label: "BBS", href: "#bbs" },
  { label: "MANIFESTO", href: "#manifesto" },
  { label: "SERVICES", href: "#services" },
];

const HUD_ITEMS = [
  { label: "HOME", sectionId: "hero" },
  { label: "GAMES", sectionId: "quest-log" },
  { label: "BBS", sectionId: "bbs" },
  { label: "MANIFESTO", sectionId: "manifesto" },
  { label: "SERVICES", sectionId: "services" },
];

// contactHref/footer socials are placeholders pointing at the footer section anchor until
// real destinations (mailto, Discord invite, real social URLs) are supplied.
const CONTACT_HREF = "#footer";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <NavDesktop links={NAV_LINKS} contactHref={CONTACT_HREF} />
        {children}
        <NavHUD items={HUD_ITEMS} />
        {/* Footer has no id prop (closed API) — the wrapping div is what #footer actually
            scrolls to for NavDesktop's contactHref and each ServiceInspectPanel's CTA. */}
        <div id="footer">
          <Footer
            studioName="Team STEP"
            tagline="PLACEHOLDER COPY — replace with real tagline."
            socials={[
              { platform: "bluesky", href: "#", label: "Team STEP on Bluesky (placeholder link)" },
              { platform: "substack", href: "#", label: "Team STEP on Substack (placeholder link)" },
              { platform: "youtube", href: "#", label: "Team STEP on YouTube (placeholder link)" },
              { platform: "discord", href: "#", label: "Team STEP on Discord (placeholder link)" },
            ]}
          />
        </div>
      </body>
    </html>
  );
}
