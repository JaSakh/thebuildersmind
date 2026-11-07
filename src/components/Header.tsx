import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/episodes/", label: "Episodes" },
  { href: "/founders/", label: "Founders" },
  { href: "/sponsor/", label: "Sponsor" },
  { href: "/about/", label: "About" },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-lg font-black text-brand">
        b.
      </span>
      <span className="whitespace-nowrap">{site.name}</span>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-mute md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/apply/" className="btn btn-primary !px-3.5 !py-2 text-sm">
          <span className="sm:hidden">Apply</span>
          <span className="hidden sm:inline">Demo on the show</span>
        </Link>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-line/70 px-5 py-2.5 text-sm text-mute md:hidden">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="shrink-0 hover:text-ink">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
