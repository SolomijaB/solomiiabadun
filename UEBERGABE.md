# Website-Übergabe an Solomiia Badun

Stand: 30. September 2026. Dieses Paket enthält die vollständigen Projektdateien der bestehenden Website: Quellcode, Bilder, Konfiguration, festgelegte Paketversionen, Tests und Projektdokumentation. Die beim Vorbereiten überprüfte Veröffentlichung beruhte auf Commit `e472993`. Die Übergabe ergänzt eine bisher nicht verwendete Bilddatei und diese Anleitung; Darstellung und Inhalte der Website bleiben gleich.

## Website auf eigenem Hosting einrichten

Die Website verwendet Next.js 16 und Node.js 24. Das Paket ist ein vollständiges Quellprojekt, kein direkt hochladbarer statischer HTML-Export. Ein eigenes GitHub-Konto ist zum Entpacken und Betreiben nicht erforderlich. Der gewählte Hostinganbieter muss eine Next.js-/Node.js-Anwendung unterstützen.

1. ZIP entpacken und ein Terminal im Projektordner öffnen.
2. Node.js 24 mit npm installieren, falls noch nicht vorhanden.
3. Mit `npm ci` die im Paket-Lock festgelegten Abhängigkeiten installieren. Dafür wird eine Internetverbindung benötigt.
4. Mit `npm run build` die Website erstellen.
5. Mit `npm start` den Produktionsserver starten; lokal ist er standardmäßig unter `http://localhost:3000` erreichbar.

Für die Veröffentlichung beim neuen Anbieter: Node.js 24, Installationsbefehl `npm ci`, Build-Befehl `npm run build` und Startbefehl `npm start` verwenden. Der Anbieter muss den dauerhaften Betrieb, HTTPS und die Domainzuordnung einrichten. Bei einem verwalteten Next.js-Hosting dessen Next.js-Voreinstellung verwenden.

Deutsch liegt unter `/`, Englisch unter `/en`. Texte und Bildverweise stehen hauptsächlich in `src/content/site.ts`, Rechtstexte in `src/content/legal.ts`, Bilder in `public/`. Hinweise zur Entwicklung und zu Tests stehen in `README.md`.

## Domain gesondert übernehmen

`solomiiabadun.com` wird separat auf Solomiias eigenes Domainkonto übertragen. Die Übergabe des ZIP allein überträgt weder die Domain noch Hostingverträge.

- Laut Vercel-Hinweis im Screenshot vom 30.09.2026 ist ein Transfer **zu einem anderen Domainanbieter bis 23.10.2026 gesperrt**. Ab diesem Datum muss die tatsächliche Freigabe beim Registrar geprüft werden.
- Die Übertragung innerhalb Vercels auf ein eigenes Konto ist ein separater Vorgang; ihre Durchführbarkeit muss für das konkrete Zielkonto geprüft werden.
- Die Domain ist laut geprüftem Vercel-Stand bis 24.08.2027 registriert. Der derzeit angezeigte Verlängerungspreis beträgt 11,25 US-Dollar jährlich und kann sich ändern.
- Nach der Übernahme müssen Domaininhaber- und Kontaktdaten, Rechnungsdaten, Zahlungsart und automatische Verlängerung auf Solomiia eingerichtet und kontrolliert werden.
- Vor dem Hostingwechsel bestehende DNS-Einträge sichern, anschließend Hauptdomain, `www`, HTTPS und Weiterleitungen prüfen. Den Zeitpunkt zum Beenden der bisherigen Bereitstellung gesondert vereinbaren.

## Formular und Statistik

Das Kontaktformular verwendet FormSubmit direkt aus dem Browser und ist auf `solomiiabadun@outlook.com` eingestellt. Es benötigt in diesem Projekt keinen eigenen API-Schlüssel und keinen eigenen Mailserver. Empfänger-Aktivierung sowie eine echte Zustellung müssen nach der Einrichtung geprüft werden. Automatisierte Tests ersetzen diese Zustellungsprüfung nicht.

Vercel Web Analytics ist nach Statistik-Einwilligung eingebunden. Bei einem anderen Hosting muss die Integration geprüft, angepasst oder entfernt werden. Domainangaben, Impressum und Datenschutz müssen zu den tatsächlich verwendeten Anbietern passen.

## Umfang und Verantwortung

Solomiia organisiert das neue Hosting, Formularbetrieb, Wartung, Updates, Sicherungen und künftige Domainzahlungen selbst. Die bestehenden Unterlagen unter `docs/launch/` dokumentieren noch zu klärende Freigaben und Prüfungen; dieses Paket bestätigt keine zusätzliche rechtliche oder inhaltliche Freigabe.

Nicht enthalten sind persönliche Zugangsdaten, lokale Umgebungsdateien, Git-Verlauf, installierte Abhängigkeiten und temporäre Build-Dateien. Die Abhängigkeiten werden mit `npm ci` installiert und die veröffentlichbare Anwendung mit `npm run build` erzeugt.

Die zusätzliche Datei `public/images/testimonials/lisa-portrait.webp` wird auf der Website nicht verwendet. Die aktuelle Darstellung verwendet `lisa-portrait-v2.webp`.

## Prüfung und bestehender Wartungsbedarf

Am 30.09.2026 wurden mit Node.js 24 die Installation über `npm ci`, Lint, Typprüfung, alle 20 Unit-Tests und der Produktionsbuild erfolgreich ausgeführt. Die deutschen und englischen Live-Seiten waren erreichbar; die verwendeten Testimonialbilder entsprachen den lokalen Dateien. Eine echte Formularzustellung wurde dabei nicht ausgelöst.

Die Paketprüfung `npm audit --omit=dev` meldete im unverändert übernommenen Stand zwei betroffene Produktionspakete: Next.js mit Einstufung **kritisch** und Sharp mit Einstufung **hoch**. Für Next.js wurde Version 16.3.7 als Korrekturversion angeboten, für Sharp ebenfalls ein Fix. Diese Meldungen müssen vor dem neuen produktiven Betrieb geprüft und die Abhängigkeiten mit anschließenden Funktionstests aktualisiert werden. Dieses ZIP bewahrt ausdrücklich den bestehenden Stand und enthält diese Updates noch nicht.

Der Build meldete außerdem ein fehlendes `metadataBase` für Social-Media-Vorschaubilder. Die korrekte öffentliche Basisadresse sollte bei der Einrichtung geprüft werden.
