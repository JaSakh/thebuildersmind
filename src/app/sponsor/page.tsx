import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import SubmitForm from "@/components/SubmitForm";

export const metadata: Metadata = {
  title: "Sponsor the show",
  description: "Reach European founders, indie hackers and builders on The Builder's Mind.",
};

// TODO: replace the audience section with your real numbers when you have them
// (YouTube Studio → Analytics → Audience). Real numbers sell sponsorships.
const formats = [
  ["Episode sponsor", "A 60-second read by the host in a founder episode, plus a link in the description and on the episode page."],
  ["Tutorial integration", "We build something with your tool on screen in a tutorial episode. Best for dev tools and app builders."],
  ["Newsletter slot", "A featured block in The Builder's Brief, sent with every new episode."],
];

export default function SponsorPage() {
  return (
    <>
      <PageHead eyebrow="Sponsor" title="Put your product in front of Europe's builders.">
        Our audience is founders, indie hackers and developers who try new tools every week, and
        who watch 40–60 minute demos to the end.
      </PageHead>

      <div className="grid gap-5 md:grid-cols-3">
        {formats.map(([t, d]) => (
          <div key={t} className="rounded-xl border border-line bg-panel p-6">
            <p className="font-semibold">{t}</p>
            <p className="mt-2 text-sm text-mute">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Who watches</h2>
          <ul className="space-y-2 text-mute">
            <li>• Early-stage founders and indie hackers across Europe</li>
            <li>• Developers and no-code builders trying AI tools</li>
            <li>• Startup operators in marketing, sales and product</li>
          </ul>
          <p className="pt-2 text-sm text-mute">Ask for our media kit for current numbers.</p>
        </div>
        <SubmitForm
          subject="Sponsorship enquiry"
          submitLabel="Request media kit"
          success="Thanks! We'll send the media kit within two working days."
          className="space-y-4 rounded-2xl border border-line bg-panel p-6 md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label" htmlFor="s-name">Name</label><input id="s-name" name="name" required className="input" /></div>
            <div><label className="label" htmlFor="s-email">Work email</label><input id="s-email" name="email" type="email" required className="input" /></div>
          </div>
          <div><label className="label" htmlFor="s-company">Company</label><input id="s-company" name="company" required className="input" /></div>
          <div><label className="label" htmlFor="s-msg">What would you like to promote?</label><textarea id="s-msg" name="message" rows={4} className="input" /></div>
        </SubmitForm>
      </div>
    </>
  );
}
