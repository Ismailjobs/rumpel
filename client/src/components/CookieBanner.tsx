"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

const STORAGE_KEY = "objektraeumung_cookie_banner_seen";

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) setVisible(true);
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("message")}
      className="fixed bottom-0 left-0 right-0 z-[100] bg-navy text-white shadow-[0_-4px_20px_rgba(0,0,0,0.2)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm sm:text-base text-white/95">
          {t("message")}
        </p>
        <button
          type="button"
          onClick={handleClose}
          className="shrink-0 inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          <X size={18} />
          {t("close")}
        </button>
      </div>
    </div>
  );
}
