export const locales = ["at", "en"] as const;
export const defaultLocale = "at" as const;
export const localePrefix = "always" as const;

export const routing = {
  locales,
  defaultLocale,
  localePrefix,
} as const;
