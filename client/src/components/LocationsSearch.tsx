"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Search, MapPin, X } from "lucide-react";
import { LOCATIONS, getSearchIndex } from "@/lib/locationsData";
import type { StateKey } from "@/lib/locationsData";

const MIN_QUERY_LENGTH = 2;
const MAX_RESULTS = 8;

type SearchHit = {
  slug: string;
  title: string;
  desc: string;
  stateKey: StateKey;
};

export function LocationsSearch({
  locale,
  stateNames,
}: {
  locale: string;
  stateNames: Record<string, string>;
}) {
  const t = useTranslations("locations");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const index = getSearchIndex(locale === "de" ? "de" : "en");

  const hits: SearchHit[] =
    query.length >= MIN_QUERY_LENGTH
      ? index
          .filter(
            (item) =>
              item.title.toLowerCase().includes(query.toLowerCase().trim()) ||
              (item.desc && item.desc.toLowerCase().includes(query.toLowerCase().trim())) ||
              item.slug.toLowerCase().includes(query.toLowerCase().trim())
          )
          .slice(0, MAX_RESULTS)
          .map((item) => ({
            slug: item.slug,
            title: item.title,
            desc: item.desc,
            stateKey: item.stateKey,
          }))
      : [];

  const showDropdown = open && (focused || query.length >= MIN_QUERY_LENGTH);

  useEffect(() => {
    if (!showDropdown) return;
    const close = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [showDropdown]);

  const handleSelect = (slug: string) => {
    setQuery("");
    setOpen(false);
    router.push(`/locations/${slug}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <label htmlFor="locations-search" className="sr-only">
        {t("searchPlaceholder")}
      </label>
      <div className="relative flex items-center">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none"
          size={20}
          strokeWidth={2}
        />
        <input
          id="locations-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setFocused(true);
            if (query.length >= MIN_QUERY_LENGTH) setOpen(true);
          }}
          onBlur={() => setFocused(false)}
          placeholder={t("searchPlaceholder")}
          className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-navy/15 bg-white text-navy placeholder:text-navy/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          autoComplete="off"
          aria-expanded={showDropdown}
          aria-controls="locations-search-results"
          aria-autocomplete="list"
          role="combobox"
          aria-label={t("searchPlaceholder")}
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-navy/50 hover:text-navy hover:bg-navy/5 transition-colors"
            aria-label={t("searchNoResults")}
          >
            <X size={18} strokeWidth={2} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          id="locations-search-results"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 py-2 bg-white rounded-xl border-2 border-navy/15 shadow-xl z-50 max-h-[320px] overflow-y-auto"
        >
          {hits.length === 0 ? (
            <div className="px-4 py-6 text-center text-navy/60 text-sm">
              {t("searchNoResults")}
            </div>
          ) : (
            <ul className="py-1">
              {hits.map((hit) => (
                <li key={hit.slug} role="option">
                  <button
                    type="button"
                    onClick={() => handleSelect(hit.slug)}
                    className="w-full px-4 py-3 text-left flex items-start gap-3 hover:bg-navy/5 transition-colors focus:bg-navy/5 focus:outline-none"
                  >
                    <MapPin size={18} className="text-accent shrink-0 mt-0.5" strokeWidth={2} />
                    <div className="min-w-0">
                      <span className="font-semibold text-navy block truncate">{hit.title}</span>
                      {hit.desc && (
                        <span className="text-sm text-navy/60 block truncate">{hit.desc}</span>
                      )}
                      <span className="text-xs text-navy/50 mt-0.5 block">
                        {stateNames[hit.stateKey] ?? hit.stateKey}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
