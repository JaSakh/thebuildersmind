import type { MetadataRoute } from "next";
import { episodes, slugOf } from "@/lib/episodes";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "episodes/", "founders/", "apply/", "sponsor/", "about/"];
  return [
    ...pages.map((p) => ({ url: `${site.url}/${p}` })),
    ...episodes.map((e) => ({ url: `${site.url}/episodes/${slugOf(e)}/` })),
  ];
}
