// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { getTools } from "./src/lib/tools.js";
import { GLOSSARY, GLOSSARY_UPDATED } from "./src/data/glossary.js";
import { EXPLORE_ARTICLES, EXPLORE_UPDATED } from "./src/data/explore.js";

const SITE = "https://radar.codacy.com";

// <lastmod> for each sitemap URL, from the same content dates the pages show:
// a tool's "Last verified" date, a glossary or Explore article's "Updated"
// date. Never the build date, which would claim new content on every deploy.
// Pages with no content date of their own (About, the author page) get none.
const tools = getTools();
const LASTMOD = new Map([
  ["/", tools.map((t) => t.lastUpdated).sort().at(-1)],
  ...tools.map((t) => [`/${t.slug}/`, t.lastUpdated]),
  ["/glossary/", GLOSSARY.map((t) => t.updated ?? GLOSSARY_UPDATED).sort().at(-1)],
  ...GLOSSARY.map((t) => [`/glossary/${t.slug}/`, t.updated ?? GLOSSARY_UPDATED]),
  ["/explore/", EXPLORE_ARTICLES.map((a) => a.updated ?? EXPLORE_UPDATED).sort().at(-1)],
  ...EXPLORE_ARTICLES.map((a) => [`/explore/${a.slug}/`, a.updated ?? EXPLORE_UPDATED]),
]);

// `site` is required for canonical URLs, sitemap entries and absolute URLs in
// structured data. Update it if the directory moves to another domain.
export default defineConfig({
  site: SITE,
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
  integrations: [
    sitemap({
      serialize(item) {
        const lastmod = LASTMOD.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
});
