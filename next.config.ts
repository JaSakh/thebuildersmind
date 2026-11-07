import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain website to /out
// that you can host anywhere (Vercel, Netlify, GitHub Pages, IONOS…).
const nextConfig: NextConfig = {
  output: "export",
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
