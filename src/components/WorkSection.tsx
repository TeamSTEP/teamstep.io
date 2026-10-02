import { useState } from "react";
import {
  Cta,
  PortfolioCard,
  ServiceCard,
  ServiceInspectPanel,
  type PortfolioCardProps,
} from "@teamstep/design-system";

// todo: should be stored in the contents folder
const SERVICES = [
  {
    id: "game-dev",
    title: "Game Development",
    description: "From prototype to shippable build.",
    detail:
      "Full-cycle indie game development — prototypes, systems, polish, and ship support.",
  },
  {
    id: "gamification",
    title: "Gamification",
    description: "Systems that make progress feel playable.",
    detail:
      "Progress loops, reward design, and playful UX for products that need momentum.",
  },
  {
    id: "visual-art",
    title: "Visual Art",
    description: "Worlds, UI, and motion with a point of view.",
    detail:
      "Direction, UI kits, and motion that carry a distinct visual voice.",
  },
] as const;

export interface WorkSectionProps {
  portfolio: PortfolioCardProps[];
  contactHref: string;
}

export const WorkSection = ({ portfolio, contactHref }: WorkSectionProps) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = SERVICES.find((s) => s.id === openId);

  return (
    <section id="services" data-section="work" className="work">
      <div className="work__inner">
        <h2 className="work__heading">What we build</h2>
        <div className="work__grid">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              icon={<span className="work__icon" />}
              title={service.title}
              description={service.description}
              onInspect={() => setOpenId(service.id)}
            />
          ))}
        </div>

        {portfolio.length > 0 ? (
          <div className="work__portfolio">
            <h3 className="work__portfolio-heading">Selected work</h3>
            <p className="work__portfolio-lede">
              Client and commission projects — separate from the Quest Log.
            </p>
            <div className="work__portfolio-grid">
              {portfolio.map((card) => (
                <PortfolioCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        ) : null}

        <div className="work__contact">
          <Cta variant="contact" href={contactHref}>
            Get in touch
          </Cta>
        </div>
      </div>

      <ServiceInspectPanel
        open={openId !== null}
        title={open?.title ?? ""}
        description={open?.detail ?? ""}
        contactHref={contactHref}
        onClose={() => setOpenId(null)}
      />
    </section>
  );
}
