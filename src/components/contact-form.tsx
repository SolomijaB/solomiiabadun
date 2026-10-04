"use client";

import Link from "next/link";
import { IconArrowUpRight, IconSend } from "@tabler/icons-react";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { siteConfig, type LocalizedSiteCopy } from "@/content/site";

const FORM_SUBMIT_AJAX_ENDPOINT = `https://formsubmit.co/ajax/${siteConfig.email}`;
const FORM_SUBMIT_FALLBACK_ENDPOINT = `https://formsubmit.co/${siteConfig.email}`;
const FORM_SUBMIT_SUBJECT = `Neue Anfrage über ${siteConfig.domain}`;
const CONTACT_FORM_LIMITS = {
  firstName: 80,
  email: 254,
  phone: 40,
  message: 1_500,
} as const;

type ContactFormStatus = "idle" | "submitting" | "success" | "error";

const privacyPaths = {
  de: "/datenschutz",
  en: "/en/privacy",
} as const;

export function ContactForm({ copy }: { copy: LocalizedSiteCopy }) {
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const statusRef = useRef<HTMLParagraphElement>(null);
  const formCopy = copy.contact;

  useEffect(() => {
    if (status !== "idle") {
      statusRef.current?.focus();
    }
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");

    try {
      const response = await fetch(FORM_SUBMIT_AJAX_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) {
        setStatus("error");
        form.submit();
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      form.submit();
    }
  };

  const statusMessage =
    status === "submitting"
      ? formCopy.submitting
      : status === "success"
        ? formCopy.successMessage
        : status === "error"
          ? formCopy.errorMessage
          : "";

  return (
    <form
      action={FORM_SUBMIT_FALLBACK_ENDPOINT}
      method="POST"
      onSubmit={handleSubmit}
      className="contact-form"
      aria-busy={status === "submitting"}
    >
      <input type="hidden" name="_subject" value={FORM_SUBMIT_SUBJECT} />
      <input type="hidden" name="_template" value="table" />
      <input
        className="contact-form__trap"
        name="_honey"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <p className="contact-form__required">{formCopy.requiredNote}</p>

      <div className="contact-form__grid">
        <div className="contact-field">
          <label htmlFor={`contact-${copy.locale}-first-name`}>
            {formCopy.firstNameLabel}
          </label>
          <input
            id={`contact-${copy.locale}-first-name`}
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={CONTACT_FORM_LIMITS.firstName}
            placeholder={formCopy.firstNamePlaceholder}
            required
          />
        </div>

        <div className="contact-field">
          <label htmlFor={`contact-${copy.locale}-email`}>
            {formCopy.emailLabel}
          </label>
          <input
            id={`contact-${copy.locale}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={CONTACT_FORM_LIMITS.email}
            placeholder={formCopy.emailPlaceholder}
            required
          />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor={`contact-${copy.locale}-phone`}>
          {formCopy.phoneLabel}
        </label>
        <input
          id={`contact-${copy.locale}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={CONTACT_FORM_LIMITS.phone}
          placeholder={formCopy.phonePlaceholder}
          required
        />
      </div>

      <div className="contact-field">
        <label htmlFor={`contact-${copy.locale}-message`}>
          {formCopy.messageLabel}
        </label>
        <textarea
          id={`contact-${copy.locale}-message`}
          name="message"
          rows={5}
          maxLength={CONTACT_FORM_LIMITS.message}
          placeholder={formCopy.messagePlaceholder}
          required
        />
      </div>

      <p className="contact-form__sensitive-note">{formCopy.sensitiveDataNote}</p>
      <p className="contact-form__privacy">
        {formCopy.privacyPrefix}{" "}
        <Link href={privacyPaths[copy.locale]}>
          {formCopy.privacyLink}
          <IconArrowUpRight aria-hidden="true" size={14} stroke={1.7} />
        </Link>
      </p>

      <div className="contact-form__footer">
        <button
          className="button button--dark contact-form__submit"
          type="submit"
          disabled={status === "submitting"}
        >
          <IconSend aria-hidden="true" size={17} stroke={1.7} />
          <span>{status === "submitting" ? formCopy.submitting : formCopy.submit}</span>
        </button>
        <p
          ref={statusRef}
          id={`contact-${copy.locale}-status`}
          className="contact-form__status"
          data-status={status}
          role="status"
          aria-live="polite"
          tabIndex={-1}
        >
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
