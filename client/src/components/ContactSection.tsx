"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL, HCAPTCHA_SITE_KEY } from "@/lib/constants";
import {
  NAME_MAX,
  EMAIL_MAX,
  PHONE_MIN,
  PHONE_MAX,
  MESSAGE_MIN,
  MESSAGE_MAX,
  ADDRESS_MAX,
  PLZ_ORT_MAX,
} from "@/lib/contact-validation";

const HCaptcha = dynamic(
  () => import("@hcaptcha/react-hcaptcha").then((mod) => mod.default),
  { ssr: false }
);

const SERVICE_KEYS = [
  "household",
  "apartment",
  "office",
  "warehouse",
  "bulk",
  "cleaning",
  "general",
] as const;

type Props = {
  defaultService?: string;
};

export function ContactSection(props: Props) {
  const t = useTranslations("contact");
  const tServices = useTranslations("services");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
      if (useCaptcha && !captchaToken) {
        setStatus("error");
        return;
      }
      const form = e.currentTarget;
      const data = new FormData(form);
      const payload = {
        name: (data.get("name") as string)?.trim().slice(0, NAME_MAX) ?? "",
        email: (data.get("email") as string)?.trim().slice(0, EMAIL_MAX) ?? "",
        phone: (data.get("phone") as string)?.trim().replace(/\s+/g, " ").slice(0, PHONE_MAX) ?? "",
        address: (data.get("address") as string)?.trim().slice(0, ADDRESS_MAX) || undefined,
        plzOrt: (data.get("plzOrt") as string)?.trim().slice(0, PLZ_ORT_MAX) || undefined,
        message: (data.get("message") as string)?.trim().slice(0, MESSAGE_MAX) ?? "",
        service: (data.get("service") as string) || undefined,
        recaptchaToken: useCaptcha ? captchaToken : undefined,
      };

      setStatus("loading");
      setErrorMessage("");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok && json.success) {
          setStatus("success");
          form.reset();
          resetCaptcha();
        } else {
          setStatus("error");
          setErrorMessage((json.error as string) || t("error"));
          resetCaptcha();
        }
      } catch {
        setStatus("error");
        setErrorMessage(t("error"));
        resetCaptcha();
      }
    },
    [useCaptcha, captchaToken, resetCaptcha]
  );

  return (
    <section id="contact" className="py-20 md:py-28 bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("sectionLabel")}
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl bg-white/5 border border-white/10 p-6 md:p-10 backdrop-blur-sm"
        >
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/10 border border-white/20 p-8 text-center space-y-5"
          >
            <p className="text-green-400 font-medium">{t("success")}</p>
            <p className="text-sm text-white/80">{t("successWhatsApp")}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                {t("name")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={NAME_MAX}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={t("name")}
              />
              <p className="mt-0.5 text-xs text-white/50">Max. {NAME_MAX}</p>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                {t("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={EMAIL_MAX}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={t("email")}
              />
              <p className="mt-0.5 text-xs text-white/50">Max. {EMAIL_MAX}</p>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                {t("phone")}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                minLength={PHONE_MIN}
                maxLength={PHONE_MAX}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={t("phone")}
              />
              <p className="mt-0.5 text-xs text-white/50">Max. {PHONE_MAX}</p>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">
                {t("address")}
              </label>
              <input
                id="address"
                name="address"
                type="text"
                maxLength={ADDRESS_MAX}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={t("address")}
              />
              <p className="mt-0.5 text-xs text-white/50">Optional, max. {ADDRESS_MAX}</p>
            </div>
            <div>
              <label htmlFor="plzOrt" className="block text-sm font-medium mb-1">
                {t("plzOrt")}
              </label>
              <input
                id="plzOrt"
                name="plzOrt"
                type="text"
                maxLength={PLZ_ORT_MAX}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={t("plzOrt")}
              />
              <p className="mt-0.5 text-xs text-white/50">Optional, max. {PLZ_ORT_MAX}</p>
            </div>
            <div>
              <label htmlFor="service" className="block text-sm font-medium mb-1">
                {t("service")}
              </label>
              <select
                id="service"
                name="service"
                defaultValue={props.defaultService ?? ""}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent [&_option]:bg-navy [&_option]:text-white"
              >
                <option value="">—</option>
                {SERVICE_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {tServices(`${key}.title`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                {t("message")}
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={MESSAGE_MIN}
                maxLength={MESSAGE_MAX}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder={t("message")}
              />
              <p className="mt-0.5 text-xs text-white/50">Min. {MESSAGE_MIN}, max. {MESSAGE_MAX.toLocaleString("de-AT")}</p>
            </div>
            {useCaptcha && (
              <div className="flex justify-center md:justify-start">
                <HCaptcha
                  key={captchaKey}
                  sitekey={HCAPTCHA_SITE_KEY}
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                  theme="dark"
                  languageOverride={typeof window !== "undefined" && document.documentElement.lang?.startsWith("en") ? "en" : "de"}
                />
              </div>
            )}
            {status === "error" && errorMessage && (
              <p className="text-red-400 text-sm">{errorMessage}</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-accent/20"
            >
              {status === "loading" ? "..." : t("submit")}
            </button>
          </motion.form>
        )}
        </motion.div>
      </div>
    </section>
  );
}
