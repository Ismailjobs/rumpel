import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: routing.localePrefix,
});

const ACCESS_CHECK_ENABLED = process.env.ACCESS_CHECK_ENABLED !== "false";

export default async function middleware(request: NextRequest) {
  if (ACCESS_CHECK_ENABLED) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const host = request.headers.get("host") || request.headers.get("x-forwarded-host") || "";
    const base =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:4000";
    const url = `${base.replace(/\/$/, "")}/api/access-check?ip=${encodeURIComponent(ip)}&host=${encodeURIComponent(host)}`;
    try {
      const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(3000) });
      const data = (await res.json()) as { allowed?: boolean };
      if (data.allowed === false) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    } catch {
      // Backend unreachable: allow request so the site stays usable
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
