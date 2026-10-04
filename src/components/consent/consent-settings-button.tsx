"use client";

import type { ReactNode } from "react";

import type { Locale } from "@/content/site";
import { requestConsentSettings } from "@/lib/consent";

interface ConsentSettingsButtonProps {
  locale?: Locale;
  className?: string;
  children?: ReactNode;
}

const defaultLabels: Record<Locale, string> = {
  de: "Datenschutz-Einstellungen",
  en: "Privacy settings",
};

export function ConsentSettingsButton({
  locale = "de",
  className,
  children,
}: ConsentSettingsButtonProps) {
  const classes = ["consent-settings-button", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      onClick={(event) => requestConsentSettings(event.currentTarget)}
    >
      {children ?? defaultLabels[locale]}
    </button>
  );
}
