import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Header";

export default function Footer() {
  const social = [
    ["YouTube", site.links.youtube],
    ["LinkedIn", site.links.linkedin],
    ["Instagram", site.links.instagram],
    ["Spotify", site.links.spotify],
    ["TikTok", site.links.tiktok],
  ];
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm text-mute">{site.description}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">Show</p>
          <Link href="/episodes/" className="block text-mute hover:text-ink">All episodes</Link>
          <Link href="/founders/" className="block text-mute hover:text-ink">Featured founders</Link>
          <Link href="/apply/" className="block text-mute hover:text-ink">Apply to demo</Link>
          <Link href="/sponsor/" className="block text-mute hover:text-ink">Sponsor the show</Link>
          <Link href="/about/" className="block text-mute hover:text-ink">About & FAQ</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">Follow</p>
          {social.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener" className="block text-mute hover:text-ink">
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-mute">
        © {new Date().getFullYear()} {site.name} · Hosted by {site.host}
      </div>
    </footer>
  );
}
