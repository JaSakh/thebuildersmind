import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain website to /out
// that you can host anywhere (Vercel, Netlify, GitHub Pages, IONOS…).
//
// GitHub Pages serves the site from /<repo>/, so the Pages workflow sets
// PAGES_BASE_PATH. Cloudflare and local builds leave it empty (served from /).
const basePath = process.env.PAGES_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Lets plain <img> tags find files in /public under the same base path.
  env: { NEXT_PUBLIC_BASE_PATH: basePath ?? "" },
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
