import {
  FeaturedStage,
  VideoFacade,
  type FeaturedStageProps,
} from "@teamstep/design-system";

export interface FeaturedSectionProps {
  stage: Omit<FeaturedStageProps, "media">;
  posterSrc: string;
  posterAlt: string;
  loopSrc?: string;
  trailerUrl?: string;
}

export function FeaturedSection({
  stage,
  posterSrc,
  posterAlt,
  loopSrc,
  trailerUrl,
}: FeaturedSectionProps) {
  return (
    <FeaturedStage
      {...stage}
      media={
        <VideoFacade
          posterSrc={posterSrc}
          posterAlt={posterAlt}
          loopSrc={loopSrc}
          trailerUrl={trailerUrl}
        />
      }
    />
  );
}
