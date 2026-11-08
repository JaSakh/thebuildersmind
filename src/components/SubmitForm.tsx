"use client";

import { FormEvent, ReactNode, useState } from "react";
import { site } from "@/lib/site";

type Props = {
  subject: string; // used in the email/form submission so you can tell forms apart
  children: ReactNode; // the form fields
  submitLabel: string;
  success: string;
  className?: string;
  comingSoon?: string; // if set, the form is a placeholder: it shows this and sends nothing
};

// Sends the form to NEXT_PUBLIC_FORM_ENDPOINT (e.g. Formspree) if set,
// otherwise opens the visitor's email app with the answers filled in.
export default function SubmitForm({ subject, children, submitLabel, success, className, comingSoon }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "mailto" | "soon" | "error">("idle");

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (comingSoon) {
      setState("soon");
      return;
    }
    const data = Object.fromEntries(new FormData(ev.currentTarget).entries());

    if (!site.formEndpoint) {
      const body = Object.entries(data)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setState("mailto");
      return;
    }

    setState("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: subject, ...data }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "soon") {
    return <p className="rounded-xl border border-brand/40 bg-brand-soft p-4 text-sm">{comingSoon}</p>;
  }

  if (state === "mailto") {
    return (
      <p className="rounded-xl border border-brand/40 bg-brand-soft p-4 text-sm">
        Your email app should have opened. Press send there to finish.
      </p>
    );
  }

  if (state === "done") {
    return <p className="rounded-xl border border-brand/40 bg-brand-soft p-5 text-sm">{success}</p>;
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
      <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : submitLabel}
      </button>
      {state === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Email us at {site.email} instead.
        </p>
      )}
    </form>
  );
}
