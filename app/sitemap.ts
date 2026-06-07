import type { MetadataRoute } from "next";

const SITE = "https://weafex.com";
const ROUTES = ["", "/about", "/product", "/contact", "/waitlist", "/accessibility", "/privacy"];
const LANGS = ["he", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const route of ROUTES) {
    for (const lang of LANGS) {
      entries.push({
        url: `${SITE}/${lang}${route}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            he: `${SITE}/he${route}`,
            en: `${SITE}/en${route}`,
          },
        },
      });
    }
  }
  return entries;
}
