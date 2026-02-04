/**
 * Contact form validation – shared by API route and ContactForm (aynı sınırlar ve kurallar).
 */

export const NAME_MIN = 2;
export const NAME_MAX = 100;
export const EMAIL_MAX = 254;
export const PHONE_MIN = 8;
export const PHONE_MAX = 25;
export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 10000;

/** Adresse (Straße und Hausnummer) – optional, falls angegeben: 5–200 Zeichen */
export const ADDRESS_MIN = 5;
export const ADDRESS_MAX = 200;

/** PLZ / Ort (Postleitzahl und Stadt) – optional, falls angegeben: 3–120 Zeichen */
export const PLZ_ORT_MIN = 3;
export const PLZ_ORT_MAX = 120;

/** E-posta: genel kullanım için yeterli format */
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

/** Telefon: + ile başlayabilir, rakam, boşluk, tire, parantez – toplam 8–25 karakter */
export const PHONE_REGEX = /^\+?[\d\s\-()]{7,24}$/;

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= EMAIL_MAX && EMAIL_REGEX.test(trimmed);
}

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim().replace(/\s+/g, " ");
  return trimmed.length >= PHONE_MIN && trimmed.length <= PHONE_MAX && PHONE_REGEX.test(trimmed);
}

export function validateName(value: string): { ok: boolean; error?: string } {
  const t = value.trim().slice(0, NAME_MAX);
  if (t.length < NAME_MIN) return { ok: false, error: `Name mindestens ${NAME_MIN} Zeichen.` };
  return { ok: true };
}

export function validateEmail(value: string): { ok: boolean; error?: string } {
  const t = value.trim().slice(0, EMAIL_MAX);
  if (!t) return { ok: false, error: "E-Mail ist erforderlich." };
  if (!EMAIL_REGEX.test(t)) return { ok: false, error: "Bitte gültige E-Mail-Adresse eingeben." };
  return { ok: true };
}

export function validatePhone(value: string): { ok: boolean; error?: string } {
  const t = value.trim().replace(/\s+/g, " ").slice(0, PHONE_MAX);
  if (t.length < PHONE_MIN) return { ok: false, error: `Telefon mindestens ${PHONE_MIN} Zeichen.` };
  if (!PHONE_REGEX.test(t)) return { ok: false, error: "Bitte gültige Telefonnummer eingeben (z. B. +43 681 811 309 62)." };
  return { ok: true };
}

export function validateMessage(value: string): { ok: boolean; error?: string } {
  const t = value.trim().slice(0, MESSAGE_MAX);
  if (t.length < MESSAGE_MIN)
    return { ok: false, error: `Nachricht mindestens ${MESSAGE_MIN} Zeichen.` };
  if (t.length > MESSAGE_MAX)
    return { ok: false, error: `Nachricht maximal ${MESSAGE_MAX} Zeichen.` };
  return { ok: true };
}

/** Adresse optional; wenn angegeben: 5–200 Zeichen */
export function validateAddress(value: string): { ok: boolean; error?: string } {
  const t = value.trim().slice(0, ADDRESS_MAX);
  if (t.length === 0) return { ok: true };
  if (t.length < ADDRESS_MIN) return { ok: false, error: `Adresse mindestens ${ADDRESS_MIN} Zeichen.` };
  if (t.length > ADDRESS_MAX) return { ok: false, error: `Adresse maximal ${ADDRESS_MAX} Zeichen.` };
  return { ok: true };
}

/** PLZ / Ort optional; wenn angegeben: 3–120 Zeichen */
export function validatePlzOrt(value: string): { ok: boolean; error?: string } {
  const t = value.trim().slice(0, PLZ_ORT_MAX);
  if (t.length === 0) return { ok: true };
  if (t.length < PLZ_ORT_MIN) return { ok: false, error: `PLZ/Ort mindestens ${PLZ_ORT_MIN} Zeichen.` };
  if (t.length > PLZ_ORT_MAX) return { ok: false, error: `PLZ/Ort maximal ${PLZ_ORT_MAX} Zeichen.` };
  return { ok: true };
}
