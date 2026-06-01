"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-store";
import { products } from "@/data/products";
import { formatMad } from "@/lib/format";
import { href } from "@/lib/href";
import {
  getProductCopy,
  getProductSubtitle,
  getProductTitleShort,
  productNameClassName,
  productNameLangAttrs,
  productSubtitleClassName,
  productSubtitleLangAttrs,
} from "@/lib/product-locale";
import { track } from "@/lib/analytics";
import { getMarketingContext } from "@/lib/marketing-context";
import type { ProductSlug } from "@/lib/types";
import { ProductImage } from "./product-image";
import { useMessages } from "./messages-context";

const COUNTDOWN_SECONDS = 6;

/** Ne monte les hooks lourds que lorsque l’upsell est réellement actif (slug + commande connus). */
export function UpsellModal() {
  const open = useCart((s) => s.upsellOpen);
  const orderId = useCart((s) => s.pendingOrderId);
  const slug = useCart((s) => s.pendingUpsellSlug);

  if (!open || !slug || !orderId) {
    return null;
  }

  return <UpsellModalActive slug={slug} orderId={orderId} />;
}

function UpsellModalActive({
  slug,
  orderId,
}: {
  slug: ProductSlug;
  orderId: string;
}) {
  const { locale, messages } = useMessages();
  const open = useCart((s) => s.upsellOpen);
  const applyUpsellAccepted = useCart((s) => s.applyUpsellAccepted);
  const closeUpsell = useCart((s) => s.closeUpsell);
  const clear = useCart((s) => s.clear);
  const router = useRouter();

  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);
  const [submitting, setSubmitting] = useState(false);

  const finish = useCallback(
    (id: string) => {
      clear();
      closeUpsell();
      router.push(href(locale, `/merci/${id}`));
    },
    [clear, closeUpsell, locale, router],
  );

  useEffect(() => {
    if (!open) return;
    track("upsell_shown", { slug, order_id: orderId });

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
      document.body.style.overflow = prev;
    };
  }, [open, slug, orderId]);

  useEffect(() => {
    if (!open) return;
    if (seconds <= 0) {
      track("upsell_timeout", { slug, order_id: orderId });
      finish(orderId);
    }
  }, [seconds, open, orderId, slug, finish]);

  function handleAccept() {
    if (submitting) return;
    setSubmitting(true);
    const eventId = `${orderId}-upsell-${slug}`;
    applyUpsellAccepted(slug);
    track("upsell_accepted", {
      slug,
      order_id: orderId,
      event_id: eventId,
      value: products[slug].upsellPrice,
      currency: "MAD",
    });

    void fetch("/api/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event: "upsell_added",
        event_id: eventId,
        order_id: orderId,
        upsell_slug: slug,
        source_url: typeof window !== "undefined" ? window.location.href : "",
        context: getMarketingContext(),
      }),
      keepalive: true,
    })
      .then((res) => {
        if (!res.ok) {
          track("upsell_accepted", {
            slug,
            order_id: orderId,
            event_id: eventId,
            webhook_status: res.status,
          });
        }
      })
      .catch((err) => {
        track("upsell_accepted", {
          slug,
          order_id: orderId,
          event_id: eventId,
          error: String(err),
        });
      });

    finish(orderId);
  }

  function handleSkip() {
    track("upsell_skipped", { slug, order_id: orderId });
    finish(orderId);
  }

  const product = products[slug];
  const copy = getProductCopy(product, locale);
  const titleShort = getProductTitleShort(product, locale);
  const subtitle = getProductSubtitle(product, locale);
  const discount = Math.round(
    ((product.price - product.upsellPrice) / product.price) * 100,
  );
  const progress = Math.max(0, Math.min(100, (seconds / COUNTDOWN_SECONDS) * 100));

  return (
    <>
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[70] bg-ink/70 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upsell-title"
        aria-hidden={!open}
        className={`fixed inset-0 z-[70] flex items-end justify-center p-0 transition sm:items-center sm:p-4 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`relative flex h-full w-full max-w-lg flex-col overflow-hidden bg-sand shadow-2xl transition-transform sm:h-auto sm:max-h-[92vh] sm:rounded-3xl ${
            open ? "translate-y-0 scale-100" : "translate-y-4 scale-[0.98]"
          }`}
        >
          <div className="h-1 w-full bg-border">
            <div
              aria-hidden="true"
              style={{ width: `${progress}%` }}
              className="h-full bg-emerald transition-[width] duration-1000 ease-linear"
            />
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-7">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald">
                {messages.upsell.badge}
              </span>
              <span className="text-xs text-muted" aria-live="polite">
                {messages.upsell.expires}{" "}
                <span className="tabular-nums">
                  {Math.max(0, seconds)}
                  {messages.upsell.countdownUnit}
                </span>
              </span>
            </div>

            <h2
              id="upsell-title"
              className="mt-4 font-serif text-2xl leading-tight text-ink sm:text-3xl"
            >
              {messages.upsell.titleBefore}{" "}
              <span {...productNameLangAttrs(locale)} className="text-emerald">
                {titleShort}
              </span>{" "}
              {messages.upsell.titleAfter}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              {copy.upsellHook} {messages.upsell.sub}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-[120px_1fr]">
              <div className="h-28 w-28 overflow-hidden rounded-xl sm:h-full sm:w-full">
                <ProductImage product={product} ratio="square" locale={locale} />
              </div>
              <div className="min-w-0">
                <p
                  {...productNameLangAttrs(locale)}
                  className={`text-sm font-semibold text-ink ${productNameClassName(locale)}`}
                >
                  {titleShort}
                </p>
                {subtitle ? (
                  <p
                    {...productSubtitleLangAttrs(locale)}
                    className={`text-xs text-ink-soft ${productSubtitleClassName(locale)}`}
                  >
                    {subtitle}
                  </p>
                ) : null}
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {copy.tagline}
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-sm text-muted line-through">
                    {formatMad(product.price, locale)}
                  </span>
                  <span className="font-serif text-2xl text-ink">
                    {formatMad(product.upsellPrice, locale)}
                  </span>
                  <span className="rounded-full bg-warm/10 px-2 py-0.5 text-[11px] font-semibold text-warm">
                    −{discount}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleAccept}
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 text-base font-semibold text-sand transition hover:bg-emerald disabled:opacity-60"
              >
                {submitting
                  ? messages.upsell.adding
                  : `${messages.upsell.ctaYes} ${formatMad(product.upsellPrice, locale)}`}
              </button>
              <button
                type="button"
                onClick={handleSkip}
                disabled={submitting}
                className="inline-flex w-full items-center justify-center rounded-full border border-border bg-cream px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink disabled:opacity-60"
              >
                {messages.upsell.ctaNo}
              </button>
            </div>

            <p className="mt-4 text-center text-[11px] text-muted">
              {messages.upsell.foot}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
