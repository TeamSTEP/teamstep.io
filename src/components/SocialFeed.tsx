import { useCallback, useEffect, useRef, useState } from "react";
import {
  BBSPanelAPI,
  BBSPanelIframe,
  BBSTerminal,
  type BBSTab,
  type UnifiedPost,
} from "@teamstep/design-system";

type FeedTab = "bluesky" | "youtube" | "discord";

const TABS: BBSTab[] = [
  { id: "bluesky", desktopLabel: "Bluesky", mobileLabel: "BSKY" },
  { id: "youtube", desktopLabel: "YouTube", mobileLabel: "YT" },
  { id: "discord", desktopLabel: "Discord", mobileLabel: "DC" },
];

export interface SocialFeedProps {
  fetchEndpoint?: string;
  discordServerId: string;
}

export function SocialFeed({
  fetchEndpoint = "/api/feed",
  discordServerId,
}: SocialFeedProps) {
  const [activeTab, setActiveTab] = useState<FeedTab>("bluesky");
  const [posts, setPosts] = useState<UnifiedPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Map<FeedTab, UnifiedPost[]>>(new Map());

  const loadPlatform = useCallback(
    async (tab: FeedTab) => {
      if (tab === "discord") {
        setPosts([]);
        setError(null);
        setLoading(false);
        return;
      }

      const cached = cacheRef.current.get(tab);
      if (cached) {
        setPosts(cached);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${fetchEndpoint}?platform=${tab}`);
        if (!response.ok) {
          throw new Error(`Feed request failed (${response.status})`);
        }
        const data = (await response.json()) as UnifiedPost[];
        cacheRef.current.set(tab, data);
        setPosts(data);
      } catch (fetchError) {
        setPosts([]);
        setError(fetchError instanceof Error ? fetchError.message : "Feed request failed");
      } finally {
        setLoading(false);
      }
    },
    [fetchEndpoint],
  );

  useEffect(() => {
    void loadPlatform(activeTab);
  }, [activeTab, loadPlatform]);

  return (
    <div className="ds-social-feed signal-feed">
      <BBSTerminal
        title="BBS·TEAMSTEP·v1.0 ─ SIGNAL ACQUIRED"
        tabs={TABS}
        activeTabId={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as FeedTab)}
      >
        {activeTab === "discord" ? (
          <BBSPanelIframe serverId={discordServerId} title="Team STEP Discord server" />
        ) : loading ? (
          <p className="ds-social-feed__status">{"// ACQUIRING SIGNAL..."}</p>
        ) : error ? (
          <p className="ds-social-feed__status">{`// ${error.toUpperCase()}`}</p>
        ) : (
          <BBSPanelAPI posts={posts} />
        )}
      </BBSTerminal>
    </div>
  );
}
