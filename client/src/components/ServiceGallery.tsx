"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Resim yoksa kullanılacak varsayılan (public/services/{key}/gallery-1.jpg vb. bkz. public/services/README.md)
const FALLBACK_GALLERY = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
];

const GALLERY_COUNT = 3;

type Props = {
  galleryTitle: string;
  captions: string[];
  serviceKey: string;
};

export function ServiceGallery({ galleryTitle, captions, serviceKey }: Props) {
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  const getSrc = (i: number) =>
    failed[i]
      ? FALLBACK_GALLERY[i]
      : `/services/${serviceKey}/gallery-${i + 1}.jpg`;

  return (
    <section className="py-12 md:py-16 bg-slate-50 border-t border-navy/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-navy text-center mb-8"
        >
          {galleryTitle}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {Array.from({ length: GALLERY_COUNT }).map((_, i) => (
            <figure key={i} className="rounded-xl overflow-hidden bg-white shadow-md">
              <div className="relative aspect-[4/3]">
                <Image
                  src={getSrc(i)}
                  alt={captions[i] ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  onError={() => setFailed((prev) => ({ ...prev, [i]: true }))}
                />
              </div>
              <figcaption className="p-3 text-sm text-navy/80 text-center">
                {captions[i] ?? ""}
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
