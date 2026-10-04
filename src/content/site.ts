export type Locale = "de" | "en";

export type IconName =
  | "barbell"
  | "movement"
  | "confidence"
  | "freedom"
  | "message"
  | "target"
  | "spark";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Pillar {
  title: string;
  body: string;
  icon: IconName;
}

export interface Offer {
  name: string;
  eyebrow: string;
  price: string;
  duration: string;
  body: string;
  features: string[];
  featured?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export interface Expectation {
  title: string;
  body: string;
  icon: IconName;
}

export interface Testimonial {
  name: string;
  quote: string;
  context: string;
  image: string;
  imagePosition: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LocalizedSiteCopy {
  locale: Locale;
  htmlLang: "de-AT" | "en";
  path: "/" | "/en";
  alternatePath: "/en" | "/";
  languageLabel: string;
  alternateLanguageLabel: string;
  navigation: NavigationItem[];
  navCta: string;
  menuOpen: string;
  menuClose: string;
  hero: {
    eyebrow: string;
    lines: [string, string, string];
    body: string;
    primaryCta: string;
    secondaryCta: string;
    imageAlt: string;
  };
  positioning: string[];
  pillars: {
    eyebrow: string;
    title: string;
    accent: string;
    items: Pillar[];
  };
  about: {
    eyebrow: string;
    title: string;
    accent: string;
    paragraphs: string[];
    facts: Array<{ label: string; value: string }>;
    imageAlt: string;
  };
  offers: {
    eyebrow: string;
    title: string;
    intro: string;
    note: string;
    cta: string;
    items: Offer[];
  };
  process: {
    eyebrow: string;
    title: string;
    accent: string;
    items: ProcessStep[];
    imageAlt: string;
  };
  expectations: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Expectation[];
  };
  testimonials: {
    id: "stimmen" | "voices";
    eyebrow: string;
    title: string;
    accent: string;
    items: Testimonial[];
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    items: FaqItem[];
  };
  contact: {
    id: "kontakt" | "contact";
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    directContact: string;
    firstNameLabel: string;
    firstNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    requiredNote: string;
    sensitiveDataNote: string;
    privacyPrefix: string;
    privacyLink: string;
    submit: string;
    submitting: string;
    successMessage: string;
    errorMessage: string;
  };
  footer: {
    closingLine: string;
    disciplines: string[];
    legalNotice: string;
    privacy: string;
    consent: string;
    copyright: string;
  };
  seo: {
    title: string;
    description: string;
    ogAlt: string;
  };
}

export interface SiteConfig {
  name: string;
  descriptor: string;
  domain: string;
  url: string;
  email: string;
  address: string;
  instagramHandle: string;
  instagramProfileUrl: string;
  consentStorageKey: string;
  locales: Record<Locale, LocalizedSiteCopy>;
}

const sharedOffers = {
  de: [
    {
      name: "START STRONG",
      eyebrow: "Kennenlernen",
      price: "Kostenlos",
      duration: "15 Minuten",
      body: "Ein kurzes, unverbindliches Gespräch über deine Ziele, Erfahrung und die passende Form der Zusammenarbeit.",
      features: ["Kontakt über das Formular", "Ziele und Rahmen klären", "Ohne Verpflichtung"],
    },
    {
      name: "PERSONAL STRENGTH",
      eyebrow: "1:1 Personal Training",
      price: "80 €",
      duration: "60 Minuten",
      body: "Eine fokussierte Einheit, die an deinem aktuellen Stand, deiner Technik und deinen Zielen ausgerichtet wird.",
      features: ["Individuelle Betreuung", "Technik und Progression", "Wien nach Vereinbarung"],
    },
    {
      name: "STRENGTH SERIES",
      eyebrow: "10er-Block",
      price: "640 €",
      duration: "10 × 60 Minuten",
      body: "Kontinuierliches Coaching mit klarer Struktur, persönlicher Trainingsplanung und Raum für nachhaltige Entwicklung.",
      features: ["Individuelle Trainingsplanung", "Fortlaufende Anpassung", "64 € pro Einheit"],
      featured: true,
    },
    {
      name: "STRONG TOGETHER",
      eyebrow: "Training zu zweit",
      price: "120 €",
      duration: "60 Minuten",
      body: "Gemeinsam trainieren, individuell begleitet werden und einander auf dem Weg zu mehr Stärke unterstützen.",
      features: ["Für zwei Personen", "60 € pro Person", "Gemeinsamer Termin"],
    },
    {
      name: "ONLINE COACHING",
      eyebrow: "Ortsunabhängig",
      price: "Auf Anfrage",
      duration: "Individuell",
      body: "Online-Begleitung wird passend zu Ziel, Alltag und gewünschtem Betreuungsumfang persönlich zusammengestellt.",
      features: ["Individuelle Abstimmung", "Deutsch oder Englisch", "Über das Formular anfragen"],
    },
  ] satisfies Offer[],
  en: [
    {
      name: "START STRONG",
      eyebrow: "Intro call",
      price: "Free",
      duration: "15 minutes",
      body: "A short, no-pressure conversation about your goals, experience and the kind of coaching that fits you.",
      features: ["Contact me through the form", "Clarify goals and fit", "No obligation"],
    },
    {
      name: "PERSONAL STRENGTH",
      eyebrow: "1:1 personal training",
      price: "€80",
      duration: "60 minutes",
      body: "A focused session shaped around your current level, your technique and the goals you want to work toward.",
      features: ["Individual guidance", "Technique and progression", "Vienna by arrangement"],
    },
    {
      name: "STRENGTH SERIES",
      eyebrow: "10-session block",
      price: "€640",
      duration: "10 × 60 minutes",
      body: "Consistent coaching with a clear structure, personal training plan and space for sustainable progress.",
      features: ["Individual training plan", "Ongoing adjustments", "€64 per session"],
      featured: true,
    },
    {
      name: "STRONG TOGETHER",
      eyebrow: "Partner training",
      price: "€120",
      duration: "60 minutes",
      body: "Train together, receive individual guidance and support each other as you become stronger.",
      features: ["For two people", "€60 per person", "Shared appointment"],
    },
    {
      name: "ONLINE COACHING",
      eyebrow: "Location independent",
      price: "On request",
      duration: "Individual",
      body: "Online coaching is shaped personally around your goal, routine and the level of support you need.",
      features: ["Individual setup", "German or English", "Enquire through the form"],
    },
  ] satisfies Offer[],
};

export const siteConfig: SiteConfig = {
  name: "Solomiia Badun",
  descriptor: "Strength Coach for Women",
  domain: "solomiiabadun.com",
  url: "https://solomiiabadun.com",
  email: "solomiiabadun@outlook.com",
  address: "Phorusgasse 2, 1040 Wien, Österreich",
  instagramHandle: "@notyourmorningroutine",
  instagramProfileUrl: "https://www.instagram.com/notyourmorningroutine/",
  consentStorageKey: "solomiia-badun-consent-v1",
  locales: {
    de: {
      locale: "de",
      htmlLang: "de-AT",
      path: "/",
      alternatePath: "/en",
      languageLabel: "Deutsch",
      alternateLanguageLabel: "English",
      navigation: [
        { label: "Ansatz", href: "#ansatz" },
        { label: "Über mich", href: "#ueber-mich" },
        { label: "Coaching", href: "#coaching" },
        { label: "FAQ", href: "#faq" },
        { label: "Kontakt", href: "#kontakt" },
      ],
      navCta: "Kontakt aufnehmen",
      menuOpen: "Menü öffnen",
      menuClose: "Menü schließen",
      hero: {
        eyebrow: "Strength Coach for Women · Wien & Online",
        lines: ["Build Strength.", "Move Freely.", "Become Unstoppable."],
        body: "Personal Training für Frauen, die echte Kraft, Selbstvertrauen und Bewegungsfreiheit auf ihren eigenen Bedingungen aufbauen möchten.",
        primaryCta: "Kennenlernen anfragen",
        secondaryCta: "Angebote ansehen",
        imageAlt: "Solomiia hält eine Kettlebell im Halbkniestand über dem Kopf.",
      },
      positioning: ["Für Frauen", "Wien", "DE · EN · UA", "Online"],
      pillars: {
        eyebrow: "Stärke, die weiterträgt",
        title: "Nicht für Perfektion.",
        accent: "Für echte Entwicklung.",
        items: [
          { title: "Build Strength", body: "Kraft systematisch aufbauen und den eigenen Körper als verlässlich erleben.", icon: "barbell" },
          { title: "Move Functional", body: "Bewegungen lernen, die Kontrolle, Technik und Alltagstauglichkeit verbinden.", icon: "movement" },
          { title: "Feel Confident", body: "Fortschritt verstehen, Fähigkeiten erweitern und Vertrauen in dich entwickeln.", icon: "confidence" },
          { title: "Live Freely", body: "Stärke als Grundlage für mehr Freiheit in Training, Alltag und Leben nutzen.", icon: "freedom" },
        ],
      },
      about: {
        eyebrow: "Über Solomiia",
        title: "Bewegung hat viele Formen.",
        accent: "Stärke gibt ihnen Richtung.",
        paragraphs: [
          "Ich verbinde zwölf Jahre Tanzerfahrung mit zehn Jahren Krafttraining und eigener Praxis in Yoga, Kickboxen und Calisthenics. Meine eigenen gesundheitlichen Herausforderungen haben mir gezeigt, wie wertvoll anpassbare, konsequente Bewegung sein kann.",
          "Dabei verbinde ich meine praktische Erfahrung mit einem wissenschaftlich informierten Blick auf Training. Mein Ziel ist es, Frauen dabei zu unterstützen, Kraft, Selbstvertrauen und Bewegungsfreiheit zu ihren eigenen Bedingungen aufzubauen.",
        ],
        facts: [
          { label: "Erfahrung", value: "12 Jahre Tanz · 10 Jahre Krafttraining" },
          { label: "Fokus", value: "Strength · Functional Fitness · Calisthenics" },
          { label: "Sprachen", value: "Deutsch · Englisch · Ukrainisch" },
        ],
        imageAlt: "Solomiia lächelt im Trainingsstudio.",
      },
      offers: {
        eyebrow: "Coaching",
        title: "Dein Training. Klar begleitet.",
        intro: "Jede Zusammenarbeit beginnt bei deinem aktuellen Stand. Gemeinsam schaffen wir Struktur, entwickeln Technik und bauen Schritt für Schritt echte Stärke auf.",
        note: "Training in Wien nach Vereinbarung. Online-Coaching wird individuell abgestimmt.",
        cta: "Dieses Angebot anfragen",
        items: sharedOffers.de,
      },
      process: {
        eyebrow: "So starten wir",
        title: "Mit Intention trainieren.",
        accent: "Mit Freiheit wachsen.",
        items: [
          { number: "01", title: "Kennenlernen", body: "Du schickst mir über das Kontaktformular eine kurze Nachricht. Wir klären Ziele, Erfahrung, Rahmen und ob die Zusammenarbeit passt." },
          { number: "02", title: "Ausgangspunkt verstehen", body: "Wir betrachten deinen aktuellen Stand und schaffen eine realistische, nachvollziehbare Trainingsstruktur." },
          { number: "03", title: "Stärke aufbauen", body: "Wir trainieren konsequent, passen sinnvoll an und machen Fortschritt spürbar statt perfekt." },
        ],
        imageAlt: "Solomiia erklärt eine Bewegung im Trainingsstudio.",
      },
      expectations: {
        eyebrow: "Was dich erwartet",
        title: "Coaching, das dich ernst nimmt.",
        intro: "Keine Abkürzungen, keine Beschämung und keine Einheitspläne. Dafür Klarheit, Respekt und eine Zusammenarbeit, die zu dir passen darf.",
        items: [
          { title: "Persönlicher Rahmen", body: "Ziele, Alltag und Erfahrung bestimmen den Weg – nicht ein vorgefertigtes Ideal.", icon: "message" },
          { title: "Nachvollziehbarer Fortschritt", body: "Du verstehst, woran wir arbeiten, warum wir es tun und wie du dich entwickelst.", icon: "target" },
          { title: "Stärke ohne Druck", body: "Konsequenz darf fordern, ohne Einschüchterung, Body-Shaming oder unrealistische Versprechen.", icon: "spark" },
        ],
      },
      testimonials: {
        id: "stimmen",
        eyebrow: "Stimmen",
        title: "So fühlt sich",
        accent: "Fortschritt an.",
        items: [
          {
            name: "Diana",
            quote: "Durch Solomiia habe ich zu meinem Körper und dadurch auch zu meinem Geist gefunden. Deshalb kann ich sie all meinen Freundinnen und Freunden nur weiterempfehlen.",
            context: "Training mit Solomiia",
            image: "/images/testimonials/diana-portrait.png",
            imagePosition: "50% 65%",
          },
          {
            name: "Lisa",
            quote: "Nach zehn Jahren Training im Fitnessstudio hatte ich verlernt, auf meinen Körper zu hören. Solomiia hat mir gezeigt, wie ich wieder eins mit ihm werden kann.",
            context: "Training mit Solomiia",
            image: "/images/testimonials/lisa-portrait-v2.webp",
            imagePosition: "50% 50%",
          },
          {
            name: "Flo",
            quote: "Als Anfänger wusste ich nicht, wo ich anfangen soll. Mit Solomiias Begleitung habe ich meinen Einstieg gefunden. Heute ist Training ein fester Teil meines Alltags.",
            context: "Training mit Solomiia",
            image: "/images/testimonials/flo-portrait.webp",
            imagePosition: "50% 50%",
          },
        ],
      },
      faq: {
        eyebrow: "FAQ",
        title: "Fragen vor dem ersten Training.",
        intro: "Du hast eine Frage? Nutze das Kontaktformular – persönlich und unverbindlich.",
        items: [
          { question: "Für wen ist das Coaching gedacht?", answer: "Für erwachsene Frauen, die Kraft, Technik, Selbstvertrauen und Bewegungsqualität aufbauen möchten – unabhängig davon, ob sie gerade beginnen oder bereits Trainingserfahrung mitbringen." },
          { question: "Wo findet das Training statt?", answer: "Personal Training findet in Wien nach individueller Vereinbarung statt. Ein konkreter Standort wird gemeinsam abgestimmt. Online-Coaching ist ebenfalls auf Anfrage möglich." },
          { question: "Brauche ich Trainingserfahrung?", answer: "Nein. Ausgangspunkt, Tempo und Übungen werden an deine Erfahrung angepasst. Du musst nichts beweisen, bevor du beginnen darfst." },
          { question: "Wie lange dauert eine Einheit?", answer: "Einzel- und Partnertraining dauern jeweils 60 Minuten. Der 10er-Block umfasst zehn Einheiten zu je 60 Minuten und eine individuelle Trainingsplanung." },
          { question: "Wie funktioniert Online-Coaching?", answer: "Umfang und Ablauf werden passend zu deinem Ziel und Alltag vereinbart. Nutze das Kontaktformular, damit wir klären können, welche Begleitung sinnvoll ist." },
          { question: "Wie vereinbare ich ein Kennenlernen?", answer: "Schick mir über das Kontaktformular ein paar Zeilen zu deinem Ziel. Danach stimmen wir ein kostenloses 15-minütiges Kennenlernen ab." },
          { question: "Ist das Training eine medizinische Behandlung?", answer: "Nein. Das Coaching ersetzt keine medizinische Diagnose, Therapie oder physiotherapeutische Behandlung. Bei gesundheitlichen Beschwerden klärst du die Trainingsfreigabe bitte mit qualifiziertem medizinischem Fachpersonal." },
        ],
      },
      contact: {
        id: "kontakt",
        eyebrow: "Real strength. Real you.",
        title: "Du musst nicht perfekt starten.",
        accent: "Du darfst einfach anfangen.",
        body: "Erzähl mir, was du erreichen möchtest. Wir finden gemeinsam heraus, welcher nächste Schritt zu dir passt.",
        directContact: "Oder direkt per E-Mail:",
        firstNameLabel: "Vorname",
        firstNamePlaceholder: "Dein Vorname",
        emailLabel: "E-Mail-Adresse",
        emailPlaceholder: "du@beispiel.at",
        phoneLabel: "Telefonnummer",
        phonePlaceholder: "+43 660 1234567",
        messageLabel: "Kurze Nachricht",
        messagePlaceholder: "Erzähl mir kurz von deinem Ziel und wofür du dich interessierst.",
        requiredNote: "Alle Felder sind erforderlich.",
        sensitiveDataNote: "Bitte sende keine Diagnosen oder medizinischen Unterlagen über dieses Formular.",
        privacyPrefix: "Beim Absenden werden deine Angaben über FormSubmit zur Bearbeitung deiner Anfrage übermittelt.",
        privacyLink: "Mehr zum Datenschutz",
        submit: "Anfrage absenden",
        submitting: "Wird gesendet …",
        successMessage: "Danke! Deine Anfrage ist angekommen. Ich melde mich so bald wie möglich.",
        errorMessage: "Das hat leider nicht geklappt. Bitte versuche es erneut oder schreib mir direkt per E-Mail.",
      },
      footer: {
        closingLine: "Trainiere für eine Kraft, die dich durchs Leben trägt.",
        disciplines: ["Strength", "Functional Fitness", "Calisthenics"],
        legalNotice: "Impressum",
        privacy: "Datenschutz",
        consent: "Datenschutz-Einstellungen",
        copyright: "Alle Rechte vorbehalten.",
      },
      seo: {
        title: "Solomiia Badun | Personal Training für Frauen in Wien",
        description: "Personal Training für Frauen in Wien und online: Krafttraining, Functional Fitness und Calisthenics mit Solomiia Badun.",
        ogAlt: "Solomiia Badun – Strength Coach for Women in Wien und online",
      },
    },
    en: {
      locale: "en",
      htmlLang: "en",
      path: "/en",
      alternatePath: "/",
      languageLabel: "English",
      alternateLanguageLabel: "Deutsch",
      navigation: [
        { label: "Approach", href: "#approach" },
        { label: "About", href: "#about" },
        { label: "Coaching", href: "#coaching" },
        { label: "FAQ", href: "#faq" },
        { label: "Contact", href: "#contact" },
      ],
      navCta: "Get in touch",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      hero: {
        eyebrow: "Strength Coach for Women · Vienna & Online",
        lines: ["Build Strength.", "Move Freely.", "Become Unstoppable."],
        body: "Personal training for women who want to build real strength, confidence and freedom of movement on their own terms.",
        primaryCta: "Request an intro call",
        secondaryCta: "Explore coaching",
        imageAlt: "Solomiia holding a kettlebell overhead in a half-kneeling position.",
      },
      positioning: ["For women", "Vienna", "DE · EN · UA", "Online"],
      pillars: {
        eyebrow: "Strength that carries forward",
        title: "Not for perfection.",
        accent: "For meaningful progress.",
        items: [
          { title: "Build Strength", body: "Build strength systematically and learn to experience your body as capable and reliable.", icon: "barbell" },
          { title: "Move Functional", body: "Learn movement that connects control, technique and real-life capability.", icon: "movement" },
          { title: "Feel Confident", body: "Understand progress, expand your skills and develop trust in yourself.", icon: "confidence" },
          { title: "Live Freely", body: "Use strength as a foundation for more freedom in training, everyday life and beyond.", icon: "freedom" },
        ],
      },
      about: {
        eyebrow: "About Solomiia",
        title: "Movement takes many forms.",
        accent: "Strength gives them direction.",
        paragraphs: [
          "I bring together twelve years of dance experience, ten years of strength training and hands-on practice in yoga, kickboxing and calisthenics. My own health challenges have shown me how valuable adaptable, consistent movement can be.",
          "I combine my practical experience with a science-informed perspective on exercise. My goal is to support women as they build strength, confidence and freedom of movement on their own terms.",
        ],
        facts: [
          { label: "Experience", value: "12 years dance · 10 years strength training" },
          { label: "Focus", value: "Strength · Functional Fitness · Calisthenics" },
          { label: "Languages", value: "German · English · Ukrainian" },
        ],
        imageAlt: "Solomiia smiling in the training studio.",
      },
      offers: {
        eyebrow: "Coaching",
        title: "Your training. Clearly guided.",
        intro: "Every collaboration starts where you are now. Together we create structure, develop technique and build real strength step by step.",
        note: "Training in Vienna by arrangement. Online coaching is tailored individually.",
        cta: "Ask about this package",
        items: sharedOffers.en,
      },
      process: {
        eyebrow: "How we begin",
        title: "Train with intention.",
        accent: "Grow with freedom.",
        items: [
          { number: "01", title: "Connect", body: "Send me a short message through the contact form. We clarify your goals, experience, practical details and whether the collaboration fits." },
          { number: "02", title: "Understand your starting point", body: "We look at where you are now and create a realistic, understandable training structure." },
          { number: "03", title: "Build strength", body: "We train consistently, adjust with purpose and make progress tangible rather than perfect." },
        ],
        imageAlt: "Solomiia explaining a movement in the training studio.",
      },
      expectations: {
        eyebrow: "What to expect",
        title: "Coaching that takes you seriously.",
        intro: "No shortcuts, no shame and no one-size-fits-all plans. Instead: clarity, respect and coaching that is allowed to fit you.",
        items: [
          { title: "A personal framework", body: "Your goals, routine and experience shape the path — not a pre-set ideal.", icon: "message" },
          { title: "Progress you understand", body: "You know what we are working on, why it matters and how you are developing.", icon: "target" },
          { title: "Strength without pressure", body: "Consistency can be challenging without intimidation, body shaming or unrealistic promises.", icon: "spark" },
        ],
      },
      testimonials: {
        id: "voices",
        eyebrow: "Voices",
        title: "This is what",
        accent: "progress can feel like.",
        items: [
          {
            name: "Diana",
            quote: "Through Solomiia, I found a connection to my body — and through that, to my mind as well. That’s why I can wholeheartedly recommend her to all my friends.",
            context: "Training with Solomiia",
            image: "/images/testimonials/diana-portrait.png",
            imagePosition: "50% 65%",
          },
          {
            name: "Lisa",
            quote: "After ten years of training at the gym, I had forgotten how to listen to my body. Solomiia showed me how to reconnect with it.",
            context: "Training with Solomiia",
            image: "/images/testimonials/lisa-portrait-v2.webp",
            imagePosition: "50% 50%",
          },
          {
            name: "Flo",
            quote: "As a beginner, I didn’t know where to start. With Solomiia’s guidance, I found my way into training. Today it’s a regular part of my life.",
            context: "Training with Solomiia",
            image: "/images/testimonials/flo-portrait.webp",
            imagePosition: "50% 50%",
          },
        ],
      },
      faq: {
        eyebrow: "FAQ",
        title: "Questions before your first session.",
        intro: "Have a question? Use the contact form — personally and without pressure.",
        items: [
          { question: "Who is the coaching for?", answer: "For adult women who want to build strength, technique, confidence and movement quality — whether you are just beginning or already have training experience." },
          { question: "Where does training take place?", answer: "Personal training takes place in Vienna by individual arrangement. We agree on the specific location together. Online coaching is also available on request." },
          { question: "Do I need training experience?", answer: "No. Your starting point, pace and exercises are adapted to your experience. You do not need to prove anything before you begin." },
          { question: "How long is a session?", answer: "Personal and partner sessions are 60 minutes. The 10-session block includes ten 60-minute sessions and an individual training plan." },
          { question: "How does online coaching work?", answer: "The scope and format are arranged around your goal and routine. Use the contact form so we can clarify what kind of support makes sense for you." },
          { question: "How do I arrange an intro call?", answer: "Send me a few lines about your goal through the contact form. We will then schedule a free 15-minute introduction." },
          { question: "Is the training a medical treatment?", answer: "No. Coaching does not replace medical diagnosis, therapy or physiotherapy. If you have health concerns, please confirm your readiness to train with qualified medical professionals." },
        ],
      },
      contact: {
        id: "contact",
        eyebrow: "Real strength. Real you.",
        title: "You do not need a perfect start.",
        accent: "You are allowed to simply begin.",
        body: "Tell me what you want to work toward. Together we will find the next step that fits you.",
        directContact: "Or email me directly:",
        firstNameLabel: "First name",
        firstNamePlaceholder: "Your first name",
        emailLabel: "Email address",
        emailPlaceholder: "you@example.com",
        phoneLabel: "Phone number",
        phonePlaceholder: "+43 660 1234567",
        messageLabel: "Short message",
        messagePlaceholder: "Tell me briefly about your goal and what you are interested in.",
        requiredNote: "All fields are required.",
        sensitiveDataNote: "Please do not send diagnoses or medical documents through this form.",
        privacyPrefix: "When you submit the form, your information is sent through FormSubmit to handle your enquiry.",
        privacyLink: "Read the privacy notice",
        submit: "Send enquiry",
        submitting: "Sending …",
        successMessage: "Thank you! Your enquiry has arrived. I’ll get back to you as soon as possible.",
        errorMessage: "Something went wrong. Please try again or email me directly.",
      },
      footer: {
        closingLine: "Train for strength that carries you through life.",
        disciplines: ["Strength", "Functional Fitness", "Calisthenics"],
        legalNotice: "Legal notice",
        privacy: "Privacy",
        consent: "Privacy settings",
        copyright: "All rights reserved.",
      },
      seo: {
        title: "Solomiia Badun | Personal Training for Women in Vienna",
        description: "Personal training for women in Vienna and online: strength training, functional fitness and calisthenics with Solomiia Badun.",
        ogAlt: "Solomiia Badun – Strength Coach for Women in Vienna and online",
      },
    },
  },
};

export function getSiteCopy(locale: Locale): LocalizedSiteCopy {
  return siteConfig.locales[locale];
}
