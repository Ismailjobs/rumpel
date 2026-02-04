"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Phone, FileText, Truck, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { PHONE_DISPLAY, PHONE_LINK } from "@/lib/constants";

const STEPS = [
  { key: "step1", icon: Phone },
  { key: "step2", icon: FileText },
  { key: "step3", icon: Truck },
  { key: "step4", icon: CheckCircle },
] as const;

const STEP_IMAGES = [
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
];

const SLIDE_INTERVAL_MS = 5000;

export function HowItWorksSection() {
  const t = useTranslations("process");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % STEPS.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const current = STEPS[step];
  const Icon = current.icon;

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Accent diagonal – bottom right */}
      <div
        className="absolute bottom-0 right-0 w-[80%] md:w-[55%] h-[40%] md:h-[70%] bg-accent/10 -skew-y-12 skew-x-12 origin-bottom-right pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t("sectionLabel")}
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-bold text-navy">
            {t("title")}
          </h2>
          <p className="mt-4 text-navy/70 max-w-2xl mx-auto leading-relaxed">
            {t("intro")}
          </p>
        </motion.div>

        {/* Step icons – clickable */}
        <div className="flex justify-center gap-4 md:gap-6 mb-8">
          {STEPS.map(({ key, icon: StepIcon }, i) => (
            <button
              key={key}
              type="button"
              onClick={() => setStep(i)}
              className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border-2 transition-all ${
                i === step
                  ? "bg-accent border-accent text-white shadow-lg shadow-accent/25"
                  : "bg-white border-navy/15 text-navy/50 hover:border-accent/40 hover:text-accent"
              }`}
              aria-label={t(`${key}.title`)}
              aria-current={i === step ? "step" : undefined}
            >
              <StepIcon size={22} strokeWidth={2} className="md:w-6 md:h-6" />
            </button>
          ))}
        </div>

        {/* Slider – image left, content right */}
        <motion.div
          layout
          className="relative bg-white rounded-2xl shadow-xl border border-navy/5 overflow-hidden"
        >
          <div className="grid md:grid-cols-2 min-h-[320px] md:min-h-[380px]">
            {/* Left: image */}
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px] bg-navy/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={step}
                  src={STEP_IMAGES[step]}
                  alt=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Right: step content */}
            <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                >
                  <span className="text-sm font-bold text-accent uppercase tracking-wider">
                    {t("stepLabel")} {step + 1}
                  </span>
                  <h3 className="mt-1 text-xl md:text-2xl font-bold text-navy">
                    {t(`${current.key}.title`)}
                  </h3>
                  <p className="mt-3 text-navy/75 leading-relaxed">
                    {t(`${current.key}.desc`)}
                  </p>
                  <a
                    href={`tel:${PHONE_LINK}`}
                    className="mt-4 text-navy font-semibold hover:text-accent transition-colors"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <Link
                    href="#contact"
                    className="mt-6 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-6 py-3 rounded-xl text-base shadow-lg shadow-accent/20 transition-all w-fit"
                  >
                    <Icon size={20} strokeWidth={2.5} />
                    {t("ctaQuote")}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={() => setStep((s) => (s - 1 + STEPS.length) % STEPS.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md border border-navy/10 flex items-center justify-center text-navy hover:bg-accent hover:text-white transition-colors z-20"
            aria-label="Previous step"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => (s + 1) % STEPS.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md border border-navy/10 flex items-center justify-center text-navy hover:bg-accent hover:text-white transition-colors z-20"
            aria-label="Next step"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {STEPS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStep(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === step ? "bg-accent w-8" : "bg-navy/20 hover:bg-navy/40"
              }`}
              aria-label={t(`${STEPS[i].key}.title`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
