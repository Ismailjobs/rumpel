"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { PHONE_LINK, WHATSAPP_URL } from "@/lib/constants";

export function FloatingCta() {
  const t = useTranslations("nav");

  return (
    <>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-20 h-20 md:w-14 md:h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all hover:scale-105"
        aria-label="WhatsApp Chat"
      >
        <MessageCircle className="w-11 h-11 md:w-7 md:h-7" />
      </a>
      {/* Mobile only: phone icon bottom-left, expands to show "Jetzt anrufen" on hover/focus */}
      <a
        href={`tel:${PHONE_LINK}`}
        className="fixed bottom-6 left-6 z-50 md:hidden group flex items-center rounded-full overflow-hidden bg-accent hover:bg-accent-hover text-white shadow-lg transition-all"
        aria-label={t("callNow")}
      >
        <span className="flex items-center justify-center w-20 h-20 shrink-0">
          <Phone className="w-11 h-11" />
        </span>
        <span className="max-w-0 group-hover:max-w-[10rem] group-focus:max-w-[10rem] overflow-hidden whitespace-nowrap pr-0 group-hover:pr-4 group-focus:pr-4 font-semibold transition-all duration-200">
          {t("callNow")}
        </span>
      </a>
    </>
  );
}
