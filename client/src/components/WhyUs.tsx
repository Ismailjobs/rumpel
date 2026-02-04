"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { BadgeCheck, Zap, Shield, MapPinned } from "lucide-react";

const items = [
  { key: "fixedPrice", icon: BadgeCheck },
  { key: "fast", icon: Zap },
  { key: "discreet", icon: Shield },
  { key: "vienna", icon: MapPinned },
] as const;

export function WhyUs() {
  const t = useTranslations("whyUs");

  return (
    <section className="py-16 md:py-24 bg-slate-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-navy">
            {t("title")}
          </h2>
          <p className="mt-3 text-navy/70 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="bg-white rounded-2xl p-6 shadow-sm border border-navy/5 hover:border-accent/20 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Icon className="text-accent" size={24} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-navy text-lg">{t(`${key}.title`)}</h3>
              <p className="mt-2 text-sm text-navy/70 leading-relaxed">
                {t(`${key}.desc`)}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
