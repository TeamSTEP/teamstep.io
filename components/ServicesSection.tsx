"use client";

import { useState } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  GamepadIcon,
  HexagonIcon,
  PlayIcon,
  StarIcon,
} from "@teamstep/design-system";
import { ServiceCard } from "@/components/ds-client/ServiceCard";
import { ServiceInspectPanel } from "@/components/ds-client/ServiceInspectPanel";
import type { ServiceEntry, ServiceIconKey } from "@/lib/services";

// Unlike the ds-client/ wrappers, this isn't a workaround for the tsup single-bundle build
// issue — it's a real app-level Client Component that owns interaction state.
// ServiceCard.onInspect and ServiceInspectPanel.open/onClose are deliberately decoupled by
// the design system (see ServiceCard.tsx's own doc comment): the consumer decides how many
// panels exist and how they're wired. Here, one ServiceInspectPanel is shared across all
// cards, tracking which service (if any) is active.

const ICON_COMPONENTS: Record<ServiceIconKey, () => React.JSX.Element> = {
  hexagon: HexagonIcon,
  gamepad: GamepadIcon,
  star: StarIcon,
  play: PlayIcon,
  "arrow-right": ArrowRightIcon,
  "arrow-up-right": ArrowUpRightIcon,
};

export interface ServicesSectionProps {
  services: ServiceEntry[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const activeService = services.find((service) => service.id === activeServiceId) ?? null;

  return (
    <>
      {services.map((service) => {
        const Icon = ICON_COMPONENTS[service.icon];
        return (
          <ServiceCard
            key={service.id}
            icon={<Icon />}
            title={service.title}
            description={service.shortDescription}
            onInspect={() => setActiveServiceId(service.id)}
          />
        );
      })}
      <ServiceInspectPanel
        open={activeService !== null}
        onClose={() => setActiveServiceId(null)}
        title={activeService?.title ?? ""}
        description={activeService?.longDescription ?? ""}
        contactHref={activeService?.contactHref ?? "#footer"}
      />
    </>
  );
}
