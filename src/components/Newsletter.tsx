import SubmitForm from "./SubmitForm";

export default function Newsletter({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`rounded-2xl border border-line bg-panel ${compact ? "p-6" : "p-8 md:p-10"}`}>
      <div className={compact ? "space-y-4" : "grid items-center gap-6 md:grid-cols-[1.2fr_1fr]"}>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">The Builder&apos;s Brief</p>
          <h2 className="text-2xl font-bold tracking-tight">
            New European products, before everyone else finds them.
          </h2>
          <p className="text-sm text-mute">
            One email per episode: the product, the demo highlights, the founder&apos;s key lesson and the
            tools they use. No spam.
          </p>
        </div>
        <SubmitForm
          subject="Newsletter signup"
          submitLabel="Subscribe"
          success="You're in. Watch your inbox for the next episode."
          className={compact ? "flex flex-col gap-3" : "flex flex-col gap-3 sm:flex-row"}
        >
          <input
            className="input"
            type="email"
            name="email"
            required
            placeholder="you@startup.com"
            aria-label="Email address"
          />
        </SubmitForm>
      </div>
    </section>
  );
}
