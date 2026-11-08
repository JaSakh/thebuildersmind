import type { CSSProperties } from "react";
import Link from "next/link";
import EpisodeCard from "@/components/EpisodeCard";
import FounderMarquee from "@/components/FounderMarquee";
import Newsletter from "@/components/Newsletter";
import SubmitForm from "@/components/SubmitForm";
import { categories, companies, episodes, founders, slugOf, thumb } from "@/lib/episodes";
import { newsletterNote, site } from "@/lib/site";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Home() {
  const latest = episodes[0];
  const recent = episodes.filter((e) => e.kind === "episode").slice(1, 7);
  const featured = episodes.filter((e) => e.featured);
  const founderEpisodes = episodes.filter((e) => e.kind === "episode").length;

  return (
    <>
      {/* Hero */}
      <section className="relative -mx-5 px-5 pb-16 pt-16 md:pt-24">
        <div className="grid-bg grid-pan pointer-events-none absolute inset-0 -z-10" />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            <p className="rise inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-xs text-mute">
              <span className="ping h-1.5 w-1.5 rounded-full bg-brand" /> {site.cadence}
            </p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              <span className="hero-line">
                <span style={delay(80)}>Europe&apos;s founders.</span>
              </span>
              <span className="hero-line">
                <span style={delay(200)}>
                  <span className="text-gradient">Live product demos.</span>
                </span>
              </span>
            </h1>
            <p className="rise max-w-xl text-lg text-mute" style={delay(380)}>{site.description}</p>
            <div className="rise flex flex-wrap gap-3" style={delay(500)}>
              <Link href="/episodes/" className="btn btn-primary">Watch episodes</Link>
              <Link href="/apply/" className="btn btn-ghost">Demo your product →</Link>
            </div>
            <div className="rise max-w-md space-y-2 pt-1" style={delay(620)}>
              <SubmitForm
                subject="Newsletter signup"
                submitLabel="Subscribe"
                success="You're in. Watch your inbox for the next episode."
                comingSoon={site.newsletterEnabled ? undefined : newsletterNote}
                className="flex gap-2"
              >
                <input
                  className="input min-w-0"
                  type="email"
                  name="email"
                  required
                  placeholder="you@startup.com"
                  aria-label="Email address"
                />
              </SubmitForm>
              <p className="text-sm text-mute">One email per episode: the product, the demo, the founder&apos;s key lesson.</p>
            </div>
          </div>

          <div className="rise" style={delay(300)}>
            <div className="float">
              <Link
                href={`/episodes/${slugOf(latest)}/`}
                data-tilt
                className="spotlight group block overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl shadow-brand/10"
              >
                <div className="relative aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumb(latest.id)}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 grid place-items-center bg-black/30 transition group-hover:bg-black/10">
                    <span className="pulse-ring grid h-16 w-16 place-items-center rounded-full bg-brand text-2xl shadow-lg transition duration-300 group-hover:scale-110">
                      ▶
                    </span>
                  </div>
                </div>
                <div className="space-y-1 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand">Latest episode</p>
                  <p className="text-lg font-semibold leading-snug">{latest.title}</p>
                  {latest.guest && <p className="text-sm text-mute">with {latest.guest}</p>}
                </div>
              </Link>
            </div>
          </div>
        </div>

        <dl data-reveal className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
          {[
            [founderEpisodes, "founder episodes"],
            [companies().length, "products demoed"],
            [categories.length, "topics covered"],
            ["🇪🇺", "European founders only"],
          ].map(([n, l]) => (
            <div key={l} className="bg-bg p-5 transition-colors hover:bg-panel">
              <dt className="text-2xl font-bold" data-count={typeof n === "number" ? n : undefined}>{n}</dt>
              <dd className="text-sm text-mute">{l}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Founders */}
      <section className="space-y-6 py-10">
        <div data-reveal className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">{founders().length} founders and counting</h2>
          <Link href="/founders/" className="shrink-0 pl-3 text-sm text-mute transition-colors hover:text-ink">All founders →</Link>
        </div>
        <div data-reveal>
          <FounderMarquee />
        </div>
      </section>

      {/* Most watched */}
      <section className="space-y-6 py-10">
        <div data-reveal className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Most watched</h2>
          <Link href="/episodes/" className="shrink-0 pl-3 text-sm text-mute transition-colors hover:text-ink">All episodes →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 3).map((e) => <EpisodeCard key={e.id} ep={e} />)}
        </div>
      </section>

      {/* Recent */}
      <section className="space-y-6 py-10">
        <h2 data-reveal className="text-2xl font-bold tracking-tight">Recent founder episodes</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((e) => <EpisodeCard key={e.id} ep={e} />)}
        </div>
      </section>

      {/* For founders */}
      <section data-reveal="scale" className="glow-border my-10 grid gap-8 rounded-2xl border border-line bg-gradient-to-br from-brand/15 via-panel to-panel p-8 md:grid-cols-[1fr_1.4fr] md:p-12">
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
            <li key={n} data-reveal className="rounded-xl border border-line bg-bg/60 p-5">
              <p className="font-mono text-sm text-brand">{n}</p>
              <p className="mt-2 font-semibold">{t}</p>
              <p className="mt-1 text-sm text-mute">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Listen */}
      <section className="space-y-6 py-10">
        <h2 data-reveal className="text-2xl font-bold tracking-tight">Listen on your favorite platform</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            { name: "YouTube", note: "Full episodes with the live demos", href: site.links.youtube, icon: "▶", color: "bg-brand" },
            { name: "Spotify", note: "Every conversation, audio only", href: site.links.spotify, icon: "♫", color: "bg-[#1db954]" },
          ].map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener"
              data-reveal
              className="spotlight group flex items-center gap-4 overflow-hidden rounded-xl border border-line bg-panel p-5 hover:-translate-y-1"
            >
              <span className={`grid h-12 w-12 place-items-center rounded-full text-lg text-white transition duration-300 ease-out group-hover:scale-110 ${p.color}`}>
                {p.icon}
              </span>
              <span className="flex-1">
                <span className="block font-semibold">{p.name}</span>
                <span className="block text-sm text-mute">{p.note}</span>
              </span>
              <span className="text-mute transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </a>
          ))}
        </div>
      </section>

      <div data-reveal className="py-10">
        <Newsletter />
      </div>
    </>
  );
}
