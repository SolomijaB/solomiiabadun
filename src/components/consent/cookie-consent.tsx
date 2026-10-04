"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import type { Locale } from "@/content/site";
import {
  announceConsentChange,
  CONSENT_OPEN_EVENT,
  type ConsentValue,
  disableVercelAnalytics,
  readConsentSnapshot,
  readServerConsentSnapshot,
  readStoredConsent,
  storeConsent,
  subscribeToConsent,
} from "@/lib/consent";

interface CookieConsentProps {
  locale?: Locale;
  privacyHref?: string;
  className?: string;
}

interface ConsentCopy {
  eyebrow: string;
  initialTitle: string;
  settingsTitle: string;
  body: string;
  necessary: string;
  statistics: string;
  privacy: string;
  close: string;
  currentSelection: string;
  selectionLabels: Record<ConsentValue, string>;
}

const copy: Record<Locale, ConsentCopy> = {
  de: {
    eyebrow: "Datenschutz",
    initialTitle: "Deine Privatsphäre. Deine Entscheidung.",
    settingsTitle: "Datenschutz-Einstellungen",
    body: "Technisch notwendige Speicherung hält deine Auswahl fest. Vercel Web Analytics wird nur mit deiner Einwilligung aktiviert. Du kannst deine Entscheidung jederzeit hier ändern.",
    necessary: "Nur notwendig",
    statistics: "Statistik erlauben",
    privacy: "Mehr zum Datenschutz",
    close: "Einstellungen schließen",
    currentSelection: "Aktuelle Auswahl",
    selectionLabels: {
      necessary: "Nur notwendig",
      statistics: "Statistik erlaubt",
    },
  },
  en: {
    eyebrow: "Privacy",
    initialTitle: "Your privacy. Your choice.",
    settingsTitle: "Privacy settings",
    body: "Strictly necessary storage remembers your choice. Vercel Web Analytics is activated only with your consent. You can change your decision here at any time.",
    necessary: "Necessary only",
    statistics: "Allow statistics",
    privacy: "Read our privacy information",
    close: "Close settings",
    currentSelection: "Current choice",
    selectionLabels: {
      necessary: "Necessary only",
      statistics: "Statistics allowed",
    },
  },
};

type DialogMode = "initial" | "settings" | null;

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function inferLocale(
  explicitLocale: Locale | undefined,
  pathname: string | null,
): Locale {
  if (explicitLocale) {
    return explicitLocale;
  }

  return pathname === "/en" || pathname?.startsWith("/en/")
    ? "en"
    : "de";
}

function ConsentedAnalytics({ enabled }: { enabled: boolean }) {
  const allowOnlyWithStoredConsent = useCallback(
    (event: BeforeSendEvent): BeforeSendEvent | null =>
      readStoredConsent() === "statistics" ? event : null,
    [],
  );

  useEffect(() => {
    if (!enabled) {
      disableVercelAnalytics();
    }
  }, [enabled]);

  return enabled ? <Analytics beforeSend={allowOnlyWithStoredConsent} /> : null;
}

export function CookieConsent({
  locale,
  privacyHref,
  className,
}: CookieConsentProps) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readConsentSnapshot,
    readServerConsentSnapshot,
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const activeLocale = inferLocale(locale, pathname);
  const currentCopy = copy[activeLocale];
  const resolvedPrivacyHref =
    privacyHref ?? (activeLocale === "en" ? "/en/privacy" : "/datenschutz");
  const dialogMode: DialogMode = settingsOpen
    ? "settings"
    : consent === null
      ? "initial"
      : null;

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    const focusTarget = restoreFocusRef.current;

    window.setTimeout(() => {
      if (focusTarget?.isConnected) {
        focusTarget.focus();
      }
    }, 0);
  }, []);

  const chooseConsent = useCallback(
    (nextConsent: ConsentValue) => {
      storeConsent(nextConsent);
      if (nextConsent !== "statistics") {
        disableVercelAnalytics();
      }
      announceConsentChange(nextConsent);
      setSettingsOpen(false);

      const focusTarget = restoreFocusRef.current;
      window.setTimeout(() => {
        if (focusTarget?.isConnected) {
          focusTarget.focus();
        }
      }, 0);
    },
    [],
  );

  useEffect(() => {
    const openSettings = (event: Event) => {
      const trigger =
        event instanceof CustomEvent &&
        event.detail?.trigger instanceof HTMLElement
          ? event.detail.trigger
          : null;
      restoreFocusRef.current =
        trigger ??
        (document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null);
      setSettingsOpen(true);
    };

    window.addEventListener(CONSENT_OPEN_EVENT, openSettings);

    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, openSettings);
    };
  }, []);

  useEffect(() => {
    if (!dialogMode) {
      return;
    }

    dialogRef.current?.focus();
  }, [dialogMode]);

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && dialogMode === "settings") {
      event.preventDefault();
      closeSettings();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (document.activeElement === dialogRef.current) {
      event.preventDefault();
      (event.shiftKey ? lastElement : firstElement)?.focus();
    } else if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const isOpen = dialogMode !== null;
  const classes = ["consent-layer", className].filter(Boolean).join(" ");

  return (
    <>
      <ConsentedAnalytics enabled={consent === "statistics"} />

      {isOpen ? (
        <div className={classes} data-consent-mode={dialogMode}>
          <div className="consent-layer__backdrop" aria-hidden="true" />
          <div
            ref={dialogRef}
            className="consent-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            onKeyDown={handleDialogKeyDown}
          >
            <div className="consent-dialog__header">
              <p className="consent-dialog__eyebrow">{currentCopy.eyebrow}</p>
              {dialogMode === "settings" ? (
                <button
                  type="button"
                  className="consent-dialog__close"
                  aria-label={currentCopy.close}
                  onClick={closeSettings}
                >
                  <span aria-hidden="true">×</span>
                </button>
              ) : null}
            </div>

            <h2 id={titleId} className="consent-dialog__title">
              {dialogMode === "settings"
                ? currentCopy.settingsTitle
                : currentCopy.initialTitle}
            </h2>
            <p id={descriptionId} className="consent-dialog__description">
              {currentCopy.body}
            </p>

            {dialogMode === "settings" && consent ? (
              <p className="consent-dialog__status" aria-live="polite">
                {currentCopy.currentSelection}: {currentCopy.selectionLabels[consent]}
              </p>
            ) : null}

            <div className="consent-dialog__actions">
              <button
                type="button"
                className="consent-dialog__action"
                data-consent-choice="necessary"
                onClick={() => chooseConsent("necessary")}
              >
                {currentCopy.necessary}
              </button>
              <button
                type="button"
                className="consent-dialog__action"
                data-consent-choice="statistics"
                onClick={() => chooseConsent("statistics")}
              >
                {currentCopy.statistics}
              </button>
            </div>

            <a className="consent-dialog__privacy-link" href={resolvedPrivacyHref}>
              {currentCopy.privacy}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
