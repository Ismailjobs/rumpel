import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import { ContactSubmission } from "../models/ContactSubmission.js";
import { sanitizeString, sanitizeLongString, sanitizeEmail, sanitizePhone } from "../utils/sanitize.js";

const HCAPTCHA_VERIFY_URL = "https://hcaptcha.com/siteverify";
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET_KEY;
const OFFICE_EMAIL = "office@objektraeumung.at";
const FROM = '"Objekträumung" <office@objektraeumung.at>';

function createMailTransporter() {
  const user = process.env.BREVO_USER;
  const pass = process.env.BREVO_API_KEY;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

const ADDRESS_MAX = 200;
const PLZ_ORT_MAX = 120;

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getAdminEmailHtml(data: {
  vorname: string;
  nachname: string;
  address: string;
  plzOrt: string;
  email: string;
  phone: string;
  message: string;
  datumStr: string;
}): string {
  const gray = "#6b7280";
  const border = "#e5e7eb";
  const text = "#374151";
  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; color: ${text}; background: #fafafa;">
  <div style="max-width: 520px; margin: 0 auto;">
    <p style="margin: 0 0 20px; font-size: 18px; font-weight: 600;">📩 NEUE KUNDENANFRAGE</p>
    <p style="margin: 0 0 16px; font-size: 13px; color: ${gray}; font-weight: 600;">👤 Kundendaten</p>
    <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr><td style="padding: 4px 0; border-bottom: 1px solid ${border}; font-size: 14px;">Vorname</td><td style="padding: 4px 0 4px 12px; border-bottom: 1px solid ${border}; color: ${gray};">${escapeHtml(data.vorname)}</td></tr>
      <tr><td style="padding: 4px 0; border-bottom: 1px solid ${border}; font-size: 14px;">Nachname</td><td style="padding: 4px 0 4px 12px; border-bottom: 1px solid ${border}; color: ${gray};">${escapeHtml(data.nachname)}</td></tr>
      <tr><td style="padding: 4px 0; border-bottom: 1px solid ${border}; font-size: 14px;">Adresse</td><td style="padding: 4px 0 4px 12px; border-bottom: 1px solid ${border}; color: ${gray};">${escapeHtml(data.address)}</td></tr>
      <tr><td style="padding: 4px 0; font-size: 14px;">PLZ / Ort</td><td style="padding: 4px 0 4px 12px; color: ${gray};">${escapeHtml(data.plzOrt)}</td></tr>
    </table>
    <p style="margin: 0 0 16px; font-size: 13px; color: ${gray}; font-weight: 600;">📞 Kontakt</p>
    <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr><td style="padding: 4px 0; border-bottom: 1px solid ${border}; font-size: 14px;">E-Mail</td><td style="padding: 4px 0 4px 12px; border-bottom: 1px solid ${border}; color: ${gray};">${escapeHtml(data.email)}</td></tr>
      <tr><td style="padding: 4px 0; font-size: 14px;">Telefon</td><td style="padding: 4px 0 4px 12px; color: ${gray};">${escapeHtml(data.phone)}</td></tr>
    </table>
    <p style="margin: 0 0 16px; font-size: 13px; color: ${gray}; font-weight: 600;">💬 Nachricht</p>
    <div style="padding: 12px; background: #f3f4f6; border-radius: 8px; margin-bottom: 20px; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
    <p style="margin: 0; font-size: 12px; color: ${gray}; border-top: 1px solid ${border}; padding-top: 12px;">Diese Anfrage wurde über dein Kontaktformular gesendet.<br>Datum: ${escapeHtml(data.datumStr)} · ${escapeHtml(OFFICE_EMAIL)}</p>
  </div>
</body>
</html>`;
}

function getCustomerEmailHtml(): string {
  const accent = "#c2410c";
  const text = "#374151";
  const muted = "#6b7280";
  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Vielen Dank für Ihre Anfrage</title></head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6; padding: 32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color:#ffffff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden;">
        <tr><td style="background-color: ${accent}; padding: 24px 32px; text-align: center;"><span style="font-size: 20px; font-weight: 700; color: #ffffff;">Objekträumung</span></td></tr>
        <tr><td style="padding: 32px 32px 28px;">
          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: ${text};">Sehr geehrte Damen und Herren,</p>
          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: ${text};">vielen Dank für Ihre Anfrage und Ihr Vertrauen in unseren Räumungs- und Entrümpelungsservice.</p>
          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: ${text};">Wir haben Ihre Nachricht erhalten und werden diese schnellstmöglich bearbeiten.<br>In der Regel melden wir uns innerhalb von 24 Stunden bei Ihnen.</p>
          <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: ${text};">Bei dringenden Anliegen können Sie uns gerne telefonisch kontaktieren.</p>
          <p style="margin: 0; font-size: 16px; line-height: 1.6; color: ${text};">Mit freundlichen Grüßen<br><strong style="color: ${accent};">Objekträumung</strong></p>
        </td></tr>
        <tr><td style="padding: 16px 32px 20px; border-top: 1px solid #e5e7eb;"><p style="margin: 0; font-size: 12px; color: ${muted}; text-align: center;">Räumung &amp; Entrümpelung · Wien, Niederösterreich, Burgenland</p></td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendContactEmails(
  name: string,
  email: string,
  phone: string,
  message: string,
  address?: string,
  plzOrt?: string
): Promise<void> {
  const transporter = createMailTransporter();
  if (!transporter) {
    console.warn("[Contact] Brevo not configured (BREVO_USER/BREVO_API_KEY). Skipping emails.");
    return;
  }
  try {
    const nameParts = name.trim().split(/\s+/);
    const vorname = nameParts[0] ?? "";
    const nachname = nameParts.slice(1).join(" ") || "–";
    const now = new Date();
    const datumStr = now.toLocaleString("de-AT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const adminSubject = "📩 NEUE KUNDENANFRAGE";
    const adminText = [
      "📩 NEUE KUNDENANFRAGE",
      "",
      "👤 Kundendaten",
      "-------------------------------",
      `Vorname:   ${vorname}`,
      `Nachname:  ${nachname}`,
      `Adresse:   ${address || "–"}`,
      `PLZ / Ort: ${plzOrt || "–"}`,
      "",
      "📞 Kontakt",
      "-------------------------------",
      `E-Mail:    ${email}`,
      `Telefon:   ${phone}`,
      "",
      "💬 Nachricht",
      "-------------------------------",
      message,
      "",
      "Diese Anfrage wurde über dein Kontaktformular gesendet.",
      `Datum: ${datumStr} ${OFFICE_EMAIL}`,
    ].join("\n");

    const adminHtml = getAdminEmailHtml({
      vorname,
      nachname,
      address: address || "–",
      plzOrt: plzOrt || "–",
      email,
      phone,
      message,
      datumStr,
    });

    await transporter.sendMail({
      from: FROM,
      to: OFFICE_EMAIL,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
    });
    console.log("[Contact] Admin mail sent →", OFFICE_EMAIL);

    const customerSubject = "Vielen Dank für Ihre Anfrage";
    const customerText = [
      "Sehr geehrte Damen und Herren,",
      "",
      "vielen Dank für Ihre Anfrage und Ihr Vertrauen in unseren Räumungs- und Entrümpelungsservice.",
      "",
      "Wir haben Ihre Nachricht erhalten und werden diese schnellstmöglich bearbeiten.",
      "In der Regel melden wir uns innerhalb von 24 Stunden bei Ihnen.",
      "",
      "Bei dringenden Anliegen können Sie uns gerne telefonisch kontaktieren.",
      "",
      "Mit freundlichen Grüßen",
      "Objekträumung",
    ].join("\n");
    const customerHtml = getCustomerEmailHtml();
    await transporter.sendMail({
      from: FROM,
      to: email,
      replyTo: OFFICE_EMAIL,
      subject: customerSubject,
      text: customerText,
      html: customerHtml,
    });
    console.log("[Contact] Auto-Reply sent →", email);
  } catch (err) {
    console.error("[Contact] Email send failed:", err);
  }
}

export const contactRouter = Router();

type HCaptchaVerifyResponse = {
  success?: boolean;
  "error-codes"?: string[];
  hostname?: string;
};

type CaptchaResult = { ok: boolean; details?: HCaptchaVerifyResponse };

async function verifyHCaptcha(token: string): Promise<CaptchaResult> {
  if (!HCAPTCHA_SECRET) return { ok: true };
  try {
    const res = await fetch(HCAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: HCAPTCHA_SECRET, response: token }),
    });
    const data = (await res.json()) as HCaptchaVerifyResponse;
    if (process.env.NODE_ENV !== "production") {
      console.log("[hCaptcha]", JSON.stringify({ success: data?.success, "error-codes": data?.["error-codes"] }));
    }
    if (!data?.success) return { ok: false, details: data };
    return { ok: true, details: data };
  } catch (err) {
    console.error("[hCaptcha] Verify request failed:", err);
    return { ok: false };
  }
}

contactRouter.post("/contact", async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body ?? {};
    const name = sanitizeString(body.name);
    const email = sanitizeEmail(body.email);
    const phone = sanitizePhone(body.phone);
    const message = sanitizeLongString(body.message, 10000);
    const service = sanitizeString(body.service);
    const addressRaw = sanitizeString(body.address);
    const address = addressRaw && addressRaw.length <= ADDRESS_MAX ? addressRaw : undefined;
    const plzOrtRaw = sanitizeString(body.plzOrt);
    const plzOrt = plzOrtRaw && plzOrtRaw.length <= PLZ_ORT_MAX ? plzOrtRaw : undefined;
    const captchaToken = typeof body.recaptchaToken === "string" ? body.recaptchaToken.trim() : "";

    if (HCAPTCHA_SECRET) {
      if (!captchaToken) {
        res.status(400).json({ error: "hCaptcha is required. Please complete the verification." });
        return;
      }
      const captchaResult = await verifyHCaptcha(captchaToken);
      if (!captchaResult.ok) {
        const payload: { error: string; details?: CaptchaResult["details"] } = {
          error: "hCaptcha verification failed. Please try again.",
        };
        if (process.env.NODE_ENV !== "production") payload.details = captchaResult.details;
        res.status(400).json(payload);
        return;
      }
    }

    if (!name || name.length < 2) {
      res.status(400).json({ error: "Name is required (min 2 characters)." });
      return;
    }
    if (!email) {
      res.status(400).json({ error: "Valid email is required." });
      return;
    }
    if (!phone || phone.length < 5) {
      res.status(400).json({ error: "Valid phone number is required." });
      return;
    }
    if (!message || message.length < 10) {
      res.status(400).json({ error: "Message is required (min 10 characters)." });
      return;
    }

    await ContactSubmission.create({
      name,
      email,
      phone,
      message,
      service: service || undefined,
      address,
      plzOrt,
    });

    await sendContactEmails(name, email, phone, message, address, plzOrt);

    res.status(201).json({ success: true, message: "Request received." });
  } catch (err) {
    console.error("Contact submission error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});
