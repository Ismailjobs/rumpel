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

export function ServiceRaeumungWienLayout({ slug, theme }: Props) {
  const t = useTranslations("services.raeumungWien");
  const imageFolder = getImageFolder(slug);
  const content1 = `/services/${imageFolder}/content-1.jpg`;
  const content2 = `/services/${imageFolder}/content-2.jpg`;
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);

  const bullets = [t("bullet1"), t("bullet2"), t("bullet3"), t("bullet4")];
  const introHighlights = [t("introHighlight1"), t("introHighlight2"), t("introHighlight3")];
  const scopeItems = [t("scope1"), t("scope2"), t("scope3"), t("scope4"), t("scope5")];
  const processSteps = [
    { title: t("processStep1Title"), desc: t("processStep1Desc") },
    { title: t("processStep2Title"), desc: t("processStep2Desc") },
    { title: t("processStep3Title"), desc: t("processStep3Desc") },
    { title: t("processStep4Title"), desc: t("processStep4Desc") },
  ];
  const permitsItems = [t("permits1"), t("permits2"), t("permits3"), t("permits4")];
  const commercialItems = [t("commercial1"), t("commercial2"), t("commercial3"), t("commercial4")];
  const guidelinesItems = [t("guidelines1"), t("guidelines2"), t("guidelines3"), t("guidelines4")];
  const whatItems = [t("what1"), t("what2"), t("what3"), t("what4"), t("what5"), t("what6")];
  const yourSteps = [
    { title: t("yourStep1Title"), desc: t("yourStep1Desc") },
    { title: t("yourStep2Title"), desc: t("yourStep2Desc") },
    { title: t("yourStep3Title"), desc: t("yourStep3Desc") },
    { title: t("yourStep4Title"), desc: t("yourStep4Desc") },
  ];
  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") },
  ];
  const related = [
    { slug: t("related1Slug"), title: t("related1"), desc: t("related1Desc") },
    { slug: t("related2Slug"), title: t("related2"), desc: t("related2Desc") },
    { slug: t("related3Slug"), title: t("related3"), desc: t("related3Desc") },
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
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 font-medium ${theme.accentClass} hover:underline`}>
          <MessageCircle size={20} /> WhatsApp
        </a>
        <a href={`tel:${PHONE_LINK}`} className={`inline-flex items-center gap-2 font-medium ${theme.accentClass} hover:underline`}>
          <Phone size={20} /> {PHONE_DISPLAY}
        </a>
      </div>

      {/* Intro */}
      <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-4">{t("introTitle")}</h2>
        <p className={`${theme.textColor} text-lg leading-relaxed mb-4`}>{t("intro")}</p>
        <ul className="space-y-2 mb-4">
          {introHighlights.map((text, i) => (
            <li key={i} className={`flex gap-2 items-start ${theme.textColor}`}>
              <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" /> {text}
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Content 1 + Was eine Räumung umfasst */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
        {show1 ? (
          <div className={`relative aspect-[4/3] rounded-xl overflow-hidden ${theme.imageRing}`}>
            <img src={content1} alt="" className="absolute inset-0 w-full h-full object-cover" onError={() => setShow1(false)} />
          </div>
        ) : (
          <div className="hidden md:block aspect-[4/3]" aria-hidden />
        )}
        <div>
          <h2 className="text-xl font-bold text-navy mb-3">{t("scopeTitle")}</h2>
          <ul className="space-y-2 mb-3">
            {scopeItems.map((text, i) => (
              <li key={i} className={`flex gap-2 items-start ${theme.textColor}`}>
                <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" /> {text}
              </li>
            ))}
          </ul>
          <p className={`${theme.textColor} text-sm italic mt-2`}>{t("scopeLink")}</p>
        </div>
      </motion.div>

      {/* Räumung sofort */}
      <section className="mb-10 p-4 rounded-xl bg-navy/5 border border-navy/10">
        <h2 className="text-lg font-bold text-navy mb-2">{t("expressTitle")}</h2>
        <p className={`${theme.textColor} text-sm mb-3`}>{t("express")}</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`text-sm font-medium ${theme.accentClass} hover:underline`}>
          {t("expressCta")}
        </a>
      </section>

      {/* Zwangsräumung */}
      <section className="mb-10 p-4 rounded-xl border border-navy/10 bg-white">
        <h2 className="text-lg font-bold text-navy mb-2">{t("evictionTitle")}</h2>
        <p className={`${theme.textColor} text-sm mb-3`}>{t("eviction")}</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`text-sm font-medium ${theme.accentClass} hover:underline`}>
          {t("evictionCta")}
        </a>
      </section>

      {/* Ablauf 4 Schritte */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-6">{t("processTitle")}</h2>
        <ol className="space-y-6">
          {processSteps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold">{i + 1}</span>
              <div>
                <h4 className="font-semibold text-navy">{step.title}</h4>
                <p className={`text-sm mt-1 ${theme.textColor}`}>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Genehmigungen */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-3">{t("permitsTitle")}</h2>
        <ul className="space-y-2">
          {permitsItems.map((text, i) => (
            <li key={i} className={`flex gap-2 items-start ${theme.textColor}`}>
              <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" /> {text}
            </li>
          ))}
        </ul>
      </section>

      {/* Gewerbe */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-3">{t("commercialTitle")}</h2>
        <ul className="space-y-2">
          {commercialItems.map((text, i) => (
            <li key={i} className={`flex gap-2 items-start ${theme.textColor}`}>
              <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" /> {text}
            </li>
          ))}
        </ul>
      </section>

      {/* Richtwerte */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-3">{t("guidelinesTitle")}</h2>
        <ul className="space-y-2 mb-3">
          {guidelinesItems.map((text, i) => (
            <li key={i} className={`${theme.textColor} text-sm`}>{text}</li>
          ))}
        </ul>
        <p className={`${theme.textColor} text-sm mb-2`}>{t("guidelinesNote")}</p>
        <p className={`${theme.textColor} text-sm italic`}>{t("generalLink")}</p>
      </section>

      {/* Schnelle Slots */}
      <section className="mb-10 p-4 rounded-xl bg-navy/5 border border-navy/10">
        <h2 className="text-lg font-bold text-navy mb-2">{t("expressSlotsTitle")}</h2>
        <p className={`${theme.textColor} text-sm`}>{t("expressSlots")}</p>
      </section>

      {/* Kontakt */}
      <section className="mb-10 p-4 rounded-xl border border-navy/10 bg-white">
        <h2 className="text-lg font-bold text-navy mb-3">{t("contactTitle")}</h2>
        <p className={`${theme.textColor} text-sm mb-1`}>{t("contactPhone")}</p>
        <p className={`${theme.textColor} text-sm mb-1`}>{t("contactWhatsApp")}</p>
        <p className={`${theme.textColor} text-sm mb-3`}>{t("contactOnline")}</p>
        <p className={`${theme.textColor} text-xs italic`}>{t("contactNote")}</p>
      </section>

      {/* Was wir übernehmen + Content 2 */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
        <div>
          <h2 className="text-xl font-bold text-navy mb-3">{t("whatWeHandleTitle")}</h2>
          <ul className="space-y-2">
            {whatItems.map((text, i) => (
              <li key={i} className={`flex gap-2 items-start ${theme.textColor}`}>
                <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" /> {text}
              </li>
            ))}
          </ul>
        </div>
        {show2 ? (
          <div className={`relative aspect-[4/3] rounded-xl overflow-hidden order-first md:order-last ${theme.imageRing}`}>
            <img src={content2} alt="" className="absolute inset-0 w-full h-full object-cover" onError={() => setShow2(false)} />
          </div>
        ) : (
          <div className="hidden md:block aspect-[4/3] order-first md:order-last" aria-hidden />
        )}
      </motion.div>

      {/* CTA */}
      <section className="mb-10 p-4 rounded-xl bg-navy/5 border border-navy/10">
        <p className={`font-medium ${theme.textColor} mb-2`}>{t("ctaTitle")}</p>
        <p className={`text-sm ${theme.textColor} mb-4`}>{t("ctaSubline")}</p>
        <Link href="/#contact" className={`inline-flex items-center gap-2 font-semibold ${theme.accentClass} hover:underline`}>
          {t("ctaButton")}
          <ChevronRight size={18} />
        </Link>
      </section>

      {/* Ihr Ablauf */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-6">{t("yourProcessTitle")}</h2>
        <ol className="space-y-6">
          {yourSteps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold">{i + 1}</span>
              <div>
                <h4 className="font-semibold text-navy">{step.title}</h4>
                <p className={`text-sm mt-1 ${theme.textColor}`}>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Related */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-4">{t("relatedTitle")}</h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {related.map((item, i) => (
            <li key={i}>
              <Link href={`/services/${item.slug}`} className={`block p-4 rounded-xl border border-navy/10 hover:border-accent/30 transition ${theme.zLayoutBg}`}>
                <span className="font-semibold text-navy">{item.title}</span>
                <p className={`text-sm mt-1 ${theme.textColor}`}>{item.desc}</p>
                <ChevronRight size={18} className={`mt-2 ${theme.accentClass}`} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
          <HelpCircle size={24} className="text-accent" /> {t("faqTitle")}
        </h2>
        <div className="space-y-2">
          {faqs.map((item, i) => (
            <details key={i} className="group rounded-xl border border-navy/10 bg-white overflow-hidden">
              <summary className="px-4 py-3 font-medium text-navy cursor-pointer list-none flex items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronRight size={18} className={`shrink-0 transition-transform group-open:rotate-90 ${theme.accentClass}`} />
              </summary>
              <div className={`px-4 pb-3 pt-0 text-sm border-t border-navy/5 ${theme.textColor}`}>{item.a}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
