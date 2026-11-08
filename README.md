# The Builder's Mind: website

Next.js 16 + Tailwind CSS v4. It builds to a plain static site, so it's free to host and fast.

## Run it in VS Code

1. Unzip, then **File → Open Folder…** and pick `buildersmind-site`.
2. Open the terminal (**Ctrl + `**) and run:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:3000. Changes you save show up right away.

You need Node.js 20 or newer (`node -v` to check).

## Where things are

| What you want to change | File |
|---|---|
| Show name, tagline, email, social links | `src/lib/site.ts` |
| Episodes (add new ones here) | `src/lib/episodes.ts` |
| Colors and fonts | `src/app/globals.css` |
| Home page | `src/app/page.tsx` |
| Apply / Sponsor / About pages | `src/app/apply`, `src/app/sponsor`, `src/app/about` |
| Header / footer | `src/components/Header.tsx`, `Footer.tsx` |
| Animations | `src/components/Motion.tsx` (scroll and cursor), bottom of `src/app/globals.css` (styles) |
| Team on the About page | `team` in `src/lib/site.ts` |

### New episodes are added automatically
Every morning (06:00 UTC) a GitHub Action reads the channel's feed and adds new long-form
uploads (Shorts are skipped) to the top of `src/lib/episodes.ts`, then redeploys.
It guesses the guest and company from the title, so **check each line marked
`// auto-added`** and fix `guest`, `company`, `category` and `kind`
(`"episode"` or `"tutorial"`), then delete the comment. Run `git pull` first, since the
bot commits to `main`.

Run it yourself any time: `node scripts/youtube.mjs`
(add `--refresh` to re-read every video, e.g. after editing descriptions on YouTube).
To keep a video off the site, add its ID to `IGNORE` in `scripts/youtube.mjs`.

### Chapters, summary and topics come from the YouTube description
`src/lib/youtube-data.json` is generated: don't edit it by hand. From each description it takes:
- **Chapters**: timestamp lines (`00:00 Intro`). They appear as a clickable list on the
  episode page and as "key moments" data for Google.
- **Summary**: the opening paragraphs. Shown under the title and used as the search snippet.
- **Topics**: the bullet list. Shown as "In this episode".

To write your own instead, add `notes` and/or `takeaways` to the episode in `episodes.ts`;
they take priority. Optional: `featured: true` puts an episode under "Most watched".

## Before going live: TODO list
- [ ] `src/lib/site.ts`: real domain (email and social links are taken from the old site and the channel)
- [ ] Newsletter: the signup boxes are placeholders. To activate, set `newsletterEnabled: true`
      in `src/lib/site.ts` once the form endpoint below is set up
- [ ] Forms: create a free form at formspree.io, copy `.env.example` → `.env.local`,
      and paste the endpoint. (Without it, forms open the visitor's email app.)
- [ ] `src/app/about/page.tsx`: write the "why I started this" text in your own words
- [ ] `src/app/sponsor/page.tsx`: add real audience numbers from YouTube Studio
- [ ] Optional: hand-written `notes` + `takeaways` for your top episodes (the YouTube
      description is used until then)
- [ ] Optional: replace `src/app/favicon.ico` with your logo

## Put it online (free): Cloudflare
Hosted as a Cloudflare Worker serving the static `out/` folder (config: `wrangler.jsonc`).
Live at https://thebuildersmind.ahmadjahids.workers.dev

- **Automatic:** every push to `main` rebuilds and redeploys (Cloudflare Workers Builds,
  connected in the dashboard under Workers & Pages → thebuildersmind → Settings → Builds).
- **By hand:** `npm run deploy` (needs `npx wrangler login` once).
- **Preview the production build locally:** `npm run preview`.
- **Form endpoint:** add `NEXT_PUBLIC_FORM_ENDPOINT` under Settings → Build → Variables
  (it's read at build time, so it must be a *build* variable).
- **Domain:** add thebuildersmind.com to the same Cloudflare account, then
  Settings → Domains & Routes → Add → Custom domain.

## GitHub Pages (temporary home)
`.github/workflows/pages.yml` builds and publishes the site on every push to `main`.
It is served from https://jasakh.github.io/thebuildersmind/ (the workflow sets
`PAGES_BASE_PATH` so links work under `/thebuildersmind/`).
One-time setup by the repo owner: Settings → Pages → Source: **GitHub Actions**.
Form endpoint for this build: Settings → Secrets and variables → Actions → Variables →
`NEXT_PUBLIC_FORM_ENDPOINT`.

## Ideas for later
- A "tools featured on the show" page with affiliate links
- Guest application tracker (Notion or Airtable via the form endpoint)
