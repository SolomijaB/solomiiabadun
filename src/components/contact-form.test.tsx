import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/components/contact-form";
import { getSiteCopy } from "@/content/site";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.ComponentProps<"a">) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean })
  .IS_REACT_ACT_ENVIRONMENT = true;

interface RenderResult {
  container: HTMLDivElement;
  root: Root;
}

const mountedRoots: RenderResult[] = [];

async function renderForm(): Promise<RenderResult> {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const result = { container, root };
  mountedRoots.push(result);

  await act(async () => {
    root.render(<ContactForm copy={getSiteCopy("de")} />);
  });

  return result;
}

function setFormValues(form: HTMLFormElement) {
  const values = {
    firstName: "Diana",
    email: "diana@example.com",
    phone: "+43 660 1234567",
    message: "Ich interessiere mich für Personal Training.",
  };

  for (const [name, value] of Object.entries(values)) {
    const field = form.elements.namedItem(name);
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) {
      throw new Error(`Missing form field: ${name}`);
    }
    field.value = value;
  }

  return values;
}

async function submit(form: HTMLFormElement) {
  await act(async () => {
    form.dispatchEvent(new SubmitEvent("submit", { bubbles: true, cancelable: true }));
    await Promise.resolve();
  });
}

beforeEach(() => {
  document.body.innerHTML = "";
});

afterEach(async () => {
  for (const { root } of mountedRoots.splice(0)) {
    await act(async () => {
      root.unmount();
    });
  }

  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("ContactForm", () => {
  it("uses FormSubmit AJAX with the native endpoint and Padel hidden fields", async () => {
    const { container } = await renderForm();
    const form = container.querySelector("form");

    expect(form).toBeInstanceOf(HTMLFormElement);
    expect(form?.action).toBe(
      "https://formsubmit.co/solomiiabadun@outlook.com",
    );
    expect(form?.method).toBe("post");
    expect(
      form?.querySelector<HTMLInputElement>('input[name="_subject"]')?.value,
    ).toBe("Neue Anfrage über solomiiabadun.com");
    expect(
      form?.querySelector<HTMLInputElement>('input[name="_template"]')?.value,
    ).toBe("table");

    const honeypot = form?.querySelector<HTMLInputElement>('input[name="_honey"]');
    expect(honeypot?.type).toBe("text");
    expect(honeypot?.tabIndex).toBe(-1);
    expect(honeypot?.autocomplete).toBe("off");
  });

  it("submits all four fields by AJAX, resets the form and shows success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: "true" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const { container } = await renderForm();
    const form = container.querySelector("form");
    if (!(form instanceof HTMLFormElement)) throw new Error("Missing contact form");
    const values = setFormValues(form);

    await submit(form);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(
      "https://formsubmit.co/ajax/solomiiabadun@outlook.com",
    );
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({ Accept: "application/json" });
    expect(init.body).toBeInstanceOf(FormData);
    const submittedData = Object.fromEntries((init.body as FormData).entries());
    expect(submittedData).toMatchObject(values);
    expect(submittedData).toMatchObject({
      _subject: "Neue Anfrage über solomiiabadun.com",
      _template: "table",
      _honey: "",
    });
    expect(form.elements.namedItem("firstName")).toHaveProperty("value", "");

    const status = container.querySelector<HTMLElement>('[role="status"]');
    expect(status?.textContent).toContain("Danke!");
    expect(document.activeElement).toBe(status);
  });

  it("falls back to the native submission after an HTTP error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("error", { status: 503 })),
    );
    const nativeSubmit = vi
      .spyOn(HTMLFormElement.prototype, "submit")
      .mockImplementation(() => undefined);
    const { container } = await renderForm();
    const form = container.querySelector("form");
    if (!(form instanceof HTMLFormElement)) throw new Error("Missing contact form");
    setFormValues(form);

    await submit(form);

    expect(nativeSubmit).toHaveBeenCalledTimes(1);
    expect(container.querySelector('[role="status"]')?.textContent).toContain(
      "nicht geklappt",
    );
  });

  it("falls back to the native submission after a network error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));
    const nativeSubmit = vi
      .spyOn(HTMLFormElement.prototype, "submit")
      .mockImplementation(() => undefined);
    const { container } = await renderForm();
    const form = container.querySelector("form");
    if (!(form instanceof HTMLFormElement)) throw new Error("Missing contact form");
    setFormValues(form);

    await submit(form);

    expect(nativeSubmit).toHaveBeenCalledTimes(1);
    expect(container.querySelector('[role="status"]')?.textContent).toContain(
      "nicht geklappt",
    );
  });
});
