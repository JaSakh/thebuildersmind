import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About & FAQ",
  description: `What ${site.name} is, who hosts it, and how founders can demo on the show.`,
};

const faq = [
  ["What is The Builder's Mind?", `A video show where European tech founders demo their live products and tell the real story behind them. ${site.cadence}.`],
  ["Who hosts it?", `${site.name} is hosted by ${site.host}.`],
  ["Where can I watch?", "On YouTube, with clips on LinkedIn, Instagram and TikTok. Audio versions are on Spotify."],
  ["Can I demo my product?", "Yes, if you're building in Europe and have a live product. Apply through the form on our Apply page."],
  ["Does it cost anything to be on the show?", "No. Founder episodes are free. Sponsorships are separate and always labelled."],
  ["What makes it different from other startup podcasts?", "Most shows talk about products. Here the founder shares their screen and shows the product working."],
];

const expect = [
  "Interviews with founders, often from early-stage tech and SaaS startups.",
  "A focus on the process of building businesses from the ground up.",
  "New ideas, products and innovative approaches from the startup world.",
  "Practical advice on overcoming obstacles, competition, and developing a resilient builder's mentality.",
  "Actionable takeaways from genuine startup experiences.",
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHead eyebrow="About" title="Show, don't pitch.">
        {/* TODO: write 2–3 sentences in your own words about why you started the show */}
        Europe builds great products but rarely shows them off. {site.name} gives founders a stage to
        demo what they&apos;ve built, and gives builders a place to discover the tools and lessons
        behind them.
      </PageHead>

      <section className="grid gap-5 md:grid-cols-2">
        <div data-reveal className="spotlight rounded-xl border border-line bg-panel p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">Our mission</p>
          <p className="mt-3 text-mute">
            To spotlight innovative startups and let their creators share practical lessons, challenges
            and successes. We focus on the process of building businesses from the ground up, especially
            in tech and SaaS.
          </p>
        </div>
        <div data-reveal className="spotlight rounded-xl border border-line bg-panel p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">Our vision</p>
          <p className="mt-3 text-mute">
            To be a key resource for aspiring entrepreneurs, founders and innovators: real-world insights
            and a community dedicated to building, learning and overcoming obstacles.
          </p>
        </div>
      </section>

      <section className="mt-16 grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-4">
          <h2 data-reveal className="text-2xl font-bold tracking-tight">What to expect</h2>
          <ul className="space-y-3">
            {expect.map((t) => (
              <li key={t} data-reveal className="flex gap-3 text-mute">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h2 data-reveal className="text-2xl font-bold tracking-tight">Meet the team</h2>
          {site.team.map((m) => (
            <a
              key={m.name}
              href={m.linkedin}
              target="_blank"
              rel="noopener"
              data-reveal
              className="spotlight group flex items-center gap-4 overflow-hidden rounded-xl border border-line bg-panel p-4 hover:-translate-y-1"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}${m.photo}`}
                alt={m.name}
                className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-brand/40 transition duration-300 ease-out group-hover:scale-110 group-hover:ring-brand"
              />
              <span className="flex-1">
                <span className="block font-semibold">{m.name}</span>
                <span className="block text-sm text-mute">{m.role}</span>
              </span>
              <span className="text-sm text-mute transition-colors group-hover:text-ink">LinkedIn ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-3xl space-y-4">
        <h2 data-reveal className="text-2xl font-bold tracking-tight">Frequently asked questions</h2>
        <div data-reveal className="divide-y divide-line rounded-xl border border-line bg-panel">
          {faq.map(([q, a]) => (
            <details key={q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {q}
                <span className="text-xl leading-none text-brand transition duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-mute">{a}</p>
            </details>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-4">
          <Link href="/apply/" className="btn btn-primary">Apply to demo</Link>
          <a href={`mailto:${site.email}`} className="btn btn-ghost">Contact us</a>
        </div>
      </section>
    </>
  );
}
