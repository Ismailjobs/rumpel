import sanitizeHtml from "sanitize-html";

const allowedTags: string[] = [];
const allowedAttributes: Record<string, string[]> = {};

export function sanitizeString(input: unknown): string {
  if (input == null || typeof input !== "string") return "";
  const trimmed = input.trim().slice(0, 2000);
  return sanitizeHtml(trimmed, { allowedTags, allowedAttributes });
}

/** For long text (e.g. contact message) – max 10000 chars */
export function sanitizeLongString(input: unknown, maxLength = 10000): string {
  if (input == null || typeof input !== "string") return "";
  const trimmed = input.trim().slice(0, maxLength);
  return sanitizeHtml(trimmed, { allowedTags, allowedAttributes });
}

export function sanitizeEmail(input: unknown): string {
  const s = sanitizeString(input);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(s) ? s : "";
}

export function sanitizePhone(input: unknown): string {
  const s = sanitizeString(input).slice(0, 30);
  return s.replace(/[^\d+\-\s()]/g, "");
}
