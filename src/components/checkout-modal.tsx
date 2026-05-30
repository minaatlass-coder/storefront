"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  useCart,
  getCartLines,
  getSubtotal,
  type LastOrder,
} from "@/lib/cart-store";
import { products } from "@/data/products";
import { formatMad } from "@/lib/format";
import { href } from "@/lib/href";
import { createEventId, track } from "@/lib/analytics";
import { getMarketingContext } from "@/lib/marketing-context";
import {
  getLineTitle,
  productNameClassName,
  productNameLangAttrs,
} from "@/lib/product-locale";
import { normalizePhone, validateAddress, validateName } from "@/lib/phone";
import { generateOrderId, pickUpsell } from "@/lib/order";
import type { ProductSlug } from "@/lib/types";
import type { Messages } from "@/messages";
import { t } from "@/messages";
import { useMessages } from "./messages-context";

function translateServerError(messages: Messages, err: unknown): string {
  if (typeof err !== "string" || !err.includes(".")) {
    return t(messages, "checkout.errGeneric");
  }
  const s = t(messages, err);
  if (s && s !== err) return s;
  return t(messages, "checkout.errGeneric");
}

export function CheckoutModal() {
  const { locale, messages } = useMessages();
  const open = useCart((s) => s.checkoutOpen);
  const items = useCart((s) => s.items);
  const closeCheckout = useCart((s) => s.closeCheckout);
  const setLastOrder = useCart((s) => s.setLastOrder);
  const showUpsellAfterOrder = useCart((s) => s.showUpsellAfterOrder);
  const clear = useCart((s) => s.clear);
  const router = useRouter();

  const lines = getCartLines(items);
  const subtotal = getSubtotal(items);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !submitting) closeCheckout();
    }
    window.addEventListener("keydown", onKey);
    const focusTid = setTimeout(() => nameRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(focusTid);
    };
  }, [open, closeCheckout, submitting]);

  function validate(): boolean {
    const nameRes = validateName(name);
    const addressRes = validateAddress(address);
    const phoneRes = normalizePhone(phone);
    setNameError(
      nameRes.ok ? null : (nameRes.errorKey ? t(messages, nameRes.errorKey) : null),
    );
    setPhoneError(
      phoneRes.ok ? null : (phoneRes.errorKey ? t(messages, phoneRes.errorKey) : null),
    );
    setAddressError(
      addressRes.ok
        ? null
        : (addressRes.errorKey ? t(messages, addressRes.errorKey) : null),
    );
    return nameRes.ok && addressRes.ok && phoneRes.ok;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    if (lines.length === 0) return;

    const upsellSlug: ProductSlug | null = pickUpsell(items);
    const eventId = createEventId("purchase");
    const context = getMarketingContext();
    track("submit_order_attempt", {
      subtotal,
      item_count: lines.length,
      event_id: eventId,
    });

    const orderId = generateOrderId();
    const phoneRes = normalizePhone(phone);
    const normalizedPhone = phoneRes.ok && phoneRes.phone ? phoneRes.phone : phone.trim();
    const requestBody = {
      event: "order_created",
      event_id: eventId,
      order_id: orderId,
      source: "website",
      source_url: typeof window !== "undefined" ? window.location.href : "",
      context,
      name,
      address,
      phone,
      items: lines.map((l) => ({ slug: l.slug, qty: l.qty })),
      website,
    };

    if (upsellSlug) {
      showUpsellAfterOrder(
        {
          order_id: orderId,
          name: name.trim(),
          address: address.trim(),
          phone: normalizedPhone,
          created_at: new Date().toISOString(),
          items: lines.map((l) => ({
            sku: l.slug,
            name_fr: l.nameFr,
            qty: l.qty,
            unit_price: l.unitPrice,
            line_total: l.lineTotal,
          })),
          items_subtotal: subtotal,
          upsell: null,
          total: subtotal,
        },
        upsellSlug,
      );

      void fetch("/api/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
        keepalive: true,
      })
        .then(async (res) => {
          let data: Record<string, unknown> = {};
          try {
            data = (await res.json()) as Record<string, unknown>;
          } catch {
            data = { error: "invalid_json" };
          }
          if (!res.ok || !data.ok) {
            track("submit_order_error", {
              event_id: eventId,
              status: res.status,
              order_id: orderId,
              error: data.error,
            });
            return;
          }
          track("submit_order_success", {
            event_id: eventId,
            order_id: orderId,
            total: subtotal,
            currency: "MAD",
            name: name.trim(),
            address: address.trim(),
            phone: normalizedPhone,
            item_count: lines.length,
          });
        })
        .catch((err) => {
          track("submit_order_error", {
            event_id: eventId,
            order_id: orderId,
            error: String(err),
          });
        });
      return;
    }

    setSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30_000);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      let data: Record<string, unknown>;
      try {
        data = (await res.json()) as Record<string, unknown>;
      } catch {
        track("submit_order_error", {
          event_id: eventId,
          status: res.status,
          error: "invalid_json",
        });
        setSubmitError(t(messages, "checkout.errJson"));
        setSubmitting(false);
        return;
      }

      if (!res.ok || !data.ok) {
        track("submit_order_error", {
          event_id: eventId,
          status: res.status,
          error: data.error,
        });
        setSubmitError(translateServerError(messages, data.error));
        setSubmitting(false);
        return;
      }

      const order: LastOrder = {
        order_id: data.order_id as string,
        name: data.name as string,
        address: data.address as string,
        phone: data.phone as string,
        created_at: data.created_at as string,
        items: data.items as LastOrder["items"],
        items_subtotal: data.items_subtotal as number,
        upsell: null,
        total: data.order_total as number,
      };
      setLastOrder(order);
      track("submit_order_success", {
        event_id: eventId,
        order_id: data.order_id,
        total: data.order_total,
        currency: "MAD",
        name: data.name,
        address: data.address,
        phone: data.phone,
        item_count: (data.items as LastOrder["items"]).length,
      });

      setSubmitting(false);
      closeCheckout();
      clear();
      router.push(href(locale, `/merci/${data.order_id as string}`));
    } catch (err) {
      const aborted =
        err instanceof DOMException && err.name === "AbortError";
      track("submit_order_error", {
        event_id: eventId,
        error: aborted ? "timeout" : String(err),
      });
      setSubmitError(
        aborted ? t(messages, "checkout.errTimeout") : t(messages, "checkout.errNetwork"),
      );
      setSubmitting(false);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  const canSubmit =
    name.trim().length >= 3 &&
    address.trim().length >= 8 &&
    phone.replace(/\D/g, "").length >= 9 &&
    !submitting;

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={() => !submitting && closeCheckout()}
        className={`fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] flex items-end justify-center p-0 transition sm:items-center sm:p-4 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`relative flex h-full w-full max-w-md flex-col overflow-hidden bg-sand shadow-2xl transition-transform sm:h-auto sm:max-h-[92vh] sm:rounded-3xl ${
            open ? "translate-y-0 scale-100" : "translate-y-4 scale-[0.98]"
          }`}
        >
          <header className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2
              id="checkout-title"
              className="font-serif text-lg text-ink sm:text-xl"
            >
              {messages.checkout.title}
            </h2>
            <button
              type="button"
              onClick={closeCheckout}
              disabled={submitting}
              aria-label={messages.checkout.close}
              className="rounded-full p-2 text-ink hover:bg-cream disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <section className="rounded-2xl border border-border bg-cream p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                {messages.checkout.recap}
              </p>
              <ul className="mt-3 space-y-2">
                {lines.map((l) => {
                  const p = products[l.slug];
                  return (
                    <li
                      key={l.slug}
                      className="flex items-baseline justify-between gap-3 text-sm"
                    >
                      <span
                        {...productNameLangAttrs(locale)}
                        className={`text-ink-soft ${productNameClassName(locale)}`}
                      >
                        {getLineTitle(p, locale)}
                        <span className="text-muted"> × {l.qty}</span>
                      </span>
                      <span className="font-semibold text-ink">
                        {formatMad(l.lineTotal, locale)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
                <span className="text-sm text-ink-soft">
                  {messages.checkout.totalCod}
                </span>
                <span className="font-serif text-2xl text-ink">
                  {formatMad(subtotal, locale)}
                </span>
              </div>
            </section>

            <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="ck-name"
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink"
                >
                  {messages.checkout.name}
                </label>
                <input
                  ref={nameRef}
                  id="ck-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => {
                    const r = validateName(name);
                    setNameError(
                      r.ok ? null : (r.errorKey ? t(messages, r.errorKey) : null),
                    );
                  }}
                  aria-invalid={Boolean(nameError)}
                  aria-describedby={nameError ? "ck-name-err" : undefined}
                  className="mt-1 w-full rounded-xl border border-border bg-cream px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                />
                {nameError && (
                  <p id="ck-name-err" className="mt-1 text-xs text-red-700">
                    {nameError}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="ck-address"
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink"
                >
                  {messages.checkout.address}
                </label>
                <input
                  id="ck-address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  placeholder={messages.checkout.addressHelp}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={() => {
                    const r = validateAddress(address);
                    setAddressError(
                      r.ok ? null : (r.errorKey ? t(messages, r.errorKey) : null),
                    );
                  }}
                  aria-invalid={Boolean(addressError)}
                  aria-describedby={addressError ? "ck-address-err" : "ck-address-help"}
                  className="mt-1 w-full rounded-xl border border-border bg-cream px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                />
                {addressError ? (
                  <p id="ck-address-err" className="mt-1 text-xs text-red-700">
                    {addressError}
                  </p>
                ) : (
                  <p id="ck-address-help" className="mt-1 text-xs text-muted">
                    {messages.checkout.addressHelp}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="ck-phone"
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink"
                >
                  {messages.checkout.phone}
                </label>
                <input
                  id="ck-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="0612345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => {
                    const r = normalizePhone(phone);
                    setPhoneError(
                      r.ok ? null : (r.errorKey ? t(messages, r.errorKey) : null),
                    );
                  }}
                  aria-invalid={Boolean(phoneError)}
                  aria-describedby={phoneError ? "ck-phone-err" : "ck-phone-help"}
                  className="mt-1 w-full rounded-xl border border-border bg-cream px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                />
                {phoneError ? (
                  <p id="ck-phone-err" className="mt-1 text-xs text-red-700">
                    {phoneError}
                  </p>
                ) : (
                  <p id="ck-phone-help" className="mt-1 text-xs text-muted">
                    {messages.checkout.phoneHelp}
                  </p>
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

              <p className="text-xs text-ink-soft">{messages.checkout.consent}</p>

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
                disabled={!canSubmit}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 text-base font-semibold text-sand transition hover:bg-emerald disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Spinner /> {messages.checkout.validating}
                  </>
                ) : (
                  <>
                    {messages.checkout.submit} {formatMad(subtotal, locale)}
                  </>
                )}
              </button>

              <ul className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-[0.12em] text-muted">
                <li>{messages.checkout.trust1}</li>
                <li>{messages.checkout.trust2}</li>
                <li>{messages.checkout.trust3}</li>
              </ul>

              <p className="pt-2 text-center text-[11px] text-muted">
                {messages.checkout.privacyBefore}{" "}
                <Link
                  href={href(locale, "/confidentialite")}
                  className="underline-offset-2 hover:text-ink hover:underline"
                >
                  {messages.checkout.privacyLink}
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.25"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
