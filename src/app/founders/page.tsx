import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { companies, slugOf, thumb } from "@/lib/episodes";

export const metadata: Metadata = {
  title: "Featured founders & products",
  description: "Every European startup that has demoed its product on The Builder's Mind.",
};

export default function FoundersPage() {
  const list = companies();
  return (
    <>
      <PageHead eyebrow="Founders" title="Products demoed on the show.">
        A growing directory of European startups. Each one shows its product live, so you can see it
        work before you try it.
      </PageHead>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => {
          const main = c.episodes.find((e) => e.kind === "episode") ?? c.episodes[0];
          return (
            <div
              key={c.name}
              data-reveal
              className="spotlight group flex flex-col overflow-hidden rounded-xl border border-line bg-panel hover:-translate-y-1"
            >
              <Link href={`/episodes/${slugOf(main)}/`} className="relative block aspect-video overflow-hidden bg-black" tabIndex={-1} aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb(main.id)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition duration-500 ease-out group-hover:scale-[1.07] group-hover:opacity-100"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-lg font-semibold">{c.name}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-brand">{c.category}</p>
                {c.people.length > 0 && (
                  <div className="mt-3 space-y-0.5 text-sm">
                    {c.people.map((p) => (
                      <p key={p.name}>
                        <span className="font-medium">{p.name}</span>
                        {p.role && <span className="text-mute"> · {p.role}</span>}
                      </p>
                    ))}
                  </div>
                )}
                <div className="mt-4 space-y-1.5 border-t border-line pt-4">
                  {c.episodes.map((e) => (
                    <Link key={e.id} href={`/episodes/${slugOf(e)}/`} className="relative z-10 block text-sm transition-colors hover:text-brand">
                      ▶ <span className="text-mute">{e.kind === "tutorial" ? "Tutorial" : "Episode"}:</span> {e.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
