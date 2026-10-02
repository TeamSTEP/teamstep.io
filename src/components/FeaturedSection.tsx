import {
  FeaturedStage,
  VideoFacade,
  type FeaturedStageProps,
} from "@teamstep/design-system";
import { useMainQuestExpand } from "../hooks/useMainQuestExpand";

export interface FeaturedSectionProps {
  stage: Omit<FeaturedStageProps, "media">;
  posterSrc: string;
  posterAlt: string;
  loopSrc?: string;
  trailerUrl?: string;
}

export const FeaturedSection = ({
  stage,
  posterSrc,
  posterAlt,
  loopSrc,
  trailerUrl,
}: FeaturedSectionProps) => {
  useMainQuestExpand();

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
};
