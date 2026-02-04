"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ImageIcon, Video, Play } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SERVICES_GALLERY_ITEMS } from "@/components/ServicesPageGallery";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function GalleryCard({
  entry,
  variants,
}: {
  entry: { type: "image" | "video"; src: string };
  variants: { hidden: object; show: object };
}) {
  const t = useTranslations("referenzen");
  const [imgError, setImgError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <motion.figure
      variants={variants}
      className="group rounded-2xl overflow-hidden bg-navy/10 shadow-xl ring-1 ring-white/10 hover:ring-accent/40 transition-all duration-300"
    >
      <div className="relative aspect-[9/16] w-full bg-navy/20 flex items-center justify-center">
        {entry.type === "video" ? (
          videoError ? (
            <div className="flex flex-col items-center gap-3 text-white/40 p-6">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <Video size={32} strokeWidth={1.5} />
              </div>
              <span className="text-sm text-center">{t("addVideoHint")}</span>
            </div>
          ) : (
            <video
              src={entry.src}
              controls
              playsInline
              loop
              muted
              className="w-full h-full max-w-[280px] md:max-w-[320px] object-contain"
              preload="metadata"
              onError={() => setVideoError(true)}
            />
          )
        ) : imgError ? (
          <div className="flex flex-col items-center gap-3 text-white/40 p-6">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <ImageIcon size={32} strokeWidth={1.5} />
            </div>
            <span className="text-sm text-center">{t("addImageHint")}</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.src}
            alt=""
            className="w-full h-full max-w-[280px] md:max-w-[320px] object-contain"
            onError={() => setImgError(true)}
          />
        )}
        {entry.type === "video" && !videoError && (
          <div className="absolute bottom-2 right-2 rounded-full bg-black/50 p-2" aria-hidden>
            <Play size={20} className="text-white" fill="currentColor" />
          </div>
        )}
      </div>
    </motion.figure>
  );
}

export function ReferenzenGallery() {
  const t = useTranslations("referenzen");
  const items = SERVICES_GALLERY_ITEMS;

  if (!items.length) return null;

  return (
    <section className="py-16 md:py-24 bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">
            {t("galleryTitle")}
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white max-w-2xl mx-auto leading-tight">
            {t("gallerySubtitle")}
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8"
        >
          {items.map((entry, i) => (
            <GalleryCard key={`${entry.src}-${i}`} entry={entry} variants={item} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5"
          >
            {t("ctaText")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
