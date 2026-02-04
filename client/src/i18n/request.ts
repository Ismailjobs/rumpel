import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  let resolvedLocale = locale;
  if (!resolvedLocale || !routing.locales.includes(resolvedLocale as "de" | "en")) {
    resolvedLocale = routing.defaultLocale;
  }
  const messages = (await import(`../messages/${resolvedLocale}.json`)).default;
  return { locale: resolvedLocale, messages };
});
