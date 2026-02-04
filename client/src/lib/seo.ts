import type { Metadata } from "next";
import { SITE_URL, GOOGLE_SITE_VERIFICATION, BING_MSVALIDATE } from "./constants";

export type SEOProps = {
  title: string;
  description: string;
  /** Comma-separated or array; used for meta keywords and can inform description. */
  keywords?: string | string[];
  /** Path without locale, e.g. "/" or "/services/haushaltsaufloesung". Canonical will be SITE_URL + locale + path. */
  canonicalPath?: string;
  /** Locale (at | en) for canonical and og:locale */
  locale?: "at" | "en";
  /** Optional OG image path (relative to SITE_URL) or full URL */
  image?: string;
  /** If true, noindex this page */
  noIndex?: boolean;
};

const DEFAULT_OG_IMAGE = "/og-default.png";

function normalizeKeywords(kw: string | string[] | undefined): string | undefined {
  if (kw == null) return undefined;
  return Array.isArray(kw) ? kw.join(", ") : kw;
}

/**
 * Builds Next.js Metadata for a page (title, description, OG, Twitter, canonical, robots, verification).
 * Use in generateMetadata() or export const metadata.
 */
export function buildMetadata({
  title,
  description,
  keywords,
  canonicalPath = "/",
  locale = "at",
  image,
  noIndex = false,
}: SEOProps): Metadata {
  const canonicalUrl = `${SITE_URL}/${locale}${canonicalPath === "/" ? "" : canonicalPath}`;
  const imageUrl = image?.startsWith("http") ? image : `${SITE_URL}${image?.startsWith("/") ? image : DEFAULT_OG_IMAGE}`;
  const kw = normalizeKeywords(keywords);

  const meta: Metadata = {
    title,
    description,
    keywords: kw,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      locale: locale === "at" ? "de_AT" : "en_US",
      url: canonicalUrl,
      siteName: "objekträumung",
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };

  if (GOOGLE_SITE_VERIFICATION || BING_MSVALIDATE) {
    meta.verification = {};
    if (GOOGLE_SITE_VERIFICATION) meta.verification.google = GOOGLE_SITE_VERIFICATION;
    if (BING_MSVALIDATE) meta.verification.other = { "msvalidate.01": BING_MSVALIDATE };
  }

  return meta;
}
