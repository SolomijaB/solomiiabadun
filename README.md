# Solomiia Badun — Strength Coach for Women

Zweisprachige Markenwebsite für Solomiia Badun. Die Marketingseite ist unter `/` auf Deutsch und unter `/en` auf Englisch verfügbar. Impressum und Datenschutz sind separate Routen.

## Lokal starten

Voraussetzung: Node.js 24 und npm.

```bash
npm install
npm run dev
```

Qualitätsprüfung:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run lighthouse
```

## Kontaktformular lokal testen

Das Formular übermittelt die Angaben direkt aus dem Browser per AJAX an FormSubmit. Als robuster Fallback besitzt es zusätzlich eine native FormSubmit-`action`. `_subject` setzt den Betreff der Benachrichtigung, `_template` wählt die Tabellendarstellung und das versteckte Feld `_honey` dient als Spam-Falle.

Der Empfänger ist fest auf die im Impressum hinterlegte Adresse `solomiiabadun@outlook.com` gesetzt. Für FormSubmit sind weder ein eigener API-Endpunkt noch lokale oder in Vercel hinterlegte Umgebungsvariablen erforderlich.

Die erste echte Einsendung löst bei FormSubmit eine Aktivierungs-E-Mail an dieses Empfängerpostfach aus. Erst nach deren Bestätigung ist die Weiterleitung aktiviert; anschließend muss eine weitere echte Testanfrage nachweislich zugestellt werden. Die automatisierten lokalen Tests fangen FormSubmit-Anfragen ab und senden keine reale Nachricht. Ein manuelles Absenden in der lokalen Vorschau ist deshalb nur für den ausdrücklich beabsichtigten Aktivierungs- oder Zustellungstest vorgesehen.

## Vorläufige Veröffentlichung und offene Grenzen

- Die vorläufige öffentliche Bereitstellung wurde am 25. August 2026 ausdrücklich angeordnet und ist unter `docs/launch/vorabveroeffentlichung.md` dokumentiert.
- Die Trainings- und Testimonialmotive unter `public/images/` sind KI-generierte Entwurfsbilder. Ihre finale Verwendung oder ihr Ersatz durch freigegebene Originalfotos bleibt ein Launch-Gate.
- Die von Florian bereitgestellten Testimonials von Diana, Lisa und Flo sind in der Vorabfassung eingebaut. Für die vollständige Launch-Freigabe müssen Wortlaut, Namensnennung und Übersetzungen schriftlich freigegeben sein.
- EVO Fitness wird nicht genannt, solange keine schriftliche Partnerfreigabe vorliegt.
- Der Kontaktformular-Versand muss mit aktiviertem FormSubmit-Empfänger und einer echten Testzustellung freigegeben werden.
- `npm run validate:launch` bleibt absichtlich rot, bis alle rechtlichen und markenbezogenen Freigaben vorliegen.
- Die automatisch vektorisierte Logoauswahl liegt unter `public/brand/`; alle drei KI-Entwürfe und ihre Prompt-Dokumentation bleiben nachvollziehbar im Repository.

## Cloudflare Pages-Konfiguration

Die Website wird als statischer Export gebaut (`output: "export"` in `next.config.ts`). `npm run build` erzeugt das vollständige Deployment-Verzeichnis `out/`, das direkt auf Cloudflare Pages veröffentlicht werden kann.

- Framework-Preset: Next.js (Static Export)
- Build command: `npm run build`
- Build output directory: `out`
- Node.js-Version: `24` (wird über die Datei `.node-version` im Projektstamm gesteuert)
- Der Redirect `/home` → `/` läuft über die Datei `public/_redirects` im Cloudflare-Pages-`_redirects`-Format
- Messung: Vercel Web Analytics läuft als clientseitiges Skript auch auf Cloudflare Pages, ausschließlich nach Statistik-Einwilligung
- E-Mail-Versand: FormSubmit, direkte AJAX-Übermittlung mit nativem Formular-Fallback; Empfänger laut Impressum

FormSubmit benötigt keine Umgebungsvariablen; Empfänger-Aktivierung und echte Testzustellung bleiben ein separater Prüfschritt. Die Search-Console-Einreichung erfolgt anschließend separat.
