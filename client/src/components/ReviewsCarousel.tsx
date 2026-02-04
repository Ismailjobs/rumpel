"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

type ReviewItem = { name: string; text: string; location: string };

export function ReviewsCarousel() {
  const t = useTranslations("reviews");
  const items = t.raw("items") as ReviewItem[];

  if (!items?.length) return null;

  return (
    <section className="py-16 md:py-20 bg-navy overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <span className="text-sm font-semibold text-accent uppercase tracking-wider">
          {t("subtitle")}
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">
          {t("title")}
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div className="flex gap-6 md:gap-8 w-max animate-reviews-scroll">
            {[...items, ...items].map((review, i) => (
              <article
                key={`${review.name}-${i}`}
                className="flex-shrink-0 w-[320px] md:w-[380px] rounded-xl bg-white/10 border border-white/15 p-6 md:p-7 backdrop-blur-sm"
              >
                <Quote className="text-accent/70 w-8 h-8 mb-4" strokeWidth={1.5} />
                <p className="text-white/95 text-base md:text-lg leading-relaxed mb-4">
                  „{review.text}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{review.name}</span>
                  <span className="text-sm text-white/60">{review.location}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
