"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LocaleLangSync() {
  const pathname = usePathname();
  useEffect(() => {
    const segment = pathname?.split("/")[1] ?? "at";
    const lang = segment === "en" ? "en" : "de";
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [pathname]);
  return null;
}
