"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FileCheck, Truck, MapPin, BadgeCheck } from "lucide-react";

const items = [
  { key: "freeQuote", icon: FileCheck },
  { key: "fastPickup", icon: Truck },
  { key: "allDistricts", icon: MapPin },
  { key: "fixedPrice", icon: BadgeCheck },
] as const;

export function TrustBar() {
  const t = useTranslations("trust");

  return (
    <section className="relative z-20 -mt-0.5 bg-white border-b border-navy/10 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {items.map(({ key, icon: Icon }, i) => (
            <div
              key={key}
              className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center">
                <Icon className="text-accent" size={24} strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-navy md:text-base">
                {t(key)}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
