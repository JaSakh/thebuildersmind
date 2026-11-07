import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EpisodeCard from "@/components/EpisodeCard";
import EpisodePlayer from "@/components/EpisodePlayer";
import Newsletter from "@/components/Newsletter";
import { episodes, getEpisode, related, slugOf, thumb, watchUrl } from "@/lib/episodes";
import { site } from "@/lib/site";

const truncate = (s: string, n: number) =>
  s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)).replace(/[,;:.!?-]+$/, "") + "…";

// ISO 8601 duration for search engines, e.g. 2147 -> "PT35M47S"
const isoDuration = (sec: number) =>
  `PT${Math.floor(sec / 3600) ? `${Math.floor(sec / 3600)}H` : ""}${Math.floor((sec % 3600) / 60)}M${sec % 60}S`;

export function generateStaticParams() {
  return episodes.map((e) => ({ slug: slugOf(e) }));
}

export async function generateMetadata({ params }: PageProps<"/episodes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const ep = getEpisode(slug);
  if (!ep) return {};
  const who = [ep.guest, ep.company].filter(Boolean).join(", ");
  const description = ep.notes
    ? truncate(ep.notes.replace(/\s+/g, " "), 158)
    : who
      ? `${who} on ${site.name}: ${ep.title}. Live product demo and founder story.`
      : `${ep.title}, on ${site.name}.`;
  return {
    title: ep.title,
    description,
    openGraph: { title: ep.title, description, images: [thumb(ep.id)] },
  };
}

export default async function EpisodePage({ params }: PageProps<"/episodes/[slug]">) {
  const { slug } = await params;
  const ep = getEpisode(slug);
  if (!ep) notFound();
  const more = related(ep);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: ep.title,
    description: ep.notes ?? ep.title,
    thumbnailUrl: thumb(ep.id),
    embedUrl: `https://www.youtube.com/embed/${ep.id}`,
    url: watchUrl(ep.id),
    ...(ep.published && { uploadDate: ep.published }),
    ...(ep.lengthSeconds && { duration: isoDuration(ep.lengthSeconds) }),
    // Chapters as "key moments" in Google results
    ...(ep.chapters.length > 0 && {
      hasPart: ep.chapters.map((c, i) => ({
        "@type": "Clip",
        name: c.title,
        startOffset: c.start,
        ...((ep.chapters[i + 1]?.start ?? ep.lengthSeconds) && {
          endOffset: ep.chapters[i + 1]?.start ?? ep.lengthSeconds,
        }),
        url: `${watchUrl(ep.id)}&t=${c.start}s`,
      })),
    }),
  };
  const published = ep.published
    ? new Date(ep.published).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : null;

  return (
    <article className="pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/episodes/" className="text-sm text-mute hover:text-ink">← All episodes</Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <EpisodePlayer id={ep.id} title={ep.title} chapters={ep.chapters}>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                {[ep.category, ep.kind === "tutorial" ? "Tutorial" : "Founder episode", ep.duration, published]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{ep.title}</h1>
            </div>

            {ep.notes?.split("\n\n").map((para) => (
              <p key={para} className="text-lg leading-relaxed text-mute">{para}</p>
            ))}
          </EpisodePlayer>

          {ep.takeaways?.length ? (
            <div className="rounded-xl border border-line bg-panel p-6">
              <h2 className="mb-3 font-semibold">{ep.autoTakeaways ? "In this episode" : "Key takeaways"}</h2>
              <ul className="list-disc space-y-2 pl-5 text-mute">
                {ep.takeaways.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="space-y-4">
          {(ep.guest || ep.company) && (
            <div className="rounded-xl border border-line bg-panel p-5">
              <p className="text-xs uppercase tracking-widest text-mute">On this episode</p>
              {ep.guest && <p className="mt-2 text-lg font-semibold">{ep.guest}</p>}
              {ep.company && <p className="text-mute">{ep.company}</p>}
            </div>
          )}
          <a href={watchUrl(ep.id)} target="_blank" rel="noopener" className="btn btn-ghost w-full justify-center">
            Watch on YouTube ↗
          </a>
          <a href={site.links.youtubeSubscribe} target="_blank" rel="noopener" className="btn btn-primary w-full justify-center">
            Subscribe to the channel
          </a>
          <Newsletter compact />
        </aside>
      </div>

      {more.length > 0 && (
        <section className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">More like this</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((e) => <EpisodeCard key={e.id} ep={e} />)}
          </div>
        </section>
      )}
    </article>
  );
}
