"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Building2,
  Briefcase,
  Warehouse,
  LayoutGrid,
  ArrowRight,
  Box,
  Car,
  Mountain,
  Store,
  UtensilsCrossed,
  FolderOpen,
  Sparkles,
  Armchair,
  Gem,
} from "lucide-react";
import { SERVICE_LIST } from "@/lib/serviceList";

const HOMEPAGE_SERVICES_COUNT = 6;

const contentKeyIcons: Record<string, LucideIcon> = {
  general: LayoutGrid,
  household: Home,
  apartment: Building2,
  office: Briefcase,
  warehouse: Warehouse,
  bulk: Box,
  cleaning: Sparkles,
};
const titleKeyIcons: Record<string, LucideIcon> = {
  zimmerRaeumung: Home,
  kellerraeumung: Box,
  garagenraeumung: Car,
  dachbodenraeumung: Mountain,
  firmenaufloesung: Briefcase,
  lagerGewerbeparks: Warehouse,
  gastroRetail: UtensilsCrossed,
  verlassenschaft: FolderOpen,
  messieEntruempelung: Sparkles,
  haushaltsaufloesungUeberblick: Home,
  antiquitaetenWertanrechnung: Gem,
  moebelWertanrechnung: Armchair,
  raeumungWien: LayoutGrid,
  wohnungsaufloesung: Building2,
};
function getIcon(titleKey: string, contentKey: string) {
  return titleKeyIcons[titleKey] ?? contentKeyIcons[contentKey] ?? LayoutGrid;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

type ServicesProps = { variant?: "section" | "page" };

export function Services({ variant = "section" }: ServicesProps) {
  const t = useTranslations("services");
  const isPage = variant === "page";
  const items = isPage ? SERVICE_LIST : SERVICE_LIST.slice(0, HOMEPAGE_SERVICES_COUNT);

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={isPage ? "text-center mb-12" : "text-center mb-14"}
        >
          {!isPage && (
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              {t("sectionLabel")}
            </span>
          )}
          {isPage ? (
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-navy">
              {t("mainServicesTitle")}
            </h1>
          ) : (
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-navy">
              {t("title")}
            </h2>
          )}
          <p className="mt-4 text-lg text-navy/70 max-w-3xl mx-auto leading-relaxed">
            {isPage ? t("pageIntro") : t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className={
            isPage
              ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              : "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
          }
        >
          {items.map(({ slug, titleKey, contentKey }, index) => {
            const Icon = getIcon(titleKey, contentKey);
            if (isPage) {
              return (
                <motion.div key={slug} variants={item}>
                  <Link
                    href={`/services/${slug}`}
                    className="group block h-full p-6 md:p-7 rounded-2xl bg-white border-2 border-navy/5 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-navy/5 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                        <Icon className="text-navy group-hover:text-accent" size={28} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-navy/40 tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-0.5 font-bold text-navy text-lg group-hover:text-accent transition-colors">
                          {t(`${titleKey}.title`)}
                        </h3>
                        <p className="mt-2 text-sm text-navy/65 line-clamp-2 leading-relaxed">
                          {t(`${titleKey}.description`)}
                        </p>
                        <span className="inline-flex items-center gap-1.5 mt-4 text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                          {t("learnMore")}
                          <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            }
            // Ana sayfa: kompakt kart tasarımı
            return (
              <motion.div key={slug} variants={item}>
                <Link
                  href={`/services/${slug}`}
                  className="group block h-full p-4 md:p-5 rounded-xl bg-slate-50/80 hover:bg-accent/5 border border-transparent hover:border-accent/20 transition-all duration-300 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-navy/10 group-hover:bg-accent/20 flex items-center justify-center transition-colors shrink-0">
                      <Icon className="text-navy group-hover:text-accent" size={24} strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-navy text-sm md:text-base group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                      {t(`${titleKey}.title`)}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-accent font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("learnMore")}
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {!isPage && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all hover:-translate-y-0.5"
            >
              {t("viewAllServices")}
              <ArrowRight size={20} strokeWidth={2.5} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
