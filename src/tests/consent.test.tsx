import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  ConsentSettingsButton,
  CookieConsent,
} from "@/components/consent";
import { siteConfig } from "@/content/site";
import {
  CONSENT_STORAGE_KEY,
  parseConsent,
  readStoredConsent,
  storeConsent,
} from "@/lib/consent";

vi.mock("@vercel/analytics/next", () => ({
  Analytics: () => <span data-testid="vercel-analytics" />,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean })
  .IS_REACT_ACT_ENVIRONMENT = true;

function createMemoryStorage(): Storage {
  const values = new Map<string, string>();

  return {
    get length() {
      return values.size;
    },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => Array.from(values.keys())[index] ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, String(value)),
  };
}

Object.defineProperty(window, "localStorage", {
  configurable: true,
  value: createMemoryStorage(),
});

interface RenderResult {
  container: HTMLDivElement;
  root: Root;
}

const mountedRoots: RenderResult[] = [];

async function render(ui: React.ReactNode): Promise<RenderResult> {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const result = { container, root };
  mountedRoots.push(result);

  await act(async () => {
    root.render(ui);
  });

  return result;
}

async function click(element: Element | null): Promise<void> {
  if (!(element instanceof HTMLElement)) {
    throw new Error("Expected a clickable element");
  }

  await act(async () => {
    element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

beforeEach(() => {
  window.localStorage.clear();
  document.body.innerHTML = "";
  delete window.va;
  delete window.vaq;
  vi.useRealTimers();
});

afterEach(async () => {
  for (const { root } of mountedRoots.splice(0)) {
    await act(async () => {
      root.unmount();
    });
  }

  vi.restoreAllMocks();
});

describe("consent storage", () => {
  it("accepts only the two supported consent values", () => {
    expect(parseConsent("necessary")).toBe("necessary");
    expect(parseConsent("statistics")).toBe("statistics");
    expect(parseConsent("marketing")).toBeNull();
    expect(parseConsent(null)).toBeNull();
  });

  it("persists consent under the key from siteConfig", () => {
    expect(CONSENT_STORAGE_KEY).toBe(siteConfig.consentStorageKey);
    expect(storeConsent("statistics")).toBe(true);
    expect(window.localStorage.getItem(siteConfig.consentStorageKey)).toBe(
      "statistics",
    );
    expect(readStoredConsent()).toBe("statistics");
  });
});

describe("CookieConsent", () => {
  it("shows an accessible first-visit dialog without loading analytics", async () => {
    const { container } = await render(<CookieConsent locale="de" />);
    const dialog = container.querySelector('[role="dialog"]');
    const actions = container.querySelectorAll(".consent-dialog__action");

    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    expect(document.activeElement).toBe(dialog);
    expect(actions).toHaveLength(2);
    expect(actions[0]?.className).toBe(actions[1]?.className);
    expect(container.querySelector('[data-testid="vercel-analytics"]')).toBeNull();
  });

  it("keeps keyboard focus inside the consent dialog", async () => {
    const { container } = await render(<CookieConsent locale="de" />);
    const dialog = container.querySelector('[role="dialog"]');
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(
        '.consent-dialog button, .consent-dialog a[href]',
      ),
    );

    await act(async () => {
      dialog?.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
      );
    });
    expect(document.activeElement).toBe(focusable[0]);

    focusable.at(-1)?.focus();
    await act(async () => {
      dialog?.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
      );
    });
    expect(document.activeElement).toBe(focusable[0]);
  });

  it("stores necessary-only consent without loading analytics", async () => {
    const { container } = await render(<CookieConsent locale="de" />);

    await click(container.querySelector('[data-consent-choice="necessary"]'));

    expect(readStoredConsent()).toBe("necessary");
    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(container.querySelector('[data-testid="vercel-analytics"]')).toBeNull();
  });

  it("loads Vercel Analytics only after statistics consent", async () => {
    const { container } = await render(<CookieConsent locale="de" />);

    expect(container.querySelector('[data-testid="vercel-analytics"]')).toBeNull();
    await click(container.querySelector('[data-consent-choice="statistics"]'));

    expect(readStoredConsent()).toBe("statistics");
    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(
      container.querySelector('[data-testid="vercel-analytics"]'),
    ).not.toBeNull();
  });

  it("can be reopened from the footer trigger and restores focus", async () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "necessary");
    const { container } = await render(
      <>
        <ConsentSettingsButton locale="de" />
        <CookieConsent locale="de" />
      </>,
    );
    const trigger = container.querySelector(".consent-settings-button");

    await click(trigger);

    const dialog = container.querySelector('[role="dialog"]');
    expect(document.activeElement).toBe(dialog);
    expect(dialog?.textContent).toContain("Aktuelle Auswahl: Nur notwendig");

    await act(async () => {
      dialog?.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("revokes analytics immediately when necessary-only is selected", async () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "statistics");
    const va = vi.fn();
    window.va = va;
    const { container } = await render(
      <>
        <ConsentSettingsButton locale="de" />
        <CookieConsent locale="de" />
      </>,
    );

    expect(
      container.querySelector('[data-testid="vercel-analytics"]'),
    ).not.toBeNull();
    await click(container.querySelector(".consent-settings-button"));
    await click(container.querySelector('[data-consent-choice="necessary"]'));

    expect(readStoredConsent()).toBe("necessary");
    expect(container.querySelector('[data-testid="vercel-analytics"]')).toBeNull();
    expect(va).toHaveBeenCalledWith("beforeSend", expect.any(Function));
    const blocker = va.mock.calls.at(-1)?.[1] as (event: unknown) => unknown;
    expect(blocker({ type: "pageview" })).toBeNull();
  });

  it("synchronizes consent changes from another tab", async () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "necessary");
    const { container } = await render(<CookieConsent locale="de" />);

    await act(async () => {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, "statistics");
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: CONSENT_STORAGE_KEY,
          newValue: "statistics",
        }),
      );
    });

    expect(
      container.querySelector('[data-testid="vercel-analytics"]'),
    ).not.toBeNull();

    await act(async () => {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, "necessary");
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: CONSENT_STORAGE_KEY,
          newValue: "necessary",
        }),
      );
    });

    expect(container.querySelector('[data-testid="vercel-analytics"]')).toBeNull();
  });
});
