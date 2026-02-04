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

export function ServiceKellerLayout({ slug, theme }: Props) {
  const t = useTranslations("services.kellerraeumung");
  const imageFolder = getImageFolder(slug);
  const content1 = `/services/${imageFolder}/content-1.jpg`;
  const content2 = `/services/${imageFolder}/content-2.jpg`;
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);

  const bullets = [t("bullet1"), t("bullet2"), t("bullet3"), t("bullet4"), t("bullet5")];
  const approachItems = [t("approach1"), t("approach2"), t("approach3"), t("approach4")];
  const beforeItems = [t("before1"), t("before2"), t("before3"), t("before4"), t("before5")];
  const valueItems = [t("value1"), t("value2"), t("value3"), t("value4"), t("value5"), t("value6")];
  const donateItems = [t("donate1"), t("donate2"), t("donate3"), t("donate4")];
  const afterItems = [t("after1"), t("after2"), t("after3"), t("after4"), t("after5")];
  const viennaItems = [t("vienna1"), t("vienna2"), t("vienna3"), t("vienna4")];
  const newProjectsItems = [t("newProjects1"), t("newProjects2"), t("newProjects3"), t("newProjects4"), t("newProjects5")];
  const familyItems = [t("family1"), t("family2"), t("family3"), t("family4")];
  const typesItems = [t("types1"), t("types2"), t("types3"), t("types4")];
  const whatItems = [t("what1"), t("what2"), t("what3"), t("what4")];
  const related = [
    { slug: t("related1Slug"), title: t("related1"), desc: t("related1Desc") },
    { slug: t("related2Slug"), title: t("related2"), desc: t("related2Desc") },
    { slug: t("related3Slug"), title: t("related3"), desc: t("related3Desc") },
    { slug: t("related4Slug"), title: t("related4"), desc: t("related4Desc") },
  ];
  const disposeRows = [
    { label: t("disposeRow1Label"), way: t("disposeRow1Way") },
    { label: t("disposeRow2Label"), way: t("disposeRow2Way") },
    { label: t("disposeRow3Label"), way: t("disposeRow3Way") },
    { label: t("disposeRow4Label"), way: t("disposeRow4Way") },
    { label: t("disposeRow5Label"), way: t("disposeRow5Way") },
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
    { q: t("faq4Q"), a: t("faq4A") },
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
        <p className={`${theme.textColor} text-lg leading-relaxed`}>{t("intro")}</p>
      </motion.section>

      {/* Image 1 + Search terms */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
        {show1 ? (
          <div className={`relative aspect-[4/3] rounded-xl overflow-hidden ${theme.imageRing}`}>
            <img src={content1} alt="" className="absolute inset-0 w-full h-full object-cover" onError={() => setShow1(false)} />
          </div>
        ) : (
          <div className="hidden md:block aspect-[4/3]" aria-hidden />
        )}
        <div>
          <h2 className="text-lg font-bold text-navy mb-3">{t("searchTitle")}</h2>
          <ul className="space-y-2 text-sm">
            <li className={theme.textColor}>{t("search1")}</li>
            <li className={theme.textColor}>{t("search2")}</li>
            <li className={theme.textColor}>{t("search3")}</li>
          </ul>
          <Link href="/#contact" className={`inline-block mt-3 font-medium ${theme.accentClass} hover:underline`}>
            {t("searchCta")}
          </Link>
        </div>
      </motion.div>

      {/* Approach */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-2">{t("approachTitle")}</h2>
        <p className={`${theme.textColor} mb-4`}>{t("approachIntro")}</p>
        <ul className="space-y-2">
          {approachItems.map((text, i) => (
            <li key={i} className="flex gap-2 items-start">
              <CheckCircle size={18} className="text-accent shrink-0 mt-0.5" />
              <span className={theme.textColor}>{text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Checklist */}
      <section className="mb-10 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-navy mb-3">{t("checklistBeforeTitle")}</h3>
          <ul className="space-y-1">
            {beforeItems.map((text, i) => (
              <li key={i} className={`flex gap-2 items-start text-sm ${theme.textColor}`}>
                <span className="text-accent">•</span> {text}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-navy mb-3">{t("checklistValueTitle")}</h3>
          <ul className="space-y-1">
            {valueItems.map((text, i) => (
              <li key={i} className={`flex gap-2 items-start text-sm ${theme.textColor}`}>
                <span className="text-accent">•</span> {text}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm">
            <Link href="/ueberblick" className={`${theme.accentClass} hover:underline`}>{t("valueGuideLink")}</Link>
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-navy mb-3">{t("disposeTitle")}</h3>
          <div className="overflow-x-auto rounded-xl border border-navy/10">
            <table className="w-full min-w-[400px] text-sm">
              <thead>
                <tr className="bg-navy/5 border-b border-navy/10">
                  <th className="px-3 py-2 font-semibold text-navy text-left">{t("disposeCol1")}</th>
                  <th className="px-3 py-2 font-semibold text-navy text-left">{t("disposeCol2")}</th>
                </tr>
              </thead>
              <tbody>
                {disposeRows.map((row, i) => (
                  <tr key={i} className="border-b border-navy/5">
                    <td className={`px-3 py-2 ${theme.textColor}`}>{row.label}</td>
                    <td className={`px-3 py-2 ${theme.textColor}`}>{row.way}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-navy mb-2">{t("donateTitle")}</h3>
          <ul className="space-y-1 text-sm">
            {donateItems.map((text, i) => (
              <li key={i} className={theme.textColor}>• {text}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-navy mb-2">{t("afterTitle")}</h3>
          <ul className="space-y-1 text-sm">
            {afterItems.map((text, i) => (
              <li key={i} className={`flex gap-2 items-start ${theme.textColor}`}>
                <CheckCircle size={16} className="text-accent shrink-0 mt-0.5" /> {text}
              </li>
            ))}
          </ul>
        </div>
        <p className={`p-3 rounded-xl bg-accent/10 border border-accent/20 text-sm ${theme.textColor}`}>
          <strong className="text-accent">💡</strong> {t("tip")}
        </p>
      </section>

      {/* Vienna specifics */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-2">{t("viennaTitle")}</h2>
        <p className={`${theme.textColor} mb-3`}>{t("viennaIntro")}</p>
        <ul className="space-y-1">
          {viennaItems.map((text, i) => (
            <li key={i} className={`flex gap-2 items-start text-sm ${theme.textColor}`}>
              <span className="text-accent">•</span> {text}
            </li>
          ))}
        </ul>
      </section>

      {/* Costs */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-3">{t("costsTitle")}</h2>
        <p className={`${theme.textColor} leading-relaxed mb-3`}>{t("costsBody1")}</p>
        <p className={`${theme.textColor} leading-relaxed`}>{t("costsBody2")}</p>
      </section>

      {/* New projects + Image 2 */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
        <div>
          <h2 className="text-xl font-bold text-navy mb-2">{t("newProjectsTitle")}</h2>
          <p className={`${theme.textColor} mb-3 text-sm`}>{t("newProjectsIntro")}</p>
          <ul className="space-y-1">
            {newProjectsItems.map((text, i) => (
              <li key={i} className={`flex gap-2 items-start ${theme.textColor}`}>
                <CheckCircle size={18} className="text-accent shrink-0 mt-0.5" /> {text}
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

      {/* Family */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-2">{t("familyTitle")}</h2>
        <p className={`${theme.textColor} mb-3`}>{t("familyIntro")}</p>
        <ul className="space-y-2">
          {familyItems.map((text, i) => (
            <li key={i} className={`flex gap-2 items-start ${theme.textColor}`}>
              <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" /> {text}
            </li>
          ))}
        </ul>
      </section>

      {/* Types */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-3">{t("typesTitle")}</h2>
        <ul className="space-y-1 text-sm">
          {typesItems.map((text, i) => (
            <li key={i} className={theme.textColor}>• {text}</li>
          ))}
        </ul>
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

      {/* CTA */}
      <section className="mb-10 p-4 rounded-xl bg-navy/5 border border-navy/10">
        <p className={`font-medium ${theme.textColor} mb-4`}>{t("ctaTitle")}</p>
        <Link href="/#contact" className={`inline-flex items-center gap-2 font-semibold ${theme.accentClass} hover:underline`}>
          {t("ctaButton")}
          <ChevronRight size={18} />
        </Link>
      </section>

      {/* What we handle */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-3">{t("whatWeHandleTitle")}</h2>
        <ul className="space-y-2">
          {whatItems.map((text, i) => (
            <li key={i} className={`flex gap-2 items-start ${theme.textColor}`}>
              <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" /> {text}
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-6">{t("processTitle")}</h2>
        <ol className="space-y-6">
          {steps.map((step, i) => (
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

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
          <HelpCircle size={24} className="text-accent" /> FAQ
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
