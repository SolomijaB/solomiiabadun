import type { Metadata } from "next";
import Link from "next/link";

import { RootDocument } from "@/components/root-document";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `Seite nicht gefunden | ${siteConfig.name}`,
  description: "Die gesuchte Seite ist nicht verfügbar. Zurück zur Website von Solomiia Badun.",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <RootDocument lang="de-AT">
      <main id="main" className="not-found-page">
        <div className="shell not-found-page__inner">
          <p className="eyebrow">404 · Seite nicht gefunden</p>
          <h1>Hier geht es nicht weiter. Zurück zu deiner Stärke.</h1>
          <p>Die gesuchte Seite existiert nicht oder wurde verschoben.</p>
          <Link className="button button--peach" href="/">
            Zur Startseite
          </Link>
        </div>
      </main>
    </RootDocument>
  );
}
