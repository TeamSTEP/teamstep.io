import type { Metadata } from "next";
import "@teamstep/design-system/tokens.css";
import "@teamstep/design-system/styles.css";
import "./globals.css";

// Placeholder copy — SEO/OG/JSON-LD is Phase 5 per the build plan. This just keeps the
// default create-next-app metadata from shipping to production by accident.
export const metadata: Metadata = {
  title: "Team STEP — Building the home for the indie game world",
  description:
    "Team STEP is an indie game studio. Building the home for the indie game world, one step at a time.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
