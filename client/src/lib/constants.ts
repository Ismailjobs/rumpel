export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://objektraeumung.at";

/** WhatsApp & İletişim: +43 660 4706098 (wa.me format: 436604706098) */
export const WHATSAPP_NUMBER = "436604706098";
export const WHATSAPP_TEXT = "Anfrage: Räumungs- und Entrümpelungsservice";
export const PHONE_DISPLAY = "+43 660 4706098";
export const PHONE_LINK = PHONE_DISPLAY.replace(/\s/g, "");
/** Canonical phone for SEO / JSON-LD */
export const PHONE_CANONICAL = process.env.NEXT_PUBLIC_PHONE_CANONICAL ?? "+43 660 4706098";
export const PHONE_CANONICAL_LINK = PHONE_CANONICAL.replace(/\s/g, "");

export const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "office@objektraeumung.at";
export const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS ?? "Sechshauser Straße 62-64, AT-1150 Wien";
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/** Google Search Console verification (meta tag content) */
export const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";
/** Bing Webmaster Tools verification (meta tag content) */
export const BING_MSVALIDATE = process.env.NEXT_PUBLIC_BING_MSVALIDATE ?? "";

/** hCaptcha site key (client-side, public – contact form) */
export const HCAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? "17f2b41e-cb0c-4ecc-9162-d368eade6e4e";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;
