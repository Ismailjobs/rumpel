"use client";

import { useEffect } from "react";

/** Injects favicon link into document.head so it always appears (workaround for metadata not emitting it). */
export function FaviconHead() {
  useEffect(() => {
    const href = `${typeof window !== "undefined" ? window.location.origin : ""}/favicon.ico`;
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.setAttribute("href", href);
      link.setAttribute("type", "image/x-icon");
      document.head.appendChild(link);
    } else {
      link.href = href;
    }
  }, []);
  return null;
}
