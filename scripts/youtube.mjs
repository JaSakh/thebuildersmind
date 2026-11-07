#!/usr/bin/env node
// Keeps the site in sync with the YouTube channel. No API key needed.
//
//   node scripts/youtube.mjs            add new uploads + fill in missing chapters/summaries
//   node scripts/youtube.mjs --refresh  re-read every episode's YouTube page (e.g. after editing descriptions)
//
// What it does:
// 1. Reads the channel's public RSS feed (latest 15 uploads). Shorts are skipped.
// 2. Any long-form video not yet in src/lib/episodes.ts is inserted at the top of the list,
//    marked "auto-added" so you can check guest, company, category and kind.
// 3. For each episode it stores chapters, summary, topics, length and publish date in
//    src/lib/youtube-data.json (from the RSS description, or the video page for older videos).
//
// The GitHub Pages workflow runs this every morning and redeploys only when something changed.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const CHANNEL_ID = "UC46bIl_vkbZvyrYAF2SRq8w"; // youtube.com/@thebuildersmind
// Long-form videos that should never be added to the site (trailers, livestream tests…).
const IGNORE = new Set([]);

const root = fileURLToPath(new URL("..", import.meta.url));
const EPISODES = `${root}src/lib/episodes.ts`;
const DATA = `${root}src/lib/youtube-data.json`;
const MARKER = "// ↓ new episodes are inserted here, newest first\n";
const refresh = process.argv.includes("--refresh");

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
  Cookie: "SOCS=CAI", // skips the EU cookie-consent page
};

// ---------- description parsing ----------

const unescapeXml = (s) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");

const TIME = /^\s*[([]?((?:\d{1,2}:)?\d{1,2}:\d{2})[)\]]?\s*(?:[-–—:|•]\s*)?(.+?)\s*$/;
const toSeconds = (t) => t.split(":").reduce((acc, n) => acc * 60 + Number(n), 0);

export function parseChapters(desc) {
  const chapters = [];
  for (const line of desc.split("\n")) {
    const m = line.match(TIME);
    if (m) chapters.push({ start: toSeconds(m[1]), title: m[2].replace(/\s+/g, " ") });
  }
  // Same rules YouTube uses: starts at 0:00, at least 3, in order.
  if (chapters.length < 3 || chapters[0].start !== 0) return [];
  for (let i = 1; i < chapters.length; i++) if (chapters[i].start <= chapters[i - 1].start) return [];
  return chapters;
}

const BULLET = /^\s*(?:[•●▪◦\-*–→✅✔️▶️►]|\d+[.)])\s+/u;
const isHeading = (p) => /^(chapters|timestamps?|keywords|connect|follow|links?|about|resources)\b/i.test(p.trim());

export function parseSummary(desc) {
  const out = [];
  for (const para of desc.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)) {
    const lines = para.split("\n");
    const prose =
      !isHeading(para) &&
      !/https?:\/\/|#\w/.test(para) &&
      !para.trimEnd().endsWith(":") &&
      !lines.some((l) => BULLET.test(l) || TIME.test(l));
    if (!prose) break;
    out.push(lines.map((l) => l.trim()).join(" "));
    if (out.length === 2) break;
  }
  return out.join("\n\n") || undefined;
}

export function parseTopics(desc) {
  const topics = desc
    .split("\n")
    .filter((l) => BULLET.test(l) && !TIME.test(l) && !/https?:\/\//.test(l))
    .map((l) => l.replace(BULLET, "").trim())
    .filter((l) => l.length >= 10 && l.length <= 300);
  return topics.length >= 2 ? topics.slice(0, 10) : undefined;
}

function fromDescription(desc) {
  const d = {};
  const summary = parseSummary(desc);
  const topics = parseTopics(desc);
  const chapters = parseChapters(desc);
  if (summary) d.summary = summary;
  if (topics) d.topics = topics;
  if (chapters.length) d.chapters = chapters;
  return d;
}

// ---------- fetching ----------

async function fetchFeed() {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`RSS feed: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
    id: e.match(/<yt:videoId>(.*?)</)[1],
    title: unescapeXml(e.match(/<title>(.*?)<\/title>/)[1]),
    short: /\/shorts\//.test(e.match(/<link rel="alternate" href="(.*?)"/)?.[1] ?? ""),
    published: e.match(/<published>(.*?)</)[1].slice(0, 10),
    description: unescapeXml(e.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ?? ""),
  }));
}

// The video page has the full description, exact length and publish date. YouTube sometimes
// blocks automated requests (e.g. from cloud servers); then we return null and keep what we have.
async function fetchVideoPage(id) {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${id}`, { headers: HEADERS });
    if (!res.ok) return null;
    const html = await res.text();
    const m = html.match(/ytInitialPlayerResponse\s*=\s*(\{.+?\});(?:var |<\/script>)/s);
    if (!m) return null;
    const player = JSON.parse(m[1]);
    const v = player.videoDetails;
    if (!v?.shortDescription && !v?.lengthSeconds) return null;
    const micro = player.microformat?.playerMicroformatRenderer ?? {};
    return {
      title: v.title,
      description: v.shortDescription ?? "",
      lengthSeconds: Number(v.lengthSeconds) || undefined,
      upcoming: !!v.isUpcoming || !!v.isLive,
      published: (micro.publishDate ?? micro.uploadDate ?? "").slice(0, 10) || undefined,
    };
  } catch {
    return null;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- new-episode line ----------

const NOT_A_NAME = /\b(startup|founder|story|demo|podcast|ep\.?|episode|full|tutorial|interview)\b/i;
const NAME = /^[\p{Lu}][\p{L}.'’-]*(?: [\p{Lu}][\p{L}.'’-]*){0,2}$/u;

export function splitTitle(raw) {
  // "Title | Guest", "Title | Guest, Company", "Title | Founder Story (Guest, Company)"
  const [title, ...rest] = raw.split(/\s+\|\s+/);
  const suffix = rest.join(" | ").trim();
  let guest, company;
  const inParens = suffix.match(/\(([^)]+)\)\s*$/)?.[1];
  const who = inParens ?? suffix;
  if (who) {
    const [a, b] = who.split(/\s*,\s*/);
    if (a && NAME.test(a) && !NOT_A_NAME.test(a)) {
      guest = a;
      if (b && b.length <= 40 && !NOT_A_NAME.test(b)) company = b;
    }
  }
  return { title: title.trim(), guest, company };
}

function episodeLine(video, lengthSeconds, today) {
  const { title, guest, company } = splitTitle(video.title);
  const fmt = (s) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = String(s % 60).padStart(2, "0");
    return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
  };
  const fields = [
    `id: ${JSON.stringify(video.id)}`,
    `title: ${JSON.stringify(title)}`,
    guest && `guest: ${JSON.stringify(guest)}`,
    company && `company: ${JSON.stringify(company)}`,
    `category: "Founder Stories"`,
    `kind: "episode"`,
    `duration: ${JSON.stringify(lengthSeconds ? fmt(lengthSeconds) : "")}`,
  ].filter(Boolean);
  return `  { ${fields.join(", ")} }, // auto-added ${today}: check guest, company, category, kind\n`;
}

// ---------- main ----------

async function main() {
  let source = await readFile(EPISODES, "utf8");
  if (!source.includes(MARKER)) throw new Error(`Marker not found in episodes.ts: ${MARKER.trim()}`);
  const data = JSON.parse(await readFile(DATA, "utf8"));
  const feed = await fetchFeed();
  const known = () => new Set([...source.matchAll(/id: "([A-Za-z0-9_-]{11})"/g)].map((m) => m[1]));
  const today = new Date().toISOString().slice(0, 10);

  // 1. New long-form uploads (feed is newest first; insert oldest first so order stays newest-first)
  const added = [];
  for (const video of [...feed].reverse()) {
    if (video.short || IGNORE.has(video.id) || known().has(video.id)) continue;
    const page = await fetchVideoPage(video.id);
    if (page?.upcoming) continue; // premiere / livestream not out yet
    if (page?.lengthSeconds && page.lengthSeconds <= 180) continue; // a Short the feed didn't mark
    source = source.replace(MARKER, MARKER + episodeLine(video, page?.lengthSeconds, today));
    data[video.id] = { ...data[video.id], published: page?.published ?? video.published, lengthSeconds: page?.lengthSeconds };
    added.push(video.title);
  }

  // 2. Chapters / summary / topics / length for every episode
  const ids = [...known()];
  const fromFeed = new Map(feed.map((v) => [v.id, v]));
  let fetched = 0, failed = 0;
  for (const id of ids) {
    const prev = data[id] ?? {};
    const needsPage = refresh || !prev.lengthSeconds || !prev.published;
    let entry = { ...prev };
    const page = needsPage ? await fetchVideoPage(id) : null;
    if (needsPage) {
      if (page) fetched++; else failed++;
      await sleep(300);
    }
    if (page) {
      entry = { published: page.published ?? prev.published, lengthSeconds: page.lengthSeconds ?? prev.lengthSeconds };
      Object.assign(entry, fromDescription(page.description));
    } else if (fromFeed.has(id)) {
      const v = fromFeed.get(id);
      entry = { published: prev.published ?? v.published, lengthSeconds: prev.lengthSeconds };
      Object.assign(entry, fromDescription(v.description));
    }
    for (const k of Object.keys(entry)) if (entry[k] === undefined) delete entry[k];
    data[id] = entry;
  }

  // Keep the file in episode order and drop removed episodes, so diffs stay small.
  const ordered = Object.fromEntries(ids.map((id) => [id, data[id]]));
  await writeFile(DATA, JSON.stringify(ordered, null, 2) + "\n");
  await writeFile(EPISODES, source);

  const withChapters = ids.filter((id) => ordered[id]?.chapters?.length).length;
  console.log(`Feed: ${feed.length} uploads (${feed.filter((v) => v.short).length} Shorts skipped)`);
  console.log(added.length ? `Added ${added.length}:\n  ${added.join("\n  ")}` : "No new episodes.");
  console.log(`Video pages read: ${fetched}${failed ? `, ${failed} unavailable (kept existing data)` : ""}`);
  console.log(`Episodes with chapters: ${withChapters}/${ids.length}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
