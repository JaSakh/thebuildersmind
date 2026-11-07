import Link from "next/link";
import { Episode, slugOf, thumb } from "@/lib/episodes";

export default function EpisodeCard({ ep }: { ep: Episode }) {
  return (
    <Link
      href={`/episodes/${slugOf(ep)}/`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition hover:-translate-y-0.5 hover:border-[#3a3a44]"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb(ep.id)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-90 transition group-hover:scale-[1.03] group-hover:opacity-100"
        />
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
        <h3 className="line-clamp-2 font-semibold leading-snug">{ep.title}</h3>
        {(ep.guest || ep.company) && (
          <p className="mt-auto pt-1 text-sm text-mute">
            {[ep.guest, ep.company].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
