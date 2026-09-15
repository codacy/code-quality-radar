// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

// `site` is required for canonical URLs, sitemap entries and absolute URLs in
// structured data. Update it if the directory moves to another domain.
export default defineConfig({
  site: "https://radar.codacy.com",
  // Netlify serves the directory form and 301s the bare form to it, so the
  // slashed URL is the one true URL. Keep dev, canonical and hrefs in step.
  trailingSlash: "always",
  // Self-hosted: Astro downloads Inter at build time and serves it from our
  // own origin, so no render-blocking request to a third party.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],
  integrations: [sitemap()],
});
