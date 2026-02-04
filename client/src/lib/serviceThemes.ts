/**
 * Her hizmet sayfası için farklı renk ve tasarım.
 * Hizmetler: Ev boşaltma, Daire boşaltma, Ofis, Depo/Konteyner, Eşya ayıklama, Temizlik, Genel tahliye.
 */
export type ServiceKey =
  | "einkauf"
  | "household"
  | "apartment"
  | "office"
  | "warehouse"
  | "bulk"
  | "cleaning"
  | "general";

export type ServiceTheme = {
  /** Hero overlay (arka plan karartma) */
  heroOverlay: string;
  /** Hero alt çizgi rengi */
  heroLine: string;
  /** Article (metin) arka planı */
  articleBg: string;
  /** Geri link ve vurgu rengi */
  accentClass: string;
  /** İletişim bölümü arka planı */
  contactBg: string;
  /** Z-Layout container arka planı */
  zLayoutBg: string;
  /** Z-Layout metin rengi */
  textColor: string;
  /** Z-Layout resim çerçevesi */
  imageRing: string;
};

export const SERVICE_THEMES: Record<ServiceKey, ServiceTheme> = {
  einkauf: {
    heroOverlay: "bg-amber-900/80",
    heroLine: "bg-amber-500",
    articleBg: "bg-amber-50/50",
    accentClass: "text-amber-700 hover:text-amber-800",
    contactBg: "bg-amber-50/30",
    zLayoutBg: "bg-amber-50/50",
    textColor: "text-navy/90",
    imageRing: "ring-2 ring-amber-200",
  },
  household: {
    heroOverlay: "bg-amber-900/75",
    heroLine: "bg-amber-500",
    articleBg: "bg-amber-50/50",
    accentClass: "text-amber-600 hover:text-amber-700",
    contactBg: "bg-amber-50/30",
    zLayoutBg: "bg-amber-50/50",
    textColor: "text-navy/90",
    imageRing: "ring-2 ring-amber-200",
  },
  apartment: {
    heroOverlay: "bg-sky-900/75",
    heroLine: "bg-sky-500",
    articleBg: "bg-sky-50/50",
    accentClass: "text-sky-600 hover:text-sky-700",
    contactBg: "bg-sky-50/30",
    zLayoutBg: "bg-sky-50/50",
    textColor: "text-navy/90",
    imageRing: "ring-2 ring-sky-200",
  },
  office: {
    heroOverlay: "bg-indigo-900/75",
    heroLine: "bg-indigo-500",
    articleBg: "bg-indigo-50/50",
    accentClass: "text-indigo-600 hover:text-indigo-700",
    contactBg: "bg-indigo-50/30",
    zLayoutBg: "bg-indigo-50/50",
    textColor: "text-navy/90",
    imageRing: "ring-2 ring-indigo-200",
  },
  warehouse: {
    heroOverlay: "bg-stone-800/80",
    heroLine: "bg-amber-600",
    articleBg: "bg-stone-50",
    accentClass: "text-amber-700 hover:text-amber-800",
    contactBg: "bg-stone-100/80",
    zLayoutBg: "bg-stone-50",
    textColor: "text-navy/90",
    imageRing: "ring-2 ring-stone-200",
  },
  bulk: {
    heroOverlay: "bg-emerald-900/75",
    heroLine: "bg-emerald-500",
    articleBg: "bg-emerald-50/50",
    accentClass: "text-emerald-600 hover:text-emerald-700",
    contactBg: "bg-emerald-50/30",
    zLayoutBg: "bg-emerald-50/50",
    textColor: "text-navy/90",
    imageRing: "ring-2 ring-emerald-200",
  },
  cleaning: {
    heroOverlay: "bg-teal-900/75",
    heroLine: "bg-teal-500",
    articleBg: "bg-teal-50/50",
    accentClass: "text-teal-600 hover:text-teal-700",
    contactBg: "bg-teal-50/30",
    zLayoutBg: "bg-teal-50/50",
    textColor: "text-navy/90",
    imageRing: "ring-2 ring-teal-200",
  },
  general: {
    heroOverlay: "bg-navy/80",
    heroLine: "bg-accent",
    articleBg: "bg-white",
    accentClass: "text-accent hover:text-accent-hover",
    contactBg: "bg-slate-50",
    zLayoutBg: "bg-white",
    textColor: "text-navy/85",
    imageRing: "ring-2 ring-navy/10",
  },
};

export function getServiceTheme(key: ServiceKey): ServiceTheme {
  return SERVICE_THEMES[key] ?? SERVICE_THEMES.general;
}
