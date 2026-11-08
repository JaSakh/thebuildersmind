import Link from "next/link";
import { FullEpisode, slugOf, thumb } from "@/lib/episodes";

export default function EpisodeCard({ ep }: { ep: FullEpisode }) {
  return (
    <Link
      href={`/episodes/${slugOf(ep)}/`}
      data-reveal
      className="spotlight group flex flex-col overflow-hidden rounded-xl border border-line bg-panel hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb(ep.id)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-90 transition duration-500 ease-out group-hover:scale-[1.07] group-hover:opacity-100"
        />
        <span className="absolute inset-0 grid place-items-center bg-black/25 opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="grid h-12 w-12 scale-75 place-items-center rounded-full bg-brand text-lg shadow-lg transition duration-300 ease-out group-hover:scale-100">
            ▶
          </span>
        </span>
        {ep.duration && (
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 font-mono text-xs">
            {ep.duration}
          </span>
        )}
        {ep.kind === "tutorial" && (
          <span className="absolute left-2 top-2 rounded bg-brand px-2 py-0.5 text-xs font-semibold">
            Tutorial
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brand">{ep.category}</p>
        <h3 className="line-clamp-2 font-semibold leading-snug transition-colors group-hover:text-[#ff8a5c]">{ep.title}</h3>
        {ep.notes && <p className="line-clamp-2 text-sm text-mute">{ep.notes}</p>}
        {(ep.guest || ep.company) && (
          <p className="mt-auto pt-1 text-sm font-medium text-[#ff7a5c]">
            {[ep.guest, ep.company].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
