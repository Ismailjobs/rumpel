"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Package,
  Heart,
  Layers,
  Palette,
  CheckCircle,
  Euro,
  Car,
  MapPin,
} from "lucide-react";

const weitereKeys = ["ankauf", "messie", "keller", "zusatz"] as const;
const weitereIcons = [Package, Heart, Layers, Palette];

const besonderheitenKeys = ["besichtigung", "fixpreis", "halteverbot", "depots", "wien"] as const;
const besonderheitenIcons = [CheckCircle, Euro, Car, MapPin, MapPin];

export function LeistungenExtras() {
  const t = useTranslations("services");

  return (
    <>
      {/* Weitere Leistungen */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-navy/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-navy text-center mb-10"
          >
            {t("weitereTitle")}
          </motion.h2>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {weitereKeys.map((key, i) => {
              const Icon = weitereIcons[i];
              return (
                <li
                  key={key}
                  className="flex gap-4 p-4 rounded-xl bg-white border border-navy/5 shadow-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="text-accent" size={20} strokeWidth={2} />
                  </div>
                  <p className="text-navy/85 text-sm leading-relaxed pt-1">
                    {t(`weitere.${key}`)}
                  </p>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </section>

      {/* Besonderheiten / Das bieten wir */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-navy text-center mb-10"
          >
            {t("besonderheitenTitle")}
          </motion.h2>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            {besonderheitenKeys.map((key, i) => {
              const Icon = besonderheitenIcons[i];
              return (
                <li
                  key={key}
                  className="flex gap-4 items-start p-4 rounded-xl bg-slate-50 border border-navy/5"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center mt-0.5">
                    <Icon className="text-navy" size={20} strokeWidth={2} />
                  </div>
                  <p className="text-navy/85 leading-relaxed pt-1">
                    {t(`besonderheiten.${key}`)}
                  </p>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </section>
    </>
  );
}
