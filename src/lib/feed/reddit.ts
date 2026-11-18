import { REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET } from "astro:env/server";
import type { BBSItem } from "@teamstep/design-system";
import { site } from "../../site.config";

const TOKEN_URL = "https://www.reddit.com/api/v1/access_token";
const API_BASE = "https://oauth.reddit.com";
const USER_AGENT = `web:io.teamstep.feed:v1 (by /u/${site.social.reddit.username})`;
const TOKEN_EXPIRY_MARGIN_MS = 60_000;

type RedditPost = {
  kind: "t3";
  data: {
    name: string;
    title: string;
    permalink: string;
    subreddit_name_prefixed: string;
    created_utc: number;
  };
};

type RedditComment = {
  kind: "t1";
  data: {
    name: string;
    body: string;
    permalink: string;
    link_title: string;
    subreddit_name_prefixed: string;
    created_utc: number;
  };
};

type RedditThing = RedditPost | RedditComment;

let cachedToken: { value: string; expiresAt: number } | undefined;

const fetchAccessToken = async (): Promise<string> => {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }
  if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET) {
    throw new Error("Reddit credentials are not configured");
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": USER_AGENT,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });
  if (!res.ok) throw new Error(`Reddit auth ${res.status}`);

  const { access_token, expires_in } = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };
  cachedToken = {
    value: access_token,
    expiresAt: Date.now() + expires_in * 1000 - TOKEN_EXPIRY_MARGIN_MS,
  };
  return access_token;
};

const toItem = (thing: RedditThing): BBSItem => {
  const { data } = thing;
  const isComment = thing.kind === "t1";
  return {
    id: data.name,
    name: isComment
      ? `${data.subreddit_name_prefixed} · re: ${thing.data.link_title}`
      : data.subreddit_name_prefixed,
    href: `https://www.reddit.com${data.permalink}`,
    body: isComment ? thing.data.body : thing.data.title,
    publishedAt: new Date(data.created_utc * 1000).toISOString(),
  };
};

export const fetchReddit = async (): Promise<BBSItem[]> => {
  const token = await fetchAccessToken();
  const res = await fetch(
    `${API_BASE}/user/${site.social.reddit.username}/overview?limit=10&raw_json=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": USER_AGENT,
      },
    },
  );
  if (res.status === 401) cachedToken = undefined;
  if (!res.ok) throw new Error(`Reddit ${res.status}`);

  const { data } = (await res.json()) as {
    data: { children: RedditThing[] };
  };
  return data.children.map(toItem);
};
