"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";
import { PHONE_LINK, WHATSAPP_URL } from "@/lib/constants";

const MOBILE_EXPAND_AUTO_CLOSE_MS = 2500;

export function FloatingCta() {
  const t = useTranslations("nav");
  const [mobilePhoneExpanded, setMobilePhoneExpanded] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setMobilePhoneExpanded(false);
      closeTimerRef.current = null;
    }, MOBILE_EXPAND_AUTO_CLOSE_MS);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setMobilePhoneExpanded(false);
        cancelClose();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

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
      {/* Mobile only: phone bottom-left, expands on tap and auto-closes after delay or tap outside */}
      <div ref={wrapRef} className="fixed bottom-6 left-6 z-50 md:hidden">
        <a
          href={`tel:${PHONE_LINK}`}
          className="group flex items-center rounded-full overflow-hidden bg-accent hover:bg-accent-hover text-white shadow-lg transition-all"
          aria-label={t("callNow")}
          onClick={() => {
            setMobilePhoneExpanded(true);
            scheduleClose();
          }}
          onBlur={() => cancelClose()}
          onFocus={() => {
            setMobilePhoneExpanded(true);
            scheduleClose();
          }}
        >
          <span className="flex items-center justify-center w-20 h-20 shrink-0">
            <Phone className="w-11 h-11" />
          </span>
          <span
            className={`overflow-hidden whitespace-nowrap font-semibold transition-all duration-200 md:max-w-0 md:pr-0 md:group-hover:max-w-[10rem] md:group-hover:pr-4 md:group-focus:max-w-[10rem] md:group-focus:pr-4 ${
              mobilePhoneExpanded ? "max-w-[10rem] pr-4" : "max-w-0 pr-0"
            }`}
          >
            {t("callNow")}
          </span>
        </a>
      </div>
    </>
  );
}
