import { ReactNode } from "react";

export default function PageHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="relative mb-10 space-y-3 pt-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand">{eyebrow}</p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
      {children && <div className="max-w-2xl text-lg text-mute">{children}</div>}
    </div>
  );
}
