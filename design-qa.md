# Design QA — Solomiia Badun Onepager

Stand: 25. August 2026
Prüfstatus: lokal geprüfte Entwicklungsfassung; vorläufig öffentlich bereitgestellt, formale Launch-Gates weiterhin offen

## Visuelle Quellen und Abgleich

Verbindliche Gestaltungsquelle bleibt das unveränderte CI-Board:

- CI-Referenz: [`docs/brand/solomiia-badun-ci-board-original.png`](docs/brand/solomiia-badun-ci-board-original.png)
- Desktop-Gesamtansicht: [`docs/qa/home-desktop-1440.png`](docs/qa/home-desktop-1440.png)
- Mobile-Gesamtansicht: [`docs/qa/home-mobile-430.png`](docs/qa/home-mobile-430.png)

Für die Browser-Anmerkungen vom 25. August wurde der betroffene Prozessbereich als gemeinsamer Vorher-/Nachher-Vergleich beurteilt:

- Vergleich: [`docs/qa/process-before-after.png`](docs/qa/process-before-after.png)
- Detailansicht Prozess: [`docs/qa/process-v2-1309.png`](docs/qa/process-v2-1309.png)
- Ich-Form im Über-mich-Bereich: [`docs/qa/about-ich-form-1309.png`](docs/qa/about-ich-form-1309.png)
- Seitenfluss ohne erfundene Stimmen: [`docs/qa/flow-without-testimonials-1309.png`](docs/qa/flow-without-testimonials-1309.png)
- Vereinfachter Abschluss: [`docs/qa/footer-single-line-1309.png`](docs/qa/footer-single-line-1309.png)

Der Vorher-/Nachher-Vergleich wurde wegen des Browser-Zoomfaktors von 1,1 auf dieselbe sichtbare Fläche von 1190 × 827 CSS-Pixeln normalisiert. Links steht der vorherige Ring-Entwurf mit Bildlabel und Zitatkarte, rechts die korrigierte Fassung mit einer klaren Coaching-Szene ohne überlagerte Entwurfstexte.

## Befunde und Korrekturen

### P0

Keine offenen P0-Befunde.

### P1

Alle P1-Befunde wurden behoben:

- Erfundenen Beispielstimmen wurde jede Möglichkeit genommen, wie echte Referenzen zu wirken: Sektion und lokale Beispieldaten wurden vollständig entfernt. Sie darf erst mit echten, schriftlich freigegebenen Aussagen zurückkehren.
- Das unpassende Ringbild im Prozessbereich wurde durch eine CI-konforme, lokal gespeicherte KI-Entwurfsszene mit zwei erwachsenen Frauen im Kettlebell-Coaching ersetzt. Sie stellt weder Solomiia noch echte Kundinnen dar und bleibt ein Launch-Gate.

### P2

Alle P2-Befunde wurden behoben:

- Drei sichtbare Bildlabel und die Zitatkarte im Prozessbild entfernt.
- Den Über-mich-Text auf Deutsch und Englisch konsequent in die Ich-Perspektive gesetzt.
- Den Footer von drei kurzen Claims auf einen ruhigen, vollständigen Schlusssatz reduziert.
- Deutschen und englischen Alternativtext des neuen Prozessbildes präzisiert.

## Funktions- und Qualitätsprüfung

- Deutsch und Englisch: überarbeitete Inhalte, Sprachzuordnung und neue Schlusszeile geprüft.
- Browserprüfung: keine Bildlabel, Testimonials oder Prozesszitate mehr im DOM; das neue Prozessbild lädt vollständig.
- Responsive Kontrolle: 430 px ohne horizontalen Überlauf; die vorherige vollständige Matrix bei 360, 430, 768, 1024 und 1440 px bleibt ohne offenen Befund.
- Browserkonsole: keine Fehler auf der lokalen Vorschau.
- Produktions-Gate: optimierter Build enthält keine Namen oder Warntexte der früheren Beispiel-Testimonials.
- Aktueller Änderungsdurchlauf: ESLint bestanden, TypeScript bestanden, 14/14 Unit-Tests bestanden und Production-Build einschließlich Production-Gate bestanden.
- Vollabnahme vor diesem Änderungsdurchlauf: 7/7 E2E-Tests; Lighthouse-Median Mobile 95/97/100/100 und Desktop 100/97/100/100 für Performance/Accessibility/Best Practices/SEO.

## Offene Launch-Gates

- Logo-Freigabe durch Solomiia
- Ersatz oder ausdrückliche Freigabe aller KI-Entwurfsbilder
- fachliche Prüfung der Rechtstexte und Ergänzung der endgültigen Gewerbedaten
- schriftliche Freigaben für Wortlaut, Namensform und Übersetzungen der Testimonials von Diana, Lisa und Flo
- Aktivierung des FormSubmit-Empfängers und echte Testzustellung über AJAX sowie den nativen Fallback

## Kontaktformular- und Anker-Iteration

Als visuelle Referenz dient weiterhin das CI-Board. Der vorherige Instagram-zentrierte Kontaktweg und die neue Formularlösung wurden in derselben Desktop-Auflösung von 1440 × 1000 Pixeln verglichen:

- Vorher-/Nachher-Vergleich: [`docs/qa/contact-before-after.png`](docs/qa/contact-before-after.png)
- Formular Desktop: [`docs/qa/contact-form-desktop-1440.png`](docs/qa/contact-form-desktop-1440.png)
- Formular Mobile: [`docs/qa/contact-form-mobile-430.png`](docs/qa/contact-form-mobile-430.png)

### Behobene Befunde

- P1: Alle primären Instagram-Nachrichten-CTAs wurden durch Anker zum Kontaktformular ersetzt. Instagram bleibt ausschließlich als sekundärer Profil-Link im Footer erhalten.
- P1: Das Kontaktformular enthält Vorname, E-Mail-Adresse, Telefonnummer und eine kurze Nachricht, sendet direkt per AJAX an FormSubmit und besitzt eine native FormSubmit-`action` als Fallback. `_subject`, `_template` und `_honey` steuern Betreff, Darstellung und Spam-Falle; verständliche Erfolgs- und Fehlerzustände stehen in Deutsch und Englisch bereit.
- P2: Desktop und Mobile verwenden nun die gemessene tatsächliche Headerhöhe als Scroll-Abstand. Der Zielbereich beginnt nach einem Ankersprung mit weniger als einem Pixel Abweichung direkt unter dem Sticky Header.
- P2: Das Formular wird auf kleinen Displays einspaltig angeordnet, ohne horizontalen Überlauf; Eingabefelder und Absendeaktion bleiben gut erreichbar.

### Funktionsprüfung

- Header-, Hero-, Angebots-, Prozess- und FAQ-Aktionen führen zum lokalen Kontaktbereich und öffnen keinen neuen Tab.
- Das mobile Menü schließt sich nach der Ankernavigation korrekt.
- Pflichtfelder, Feldgrenzen, AJAX-Erfolgs- und Fehlerzustand, nativer Fallback sowie die FormSubmit-Felder `_subject`, `_template` und `_honey` werden automatisiert geprüft.
- Die automatisierten lokalen Tests fangen FormSubmit-Anfragen ab und senden keine reale Nachricht. Eine manuelle Einsendung ist ausschließlich für die bewusst ausgelöste Empfänger-Aktivierung oder den anschließenden Zustellungstest vorgesehen.
- Für FormSubmit sind weder ein eigener API-Endpunkt noch lokale oder in Vercel hinterlegte Umgebungsvariablen erforderlich.
- Abschlussprüfung nach der FormSubmit-Umstellung: ESLint bestanden, TypeScript bestanden, 18/18 Unit-Tests sowie 18/18 ausgeführte Browser-Tests bestanden (6 gerätebedingt übersprungen), Production-Build und Production-Gate bestanden.

Der lokale Design- und Funktionsstand ist damit bestanden. Die erste echte Einsendung löst die FormSubmit-Aktivierung im Empfängerpostfach aus; Aktivierungsbestätigung und anschließende echte Testzustellung bleiben dokumentierte Launch-Gates.

## Testimonial-Iteration

Die Stimmen-Sektion wurde mit den drei vom Auftraggeber bereitgestellten Aussagen wieder zwischen „Was dich erwartet“ und FAQ eingesetzt. Die frühere Warn- und Beispieldarstellung wurde nicht übernommen.

- Desktop: [`docs/qa/testimonials-desktop-1309.png`](docs/qa/testimonials-desktop-1309.png)
- Mobile: [`docs/qa/testimonials-mobile-391.png`](docs/qa/testimonials-mobile-391.png)
- Bildherkunft und finale Prompt-Spezifikationen: [`docs/brand/generated-asset-prompts.md`](docs/brand/generated-asset-prompts.md)

### Behobene Befunde

- P1: Diana, Lisa und Flo erscheinen mit ihren final geglätteten Aussagen und ohne erfundene Alters-, Berufs- oder Ortsangaben.
- P1: Alle drei Karten besitzen ein eigenes CI-konformes Trainingsmotiv. Die Bilder sind intern als illustrative KI-Motive dokumentiert, werden jedoch auf der Website nicht als Porträts der genannten Personen oder mit sichtbaren Entwurfslabels ausgegeben.
- P2: Die drei Karten haben auf Desktop identische Höhen, konsistente Bildzuschnitte und eine gemeinsame Attributionszeile. Auf Tablet werden Bild und Text zweispaltig, auf Mobile einspaltig dargestellt.
- P2: Die englische Fassung enthält dieselben drei Personen in derselben Reihenfolge und bedeutungstreue Übersetzungen.

### Funktionsprüfung

- Browserprüfung bei 1309 × 909 und 391 × 818 gerenderten Pixeln: genau drei Karten, alle Bilder vollständig geladen und kein horizontaler Überlauf.
- Direkte Anker `#stimmen` und `/en#voices` schließen mit weniger als einem Pixel Abweichung unter dem Sticky Header ab.
- Keine sichtbaren KI-, Beispiel- oder Nicht-veröffentlichen-Hinweise in der Sektion.
- Kein `Review`- oder `AggregateRating`-Markup ergänzt.
- Abschlussprüfung: ESLint bestanden, TypeScript bestanden, 31/31 Unit-Tests bestanden, Production-Build und Schutzprüfung gegen die früheren fiktiven Beispiele bestanden.

Die lokale Gestaltung ist bestanden. Schriftliche Freigaben der drei Testimonials und die finale Bildfreigabe bleiben dokumentierte Launch-Gates.

final result: passed
