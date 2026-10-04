"use client";

import Link from "next/link";
import { IconMenu2, IconSend, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import type { LocalizedSiteCopy } from "@/content/site";
import { siteConfig } from "@/content/site";
import { BrandLogo } from "./brand-logo";

export function SiteHeader({ copy }: { copy: LocalizedSiteCopy }) {
  const [open, setOpen] = useState(false);
  const contactHref = `#${copy.contact.id}`;

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
  }, [copy.htmlLang]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="site-header" data-open={open || undefined}>
      <div className="site-header__inner shell">
        <Link href={copy.path} className="site-header__brand" aria-label={`${siteConfig.name} – Startseite`}>
          <BrandLogo compact priority />
        </Link>

        <nav className="site-header__desktop-nav" aria-label={copy.locale === "de" ? "Hauptnavigation" : "Main navigation"}>
          {copy.navigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link className="language-link" href={copy.alternatePath} hrefLang={copy.locale === "de" ? "en" : "de-AT"}>
            {copy.locale === "de" ? "EN" : "DE"}
          </Link>
          <a className="button button--small button--dark site-header__cta" href={contactHref}>
            <IconSend aria-hidden="true" size={16} stroke={1.7} />
            <span>{copy.navCta}</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? copy.menuClose : copy.menuOpen}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <IconX aria-hidden="true" /> : <IconMenu2 aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className="mobile-navigation" id="mobile-navigation" hidden={!open}>
        <nav aria-label={copy.locale === "de" ? "Mobile Navigation" : "Mobile navigation"}>
          {copy.navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a href={contactHref} onClick={() => setOpen(false)}>{copy.hero.primaryCta}</a>
        </nav>
      </div>
    </header>
  );
}
