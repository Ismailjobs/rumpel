import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { routing } from "@/i18n/routing";
import { SERVICE_LIST } from "@/lib/serviceList";

/** Statik sayfalar: path (locale sonrası), priority, changeFrequency (Google/Bing SEO). */
const STATIC_PATHS: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" },
  { path: "/prices", priority: 0.9, changeFrequency: "weekly" },
  { path: "/referenzen", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ueberblick", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/impressum", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of routing.locales) {
    for (const { path, priority, changeFrequency } of STATIC_PATHS) {
      const pathPart = path ? path.replace(/^\//, "") : "";
      const url = pathPart ? `${base}/${locale}/${pathPart}` : `${base}/${locale}`;
      entries.push({
        url,
        lastModified: now,
        changeFrequency,
        priority,
      });
    }
    for (const { slug } of SERVICE_LIST) {
      entries.push({
        url: `${base}/${locale}/services/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
