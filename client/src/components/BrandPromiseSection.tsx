"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShieldCheck, Banknote, Users, MessageCircle } from "lucide-react";

const cards = [
  { key: "fixedPrice", icon: Banknote },
  { key: "viennaTeams", icon: Users },
  { key: "directContact", icon: MessageCircle },
] as const;

export function BrandPromiseSection() {
  const t = useTranslations("brandPromise");

  return (
    <section className="py-16 md:py-24 bg-navy">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold mb-4">
            <ShieldCheck size={18} strokeWidth={2.5} />
            {t("verified")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {cards.map(({ key, icon: Icon }) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/15 hover:border-accent/40 hover:bg-white/15 transition-all"
            >
              <div className="absolute top-4 right-4 text-emerald-400" aria-hidden>
                <ShieldCheck size={22} strokeWidth={2.5} />
              </div>
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-5">
                <Icon className="text-accent" size={28} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-white text-xl">{t(`${key}.title`)}</h3>
              <p className="mt-3 text-white/80 leading-relaxed">
                {t(`${key}.desc`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
