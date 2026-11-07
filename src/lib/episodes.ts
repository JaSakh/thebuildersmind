// All episodes from youtube.com/@thebuildersmind (long-form videos, newest first).
// To add an episode: copy an entry, paste the YouTube video ID, and fill in the fields.
// `notes` and `takeaways` are optional — when filled in they appear on the episode page
// (great for SEO: Google can't read your video, but it can read these).

export type Category =
  | "AI Agents"
  | "App Builders"
  | "Dev Tools"
  | "Marketing & Sales"
  | "Fintech"
  | "EdTech"
  | "Commerce & Marketplaces"
  | "Founder Stories";

export type Episode = {
  id: string; // YouTube video ID
  title: string;
  guest?: string;
  company?: string;
  category: Category;
  kind: "episode" | "tutorial";
  duration: string;
  featured?: boolean;
  notes?: string;
  takeaways?: string[];
};

export const episodes: Episode[] = [
  { id: "GJxZslKw5wQ", title: "Beyond SEO & Ads: The New B2B Marketing Playbook", guest: "Vida Stanić", category: "Marketing & Sales", kind: "episode", duration: "35:47" },
  { id: "CNHmSMJVQhA", title: "The 2-Person Startup Building “Google Drive for AI Agents”", guest: "Ott Ilves", category: "AI Agents", kind: "episode", duration: "47:47" },
  { id: "DwgZEKRGIDo", title: "AI Agents That Play Video Games & Find Bugs", guest: "Emil", company: "ManaMind", category: "AI Agents", kind: "episode", duration: "44:06" },
  { id: "IM43aZk-62I", title: "How AI Replaces 70% of Sales Work (Why AI SDRs are Failing)", category: "Marketing & Sales", kind: "episode", duration: "49:07" },
  { id: "BPykE8naiV0", title: "Bootstrapped Cloud Hosting Startup: 40% Monthly Growth Without VC Money", guest: "Jonas Scholz", company: "Sliplane", category: "Dev Tools", kind: "episode", duration: "50:21" },
  { id: "S7W7AB292Mo", title: "From Solo Founder to Contact Center AI: How Convershake Reinvents Customer Experience", guest: "Vitalijs", company: "Convershake", category: "AI Agents", kind: "episode", duration: "1:04:48" },
  { id: "-_SerOQNPvk", title: "I Built a Workout App from Scratch Using Just 2 Prompts!", company: "Newly", category: "App Builders", kind: "tutorial", duration: "17:32" },
  { id: "rFBBKdT1Z5c", title: "This AI Marketing Tool Automates Everything (Full Demo)", guest: "Mimmi Liljegren", company: "Ayra", category: "Marketing & Sales", kind: "episode", duration: "57:57" },
  { id: "7bfoqf2PuS0", title: "AI Is Changing Coding Forever: Building Ivy, the “Yes Code” Framework", guest: "Niels Bosma", company: "Ivy", category: "Dev Tools", kind: "episode", duration: "38:00" },
  { id: "yGXnJw__C0o", title: "He Built a Global Stablecoin Bank and Hit 30K Users in 10 Weeks", guest: "Ignas Survila", company: "Rizon", category: "Fintech", kind: "episode", duration: "42:04" },
  { id: "ItDunN5GWDU", title: "Why European Banks Suck & How Two Brothers Are Fixing Personal Finance", company: "Bilance", category: "Fintech", kind: "episode", duration: "39:29" },
  { id: "rXrMd2Dd9HM", title: "From 1-to-25 to 1-to-100: How AI Will Transform Classrooms", company: "EditAI", category: "EdTech", kind: "episode", duration: "1:08:40" },
  { id: "b8ZtBQh9j8w", title: "Building an AI Doctor App in Public: Idea to iOS Launch (Ep. 1)", category: "App Builders", kind: "tutorial", duration: "19:56" },
  { id: "ySbL9TEYqeA", title: "Building a Marketplace Startup: Tingit’s Journey, Demo & Founder Lessons", company: "Tingit", category: "Commerce & Marketplaces", kind: "episode", duration: "48:43" },
  { id: "azy6Txg00JA", title: "How to Build an App From Scratch with Natively.dev", company: "Natively", category: "App Builders", kind: "tutorial", duration: "17:49" },
  { id: "WP08fBfDaXo", title: "From Prompt to App Store: AI App Builder Natively Changes the Game", company: "Natively", category: "App Builders", kind: "episode", duration: "52:07", featured: true },
  { id: "eG1raNSrTYk", title: "How to Use Cloudgeni.ai to Secure Your AI App", company: "Cloudgeni", category: "Dev Tools", kind: "tutorial", duration: "7:40" },
  { id: "vaYc74Ldg6I", title: "Vibe Coding & Cloud Security: Who's Securing Your AI-Built Apps?", guest: "Davlet Dzhakishev", company: "Cloudgeni", category: "Dev Tools", kind: "episode", duration: "43:24" },
  { id: "XViRIkJI8UM", title: "I Built My Own AI Doctor in 30 Minutes (Because Human Doctors Failed Me)", category: "App Builders", kind: "tutorial", duration: "30:16", featured: true },
  { id: "6ecOBPnaHtc", title: "How To Create UGC Ads With AI: Arcads AI Tutorial", guest: "Romain Torres", company: "Arcads", category: "Marketing & Sales", kind: "tutorial", duration: "14:00" },
  { id: "U5WiZIXvqp4", title: "Arcads.ai: $7M ARR in 12 Months Building AI UGC Ads", guest: "Romain Torres", company: "Arcads", category: "Marketing & Sales", kind: "episode", duration: "41:14", featured: true },
  { id: "-cocfBDnAE8", title: "How to Set Up a Supliful Store and Start a Supplement Business", company: "Supliful", category: "Commerce & Marketplaces", kind: "tutorial", duration: "5:23" },
  { id: "-8bYAJ7nRd8", title: "How Supliful Lets Creators Build Supplement, Beauty & Wellness Brands With Zero Investment", guest: "Martins", company: "Supliful", category: "Commerce & Marketplaces", kind: "episode", duration: "48:49" },
  { id: "dNxIiaHwO_E", title: "The AI Showdown: Build Anything Free with Lovable x OpenAI x Google x Anthropic", category: "App Builders", kind: "tutorial", duration: "16:14" },
  { id: "Gpeq-nNu5pQ", title: "Build a Website in 10 Minutes with Macaly, the AI Full-Stack App Builder", company: "Macaly", category: "App Builders", kind: "tutorial", duration: "15:08" },
  { id: "2GZvFmL0I5A", title: "Build SaaS Without Code? Macaly Hits $1K MRR in 3 Days", guest: "Petr Brzek", company: "Macaly", category: "App Builders", kind: "episode", duration: "42:05" },
  { id: "jySil7tRSOY", title: "How the Strawberry AI Browser Works", company: "Strawberry", category: "AI Agents", kind: "tutorial", duration: "17:05" },
  { id: "LfINPk53318", title: "How to Use Line0, a Code Generator for Backend Developers", company: "Line0", category: "Dev Tools", kind: "tutorial", duration: "7:00" },
  { id: "b_LH_E-2Ox8", title: "Line0: The Cursor for Backend Developers", guest: "Ivan Ivanov", company: "Line0", category: "Dev Tools", kind: "episode", duration: "44:01" },
  { id: "p25af0sQjEk", title: "Strawberry: The Agentic Browser That Clicks, Searches, and Thinks Like You", guest: "Sebastian Thunman", company: "Strawberry", category: "AI Agents", kind: "episode", duration: "44:32", featured: true },
  { id: "1Kqo2gKmcL8", title: "This AI Agent Is Replacing Entire Influencer Agencies: Meet Charlie", company: "Tano", category: "AI Agents", kind: "episode", duration: "45:27" },
  { id: "RGeEJaPID3Y", title: "Agent Frank, LeadsForge Drop, $10M ARR by 2025: Ship Fast and Sell Hard", guest: "V. Frank Sondors", category: "Marketing & Sales", kind: "episode", duration: "1:38:50" },
  { id: "mBMUWSxtLj4", title: "Selling in the AI Era: Why It’s Still Worth Betting on Humans", guest: "Krisztian Berecz", company: "Captiwate", category: "Marketing & Sales", kind: "episode", duration: "59:45" },
  { id: "lHsuvSBdES4", title: "Future of AI Video, 500 Global, $300K ARR, AI vs. Storytelling", guest: "Andraz Zvonar", category: "Founder Stories", kind: "episode", duration: "1:03:45" },
  { id: "i10OfrqkYBA", title: "Post-Sustainability Hype: The ESG Compliance Goldmine", guest: "Oksana Tolmatsova", company: "Esgrid", category: "Founder Stories", kind: "episode", duration: "58:57" },
  { id: "rkDdZ-S0Nww", title: "Taking on IBM, Future of Engineering & a $10B Opportunity", guest: "Janis Vavere", category: "Dev Tools", kind: "episode", duration: "1:14:37" },
  { id: "VGtqt1kejaA", title: "Fail, Learn, Start Again: The Story Behind mowa AI and Parsera", company: "Parsera", category: "Founder Stories", kind: "episode", duration: "56:13" },
  { id: "tFh38GVOjVU", title: "From Dropout to EdTech Founder: Pivot, Pilots, $500K, and Techstars", guest: "Benedek Herman", company: "Voovo", category: "EdTech", kind: "episode", duration: "1:00:39" },
  { id: "WtGZAoxAhBY", title: "Bootstrapping a Weekend Project to 3X Revenue Growth", category: "Founder Stories", kind: "episode", duration: "56:36" },
  { id: "yUcu0bLGZj0", title: "Building a SaaS Startup to Beat Airbnb", category: "Founder Stories", kind: "episode", duration: "54:37" },
];

export const categories: Category[] = [
  "AI Agents",
  "App Builders",
  "Dev Tools",
  "Marketing & Sales",
  "Fintech",
  "EdTech",
  "Commerce & Marketplaces",
  "Founder Stories",
];

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/g, "");
}

export const slugOf = (e: Episode) => slugify(e.title);
export const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export function getEpisode(slug: string) {
  return episodes.find((e) => slugOf(e) === slug);
}

export function related(ep: Episode, n = 3) {
  return episodes
    .filter((e) => e.id !== ep.id && (e.category === ep.category || (ep.company && e.company === ep.company)))
    .slice(0, n);
}

export type Company = { name: string; category: Category; people: string[]; episodes: Episode[] };

export function companies(): Company[] {
  const map = new Map<string, Company>();
  for (const e of episodes) {
    if (!e.company) continue;
    const c = map.get(e.company) ?? { name: e.company, category: e.category, people: [], episodes: [] };
    if (e.guest && !c.people.includes(e.guest)) c.people.push(e.guest);
    c.episodes.push(e);
    map.set(e.company, c);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}
