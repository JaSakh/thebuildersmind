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

      <section className="max-w-3xl space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently asked questions</h2>
        <div className="divide-y divide-line rounded-xl border border-line bg-panel">
          {faq.map(([q, a]) => (
            <details key={q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {q}
                <span className="text-brand transition group-open:rotate-45">+</span>
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
