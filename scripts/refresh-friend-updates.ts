import fs from "node:fs";
import path from "node:path";

type Friend = {
  name: string;
  url: string;
  feedUrl?: string;
};

type FeedItem = {
  author: string;
  title: string;
  url: string;
  publishedAt: string | null;
};

const root = process.cwd();
const socialPath = path.join(root, "src", "data", "now-social.json");
const outputPath = path.join(root, "src", "data", "friend-updates.json");
const requestHeaders = {
  "user-agent": "bogas04.fyi friend updates (+https://bogas04.fyi/now)",
  accept: "application/atom+xml, application/rss+xml, application/xml, text/xml, text/html;q=0.9, */*;q=0.1",
};

function decode(value: string) {
  return value
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function element(xml: string, name: string) {
  return xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"))?.[1];
}

function attribute(xml: string, name: string) {
  return xml.match(new RegExp(`\\b${name}=["']([^"']+)["']`, "i"))?.[1];
}

function absoluteUrl(value: string | undefined, source: string) {
  if (!value) return undefined;
  try {
    return new URL(value, source).href;
  } catch {
    return undefined;
  }
}

async function fetchText(url: string) {
  const response = await fetch(url, {
    headers: requestHeaders,
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

async function findFeed(friend: Friend) {
  if (friend.feedUrl) return friend.feedUrl;

  const homepage = await fetchText(friend.url);
  const alternate = homepage.match(/<link[^>]+rel=["'][^"']*alternate[^"']*["'][^>]+>/gi)?.find((link) => /(?:rss|atom|xml)/i.test(link));
  const linkedFeed = alternate && absoluteUrl(attribute(alternate, "href"), friend.url);
  if (linkedFeed) return linkedFeed;

  for (const candidate of ["feed", "feed.xml", "rss.xml", "index.xml", "atom.xml"]) {
    const feedUrl = new URL(candidate, friend.url).href;
    try {
      const feed = await fetchText(feedUrl);
      if (/<(?:rss|feed)\b/i.test(feed)) return feedUrl;
    } catch {
      // A missing conventional feed path should not prevent other friends' updates.
    }
  }

  return undefined;
}

function parseFeed(feed: string, feedUrl: string, author: string): FeedItem[] {
  const entries = feed.match(/<(?:item|entry)\b[\s\S]*?<\/(?:item|entry)>/gi) || [];

  return entries.slice(0, 5).flatMap((entry) => {
    const title = decode(element(entry, "title") || "");
    const linkElement = entry.match(/<link\b[^>]*>/i)?.[0];
    const url = absoluteUrl(
      element(entry, "link") || attribute(linkElement || "", "href"),
      feedUrl,
    );
    const date = decode(element(entry, "pubDate") || element(entry, "published") || element(entry, "updated") || "");
    const publishedAt = date && !Number.isNaN(Date.parse(date)) ? new Date(date).toISOString() : null;

    return title && url ? [{ author, title, url, publishedAt }] : [];
  });
}

async function refreshFriend(friend: Friend): Promise<FeedItem | undefined> {
  try {
    const feedUrl = await findFeed(friend);
    if (!feedUrl) {
      console.warn(`No RSS or Atom feed found for ${friend.name}`);
      return undefined;
    }
    return parseFeed(await fetchText(feedUrl), feedUrl, friend.name)
      .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""))[0];
  } catch (error) {
    console.warn(`Could not refresh ${friend.name}: ${String(error)}`);
    return undefined;
  }
}

async function main() {
  const { friends } = JSON.parse(fs.readFileSync(socialPath, "utf8")) as { friends: Friend[] };
  const updates: FeedItem[] = [];

  for (let offset = 0; offset < friends.length; offset += 4) {
    const batch = await Promise.all(friends.slice(offset, offset + 4).map(refreshFriend));
    updates.push(...batch.filter((update): update is FeedItem => Boolean(update)));
  }

  updates.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
  fs.writeFileSync(outputPath, `${JSON.stringify({ updatedAt: new Date().toISOString(), items: updates }, null, 2)}\n`);
  console.log(`Wrote ${updates.length} friend updates`);
}

main();
