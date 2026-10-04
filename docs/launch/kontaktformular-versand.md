# Kontaktformular-Versand

Status: OFFEN

Das Formular übermittelt Vorname, E-Mail-Adresse, Telefonnummer und Nachricht direkt aus dem Browser per AJAX an FormSubmit. Eine native FormSubmit-`action` dient als Fallback. `_subject`, `_template` und die Spam-Falle `_honey` müssen in beiden Übermittlungswegen korrekt mitgesendet werden. Dafür sind weder ein eigener API-Endpunkt noch lokale oder in Vercel hinterlegte Umgebungsvariablen erforderlich.

Die erste echte Einsendung löst eine Aktivierungs-E-Mail an `solomiiabadun@outlook.com` aus. Für die vollständige Launch-Freigabe müssen diese Aktivierung bestätigt und danach eine weitere echte Testanfrage nachweislich an das Empfängerpostfach zugestellt werden. Absender- beziehungsweise Antwortadresse, Betreff, Inhalt, Spam-Schutz, AJAX-Erfolg und nativer Fehler-Fallback sind zu prüfen. Die automatisierten lokalen Tests müssen FormSubmit abfangen und dürfen keine reale Nachricht versenden. Datenschutz, Vertragsbeziehung, Speicherorte, Aufbewahrungsfristen und mögliche Drittlandübermittlungen müssen anhand der tatsächlichen FormSubmit-Konfiguration geprüft werden.
