"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Phone, FileText, Truck, CheckCircle } from "lucide-react";

const steps = [
  { key: "step1", icon: Phone },
  { key: "step2", icon: FileText },
  { key: "step3", icon: Truck },
  { key: "step4", icon: CheckCircle },
] as const;

export function ProcessStepsSection() {
  const t = useTranslations("process");

  return (
    <section className="py-16 md:py-24 bg-slate-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("sectionLabel")}
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-bold text-navy">
            {t("title")}
          </h2>
        </motion.div>

        {/* Timeline: vertical on mobile, horizontal on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Vertical line (mobile) */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-navy/20 md:hidden"
            aria-hidden
          />
          {/* Horizontal line (desktop) */}
          <div
            className="hidden md:block absolute top-14 left-0 right-0 h-0.5 bg-navy/20"
            aria-hidden
          />

          <div className="grid md:grid-cols-4 gap-8 md:gap-4">
            {steps.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative flex flex-col md:items-center text-left md:text-center"
              >
                <div className="flex items-start gap-4 md:flex-col md:items-center md:gap-4">
                  <div className="relative z-[1] shrink-0 w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center ring-4 ring-slate-50 md:ring-white">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <div className="md:mt-2 md:max-w-[200px]">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">
                      {t("stepLabel")} {i + 1}
                    </span>
                    <h3 className="mt-1 font-bold text-navy text-lg">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-navy/70 leading-relaxed">
                      {t(`${key}.desc`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
