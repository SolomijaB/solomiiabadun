import { siteConfig } from "@/content/site";

export type LegalLocale = "de" | "en";
export type LegalPageKind = "legalNotice" | "privacy";

export interface LegalFact {
  label: string;
  value: string;
  href?: string;
}

export interface LegalLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface LegalSection {
  id: string;
  title: string;
  paragraphs?: string[];
  facts?: LegalFact[];
  bullets?: string[];
  links?: LegalLink[];
}

export interface LegalPageContent {
  locale: LegalLocale;
  htmlLang: "de-AT" | "en";
  kind: LegalPageKind;
  path: "/impressum" | "/datenschutz" | "/en/legal-notice" | "/en/privacy";
  alternatePath: "/en/legal-notice" | "/en/privacy" | "/impressum" | "/datenschutz";
  alternateLabel: string;
  homePath: "/" | "/en";
  homeLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  relatedPage: {
    label: string;
    href: "/impressum" | "/datenschutz" | "/en/legal-notice" | "/en/privacy";
  };
  meta: {
    title: string;
    description: string;
  };
  sections: LegalSection[];
}

export interface LocalizedLegalContent {
  legalNotice: LegalPageContent;
  privacy: LegalPageContent;
}

const germanLegalNotice: LegalPageContent = {
  locale: "de",
  htmlLang: "de-AT",
  kind: "legalNotice",
  path: "/impressum",
  alternatePath: "/en/legal-notice",
  alternateLabel: "English",
  homePath: "/",
  homeLabel: "Zur Startseite",
  eyebrow: "Rechtliche Informationen",
  title: "Impressum",
  intro: "Angaben zur Anbieterin und Medieninhaberin dieser Website.",
  lastUpdatedLabel: "Stand",
  lastUpdated: "25. August 2026",
  relatedPage: { label: "Datenschutzerklärung", href: "/datenschutz" },
  meta: {
    title: `Impressum | ${siteConfig.name}`,
    description: `Impressum von ${siteConfig.name} mit Anbieter-, Kontakt- und Unternehmensangaben.`,
  },
  sections: [
    {
      id: "anbieterin",
      title: "Anbieterin und Medieninhaberin",
      facts: [
        { label: "Name", value: siteConfig.name },
        { label: "Unternehmensform", value: "Einzelunternehmen in Gründung" },
        { label: "Anschrift", value: siteConfig.address },
      ],
    },
    {
      id: "kontakt",
      title: "Kontakt",
      facts: [
        {
          label: "E-Mail",
          value: siteConfig.email,
          href: `mailto:${siteConfig.email}`,
        },
        {
          label: "Telefon",
          value: siteConfig.phoneDisplay,
          href: `tel:${siteConfig.phoneHref}`,
        },
      ],
    },
    {
      id: "gewerbe",
      title: "Gewerbe",
      facts: [
        { label: "Gewerbeanmeldung", value: "In Gründung" },
      ],
    },
    {
      id: "inhalt",
      title: "Inhaltliche Verantwortung und Blattlinie",
      paragraphs: [
        `${siteConfig.name}, Anschrift wie oben, ist für den Inhalt dieser Website verantwortlich.`,
        `Die Website informiert über das Personal-Training- und Online-Coaching-Angebot von ${siteConfig.name}.`,
      ],
    },
    {
      id: "training",
      title: "Hinweis zum Coaching",
      paragraphs: [
        "Das angebotene Coaching ersetzt keine medizinische Diagnose, ärztliche Behandlung, Therapie oder Physiotherapie. Bei gesundheitlichen Beschwerden ist die Trainingsfreigabe mit entsprechend qualifiziertem medizinischem Fachpersonal abzuklären.",
      ],
    },
  ],
};

const germanPrivacy: LegalPageContent = {
  locale: "de",
  htmlLang: "de-AT",
  kind: "privacy",
  path: "/datenschutz",
  alternatePath: "/en/privacy",
  alternateLabel: "English",
  homePath: "/",
  homeLabel: "Zur Startseite",
  eyebrow: "Rechtliche Informationen",
  title: "Datenschutzerklärung",
  intro:
    "Diese Datenschutzerklärung informiert über die Verarbeitung personenbezogener Daten beim Besuch und bei der Nutzung dieser Website.",
  lastUpdatedLabel: "Stand",
  lastUpdated: "25. August 2026",
  relatedPage: { label: "Impressum", href: "/impressum" },
  meta: {
    title: `Datenschutz | ${siteConfig.name}`,
    description: `Datenschutzerklärung für ${siteConfig.domain} mit Informationen zu Hosting, Analytics und Kontaktaufnahme.`,
  },
  sections: [
    {
      id: "verantwortliche",
      title: "Verantwortliche",
      facts: [
        { label: "Name", value: siteConfig.name },
        { label: "Anschrift", value: siteConfig.address },
        {
          label: "E-Mail",
          value: siteConfig.email,
          href: `mailto:${siteConfig.email}`,
        },
        {
          label: "Telefon",
          value: siteConfig.phoneDisplay,
          href: `tel:${siteConfig.phoneHref}`,
        },
      ],
    },
    {
      id: "hosting",
      title: "Hosting und Server-Protokolle",
      paragraphs: [
        "Diese Website wird über Vercel Inc. bereitgestellt. Beim Aufruf verarbeitet Vercel technisch erforderliche Verbindungsdaten. Dazu können insbesondere IP-Adresse, Zeitpunkt, aufgerufene Adresse, Referrer, Browser- beziehungsweise Geräteinformationen und Statuscodes gehören.",
        "Die Verarbeitung dient der sicheren und zuverlässigen Bereitstellung der Website. Rechtsgrundlage ist das berechtigte Interesse an Betrieb und Sicherheit gemäß Art. 6 Abs. 1 lit. f DSGVO.",
        "Vercel kann Unterauftragsverarbeiter einbinden und Daten außerhalb des Europäischen Wirtschaftsraums verarbeiten. Das Data Processing Addendum von Vercel sieht für erforderliche internationale Übermittlungen geeignete Garantien, insbesondere die EU-Standardvertragsklauseln, vor.",
      ],
      links: [
        {
          label: "Datenschutzhinweise von Vercel",
          href: "https://vercel.com/legal/privacy-notice",
          external: true,
        },
        {
          label: "Data Processing Addendum von Vercel",
          href: "https://vercel.com/legal/dpa",
          external: true,
        },
      ],
    },
    {
      id: "analytics",
      title: "Vercel Web Analytics",
      paragraphs: [
        "Vercel Web Analytics wird auf dieser Website erst geladen, nachdem „Statistik erlauben“ ausgewählt wurde. Ohne diese Einwilligung bleibt die Statistikfunktion deaktiviert.",
        "Dabei werden nach Angaben von Vercel ausschließlich zusammengefasste Nutzungsdaten verarbeitet, etwa aufgerufene Seite, Referrer, Browser, Betriebssystem, Gerätetyp, ungefährer Standort und Zeitpunkt. Die Daten werden nicht einer konkreten Person oder IP-Adresse zugeordnet; die zur Wiedererkennung eines Besuchs verwendete Kennung wird nach 24 Stunden verworfen.",
        "Die Einwilligung kann jederzeit über „Datenschutz-Einstellungen“ im Footer mit Wirkung für die Zukunft widerrufen werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO. Marketing-Tracking und Speed Insights sind nicht vorgesehen.",
      ],
      links: [
        {
          label: "Datenschutz und Compliance bei Vercel Web Analytics",
          href: "https://vercel.com/docs/analytics/privacy-policy",
          external: true,
        },
      ],
    },
    {
      id: "einwilligung",
      title: "Datenschutz-Einstellungen",
      paragraphs: [
        `Die Auswahl „Nur notwendig“ oder „Statistik erlauben“ wird lokal im Browser unter dem Schlüssel „${siteConfig.consentStorageKey}“ gespeichert. Sie dient ausschließlich dazu, die getroffene Auswahl zu berücksichtigen.`,
        "Die notwendige Speicherung der Auswahl kann nicht über die Statistik-Option deaktiviert werden. Es ist keine Marketing-Kategorie vorgesehen.",
      ],
    },
    {
      id: "kontaktaufnahme",
      title: "Kontaktformular und Kontaktaufnahme",
      paragraphs: [
        "Über das Kontaktformular werden Vorname, E-Mail-Adresse, Telefonnummer und der frei eingegebene Nachrichtentext verarbeitet. Beim Absenden werden diese Angaben direkt aus dem Browser an FormSubmit übermittelt und von FormSubmit an das im Impressum genannte E-Mail-Postfach weitergeleitet. Die Angaben werden ausschließlich zur Bearbeitung der Anfrage sowie zur Anbahnung einer möglichen Zusammenarbeit verwendet. Das Formular ist nicht von einer Statistik-Einwilligung abhängig.",
        "Die Website speichert Formularinhalte nicht in einer eigenen Datenbank. Zum Schutz vor automatisiertem Missbrauch wird ein unsichtbares Honeypot-Prüffeld mitgesendet. FormSubmit gibt in seiner Dokumentation an, Formulareinreichungen für 30 Tage vorzuhalten.",
        "Die Verarbeitung erfolgt bei vertragsbezogenen Anfragen gemäß Art. 6 Abs. 1 lit. b DSGVO und bei sonstigen Anfragen aufgrund des berechtigten Interesses an einer verlässlichen Kommunikation gemäß Art. 6 Abs. 1 lit. f DSGVO. Nachrichten verbleiben im Empfängerpostfach nur so lange, wie dies für die Bearbeitung und mögliche gesetzliche Aufbewahrungspflichten erforderlich ist.",
        "Bitte übermitteln Sie über das Formular keine Diagnosen, medizinischen Unterlagen oder andere besonders sensible Informationen. Alternativ ist eine Kontaktaufnahme über die im Impressum genannten E-Mail- und Telefondaten möglich.",
      ],
      links: [
        {
          label: "Datenschutzerklärung von FormSubmit",
          href: "https://formsubmit.co/privacy.pdf",
          external: true,
        },
        {
          label: "FormSubmit-Dokumentation",
          href: "https://formsubmit.co/documentation",
          external: true,
        },
      ],
    },
    {
      id: "externe-links",
      title: "Externe Links und eingebundene Inhalte",
      paragraphs: [
        "Instagram-Inhalte, Karten und Videos werden nicht direkt in die Website eingebettet. Ein Link zu Instagram stellt beim bloßen Laden dieser Website noch keine Verbindung zu Instagram her. Erst beim Anklicken wird die externe Website geöffnet.",
        "Schriftarten und Bilder werden aus der eigenen Website ausgeliefert; externe Font-Dienste sind nicht vorgesehen.",
      ],
    },
    {
      id: "rechte",
      title: "Ihre Datenschutzrechte",
      paragraphs: [
        "Je nach den gesetzlichen Voraussetzungen bestehen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden.",
        "Anfragen können über die oben angeführten Kontaktdaten gestellt werden. Außerdem besteht das Recht, eine Beschwerde bei der zuständigen Datenschutz-Aufsichtsbehörde einzureichen.",
      ],
      links: [
        {
          label: "Österreichische Datenschutzbehörde",
          href: "https://www.dsb.gv.at/",
          external: true,
        },
      ],
    },
    {
      id: "aktualisierung",
      title: "Aktualisierungen",
      paragraphs: [
        "Diese Datenschutzerklärung wird angepasst, wenn sich die Website, die eingesetzten Dienste oder die gesetzlichen Anforderungen wesentlich ändern.",
      ],
    },
  ],
};

const englishLegalNotice: LegalPageContent = {
  locale: "en",
  htmlLang: "en",
  kind: "legalNotice",
  path: "/en/legal-notice",
  alternatePath: "/impressum",
  alternateLabel: "Deutsch",
  homePath: "/en",
  homeLabel: "Back to the homepage",
  eyebrow: "Legal information",
  title: "Legal notice",
  intro: "Information about the provider and media owner of this website.",
  lastUpdatedLabel: "Last updated",
  lastUpdated: "25 August 2026",
  relatedPage: { label: "Privacy notice", href: "/en/privacy" },
  meta: {
    title: `Legal notice | ${siteConfig.name}`,
    description: `Legal notice for ${siteConfig.name} with provider, contact and business information.`,
  },
  sections: [
    {
      id: "provider",
      title: "Provider and media owner",
      facts: [
        { label: "Name", value: siteConfig.name },
        { label: "Business form", value: "Sole proprietorship in formation" },
        { label: "Address", value: siteConfig.address },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      facts: [
        {
          label: "Email",
          value: siteConfig.email,
          href: `mailto:${siteConfig.email}`,
        },
        {
          label: "Phone",
          value: siteConfig.phoneDisplay,
          href: `tel:${siteConfig.phoneHref}`,
        },
      ],
    },
    {
      id: "business-details",
      title: "Trade registration",
      facts: [
        { label: "Registration status", value: "In formation" },
      ],
    },
    {
      id: "editorial-responsibility",
      title: "Editorial responsibility and purpose",
      paragraphs: [
        `${siteConfig.name}, at the address stated above, is responsible for the content of this website.`,
        `The website provides information about the personal-training and online-coaching services of ${siteConfig.name}.`,
      ],
    },
    {
      id: "coaching-notice",
      title: "Coaching notice",
      paragraphs: [
        "The coaching offered is not a substitute for medical diagnosis, medical treatment, therapy or physiotherapy. Anyone with health concerns should confirm their readiness to train with appropriately qualified medical professionals.",
      ],
    },
  ],
};

const englishPrivacy: LegalPageContent = {
  locale: "en",
  htmlLang: "en",
  kind: "privacy",
  path: "/en/privacy",
  alternatePath: "/datenschutz",
  alternateLabel: "Deutsch",
  homePath: "/en",
  homeLabel: "Back to the homepage",
  eyebrow: "Legal information",
  title: "Privacy notice",
  intro:
    "This privacy notice explains how personal data is processed when you visit and use this website.",
  lastUpdatedLabel: "Last updated",
  lastUpdated: "25 August 2026",
  relatedPage: { label: "Legal notice", href: "/en/legal-notice" },
  meta: {
    title: `Privacy | ${siteConfig.name}`,
    description: `Privacy notice for ${siteConfig.domain}, including information about hosting, analytics and contact requests.`,
  },
  sections: [
    {
      id: "controller",
      title: "Controller",
      facts: [
        { label: "Name", value: siteConfig.name },
        { label: "Address", value: siteConfig.address },
        {
          label: "Email",
          value: siteConfig.email,
          href: `mailto:${siteConfig.email}`,
        },
        {
          label: "Phone",
          value: siteConfig.phoneDisplay,
          href: `tel:${siteConfig.phoneHref}`,
        },
      ],
    },
    {
      id: "hosting",
      title: "Hosting and server logs",
      paragraphs: [
        "This website is provided through Vercel Inc. When it is opened, Vercel processes technically necessary connection data. This may include the IP address, timestamp, requested address, referrer, browser or device information and status codes.",
        "This processing serves the secure and reliable delivery of the website. The legal basis is the legitimate interest in operation and security under Article 6(1)(f) GDPR.",
        "Vercel may engage subprocessors and process data outside the European Economic Area. Vercel’s Data Processing Addendum provides appropriate safeguards for required international transfers, including the EU Standard Contractual Clauses.",
      ],
      links: [
        {
          label: "Vercel privacy notice",
          href: "https://vercel.com/legal/privacy-notice",
          external: true,
        },
        {
          label: "Vercel Data Processing Addendum",
          href: "https://vercel.com/legal/dpa",
          external: true,
        },
      ],
    },
    {
      id: "analytics",
      title: "Vercel Web Analytics",
      paragraphs: [
        "Vercel Web Analytics is loaded on this website only after “Allow statistics” has been selected. Without that consent, analytics remains disabled.",
        "According to Vercel, only aggregated usage data is processed, such as the visited page, referrer, browser, operating system, device type, approximate location and timestamp. The data is not associated with a specific person or IP address; the identifier used to recognise a visit is discarded after 24 hours.",
        "Consent can be withdrawn at any time through “Privacy settings” in the footer with effect for the future. The legal basis is Article 6(1)(a) GDPR. Marketing tracking and Speed Insights are not planned.",
      ],
      links: [
        {
          label: "Privacy and compliance for Vercel Web Analytics",
          href: "https://vercel.com/docs/analytics/privacy-policy",
          external: true,
        },
      ],
    },
    {
      id: "consent-settings",
      title: "Privacy settings",
      paragraphs: [
        `The selection “Necessary only” or “Allow statistics” is stored locally in the browser under the key “${siteConfig.consentStorageKey}”. It is used only to respect the selected preference.`,
        "The necessary storage of this preference cannot be disabled through the statistics option. No marketing category is planned.",
      ],
    },
    {
      id: "contact",
      title: "Contact form and contact requests",
      paragraphs: [
        "The contact form processes your first name, email address, phone number and the message you enter. When you submit the form, this information is sent directly from your browser to FormSubmit and forwarded by FormSubmit to the email inbox listed in the legal notice. It is used only to respond to your enquiry and discuss a potential working relationship. The form does not depend on statistics consent.",
        "The website does not store form content in its own database. A hidden honeypot field is submitted to reduce automated misuse. FormSubmit states in its documentation that form submissions are retained for 30 days.",
        "For enquiries relating to a potential contract, the legal basis is Article 6(1)(b) GDPR. Other enquiries are processed on the basis of the legitimate interest in reliable communication under Article 6(1)(f) GDPR. Messages remain in the recipient inbox only for as long as necessary to respond and meet any applicable legal retention duties.",
        "Please do not submit diagnoses, medical records or other particularly sensitive information through this form. You can alternatively use the email address or phone number listed in the legal notice.",
      ],
      links: [
        {
          label: "FormSubmit privacy policy",
          href: "https://formsubmit.co/privacy.pdf",
          external: true,
        },
        {
          label: "FormSubmit documentation",
          href: "https://formsubmit.co/documentation",
          external: true,
        },
      ],
    },
    {
      id: "external-links",
      title: "External links and embedded content",
      paragraphs: [
        "Instagram content, maps and videos are not embedded directly in the website. Merely loading this website does not establish an Instagram connection through the link. The external website opens only after the link is selected.",
        "Fonts and images are served from the website itself; external font services are not planned.",
      ],
    },
    {
      id: "rights",
      title: "Your data-protection rights",
      paragraphs: [
        "Depending on the legal requirements, you may have rights to access, rectification, erasure, restriction, data portability and objection. Consent can be withdrawn at any time with effect for the future.",
        "Requests can be made using the contact details above. You also have the right to submit a complaint to the competent data-protection supervisory authority.",
      ],
      links: [
        {
          label: "Austrian Data Protection Authority",
          href: "https://www.dsb.gv.at/",
          external: true,
        },
      ],
    },
    {
      id: "updates",
      title: "Updates",
      paragraphs: [
        "This privacy notice will be updated if the website, the services used or the legal requirements change materially.",
      ],
    },
  ],
};

export const legalContent = {
  de: {
    legalNotice: germanLegalNotice,
    privacy: germanPrivacy,
  },
  en: {
    legalNotice: englishLegalNotice,
    privacy: englishPrivacy,
  },
} satisfies Record<LegalLocale, LocalizedLegalContent>;

export function getLegalContent(
  locale: LegalLocale,
  kind: LegalPageKind,
): LegalPageContent {
  return legalContent[locale][kind];
}
