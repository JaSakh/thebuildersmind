// Edit this file to change site-wide text and links.

export const site = {
  name: "The Builder's Mind",
  tagline: "Live demos from Europe's top tech founders",
  description:
    "Every episode, a European founder shows their product live — AI tools, app builders, SaaS and no-code — and tells the real story behind it: early prototypes, pivots, and scaling.",
  url: "https://thebuildersmind.com", // TODO: change to your real domain once you have one
  host: "Jahid Sakhi",
  email: "hello@thebuildersmind.com", // TODO: replace with a real inbox
  cadence: "New episodes every 1–2 weeks",
  links: {
    youtube: "https://www.youtube.com/@thebuildersmind",
    youtubeSubscribe: "https://www.youtube.com/@thebuildersmind?sub_confirmation=1",
    // TODO: check these against the links on your YouTube channel
    linkedin: "https://www.linkedin.com/company/the-builders-mind-podcast",
    instagram: "https://www.instagram.com/buildersmind_podcast",
    spotify: "https://open.spotify.com/",
    tiktok: "https://www.tiktok.com/@buildersmind",
  },
  // Paste a form endpoint (e.g. from formspree.io) in .env.local:
  //   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
  // Without it, forms open the visitor's email app instead.
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
};
