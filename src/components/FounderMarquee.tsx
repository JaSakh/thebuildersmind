import Link from "next/link";
import { Founder, founders, slugOf } from "@/lib/episodes";

function Chip({ f, hidden }: { f: Founder; hidden?: boolean }) {
  return (
    <Link
      href={`/episodes/${slugOf(f.episode)}/`}
      tabIndex={hidden ? -1 : undefined}
      className="flex shrink-0 items-center gap-3 rounded-xl border border-line bg-panel py-2 pl-2 pr-5 transition hover:border-brand/50 hover:bg-[#1b1b20]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${f.episode.id}/mqdefault.jpg`}
        alt=""
        loading="lazy"
        className="h-10 w-[71px] rounded-lg object-cover"
      />
      <span className="whitespace-nowrap">
        <span className="block text-sm font-semibold leading-tight">{f.name}</span>
        <span className="block text-xs text-mute">{f.company}</span>
      </span>
    </Link>
  );
}

function Row({ list, reverse, speed }: { list: Founder[]; reverse?: boolean; speed: string }) {
  return (
    <div className="marquee" data-reverse={reverse || undefined} style={{ "--speed": speed } as React.CSSProperties}>
      <div className="marquee-track">
        {list.map((f) => <Chip key={f.name} f={f} />)}
      </div>
      {/* Second copy so the loop has no visible seam */}
      <div className="marquee-track" aria-hidden>
        {list.map((f) => <Chip key={f.name} f={f} hidden />)}
      </div>
    </div>
  );
}

export default function FounderMarquee() {
  const all = founders();
  const middle = Math.ceil(all.length / 2);
  return (
    <div className="space-y-3">
      <Row list={all.slice(0, middle)} speed="80s" />
      <Row list={all.slice(middle)} reverse speed="95s" />
    </div>
  );
}
