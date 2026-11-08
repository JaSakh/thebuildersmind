"use client";

import { useMemo, useState } from "react";
import { categories, episodes, type FullEpisode } from "@/lib/episodes";
import EpisodeCard from "./EpisodeCard";

// Everything a visitor might search for, including tools named in summaries and chapters.
const searchText = (e: FullEpisode) =>
  [e.title, e.guest, e.company, e.role, e.notes, ...(e.takeaways ?? []), ...e.chapters.map((c) => c.title)]
    .join(" ")
    .toLowerCase();

export default function EpisodeBrowser() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [kind, setKind] = useState<"all" | "episode" | "tutorial">("all");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return episodes.filter(
      (e) =>
        (cat === "All" || e.category === cat) &&
        (kind === "all" || e.kind === kind) &&
        (!s || searchText(e).includes(s)),
    );
  }, [q, cat, kind]);

  const chip = (active: boolean) =>
    `shrink-0 rounded-full border px-3 py-1.5 text-sm transition ${
      active ? "border-brand bg-brand-soft text-ink" : "border-line text-mute hover:text-ink"
    }`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          className="input md:max-w-sm"
          placeholder="Search founders, companies, tools, topics…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search episodes"
        />
        <div className="flex gap-2">
          {(["all", "episode", "tutorial"] as const).map((k) => (
            <button key={k} className={chip(kind === k)} onClick={() => setKind(k)}>
              {k === "all" ? "All formats" : k === "episode" ? "Founder episodes" : "Tutorials"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["All", ...categories].map((c) => (
          <button key={c} className={chip(cat === c)} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <p className="text-sm text-mute">{list.length} videos</p>
      {list.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <EpisodeCard key={e.id} ep={e} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-line p-10 text-center text-mute">
          Nothing matches that yet. Try another search.
        </p>
      )}
    </div>
  );
}
