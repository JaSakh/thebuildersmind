import type { Metadata } from "next";
import EpisodeBrowser from "@/components/EpisodeBrowser";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Episodes",
  description: "Every founder episode and tutorial: live product demos from European startups in AI, dev tools, fintech and more.",
};

export default function EpisodesPage() {
  return (
    <>
      <PageHead eyebrow="Episodes" title="Every demo, every founder story.">
        Search by founder, company or topic. Founder episodes are the full conversations; tutorials
        are short, hands-on walkthroughs of the products.
      </PageHead>
      <EpisodeBrowser />
    </>
  );
}
