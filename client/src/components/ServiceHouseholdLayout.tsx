"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { MessageCircle, Phone, CheckCircle, ChevronRight, HelpCircle } from "lucide-react";
import type { ServiceTheme } from "@/lib/serviceThemes";
import { getImageFolder } from "@/lib/serviceList";
import { PHONE_DISPLAY, PHONE_LINK, WHATSAPP_URL } from "@/lib/constants";

type Props = {
  slug: string;
  theme: ServiceTheme;
};

export function ServiceHouseholdLayout({ slug, theme }: Props) {
  const t = useTranslations("services.household");
  const imageFolder = getImageFolder(slug);
  const content1 = `/services/${imageFolder}/content-1.jpg`;
  const content2 = `/services/${imageFolder}/content-2.jpg`;
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);

  const bullets = [t("bullet1"), t("bullet2"), t("bullet3"), t("bullet4")];
  const ecoItems = [t("eco1"), t("eco2"), t("eco3")];
  const whatItems = [t("what1"), t("what2"), t("what3"), t("what4"), t("what5")];
  const related = [
    { slug: t("related1Slug"), title: t("related1"), desc: t("related1Desc") },
    { slug: t("related2Slug"), title: t("related2"), desc: t("related2Desc") },
    { slug: t("related3Slug"), title: t("related3"), desc: t("related3Desc") },
    { slug: t("related4Slug"), title: t("related4"), desc: t("related4Desc") },
  ];
  const steps = [
    { title: t("processStep1Title"), desc: t("processStep1Desc") },
    { title: t("processStep2Title"), desc: t("processStep2Desc") },
    { title: t("processStep3Title"), desc: t("processStep3Desc") },
    { title: t("processStep4Title"), desc: t("processStep4Desc") },
  ];
  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
  ];

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14 ${theme.zLayoutBg}`}>
      {/* Bullets */}
      <ul className="space-y-2 mb-6">
        {bullets.map((text, i) => (
          <li key={i} className="flex gap-2 items-start">
            <CheckCircle size={20} className={`text-accent shrink-0 mt-0.5 ${theme.accentClass}`} strokeWidth={2} />
            <span className={theme.textColor}>{text}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-4 mb-10">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 font-medium ${theme.accentClass} hover:underline`}
        >
          <MessageCircle size={20} />
          WhatsApp
        </a>
        <a
          href={`tel:${PHONE_LINK}`}
          className={`inline-flex items-center gap-2 font-medium ${theme.accentClass} hover:underline`}
        >
          <Phone size={20} />
          {PHONE_DISPLAY}
        </a>
      </div>

      {/* Value intro */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className={`${theme.textColor} text-lg leading-relaxed`}>{t("valueIntro")}</p>
      </motion.section>

      {/* Image 1 + Same-day */}
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
          <h3 className="text-lg font-bold text-navy mb-2">{t("sameDayTitle")}</h3>
          <p className={`${theme.textColor} leading-relaxed mb-4`}>{t("sameDayBody")}</p>
          <Link
            href="/#contact"
            className={`inline-block font-medium ${theme.accentClass} hover:underline`}
          >
            {t("sameDayCta")}
          </Link>
        </div>
      </motion.div>

      <p className={`${theme.textColor} mb-6 leading-relaxed`}>{t("valueExplain")}</p>
      <p className={`${theme.textColor} mb-10 leading-relaxed`}>
        {t("overviewLinkText")}{" "}
        <Link href="/ueberblick" className={`${theme.accentClass} hover:underline font-medium`}>
          {t("overviewLinkLabel")}
        </Link>
        {t("overviewLinkSuffix")}
      </p>

      {/* Value equalization */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h3 className="text-xl font-bold text-navy mb-3">{t("valueEqualTitle")}</h3>
        <p className={`${theme.textColor} leading-relaxed`}>{t("valueEqualBody")}</p>
      </motion.section>

      {/* Image 2 + Eco */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12"
      >
        <div>
          <h3 className="text-lg font-bold text-navy mb-3">{t("ecoTitle")}</h3>
          <ul className="space-y-2">
            {ecoItems.map((text, i) => (
              <li key={i} className="flex gap-2 items-start">
                <CheckCircle size={18} className="text-accent shrink-0 mt-0.5" />
                <span className={theme.textColor}>{text}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-4 ${theme.textColor} text-sm leading-relaxed`}>{t("advantagesVs")}</p>
        </div>
        {show2 ? (
          <div className={`relative aspect-[4/3] rounded-xl overflow-hidden order-first md:order-last ${theme.imageRing}`}>
            <img
              src={content2}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setShow2(false)}
            />
          </div>
        ) : (
          <div className="hidden md:block aspect-[4/3] order-first md:order-last" aria-hidden />
        )}
      </motion.div>

      {/* Related services */}
      <section className="mb-12">
        <h3 className="text-xl font-bold text-navy mb-4">{t("relatedTitle")}</h3>
        <ul className="grid sm:grid-cols-2 gap-4">
          {related.map((item, i) => (
            <li key={i}>
              <Link
                href={`/services/${item.slug}`}
                className={`block p-4 rounded-xl border border-navy/10 hover:border-accent/30 transition ${theme.zLayoutBg}`}
              >
                <span className="font-semibold text-navy">{item.title}</span>
                <p className={`text-sm mt-1 ${theme.textColor}`}>{item.desc}</p>
                <ChevronRight size={18} className={`mt-2 ${theme.accentClass}`} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* What we handle */}
      <section className="mb-12">
        <h3 className="text-xl font-bold text-navy mb-4">{t("whatWeHandleTitle")}</h3>
        <ul className="space-y-2">
          {whatItems.map((text, i) => (
            <li key={i} className="flex gap-2 items-start">
              <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" />
              <span className={theme.textColor}>{text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="mb-12">
        <h3 className="text-xl font-bold text-navy mb-6">{t("processTitle")}</h3>
        <ol className="space-y-6">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold">
                {i + 1}
              </span>
              <div>
                <h4 className="font-semibold text-navy">{step.title}</h4>
                <p className={`text-sm mt-1 ${theme.textColor}`}>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section>
        <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
          <HelpCircle size={24} className="text-accent" />
          FAQ
        </h3>
        <div className="space-y-2">
          {faqs.map((item, i) => (
            <details key={i} className="group rounded-xl border border-navy/10 bg-white overflow-hidden">
              <summary className="px-4 py-3 font-medium text-navy cursor-pointer list-none flex items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronRight size={18} className={`shrink-0 transition-transform group-open:rotate-90 ${theme.accentClass}`} />
              </summary>
              <div className={`px-4 pb-3 pt-0 text-sm border-t border-navy/5 ${theme.textColor}`}>
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
