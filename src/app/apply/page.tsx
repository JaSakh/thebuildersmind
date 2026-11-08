import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import SubmitForm from "@/components/SubmitForm";

export const metadata: Metadata = {
  title: "Apply to demo your product",
  description: "European founders: demo your live product on The Builder's Mind.",
};

const fit = [
  "You're building in Europe (founder based here, or the company is)",
  "You have a live product we can demo on screen, not just a deck",
  "AI, SaaS, dev tools, app builders, no-code, fintech, edtech, marketplaces…",
  "You're happy to share the real story: what failed, what worked, the numbers you can share",
];

export default function ApplyPage() {
  return (
    <>
      <PageHead eyebrow="Apply" title="Demo your product on The Builder's Mind.">
        A relaxed, remote conversation: your story first, then you share your screen and show the
        product live. We edit it and publish the full episode, a tutorial cut and short clips.
      </PageHead>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <div className="rounded-xl border border-line bg-panel p-6">
            <h2 className="mb-4 font-semibold">Who it&apos;s for</h2>
            <ul className="space-y-3 text-sm text-mute">
              {fit.map((f) => (
                <li key={f} className="flex gap-2"><span className="text-brand">✓</span>{f}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-panel p-6">
            <h2 className="mb-4 font-semibold">What you get</h2>
            <ul className="space-y-3 text-sm text-mute">
              <li>🎬 Full episode on YouTube & podcast platforms</li>
              <li>⚡ A short tutorial cut people can follow step by step</li>
              <li>📱 Clips for TikTok, Instagram, YouTube Shorts and LinkedIn</li>
              <li>🔗 A permanent page in our founder directory with a link to your product</li>
            </ul>
          </div>
        </div>

        <SubmitForm
          subject="Founder application"
          submitLabel="Send application"
          success="Thanks! We read every application and reply within a week."
          className="space-y-4 rounded-2xl border border-line bg-panel p-6 md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label" htmlFor="name">Your name</label><input id="name" name="name" required className="input" /></div>
            <div><label className="label" htmlFor="email">Email</label><input id="email" name="email" type="email" required className="input" /></div>
            <div><label className="label" htmlFor="company">Company</label><input id="company" name="company" required className="input" /></div>
            <div><label className="label" htmlFor="country">Country</label><input id="country" name="country" required className="input" placeholder="e.g. Germany" /></div>
          </div>
          <div><label className="label" htmlFor="website">Product website</label><input id="website" name="website" type="url" required className="input" placeholder="https://" /></div>
          <div>
            <label className="label" htmlFor="stage">Stage</label>
            <select id="stage" name="stage" className="input" defaultValue="">
              <option value="" disabled>Choose one</option>
              <option>Just launched / beta</option>
              <option>Paying customers</option>
              <option>Raised a round</option>
              <option>Bootstrapped & growing</option>
            </select>
          </div>
          <div><label className="label" htmlFor="pitch">What are you building, and what would you demo?</label><textarea id="pitch" name="pitch" required rows={4} className="input" /></div>
          <div><label className="label" htmlFor="story">The most interesting part of your story (a pivot, a number, a failure)</label><textarea id="story" name="story" rows={3} className="input" /></div>
          <div><label className="label" htmlFor="stack">What&apos;s your tech stack? (optional)</label><input id="stack" name="stack" className="input" placeholder="e.g. Next.js, Supabase, Claude API" /></div>
          <div><label className="label" htmlFor="linkedin">LinkedIn (optional)</label><input id="linkedin" name="linkedin" className="input" /></div>
        </SubmitForm>
      </div>
    </>
  );
}
