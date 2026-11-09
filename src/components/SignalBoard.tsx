import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BBSList,
  BBSPanelIframe,
  BBSTerminal,
  type BBSItem,
  type BBSListStatus,
} from "@teamstep/design-system";
import {
  FEED_SOURCES,
  getSource,
  toBBSTabs,
  type ListFeedSource,
} from "../lib/feed/sources";

export interface SignalBoardProps {
  fetchEndpoint?: string;
}

const DEFAULT_SOURCE_ID = FEED_SOURCES[0]?.id ?? "bluesky";

export const SignalBoard = ({
  fetchEndpoint = "/api/feed",
}: SignalBoardProps) => {
  const tabs = useMemo(() => toBBSTabs(), []);
  const [activeTabId, setActiveTabId] = useState(DEFAULT_SOURCE_ID);
  const [items, setItems] = useState<BBSItem[]>([]);
  const [status, setStatus] = useState<BBSListStatus>("ready");
  const cacheRef = useRef<Map<string, BBSItem[]>>(new Map());

  const activeSource = getSource(activeTabId) ?? FEED_SOURCES[0];
  const tabListLabel = activeSource?.desktopLabel ?? "Feed";

  const loadListSource = useCallback(
    async (source: ListFeedSource, { bypassCache = false } = {}) => {
      const cached = cacheRef.current.get(source.id);
      if (!bypassCache && cached) {
        setItems(cached);
        setStatus(cached.length === 0 ? "ready" : "done");
        return;
      }

      setStatus("loading");
      setItems([]);

      try {
        const response = await fetch(`${fetchEndpoint}?source=${source.id}`);
        if (!response.ok) {
          throw new Error(`Feed request failed (${response.status})`);
        }
        const data = (await response.json()) as BBSItem[];
        cacheRef.current.set(source.id, data);
        setItems(data);
        setStatus(data.length === 0 ? "ready" : "done");
      } catch {
        setItems([]);
        setStatus("error");
      }
    },
    [fetchEndpoint],
  );

  useEffect(() => {
    if (!activeSource) return;
    if (activeSource.kind === "iframe") {
      setItems([]);
      setStatus("ready");
      return;
    }
    void loadListSource(activeSource);
  }, [activeSource, loadListSource]);

  return (
    <div className="signal-feed">
      <BBSTerminal
        title="Team STEP Social Network"
        tabListLabel={tabListLabel}
        tabs={tabs}
        activeTabId={activeTabId}
        onTabChange={setActiveTabId}
      >
        {activeSource?.kind === "iframe" ? (
          <BBSPanelIframe
            src={activeSource.buildSrc()}
            title={activeSource.title}
          />
        ) : (
          <BBSList
            status={status}
            items={items}
            density={activeSource?.density}
            thumbnailPlacement={activeSource?.thumbnailPlacement}
            thumbnailFit={activeSource?.thumbnailFit}
            onRetry={
              status === "error" && activeSource?.kind === "list"
                ? () => void loadListSource(activeSource, { bypassCache: true })
                : undefined
            }
          />
        )}
      </BBSTerminal>
    </div>
  );
};
