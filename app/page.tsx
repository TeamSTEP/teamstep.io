import { Hero } from "@/components/ds-client/Hero";
import { GameCardArchive } from "@/components/ds-client/GameCardArchive";
import { GameCardFeatured } from "@/components/ds-client/GameCardFeatured";
import { VideoFacade } from "@/components/ds-client/VideoFacade";
import { DialogueBox } from "@/components/ds-client/DialogueBox";
import { SocialFeed } from "@/components/ds-client/SocialFeed";
import { ServicesSection } from "@/components/ServicesSection";
import { isArchiveGame, loadGames } from "@/lib/games";
import { loadServices } from "@/lib/services";
import type { GamePlatform, GamePlatformTier } from "@/lib/games";

// Phase 3: adds Manifesto/Services/BBS Board sections and real section ids for nav (see
// app/layout.tsx and teamstep-landing-phase3-plan.md). Manifesto copy, Discord server id,
// and service descriptions are all placeholders — content gaps tracked in that plan doc,
// not engineering TODOs.
//
// Every design-system import here goes through components/ds-client/ — see that folder's
// GameCardFeatured.tsx for why even hook-free components currently need a client wrapper
// (a design-system build-output issue, not a per-component one).

function archiveCtaIcon(
  platform: GamePlatform,
  tier: GamePlatformTier,
): "hexagon" | "gamepad" | "download" {
  if (platform === "itch" && tier === "free") return "download";
  if (platform === "browser") return "gamepad";
  if (platform === "steam" || platform === "gog" || platform === "epic") return "hexagon";
  return "gamepad";
}

export default function Home() {
  const games = loadGames();
  const featured = games.find((game) => game.status === "main-quest");
  const archived = games.filter(isArchiveGame);
  const services = loadServices();

  return (
    <>
      <section id="hero">
        <Hero
          eyebrow="indie game studio"
          tagline="Building the home for the indie game world — one step at a time."
          ctaHref="#quest-log"
          logoMarkSrc="/logo-mark-placeholder.svg"
          logoMarkAlt="Team STEP logo mark (placeholder — swap for the real logo mark asset)"
        />
      </section>
      <section id="quest-log">
        {featured ? (
          <GameCardFeatured
            title={featured.title}
            subtitle={featured.subtitle}
            description={featured.description}
            platforms={featured.platforms}
            media={
              <VideoFacade
                posterSrc={featured.media.poster}
                posterAlt={`${featured.title} key art (placeholder poster)`}
                loopSrc={featured.media.loop}
                trailerUrl={featured.media.trailer}
              />
            }
          />
        ) : null}
        {archived.map((game) => (
          <GameCardArchive
            key={game.slug}
            title={game.title}
            description={game.description}
            status={game.status}
            posterSrc={game.media.poster}
            posterAlt={`${game.title} poster (placeholder)`}
            cta={{
              icon: archiveCtaIcon(game.platforms[0].platform, game.platforms[0].tier),
              label: game.platforms[0].label,
              url: game.platforms[0].url,
            }}
          />
        ))}
      </section>
      <section id="bbs">
        {/* discordServerId is a placeholder — real value needed before the Discord tab
            works (Phase 3 content gap). fetchEndpoint is left at its /api/feed default:
            there's no backing route yet (Phase 4, still open), and BBSPanelAPI/SocialFeed
            already degrade to a clean status line rather than crashing when it 404s. */}
        <SocialFeed discordServerId="000000000000000000" />
      </section>
      <section id="manifesto">
        {/* text is placeholder copy — real manifesto text is a Phase 3 content gap. */}
        <DialogueBox
          avatarSrc="/logo-mark-placeholder.svg"
          avatarAlt="Team STEP logo mark (placeholder — swap for the real logo mark asset)"
          text="PLACEHOLDER COPY — replace with the real manifesto text. This is where Team STEP's actual voice goes: why the studio exists, what it believes about games, and why Meltdown is the thesis statement rather than a side project."
        />
      </section>
      <section id="services">
        <ServicesSection services={services} />
      </section>
    </>
  );
}
