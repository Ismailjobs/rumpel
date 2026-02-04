"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, Home } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { PHONE_DISPLAY, PHONE_LINK, WHATSAPP_URL } from "@/lib/constants";
import { routing } from "@/i18n/routing";
import { getServicesByCategory } from "@/lib/serviceList";

const navLinks = [
  { key: "home", href: "/" },
  { key: "services", href: "/services", hasDropdown: true },
  { key: "referenzen", href: "/referenzen" },
  { key: "ueberblick", href: "/ueberblick" },
  { key: "prices", href: "/prices" },
  { key: "impressum", href: "/impressum" },
  { key: "contact", href: "/#contact" },
];

export function Header() {
  const t = useTranslations("nav");
  const tServices = useTranslations("services");
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (!servicesOpen) return;
    const close = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [servicesOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 bg-navy/95 backdrop-blur-sm border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-18">
        <div className="shrink-0 flex items-center min-w-0">
          <Link
            href="/"
            aria-label={t("home")}
            className={`inline-flex items-center justify-center p-1 transition ${
              isActive("/") ? "text-accent" : "text-white/90 hover:text-accent"
            }`}
            onClick={() => setOpen(false)}
          >
            <Home size={28} strokeWidth={2} />
          </Link>
        </div>

        <div className="md:hidden flex-1 flex items-center justify-center min-w-0 pl-2">
          <a
            href={`tel:${PHONE_LINK}`}
            className="inline-flex items-center gap-2 text-white font-medium text-sm whitespace-nowrap hover:text-accent transition -translate-x-2"
          >
            <Phone size={18} />
            {t("callNow")}
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            if (item.key === "services" && "hasDropdown" in item && item.hasDropdown) {
              return (
                <div
                  key="services"
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href="/services"
                    className={`inline-flex items-center gap-1 text-sm font-medium transition ${
                      isActive("/services") ? "text-accent" : "text-white/90 hover:text-accent"
                    }`}
                  >
                    {t("services")}
                    <ChevronDown size={16} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </Link>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-64 py-2 bg-navy border border-white/15 rounded-lg shadow-xl z-50 max-h-[70vh] overflow-y-auto"
                      >
                        <Link
                          href="/services"
                          className="block px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-accent"
                          onClick={() => setServicesOpen(false)}
                        >
                          {t("allServices")}
                        </Link>
                        <div className="border-t border-white/10 my-1" />
                        {getServicesByCategory().map(({ contentKey, services }) => (
                          <div key={contentKey} className="pt-1.5 first:pt-0">
                            <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white/50">
                              {t(`serviceCategories.${contentKey}`)}
                            </p>
                            {services.map(({ slug, titleKey }) => (
                              <Link
                                key={slug}
                                href={`/services/${slug}`}
                                className="block px-4 py-1.5 text-sm text-white/80 hover:bg-white/10 hover:text-accent"
                                onClick={() => setServicesOpen(false)}
                              >
                                {tServices(`${titleKey}.title`)}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            const href = "href" in item ? item.href : "/";
            return (
              <Link
                key={item.key}
                href={href}
                className={`text-sm font-medium transition ${
                  isActive(href) ? "text-accent" : "text-white/90 hover:text-accent"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex rounded overflow-hidden border border-white/20">
            {routing.locales.map((loc) => {
              const path = pathname === "/" ? "" : pathname;
              const href = `/${loc}${path}`;
              return (
                <a
                  key={loc}
                  href={href}
                  className={`px-3 py-1.5 text-sm font-medium transition ${
                    locale === loc
                      ? "bg-accent text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {loc === "at" ? "AT" : "EN"}
                </a>
              );
            })}
          </div>
          <a
            href={`tel:${PHONE_LINK}`}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            <Phone size={18} />
            {t("callNow")}
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <nav className="px-4 py-4 flex flex-col gap-3">
              <Link href="/" onClick={() => setOpen(false)} className="text-white/90 hover:text-accent font-medium py-2">
                {t("home")}
              </Link>
              <div>
                <button
                  type="button"
                  onClick={() => setServicesMobileOpen(!servicesMobileOpen)}
                  className="flex items-center justify-between w-full text-white/90 hover:text-accent font-medium py-2"
                >
                  {t("services")}
                  <ChevronDown size={18} className={`transition-transform ${servicesMobileOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {servicesMobileOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-3 border-l border-white/20 ml-2 mt-1 flex flex-col gap-1"
                    >
                      <Link href="/services" onClick={() => setOpen(false)} className="text-white/80 hover:text-accent py-1.5 text-sm font-medium">
                        {t("allServices")}
                      </Link>
                      {getServicesByCategory().map(({ contentKey, services }) => (
                        <div key={contentKey} className="pt-2 first:pt-0">
                          <p className="text-xs font-semibold uppercase tracking-wider text-white/50 pb-1">
                            {t(`serviceCategories.${contentKey}`)}
                          </p>
                          {services.map(({ slug, titleKey }) => (
                            <Link
                              key={slug}
                              href={`/services/${slug}`}
                              onClick={() => setOpen(false)}
                              className="block text-white/70 hover:text-accent py-1 text-sm"
                            >
                              {tServices(`${titleKey}.title`)}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link href="/referenzen" onClick={() => setOpen(false)} className="text-white/90 hover:text-accent font-medium py-2">
                {t("referenzen")}
              </Link>
              <Link href="/ueberblick" onClick={() => setOpen(false)} className="text-white/90 hover:text-accent font-medium py-2">
                {t("ueberblick")}
              </Link>
              <Link href="/prices" onClick={() => setOpen(false)} className="text-white/90 hover:text-accent font-medium py-2">
                {t("prices")}
              </Link>
              <Link href="/impressum" onClick={() => setOpen(false)} className="text-white/90 hover:text-accent font-medium py-2">
                {t("impressum")}
              </Link>
              <Link href="/#contact" onClick={() => setOpen(false)} className="text-white/90 hover:text-accent font-medium py-2">
                {t("contact")}
              </Link>
              <div className="flex gap-2 pt-2">
                {routing.locales.map((loc) => {
                  const path = pathname === "/" ? "" : pathname;
                  const href = `/${loc}${path}`;
                  return (
                    <a
                      key={loc}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`px-3 py-2 text-sm rounded ${
                        locale === loc
                          ? "bg-accent text-white"
                          : "bg-white/10 text-white border border-white/20"
                      }`}
                    >
                      {loc === "at" ? "AT" : "EN"}
                    </a>
                  );
                })}
              </div>
              <a
                href={`tel:${PHONE_LINK}`}
                className="inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold py-3 rounded-lg mt-2"
                onClick={() => setOpen(false)}
              >
                <Phone size={18} />
                {t("callNow")}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-green-400 font-medium py-2"
                onClick={() => setOpen(false)}
              >
                WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
