import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { routing } from "@/i18n/routing";
import { SERVICE_LIST } from "@/lib/serviceList";

const STATIC_PATHS = ["", "/about", "/impressum", "/prices", "/referenzen", "/services", "/ueberblick"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      const pathSegment = path || "";
      entries.push({
        url: `${base}/${locale}${pathSegment ? `/${pathSegment.replace(/^\//, "")}` : ""}`.replace(/\/+/g, "/"),
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : path === "/services" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/services" ? 0.9 : 0.8,
      });
    }
    for (const { slug } of SERVICE_LIST) {
      entries.push({
        url: `${base}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
