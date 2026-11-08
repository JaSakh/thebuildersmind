// Edit this file to change site-wide text and links.

export const newsletterNote = "The newsletter launches soon. We haven't saved your email, so check back then.";

export const site = {
  name: "The Builder's Mind",
  tagline: "Live demos from Europe's top tech founders",
  description:
    "Every episode, a European founder shows their product live — AI tools, app builders, SaaS and no-code — and tells the real story behind it: early prototypes, pivots, and scaling.",
  url: "https://jasakh.github.io/thebuildersmind", // TODO: change to your real domain once you have one
  host: "Jahid Sakhi",
  builtBy: { name: "Basit Sakhi", url: "https://www.linkedin.com/in/basit-sakhi/" },
  email: "hello@buildersmind.com", // from the old site
  cadence: "New episodes every 1–2 weeks",
  // From the old site's About page
  team: [
    { name: "Jahid Sakhi", role: "Host", photo: "/team/jahid-sakhi.jpg", linkedin: "https://www.linkedin.com/in/jahid-sakhi-0831a8176/" },
    { name: "Laila Ratmane", role: "Growth", photo: "/team/laila-ratmane.jpg", linkedin: "https://www.linkedin.com/in/laila-ratmane/" },
  ],
  links: {
    youtube: "https://www.youtube.com/@thebuildersmind",
    youtubeSubscribe: "https://www.youtube.com/@thebuildersmind?sub_confirmation=1",
    // Taken from the channel's video descriptions (Nov 2026)
    linkedin: "https://www.linkedin.com/company/the-builder-s-mind-podcast/",
    instagram: "https://www.instagram.com/buildersmind_podcast",
    spotify: "https://open.spotify.com/show/6T0qXsHa5Uy9VCp1xSDA1k",
    tiktok: "https://www.tiktok.com/@buildersmind_pod",
  },
  // Paste a form endpoint (e.g. from formspree.io) in .env.local:
  //   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
  // Without it, forms open the visitor's email app instead.
  // Newsletter boxes are placeholders for now: they show a "launching soon" note and send nothing.
  // To turn it on: set this to true and make sure the form endpoint above is configured.
  newsletterEnabled: false,
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
};
