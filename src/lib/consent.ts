import { siteConfig } from "@/content/site";

export type ConsentValue = "necessary" | "statistics";
export type ConsentSnapshot = ConsentValue | null | undefined;

export const CONSENT_STORAGE_KEY = siteConfig.consentStorageKey;
export const CONSENT_CHANGE_EVENT = "solomiia-badun:consent-change";
export const CONSENT_OPEN_EVENT = "solomiia-badun:consent-open";

interface ConsentChangeDetail {
  value: ConsentValue | null;
}

interface ConsentOpenDetail {
  trigger?: HTMLElement;
}

type AnalyticsBeforeSend = (event: unknown) => unknown | null;

interface AnalyticsWindow extends Window {
  va?: (
    event: "beforeSend" | "event" | "pageview",
    properties?: unknown,
  ) => void;
  vaq?: [string, unknown?][];
}

const blockAnalyticsEvent: AnalyticsBeforeSend = () => null;

function getBrowserStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function parseConsent(value: string | null): ConsentValue | null {
  return value === "necessary" || value === "statistics" ? value : null;
}

export function readStoredConsent(
  storage: Storage | null = getBrowserStorage(),
): ConsentValue | null {
  if (!storage) {
    return null;
  }

  try {
    return parseConsent(storage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function readConsentSnapshot(): ConsentSnapshot {
  return readStoredConsent();
}

export function readServerConsentSnapshot(): ConsentSnapshot {
  return undefined;
}

export function storeConsent(
  value: ConsentValue,
  storage: Storage | null = getBrowserStorage(),
): boolean {
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(CONSENT_STORAGE_KEY, value);
    return true;
  } catch {
    return false;
  }
}

export function announceConsentChange(value: ConsentValue | null): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<ConsentChangeDetail>(CONSENT_CHANGE_EVENT, {
      detail: { value },
    }),
  );
}

export function requestConsentSettings(trigger?: HTMLElement): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<ConsentOpenDetail>(CONSENT_OPEN_EVENT, {
      detail: { trigger },
    }),
  );
}

/**
 * Vercel Web Analytics exposes a beforeSend hook specifically for cancelling
 * events. Setting it to an always-null callback stops queued and future events
 * after consent is withdrawn without relying on script removal.
 */
export function disableVercelAnalytics(): void {
  if (typeof window === "undefined") {
    return;
  }

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.va?.("beforeSend", blockAnalyticsEvent);

  if (Array.isArray(analyticsWindow.vaq)) {
    analyticsWindow.vaq = [["beforeSend", blockAnalyticsEvent]];
  }
}

export function isConsentChangeEvent(
  event: Event,
): event is CustomEvent<ConsentChangeDetail> {
  if (!(event instanceof CustomEvent)) {
    return false;
  }

  return (
    typeof event.detail === "object" &&
    event.detail !== null &&
    "value" in event.detail &&
    parseConsent(String(event.detail.value)) === event.detail.value
  );
}

export function subscribeToConsent(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== CONSENT_STORAGE_KEY) {
      return;
    }

    if (parseConsent(event.newValue) !== "statistics") {
      disableVercelAnalytics();
    }

    onStoreChange();
  };

  const handleCurrentTabChange = (event: Event) => {
    if (!isConsentChangeEvent(event)) {
      return;
    }

    if (event.detail.value !== "statistics") {
      disableVercelAnalytics();
    }

    onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CONSENT_CHANGE_EVENT, handleCurrentTabChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CONSENT_CHANGE_EVENT, handleCurrentTabChange);
  };
}
