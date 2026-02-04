/**
 * Leistungen sayfası ve header dropdown için tek kaynak.
 * slug: URL path, titleKey: services.* içinde başlık/açıklama, contentKey: sayfa içeriği + tema.
 */
export type ContentKey =
  | "einkauf"
  | "household"
  | "apartment"
  | "office"
  | "warehouse"
  | "bulk"
  | "cleaning"
  | "general";

export const SERVICE_LIST: { slug: string; titleKey: string; contentKey: ContentKey }[] = [
  { slug: "einkauf", titleKey: "einkauf", contentKey: "einkauf" },
  { slug: "entrumpelung-wien", titleKey: "entrumpelungWien", contentKey: "general" },
  { slug: "raeumung-wien", titleKey: "raeumungWien", contentKey: "general" },
  { slug: "haushaltsaufloesung", titleKey: "household", contentKey: "household" },
  { slug: "wohnungsaufloesung", titleKey: "wohnungsaufloesung", contentKey: "apartment" },
  { slug: "zimmer-raeumung", titleKey: "zimmerRaeumung", contentKey: "apartment" },
  { slug: "kellerraeumung", titleKey: "kellerraeumung", contentKey: "household" },
  { slug: "garagenraeumung", titleKey: "garagenraeumung", contentKey: "warehouse" },
  { slug: "dachbodenraeumung", titleKey: "dachbodenraeumung", contentKey: "household" },
  { slug: "firmenaufloesung", titleKey: "firmenaufloesung", contentKey: "office" },
  { slug: "lager-gewerbeparks", titleKey: "lagerGewerbeparks", contentKey: "warehouse" },
  { slug: "gastro-retail", titleKey: "gastroRetail", contentKey: "office" },
  { slug: "verlassenschaft", titleKey: "verlassenschaft", contentKey: "household" },
  { slug: "messie-entruempelung", titleKey: "messieEntruempelung", contentKey: "household" },
  { slug: "haushaltsaufloesung-ueberblick", titleKey: "haushaltsaufloesungUeberblick", contentKey: "household" },
  { slug: "antiquitaeten-wertanrechnung", titleKey: "antiquitaetenWertanrechnung", contentKey: "general" },
  { slug: "moebel-wertanrechnung", titleKey: "moebelWertanrechnung", contentKey: "general" },
];

/**
 * Slug → resim klasörü (public/services/ altında).
 * Varsayılan: slug ile aynı. Eski contentKey klasörleri burada eşlenebilir.
 */
export const IMAGE_FOLDER_BY_SLUG: Record<string, string> = {
  haushaltsaufloesung: "household",
};

export function getImageFolder(slug: string): string {
  return IMAGE_FOLDER_BY_SLUG[slug] ?? slug;
}

/** Eski slug'lar (geriye uyumluluk) – yönlendirme veya aynı sayfa */
export const LEGACY_SLUGS: Record<string, string> = {
  wohnungsraeumung: "wohnungsaufloesung",
  bueroentruempelung: "firmenaufloesung",
  lagerraeumung: "lager-gewerbeparks",
  sperrmuell: "entrumpelung-wien",
  reinigung: "entrumpelung-wien",
  wertanrechnung: "antiquitaeten-wertanrechnung",
};

export const ALL_SLUGS = [
  ...SERVICE_LIST.map((s) => s.slug),
  ...Object.keys(LEGACY_SLUGS),
] as const;

/** Menüde gösterilecek kategori sırası – contentKey ile eşleşir (einkauf en üstte) */
export const SERVICE_CATEGORY_ORDER: ContentKey[] = [
  "einkauf",
  "household",
  "apartment",
  "office",
  "warehouse",
  "general",
];

/** Servisleri contentKey'e göre gruplar (menü kategorileri için) */
export function getServicesByCategory(): { contentKey: ContentKey; services: typeof SERVICE_LIST }[] {
  const order = SERVICE_CATEGORY_ORDER;
  const map = new Map<ContentKey, typeof SERVICE_LIST>();
  for (const s of SERVICE_LIST) {
    const key = s.contentKey;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }
  return order.map((contentKey) => ({
    contentKey,
    services: map.get(contentKey) ?? [],
  })).filter((g) => g.services.length > 0);
}

export function getSlugConfig(slug: string): { titleKey: string; contentKey: ContentKey } | null {
  const legacy = LEGACY_SLUGS[slug];
  if (legacy) {
    const found = SERVICE_LIST.find((s) => s.slug === legacy);
    return found ? { titleKey: found.titleKey, contentKey: found.contentKey } : null;
  }
  const found = SERVICE_LIST.find((s) => s.slug === slug);
  return found ? { titleKey: found.titleKey, contentKey: found.contentKey } : null;
}
