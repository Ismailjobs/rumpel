"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ImageIcon, Video } from "lucide-react";

/**
 * Galeri öğeleri: public/services-gallery/ klasörüne video (ve istersen foto) ekleyip
 * aşağıdaki listeye path ekleyin. Neredeyse hepsi video – dikey (telefon) çekimler için 9:16 oran.
 *
 * Video: { type: "video", src: "/services-gallery/1.mp4" }
 * Foto: { type: "image", src: "/services-gallery/x.jpg" }
 */
export const SERVICES_GALLERY_ITEMS: { type: "image" | "video"; src: string }[] = [
  { type: "video", src: "/services-gallery/1.mp4" },
  { type: "video", src: "/services-gallery/2.mp4" },
  { type: "video", src: "/services-gallery/3.mp4" },
  { type: "video", src: "/services-gallery/4.mp4" },
  { type: "video", src: "/services-gallery/5.mp4" },
  { type: "video", src: "/services-gallery/6.mp4" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function GalleryItem({
  entry,
  variants,
}: {
  entry: { type: "image" | "video"; src: string };
  variants: { hidden: object; show: object };
}) {
  const [imgError, setImgError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <motion.figure
      variants={variants}
      className="rounded-xl overflow-hidden bg-white shadow-md ring-1 ring-navy/5"
    >
      <div className="relative aspect-[9/16] w-full bg-navy/5 flex items-center justify-center">
        {entry.type === "video" ? (
          videoError ? (
            <div className="flex flex-col items-center gap-2 text-navy/40 p-4">
              <Video size={40} strokeWidth={1.5} />
              <span className="text-xs text-center">Video hinzufügen</span>
            </div>
          ) : (
            <video
              src={entry.src}
              controls
              playsInline
              loop
              muted
              className="w-full h-full max-w-[320px] object-contain"
              preload="metadata"
              onError={() => setVideoError(true)}
            />
          )
        ) : imgError ? (
          <div className="flex flex-col items-center gap-2 text-navy/40 p-4">
            <ImageIcon size={40} strokeWidth={1.5} />
            <span className="text-xs text-center">Bild hinzufügen</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.src}
            alt=""
            className="w-full h-full max-w-[320px] object-contain"
            onError={() => setImgError(true)}
          />
        )}
      </div>
    </motion.figure>
  );
}

export function ServicesPageGallery() {
  const t = useTranslations("services");
  const items = SERVICES_GALLERY_ITEMS;

  if (!items.length) return null;

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-t border-navy/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-navy">
            {t("gallerySectionTitle")}
          </h2>
          <p className="mt-2 text-navy/70 max-w-xl mx-auto">
            {t("gallerySectionSubtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {items.map((entry, i) => (
            <GalleryItem key={`${entry.src}-${i}`} entry={entry} variants={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
