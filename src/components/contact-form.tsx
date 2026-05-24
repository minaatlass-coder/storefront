"use client";

import { useState } from "react";
import Link from "next/link";
import { normalizePhone, validateName } from "@/lib/phone";
import { createEventId, track } from "@/lib/analytics";
import { href } from "@/lib/href";
import { getMarketingContext } from "@/lib/marketing-context";
import type { Messages } from "@/messages";
import { t } from "@/messages";
import { useMessages } from "./messages-context";

function translateApiError(messages: Messages, err: unknown): string {
  if (typeof err === "string" && err.includes(".")) {
    const s = t(messages, err);
    if (s && s !== err) return s;
  }
  return messages.contact.errSend;
}

export function ContactForm() {
  const { locale, messages: m } = useMessages();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    const nameRes = validateName(name);
    const phoneRes = normalizePhone(phone);
    const trimmed = message.trim();
    const msgErr =
      trimmed.length < 5
        ? m.contact.msgShort
        : trimmed.length > 2000
          ? m.contact.msgLong
          : null;
    setNameError(
      nameRes.ok ? null : (nameRes.errorKey ? t(m, nameRes.errorKey) : null),
    );
    setPhoneError(
      phoneRes.ok ? null : (phoneRes.errorKey ? t(m, phoneRes.errorKey) : null),
    );
    setMessageError(msgErr);
    if (!nameRes.ok || !phoneRes.ok || msgErr) return;

    setSubmitting(true);
    const eventId = createEventId("contact");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          event: "contact_message",
          event_id: eventId,
          source: "contact",
          source_url: typeof window !== "undefined" ? window.location.href : "",
          context: getMarketingContext(),
          name,
          phone,
          message: trimmed,
          website,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        track("contact_submit_error", {
          event_id: eventId,
          status: res.status,
          error: data.error,
        });
        setSubmitError(translateApiError(m, data.error));
        setSubmitting(false);
        return;
      }
      track("contact_submit_success", {
        event_id: eventId,
        name,
        phone,
      });
      setSent(true);
      setSubmitting(false);
    } catch (err) {
      track("contact_submit_error", { event_id: eventId, error: String(err) });
      setSubmitError(m.contact.errNet);
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-cream p-6 text-center">
        <p className="font-serif text-2xl text-ink">{m.contact.sentTitle}</p>
        <p className="mt-2 text-sm text-ink-soft">{m.contact.sentBody}</p>
        <Link
          href={href(locale, "/boutique")}
          className="mt-5 inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-sand transition hover:bg-emerald"
        >
          {m.contact.backShop}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label
          htmlFor="ct-name"
          className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink"
        >
          {m.contact.fullName}
        </label>
        <input
          id="ct-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-xl border border-border bg-cream px-4 py-3 text-base text-ink outline-none focus:border-ink"
        />
        {nameError && (
          <p className="mt-1 text-xs text-red-700">{nameError}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="ct-phone"
          className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink"
        >
          {m.contact.phoneL}
        </label>
        <input
          id="ct-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="0612345678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 w-full rounded-xl border border-border bg-cream px-4 py-3 text-base text-ink outline-none focus:border-ink"
        />
        {phoneError ? (
          <p className="mt-1 text-xs text-red-700">{phoneError}</p>
        ) : (
          <p className="mt-1 text-xs text-muted">{m.contact.phoneHelp}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="ct-message"
          className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink"
        >
          {m.contact.msg}
        </label>
        <textarea
          id="ct-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-xl border border-border bg-cream px-4 py-3 text-base text-ink outline-none focus:border-ink"
        />
        {messageError && (
          <p className="mt-1 text-xs text-red-700">{messageError}</p>
        )}
      </div>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      />

      {submitError && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
        >
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-sand transition hover:bg-emerald disabled:opacity-60"
      >
        {submitting ? m.contact.sending : m.contact.send}
      </button>
    </form>
  );
}
