import type { Metadata } from "next";
import Link from "next/link";

import { ConsentSettingsButton } from "@/components/consent";
import type { LegalPageContent } from "@/content/legal";
import { siteConfig } from "@/content/site";

import styles from "./LegalPage.module.css";

interface LegalPageProps {
  content: LegalPageContent;
}

export function createLegalMetadata(content: LegalPageContent): Metadata {
  const alternateLanguage = content.locale === "de" ? "en" : "de-AT";
  const canonical = `${siteConfig.url}${content.path}`;
  const socialImage = `${siteConfig.url}/opengraph-image`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical,
      languages: {
        [content.htmlLang]: `${siteConfig.url}${content.path}`,
        [alternateLanguage]: `${siteConfig.url}${content.alternatePath}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: content.meta.title,
      description: content.meta.description,
      url: canonical,
      images: [{ url: socialImage, width: 1200, height: 630, alt: `${siteConfig.name} – ${siteConfig.descriptor}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: [socialImage],
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

export function LegalPage({ content }: LegalPageProps) {
  return (
    <div className={styles.page} lang={content.htmlLang}>
      <a className={styles.skipLink} href="#legal-content">
        {content.locale === "de" ? "Zum Inhalt springen" : "Skip to content"}
      </a>

      <header className={styles.header}>
        <Link className={styles.brand} href={content.homePath}>
          <span className={styles.brandName}>{siteConfig.name}</span>
          <span className={styles.brandDescriptor}>{siteConfig.descriptor}</span>
        </Link>

        <nav
          aria-label={content.locale === "de" ? "Seitennavigation" : "Page navigation"}
          className={styles.headerLinks}
        >
          <Link href={content.homePath}>{content.homeLabel}</Link>
          <Link href={content.alternatePath} hrefLang={content.locale === "de" ? "en" : "de-AT"}>
            {content.alternateLabel}
          </Link>
        </nav>
      </header>

      <main className={styles.main} id="legal-content">
        <article className={styles.article}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className={styles.lead}>{content.intro}</p>
            <p className={styles.date}>
              {content.lastUpdatedLabel}: <time dateTime="2026-08-25">{content.lastUpdated}</time>
            </p>
          </div>

          <div className={styles.sections}>
            {content.sections.map((section, index) => {
              const headingId = `${section.id}-heading`;

              return (
                <section aria-labelledby={headingId} className={styles.section} id={section.id} key={section.id}>
                  <div className={styles.sectionNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className={styles.sectionBody}>
                    <h2 id={headingId}>{section.title}</h2>

                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.facts ? (
                      <dl className={styles.facts}>
                        {section.facts.map((fact) => (
                          <div className={styles.fact} key={fact.label}>
                            <dt>{fact.label}</dt>
                            <dd>
                              {fact.href ? <a href={fact.href}>{fact.value}</a> : fact.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}

                    {section.bullets ? (
                      <ul className={styles.list}>
                        {section.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}

                    {section.links ? (
                      <div className={styles.resources}>
                        {section.links.map((link) => (
                          <a
                            href={link.href}
                            key={link.href}
                            rel={link.external ? "noreferrer" : undefined}
                            target={link.external ? "_blank" : undefined}
                          >
                            {link.label}
                            {link.external ? (
                              <span className={styles.visuallyHidden}>
                                {content.locale === "de"
                                  ? " (öffnet in einem neuen Tab)"
                                  : " (opens in a new tab)"}
                              </span>
                            ) : null}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </section>
              );
            })}
          </div>
        </article>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        <nav aria-label={content.locale === "de" ? "Rechtliches" : "Legal"}>
          <Link href={content.relatedPage.href}>{content.relatedPage.label}</Link>
          <ConsentSettingsButton locale={content.locale}>
            {content.locale === "de" ? "Datenschutz-Einstellungen" : "Privacy settings"}
          </ConsentSettingsButton>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </nav>
      </footer>
    </div>
  );
}
