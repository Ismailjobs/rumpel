"use client";

import Image from "next/image";

type Props = {
  className?: string;
  /** Koyu arka plan (header) için açık renkler */
  variant?: "default" | "light";
  /** Detaylı logoyu kullan (public/logo-full.svg). Dosyayı public klasörüne ekleyin. */
  useFullLogo?: boolean;
};

const FLAG_RED = "#C8102E";
const FLAG_WHITE = "#FFFFFF";

export function Logo({ className = "", variant = "default", useFullLogo = false }: Props) {
  if (useFullLogo) {
    return (
      <Image
        src="/logo-full.svg"
        alt="objekträumung Logo"
        width={220}
        height={40}
        className={className}
        priority
      />
    );
  }

  const primary = variant === "light" ? "#ffffff" : "#353535";
  const accent = variant === "light" ? "#6ba8ab" : "#3c6e71";
  const flagStroke = variant === "light" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.06)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 40"
      width="220"
      height="40"
      role="img"
      aria-label="objekträumung Logo mit österreichischer Flagge"
      className={className}
    >
      <desc>objekträumung – Logo mit österreichischer Flagge und Wortmarke.</desc>

      {/* Avusturya bayrağı – oran 2:3, üç eşit şerit */}
      <g transform="translate(0, 2)">
        <rect x="0" y="0" width="24" height="12" fill={FLAG_RED} />
        <rect x="0" y="12" width="24" height="12" fill={FLAG_WHITE} />
        <rect x="0" y="24" width="24" height="12" fill={FLAG_RED} />
        <rect x="0" y="0" width="24" height="36" fill="none" stroke={flagStroke} strokeWidth="1" />
      </g>

      {/* Wortmarke: objekt + räumung */}
      <text
        x="34"
        y="25"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="19"
        fontWeight="700"
        letterSpacing="-0.01em"
      >
        <tspan fill={primary}>objekt</tspan>
        <tspan fill={accent}>räumung</tspan>
      </text>
    </svg>
  );
}
