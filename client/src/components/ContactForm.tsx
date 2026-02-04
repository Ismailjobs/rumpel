"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  NAME_MIN,
  NAME_MAX,
  EMAIL_MAX,
  PHONE_MIN,
  PHONE_MAX,
  MESSAGE_MIN,
  MESSAGE_MAX,
  ADDRESS_MIN,
  ADDRESS_MAX,
  PLZ_ORT_MIN,
  PLZ_ORT_MAX,
  validateName,
  validateEmail,
  validatePhone,
  validateMessage,
  validateAddress,
  validatePlzOrt,
} from "@/lib/contact-validation";
import { HCAPTCHA_SITE_KEY } from "@/lib/constants";

const HCaptcha = dynamic(
  () => import("@hcaptcha/react-hcaptcha").then((mod) => mod.default),
  { ssr: false }
);

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const useCaptcha = Boolean(HCAPTCHA_SITE_KEY);

  const resetCaptcha = useCallback(() => {
    setCaptchaToken(null);
    setCaptchaKey((k) => k + 1);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const fd = new FormData(form);
      const name = (fd.get("name") as string)?.trim().slice(0, NAME_MAX) ?? "";
      const email = (fd.get("email") as string)?.trim().slice(0, EMAIL_MAX) ?? "";
      const phone = (fd.get("phone") as string)?.trim().replace(/\s+/g, " ").slice(0, PHONE_MAX) ?? "";
      const address = (fd.get("address") as string)?.trim().slice(0, ADDRESS_MAX) ?? "";
      const plzOrt = (fd.get("plzOrt") as string)?.trim().slice(0, PLZ_ORT_MAX) ?? "";
      const message = (fd.get("message") as string)?.trim().slice(0, MESSAGE_MAX) ?? "";

      const n = validateName(name);
      if (!n.ok) {
        setErrorMessage(n.error ?? "");
        setStatus("error");
        return;
      }
      const em = validateEmail(email);
      if (!em.ok) {
        setErrorMessage(em.error ?? "");
        setStatus("error");
        return;
      }
      const ph = validatePhone(phone);
      if (!ph.ok) {
        setErrorMessage(ph.error ?? "");
        setStatus("error");
        return;
      }
      const msg = validateMessage(message);
      if (!msg.ok) {
        setErrorMessage(msg.error ?? "");
        setStatus("error");
        return;
      }
      if (useCaptcha && !captchaToken) {
        setErrorMessage("Bitte bestätigen Sie die Sicherheitsprüfung (hCaptcha).");
        setStatus("error");
        return;
      }

      setStatus("loading");
      setErrorMessage("");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, address, plzOrt, message, token: captchaToken ?? "" }),
        });
        const json = await res.json().catch(() => ({}));

        if (res.ok && json.success) {
          setStatus("success");
          form.reset();
          resetCaptcha();
        } else {
          setStatus("error");
          setErrorMessage((json.error as string) || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
          resetCaptcha();
        }
      } catch {
        setStatus("error");
        setErrorMessage("Netzwerkfehler. Bitte versuchen Sie es später erneut.");
        resetCaptcha();
      }
    },
    [useCaptcha, captchaToken, resetCaptcha]
  );

  if (status === "success") {
    return (
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-center text-gray-800">
        <p className="font-semibold text-blue-700">Mesajınız başarıyla gönderildi!</p>
        <p className="mt-2 text-sm text-gray-600">
          Wir haben Ihre Nachricht erhalten und melden uns in Kürze bei Ihnen.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Eine Bestätigungs-E-Mail wurde an Ihre Adresse gesendet. Bitte prüfen Sie ggf. den Spam-Ordner.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      {!useCaptcha && (
        <p className="mb-4 text-sm text-amber-700">
          hCaptcha ist nicht konfiguriert (NEXT_PUBLIC_HCAPTCHA_SITE_KEY). Formular ohne Bot-Schutz.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={NAME_MIN}
            maxLength={NAME_MAX}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="Ihr Name"
          />
          <p className="mt-0.5 text-xs text-gray-500">Max. {NAME_MAX}</p>
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-gray-700">
            E-Mail *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={EMAIL_MAX}
            pattern="[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}"
            title="Bitte gültige E-Mail-Adresse eingeben."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="ihre@email.at"
          />
          <p className="mt-0.5 text-xs text-gray-500">Gültige E-Mail (max. {EMAIL_MAX} Zeichen)</p>
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium text-gray-700">
            Telefon *
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            minLength={PHONE_MIN}
            maxLength={PHONE_MAX}
            pattern="\+?[\d\s\-()]{7,24}"
            title="z. B. +43 681 811 309 62"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="+43 681 811 309 62"
          />
          <p className="mt-0.5 text-xs text-gray-500">Max. {PHONE_MAX}</p>
        </div>
        <div>
          <label htmlFor="contact-address" className="mb-1 block text-sm font-medium text-gray-700">
            Adresse (Straße und Hausnummer)
          </label>
          <input
            id="contact-address"
            name="address"
            type="text"
            maxLength={ADDRESS_MAX}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="z. B. Sechshauser Straße 62-64"
          />
          <p className="mt-0.5 text-xs text-gray-500">Optional, max. {ADDRESS_MAX} Zeichen</p>
        </div>
        <div>
          <label htmlFor="contact-plz-ort" className="mb-1 block text-sm font-medium text-gray-700">
            PLZ / Ort
          </label>
          <input
            id="contact-plz-ort"
            name="plzOrt"
            type="text"
            maxLength={PLZ_ORT_MAX}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="z. B. 1150 Wien"
          />
          <p className="mt-0.5 text-xs text-gray-500">Optional, max. {PLZ_ORT_MAX}</p>
        </div>
        <div>
          <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-gray-700">
            Nachricht *
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={MESSAGE_MIN}
            maxLength={MESSAGE_MAX}
            rows={4}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="Ihre Nachricht..."
          />
          <p className="mt-0.5 text-xs text-gray-500">Min. {MESSAGE_MIN}, max. {MESSAGE_MAX.toLocaleString("de-AT")}</p>
        </div>
        {useCaptcha && (
          <div className="flex justify-start">
            <HCaptcha
              key={captchaKey}
              sitekey={HCAPTCHA_SITE_KEY}
              onVerify={setCaptchaToken}
              onExpire={() => setCaptchaToken(null)}
              theme="light"
              languageOverride={typeof window !== "undefined" && document.documentElement.lang?.startsWith("en") ? "en" : "de"}
            />
          </div>
        )}
        {status === "error" && errorMessage && (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
        >
          {status === "loading" ? "Loading..." : "Nachricht senden"}
        </button>
      </form>
    </div>
  );
}
