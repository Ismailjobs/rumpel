export const locales = ["de", "en"] as const;
export const defaultLocale = "de" as const;
export const localePrefix = "always" as const;

export const routing = {
  locales,
  defaultLocale,
  localePrefix,
} as const;
