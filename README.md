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

### Adding a new episode
Copy one line in `src/lib/episodes.ts`, put it at the **top** (newest first), and change:
- `id`: the part after `watch?v=` in the YouTube link
- `title`, `guest`, `company`, `category`, `duration`
- `kind`: `"episode"` for founder conversations, `"tutorial"` for how-to cuts
- optional: `featured: true` puts it under "Most watched" on the home page
- optional: `notes` and `takeaways`: a short summary and 3–5 bullet points.
  **Fill these in.** They're what Google reads, so they bring in search traffic.

The episode page, founder directory, sitemap and search all update automatically.

## Before going live: TODO list
- [ ] `src/lib/site.ts`: real email, real domain, and check the social links
- [ ] Forms: create a free form at formspree.io, copy `.env.example` → `.env.local`,
      and paste the endpoint. (Without it, forms open the visitor's email app.)
- [ ] `src/app/about/page.tsx`: write the "why I started this" text in your own words
- [ ] `src/app/sponsor/page.tsx`: add real audience numbers from YouTube Studio
- [ ] Add `notes` + `takeaways` to your top 5 episodes
- [ ] Optional: replace `src/app/favicon.ico` with your logo

## Put it online (free)
**Vercel (easiest):** push this folder to a GitHub repo → vercel.com → "Add New Project" →
import the repo → Deploy. Add `NEXT_PUBLIC_FORM_ENDPOINT` under Settings → Environment Variables.
Then connect your domain (e.g. thebuildersmind.com is currently parked at GoDaddy).

**Any other host:** run `npm run build` and upload the `out/` folder.

## Ideas for later
- Pull new episodes automatically from the YouTube API instead of editing `episodes.ts`
- Per-episode timestamps / chapters
- A "tools featured on the show" page with affiliate links
- Guest application tracker (Notion or Airtable via the form endpoint)
