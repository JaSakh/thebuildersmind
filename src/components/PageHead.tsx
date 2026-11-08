import { ReactNode } from "react";

export default function PageHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="relative mb-10 space-y-3 pt-14">
      <div className="orb orb-a" />
      <p className="rise text-xs font-semibold uppercase tracking-widest text-brand">{eyebrow}</p>
      <h1 className="rise max-w-3xl text-4xl font-bold tracking-tight md:text-5xl" style={{ "--d": "80ms" } as React.CSSProperties}>
        {title}
      </h1>
      {children && (
        <div className="rise max-w-2xl text-lg text-mute" style={{ "--d": "160ms" } as React.CSSProperties}>
          {children}
        </div>
      )}
    </div>
  );
}
