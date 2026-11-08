"use client";

import { useRef, useState, type ReactNode } from "react";
import type { Chapter } from "@/lib/episodes";

// Kept local (not imported from lib/episodes) so the episode list isn't shipped to the browser.
const formatTime = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = String(sec % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
};
const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

// The YouTube embed, the episode intro (children), then a clickable chapter list. Clicking a chapter restarts the
// embed at that time; the links also work without JavaScript (they open YouTube).
export default function EpisodePlayer({
  id,
  title,
  chapters,
  children,
}: {
  id: string;
  title: string;
  chapters: Chapter[];
  children?: ReactNode; // rendered between the video and the chapter list
}) {
  const [start, setStart] = useState<number | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const src =
    start === null
      ? `https://www.youtube-nocookie.com/embed/${id}`
      : `https://www.youtube-nocookie.com/embed/${id}?start=${start}&autoplay=1`;

  return (
    <>
      <div ref={playerRef} className="aspect-video scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-black">
        <iframe
          key={src}
          className="h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {children}

      {chapters.length > 0 && (
        <div data-reveal className="rounded-xl border border-line bg-panel p-6">
          <h2 className="mb-3 font-semibold">Chapters</h2>
          <ol className="space-y-0.5">
            {chapters.map((c) => (
              <li key={c.start}>
                <a
                  href={`${watchUrl(id)}&t=${c.start}s`}
                  onClick={(e) => {
                    e.preventDefault();
                    setStart(c.start);
                    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`-mx-2 flex gap-4 rounded-md px-2 py-1.5 transition hover:bg-white/5 ${
                    start === c.start ? "text-ink" : "text-mute hover:text-ink"
                  }`}
                >
                  <span className="w-14 shrink-0 font-mono text-sm text-brand">{formatTime(c.start)}</span>
                  <span>{c.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}
