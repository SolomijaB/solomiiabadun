import { readFile } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const approvalMarker = /^Status:\s*FREIGEGEBEN\s*$/imu;

const launchGates = [
  {
    id: "business-registration",
    label: "Abgeschlossene Gewerbe- und Unternehmensdaten",
    evidence: "docs/launch/gewerbedaten.md",
  },
  {
    id: "legal-review",
    label: "Fachlich geprüfte Impressums- und Datenschutztexte",
    evidence: "docs/launch/rechtliche-pruefung.md",
  },
  {
    id: "logo-approval",
    label: "Freigegebenes finales Logo",
    evidence: "docs/launch/logo-freigabe.md",
  },
  {
    id: "photo-approval",
    label: "Freigegebene Originalfotos und Entfernung aller Entwurfsbilder",
    evidence: "docs/launch/foto-freigaben.md",
  },
  {
    id: "testimonial-approval",
    label: "Entfernte Beispiele oder freigegebene echte Testimonials",
    evidence: "docs/launch/testimonial-freigaben.md",
  },
  {
    id: "contact-form-delivery",
    label: "Eingerichteter und getesteter Kontaktformular-Versand",
    evidence: "docs/launch/kontaktformular-versand.md",
  },
];

async function hasApproval(gate) {
  try {
    const evidence = await readFile(new URL(gate.evidence, projectRoot), "utf8");
    return approvalMarker.test(evidence);
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

const checks = await Promise.all(
  launchGates.map(async (gate) => ({
    ...gate,
    approved: await hasApproval(gate),
  })),
);

const missing = checks.filter((gate) => !gate.approved);

if (missing.length > 0) {
  console.error("\nLaunch blockiert: Es fehlen verbindliche Freigaben.\n");

  for (const gate of missing) {
    console.error(`- ${gate.label}`);
    console.error(`  Nachweis: ${gate.evidence}`);
  }

  console.error(
    "\nEin Nachweis gilt erst mit einer eigenen Zeile `Status: FREIGEGEBEN`. " +
      "Der normale lokale Build bleibt davon unberührt.\n",
  );
  process.exitCode = 1;
} else {
  console.log("Alle verbindlichen Launch-Freigaben sind dokumentiert.");
}
