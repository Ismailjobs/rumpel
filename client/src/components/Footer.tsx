"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, MessageCircle, Mail, MapPin, ArrowRight } from "lucide-react";
import { PHONE_DISPLAY, PHONE_LINK, WHATSAPP_URL, EMAIL, ADDRESS } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-navy text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* 1) Marke / Objekträumung */}
          <div>
            <h3 className="font-bold text-lg text-white">{t("tagline")}</h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-xs">
              {t("shortDesc")}
            </p>
          </div>

          {/* 2) Navigation */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              {t("navTitle")}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors">
                <ArrowRight size={14} className="opacity-70" />
                {tNav("home")}
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors">
                <ArrowRight size={14} className="opacity-70" />
                {tNav("services")}
              </Link>
              <Link href="/referenzen" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors">
                <ArrowRight size={14} className="opacity-70" />
                {tNav("referenzen")}
              </Link>
              <Link href="/ueberblick" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors">
                <ArrowRight size={14} className="opacity-70" />
                {tNav("ueberblick")}
              </Link>
              <Link href="/prices" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors">
                <ArrowRight size={14} className="opacity-70" />
                {tNav("prices")}
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors">
                <ArrowRight size={14} className="opacity-70" />
                {tNav("about")}
              </Link>
              <Link href="/#contact" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors">
                <ArrowRight size={14} className="opacity-70" />
                {tNav("contact")}
              </Link>
            </nav>
          </div>

          {/* 3) Rechtliches */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              {tNav("sectionLegal")}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/impressum" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors">
                <ArrowRight size={14} className="opacity-70" />
                {tNav("impressum")}
              </Link>
            </nav>
          </div>

          {/* 4) Kontakt */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              {t("contactTitle")}
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a
                  href={`tel:${PHONE_LINK}`}
                  className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Phone size={16} className="shrink-0 text-accent/80" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <MessageCircle size={16} className="shrink-0 text-green-400" />
                  <span>{t("whatsapp")}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 hover:text-accent transition-colors break-all"
                >
                  <Mail size={16} className="shrink-0 text-accent/80" />
                  <span>{EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="shrink-0 text-accent/80 mt-0.5" />
                <span>{ADDRESS}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            {t("rights")}
            {" · "}
            <Link href="/impressum" className="text-white/70 hover:text-accent transition-colors">
              {tNav("impressum")}
            </Link>
          </p>
          <p className="text-sm text-white/50">{t("tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
