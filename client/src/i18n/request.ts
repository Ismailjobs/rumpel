import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  let resolvedLocale = locale;
  if (!resolvedLocale || !routing.locales.includes(resolvedLocale as "at" | "en")) {
    resolvedLocale = routing.defaultLocale;
  }
  const messagesLocale = resolvedLocale === "at" ? "de" : resolvedLocale;
  const messages = (await import(`../messages/${messagesLocale}.json`)).default;
  return { locale: resolvedLocale, messages };
});
