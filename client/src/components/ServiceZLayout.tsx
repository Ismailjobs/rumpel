"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ServiceTheme } from "@/lib/serviceThemes";
import { getImageFolder } from "@/lib/serviceList";

// Nur deine Bilder: content-1.jpg / content-2.jpg – kein Fallback. Native <img> damit 404 keine Next-Image-Fehler loggt.
type Props = {
  body1: string;
  body2: string;
  slug: string;
  theme: ServiceTheme;
};

export function ServiceZLayout({ body1, body2, slug, theme }: Props) {
  const imageFolder = getImageFolder(slug);
  const content1 = `/services/${imageFolder}/content-1.jpg`;
  const content2 = `/services/${imageFolder}/content-2.jpg`;
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 ${theme.zLayoutBg}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        {show1 ? (
          <div className={`relative aspect-[4/3] rounded-xl overflow-hidden ${theme.imageRing}`}>
            <img
              src={content1}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setShow1(false)}
            />
          </div>
        ) : (
          <div className="hidden md:block aspect-[4/3]" aria-hidden />
        )}
        <div>
          <p className={`text-lg leading-relaxed ${theme.textColor}`}>{body1}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-12 md:mt-16"
      >
        <div className="order-2 md:order-1">
          <p className={`text-lg leading-relaxed ${theme.textColor}`}>{body2}</p>
        </div>
        {show2 ? (
          <div className={`relative aspect-[4/3] rounded-xl overflow-hidden order-1 md:order-2 ${theme.imageRing}`}>
            <img
              src={content2}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setShow2(false)}
            />
          </div>
        ) : (
          <div className="hidden md:block aspect-[4/3] order-1 md:order-2" aria-hidden />
        )}
      </motion.div>
    </div>
  );
}
