import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { companies, slugOf } from "@/lib/episodes";

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <div key={c.name} className="flex flex-col rounded-xl border border-line bg-panel p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-soft font-bold text-brand">
                {c.name[0]}
              </span>
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-mute">{c.category}</p>
              </div>
            </div>
            {c.people.length > 0 && <p className="mt-4 text-sm text-mute">Founder: {c.people.join(", ")}</p>}
            <div className="mt-4 space-y-1.5 border-t border-line pt-4">
              {c.episodes.map((e) => (
                <Link key={e.id} href={`/episodes/${slugOf(e)}/`} className="block text-sm hover:text-brand">
                  ▶ <span className="text-mute">{e.kind === "tutorial" ? "Tutorial" : "Episode"}:</span> {e.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
