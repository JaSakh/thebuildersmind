import Link from "next/link";
import EpisodeCard from "@/components/EpisodeCard";
import Newsletter from "@/components/Newsletter";
import { categories, companies, episodes, slugOf, thumb } from "@/lib/episodes";
import { site } from "@/lib/site";

export default function Home() {
  const latest = episodes[0];
  const recent = episodes.filter((e) => e.kind === "episode").slice(1, 7);
  const featured = episodes.filter((e) => e.featured);
  const founderEpisodes = episodes.filter((e) => e.kind === "episode").length;

  return (
    <>
      {/* Hero */}
      <section className="relative -mx-5 px-5 pb-16 pt-16 md:pt-24">
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-xs text-mute">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {site.cadence}
            </p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Europe&apos;s founders. <br />
              <span className="text-brand">Live product demos.</span>
            </h1>
            <p className="max-w-xl text-lg text-mute">{site.description}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/episodes/" className="btn btn-primary">Watch episodes</Link>
              <Link href="/apply/" className="btn btn-ghost">Demo your product →</Link>
            </div>
          </div>

          <Link
            href={`/episodes/${slugOf(latest)}/`}
            className="group block overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl shadow-brand/5"
          >
            <div className="relative aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb(latest.id)} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 grid place-items-center bg-black/30 transition group-hover:bg-black/10">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-2xl shadow-lg">▶</span>
              </div>
            </div>
            <div className="space-y-1 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">Latest episode</p>
              <p className="text-lg font-semibold leading-snug">{latest.title}</p>
              {latest.guest && <p className="text-sm text-mute">with {latest.guest}</p>}
            </div>
          </Link>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
          {[
            [String(founderEpisodes), "founder episodes"],
            [String(companies().length), "products demoed"],
            [String(categories.length), "topics covered"],
            ["🇪🇺", "European founders only"],
          ].map(([n, l]) => (
            <div key={l} className="bg-bg p-5">
              <dt className="text-2xl font-bold">{n}</dt>
              <dd className="text-sm text-mute">{l}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Most watched */}
      <section className="space-y-6 py-10">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Most watched</h2>
          <Link href="/episodes/" className="text-sm text-mute hover:text-ink">All episodes →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 3).map((e) => <EpisodeCard key={e.id} ep={e} />)}
        </div>
      </section>

      {/* Recent */}
      <section className="space-y-6 py-10">
        <h2 className="text-2xl font-bold tracking-tight">Recent founder episodes</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((e) => <EpisodeCard key={e.id} ep={e} />)}
        </div>
      </section>

      {/* For founders */}
      <section className="my-10 grid gap-8 rounded-2xl border border-line bg-gradient-to-br from-brand/15 via-panel to-panel p-8 md:grid-cols-[1fr_1.4fr] md:p-12">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">For founders</p>
          <h2 className="text-3xl font-bold tracking-tight">Building in Europe? Show it live.</h2>
          <p className="text-mute">
            No pitch decks. You share your screen, demo the real product, and tell the story behind it.
            We handle the recording, editing, clips and distribution.
          </p>
          <Link href="/apply/" className="btn btn-primary">Apply to demo</Link>
        </div>
        <ol className="grid gap-4 sm:grid-cols-3">
          {[
            ["01", "Apply", "Tell us what you're building. Takes 3 minutes."],
            ["02", "Record", "A relaxed 45–60 min remote session: story, then live demo."],
            ["03", "Launch", "Full episode, a tutorial cut and short clips across YouTube, LinkedIn, TikTok & Instagram."],
          ].map(([n, t, d]) => (
            <li key={n} className="rounded-xl border border-line bg-bg/60 p-5">
              <p className="font-mono text-sm text-brand">{n}</p>
              <p className="mt-2 font-semibold">{t}</p>
              <p className="mt-1 text-sm text-mute">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="py-10">
        <Newsletter />
      </div>
    </>
  );
}
