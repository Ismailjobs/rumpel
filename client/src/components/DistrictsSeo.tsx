"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const BEZIRKE = [
  "1. Bezirk Innere Stadt",
  "2. Bezirk Leopoldstadt",
  "3. Bezirk Landstraße",
  "4. Bezirk Wieden",
  "5. Bezirk Margareten",
  "6. Bezirk Mariahilf",
  "7. Bezirk Neubau",
  "8. Bezirk Josefstadt",
  "9. Bezirk Alsergrund",
  "10. Bezirk Favoriten",
  "11. Bezirk Simmering",
  "12. Bezirk Meidling",
  "13. Bezirk Hietzing",
  "14. Bezirk Penzing",
  "15. Bezirk Rudolfsheim-Fünfhaus",
  "16. Bezirk Ottakring",
  "17. Bezirk Hernals",
  "18. Bezirk Währing",
  "19. Bezirk Döbling",
  "20. Bezirk Brigittenau",
  "21. Bezirk Floridsdorf",
  "22. Bezirk Donaustadt",
  "23. Bezirk Liesing",
];

export function DistrictsSeo() {
  const t = useTranslations("districts");

  return (
    <section className="py-14 md:py-16 bg-slate-50 border-t border-navy/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-bold text-navy mb-4 text-center"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-navy/65 text-center text-sm md:text-base mb-8 max-w-2xl mx-auto"
        >
          objekträumung in allen 23 Wiener Bezirken: 1., 2., 3., 4., 5., 6., 7., 8., 9.,
          10., 11., 12., 13., 14., 15., 16., 17., 18., 19., 20., 21., 22., 23. Bezirk.
          Kostenloses Angebot und schnelle Abholung.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2"
        >
          {BEZIRKE.map((bezirk) => (
            <span
              key={bezirk}
              className="px-3 py-1.5 rounded-lg bg-white border border-navy/10 text-sm text-navy/75 shadow-sm"
            >
              {bezirk}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
