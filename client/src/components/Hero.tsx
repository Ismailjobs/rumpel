"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FileText, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { WHATSAPP_URL } from "@/lib/constants";

// Slider fotoğrafları: client/public/ içine hero-1.jpg … hero-6.jpg koyun (bkz. public/hero-slideshow.md).
const HERO_IMAGES = ["/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg", "/hero-4.jpg", "/hero-5.jpg", "/hero-6.jpg"];
const N = HERO_IMAGES.length;
const CROSSFADE_DURATION_MS = 2000;
const SLIDE_INTERVAL_MS = 5000;

export function Hero() {
  const t = useTranslations("hero");
  const [slide, setSlide] = useState({ visible: 0, i0: 0, i1: 1 });

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((prev) =>
        prev.visible === 0
          ? { ...prev, visible: 1, i1: (prev.i0 + 1) % N }
          : { ...prev, visible: 0, i0: (prev.i1 + 1) % N }
      );
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    HERO_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const transitionStyle = {
    transition: `opacity ${CROSSFADE_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  };

  return (
    <section className="relative min-h-[70vh] sm:min-h-[75vh] flex items-end md:items-center overflow-hidden bg-navy">
      {/* Fade-out yapan katmanın resmi değişmez; sadece fade-in yapan güncellenir */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${HERO_IMAGES[slide.i0]})`,
          opacity: slide.visible === 0 ? 0.65 : 0,
          filter: "blur(2px)",
          ...transitionStyle,
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${HERO_IMAGES[slide.i1]})`,
          opacity: slide.visible === 1 ? 0.65 : 0,
          filter: "blur(2px)",
          ...transitionStyle,
        }}
      />
      {/* Overlay: daha şeffaf – resimler daha görünür */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-navy/50 to-navy/40 md:from-navy/58 md:via-navy/48 md:to-navy/36" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent md:from-navy/40 md:via-transparent md:to-transparent" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-20 md:pb-24 pt-12 md:pt-14">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent text-white text-sm font-semibold tracking-wide mb-6 shadow-md"
          >
            {t("badge")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-[0.02em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] [text-shadow:0_1px_0_rgba(255,255,255,0.1)]"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-accent/25 hover:shadow-accent/30 transition-all hover:-translate-y-0.5"
            >
              <FileText size={22} strokeWidth={2.5} />
              {t("ctaOffer")}
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg border-2 border-white/25 backdrop-blur-sm transition-all"
            >
              <MessageCircle size={22} strokeWidth={2.5} />
              {t("ctaWhatsApp")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 z-10" />
    </section>
  );
}
