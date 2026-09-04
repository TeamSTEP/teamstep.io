import { Hero } from "@/components/ds-client/Hero";
import { GameCardArchive } from "@/components/ds-client/GameCardArchive";
import { GameCardFeatured } from "@/components/ds-client/GameCardFeatured";
import { VideoFacade } from "@/components/ds-client/VideoFacade";
import { isArchiveGame, loadGames } from "@/lib/games";
import type { GamePlatform, GamePlatformTier } from "@/lib/games";

// Phase 0/1's smoke test, extended for Phase 2: now rendering real game data (placeholder
// art, real copy/structure) through GameCardFeatured/GameCardArchive, so the data layer and
// these two components can be checked visually against the wireframe together. Still not
// the final page — Phase 3 adds Manifesto/Services/Footer/BBS Board and real nav.
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

  return (
    <>
      <Hero
        eyebrow="indie game studio"
        tagline="Building the home for the indie game world — one step at a time."
        ctaHref="#quest-log"
        logoMarkSrc="/logo-mark-placeholder.svg"
        logoMarkAlt="Team STEP logo mark (placeholder — swap for the real logo mark asset)"
      />
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
    </>
  );
}
