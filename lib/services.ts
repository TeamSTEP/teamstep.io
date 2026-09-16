import consulting from "@/content/services/consulting.json";
import development from "@/content/services/development.json";
import publishing from "@/content/services/publishing.json";

// Mirrors lib/games.ts's approach: hand-rolled validation over a schema library, plain data
// types independent of @teamstep/design-system's own PlatformEntry/ServiceCardProps shapes.
// `icon` is a closed string key (not a ReactNode) because JSON can't hold a component — the
// Services section maps this key to an actual icon component at render time.

export type ServiceIconKey = "hexagon" | "gamepad" | "star" | "play" | "arrow-right" | "arrow-up-right";

export interface ServiceEntry {
  id: string;
  title: string;
  /** Short copy for ServiceCard. */
  shortDescription: string;
  /** Longer copy for ServiceInspectPanel. */
  longDescription: string;
  icon: ServiceIconKey;
  /** Destination for the ServiceInspectPanel "GET IN TOUCH" CTA. */
  contactHref: string;
  sortOrder: number;
}

const SERVICE_ICONS: readonly ServiceIconKey[] = [
  "hexagon",
  "gamepad",
  "star",
  "play",
  "arrow-right",
  "arrow-up-right",
];

function assertServiceEntry(data: unknown, source: string): ServiceEntry {
  const errors: string[] = [];
  const entry = data as Partial<ServiceEntry> & Record<string, unknown>;

  if (typeof entry.id !== "string") errors.push("id must be a string");
  if (typeof entry.title !== "string") errors.push("title must be a string");
  if (typeof entry.shortDescription !== "string") errors.push("shortDescription must be a string");
  if (typeof entry.longDescription !== "string") errors.push("longDescription must be a string");
  if (!SERVICE_ICONS.includes(entry.icon as ServiceIconKey)) {
    errors.push(`icon must be one of ${SERVICE_ICONS.join(", ")}`);
  }
  if (typeof entry.contactHref !== "string") errors.push("contactHref must be a string");
  if (typeof entry.sortOrder !== "number") errors.push("sortOrder must be a number");

  if (errors.length > 0) {
    throw new Error(`Invalid service entry in ${source}:\n  - ${errors.join("\n  - ")}`);
  }

  return entry as ServiceEntry;
}

const RAW_SERVICES: Array<[unknown, string]> = [
  [development, "content/services/development.json"],
  [consulting, "content/services/consulting.json"],
  [publishing, "content/services/publishing.json"],
];

/** All services, validated and sorted by sortOrder. Throws at build/dev time on a bad entry. */
export function loadServices(): ServiceEntry[] {
  return RAW_SERVICES.map(([data, source]) => assertServiceEntry(data, source)).sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
}
