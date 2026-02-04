"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

type ReviewItem = { name: string; text: string; timeAgo: string };

const ROTATE_INTERVAL_MS = 4500;

export function HeroGoogleReviews() {
  const t = useTranslations("heroGoogleReviews");
  const items = t.raw("items") as ReviewItem[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items?.length) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [items?.length]);

  if (!items?.length) return null;

  const review = items[index];

  return (
    <section className="py-8 md:py-10 bg-navy/40 border-y border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
          {t("title")}
        </p>
        <div className="relative min-h-[140px] md:min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 p-5 md:p-6 max-w-2xl"
            >
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" strokeWidth={1.5} />
                ))}
              </div>
              <p className="text-white/95 text-base md:text-lg leading-relaxed mb-4">
                „{review.text}"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-semibold text-white">{review.name}</span>
                <span className="text-sm text-white/60">{review.timeAgo}</span>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={i === index ? t("ariaCurrent") : t("ariaReview", { n: i + 1 })}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-accent" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
