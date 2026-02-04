"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MessageCircle, CheckCircle, AlertCircle } from "lucide-react";
import type { ServiceTheme } from "@/lib/serviceThemes";
import { getImageFolder } from "@/lib/serviceList";
import { WHATSAPP_URL } from "@/lib/constants";

type Props = {
  slug: string;
  theme: ServiceTheme;
};

export function ServiceEinkaufLayout({ slug, theme }: Props) {
  const t = useTranslations("services.einkauf");
  const imageFolder = getImageFolder(slug);
  const content1 = `/services/${imageFolder}/content-1.jpg`;
  const content2 = `/services/${imageFolder}/content-2.jpg`;
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const items = [t("item1"), t("item2"), t("item3"), t("item4"), t("item5")];

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14 ${theme.zLayoutBg}`}>
      {/* Nur WhatsApp – Hinweis */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 rounded-xl border-2 border-amber-400/80 bg-amber-50 p-5 md:p-6"
      >
        <div className="flex gap-3">
          <AlertCircle size={24} className="text-amber-700 shrink-0 mt-0.5" aria-hidden />
          <div>
            <p className="font-semibold text-amber-900 mb-1">{t("whatsappOnlyNotice")}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 font-medium mt-2 ${theme.accentClass} hover:underline`}
            >
              <MessageCircle size={20} /> {t("ctaButton")}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Intro */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="text-xl font-bold text-navy mb-4">{t("introTitle")}</h2>
        <p className={`${theme.textColor} text-lg leading-relaxed`}>{t("intro")}</p>
      </motion.section>

      {/* Bild + Was wir ankaufen */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12"
      >
        {show1 ? (
          <div className={`relative aspect-[4/3] rounded-xl overflow-hidden ${theme.imageRing}`}>
            <img
              src={content1}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setShow1(false)}
            />
          </div>
        ) : (
          <div className="hidden md:block aspect-[4/3]" aria-hidden />
        )}
        <div>
          <h2 className="text-xl font-bold text-navy mb-3">{t("itemsTitle")}</h2>
          <ul className="space-y-2">
            {items.map((text, i) => (
              <li key={i} className={`flex gap-2 items-start ${theme.textColor}`}>
                <CheckCircle size={20} className="text-amber-600 shrink-0 mt-0.5" /> {text}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Zweites Bild + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        <div>
          <h2 className="text-xl font-bold text-navy mb-2">{t("ctaTitle")}</h2>
          <p className={`${theme.textColor} mb-4`}>{t("ctaSubline")}</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
          >
            <MessageCircle size={22} /> {t("ctaButton")}
          </a>
        </div>
        {show2 ? (
          <div className={`relative aspect-[4/3] rounded-xl overflow-hidden ${theme.imageRing}`}>
            <img
              src={content2}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setShow2(false)}
            />
          </div>
        ) : (
          <div className="hidden md:block aspect-[4/3]" aria-hidden />
        )}
      </motion.div>
    </div>
  );
}
