"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart, getCartLines, getSubtotal } from "@/lib/cart-store";
import { products, productList } from "@/data/products";
import { formatMad } from "@/lib/format";
import { href } from "@/lib/href";
import {
  getLineTitle,
  productNameClassName,
  productNameLangAttrs,
} from "@/lib/product-locale";
import { track } from "@/lib/analytics";
import { t } from "@/messages";
import { CrossSellRow } from "./cross-sell-row";
import { useMessages } from "./messages-context";
import { ProductImage } from "./product-image";

function CheckoutCTA() {
  const { messages } = useMessages();
  const openCheckout = useCart((s) => s.openCheckout);
  const items = useCart((s) => s.items);
  const subtotal = getSubtotal(items);
  function onClick() {
    track("open_checkout", { subtotal });
    openCheckout();
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-sand transition hover:bg-emerald"
    >
      {messages.cart.checkoutCta}
    </button>
  );
}

export function CartDrawer() {
  const { locale, messages } = useMessages();
  const open = useCart((s) => s.drawerOpen);
  const items = useCart((s) => s.items);
  const closeDrawer = useCart((s) => s.closeDrawer);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  const lines = getCartLines(items);
  const subtotal = getSubtotal(items);
  const inCart = new Set(lines.map((l) => l.slug));
  const crossSells = productList.filter((p) => !inCart.has(p.slug));

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeDrawer]);

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={closeDrawer}
        className={`fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t(messages, "cart.aria")}
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-sand shadow-2xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <p className="font-serif text-xl text-ink">
            {messages.cart.title}
            <span className="ml-2 text-sm font-normal text-muted">
              ({lines.reduce((s, l) => s + l.qty, 0)})
            </span>
          </p>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label={t(messages, "cart.close")}
            className="rounded-full p-2 text-ink hover:bg-cream"
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
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <p className="font-serif text-xl text-ink">{messages.cart.emptyTitle}</p>
              <p className="mt-2 max-w-xs text-sm text-ink-soft">
                {messages.cart.emptyBody}
              </p>
              <Link
                href={href(locale, "/boutique")}
                onClick={closeDrawer}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-sand transition hover:bg-emerald"
              >
                {messages.cart.seeProducts}
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((l) => {
                const p = products[l.slug];
                const linePath = `/produit/${l.slug}`;
                return (
                  <li
                    key={l.slug}
                    className="flex gap-3 rounded-xl border border-border bg-cream p-3"
                  >
                    <Link
                      href={href(locale, linePath)}
                      onClick={closeDrawer}
                      className="shrink-0"
                    >
                      <div className="h-20 w-20 overflow-hidden rounded-lg">
                        <ProductImage product={p} ratio="square" locale={locale} />
                      </div>
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link href={href(locale, linePath)} onClick={closeDrawer}>
                        <p
                          {...productNameLangAttrs(locale)}
                          className={`truncate text-sm font-semibold text-ink hover:text-emerald ${productNameClassName(locale)}`}
                        >
                          {getLineTitle(p, locale)}
                        </p>
                      </Link>
                      <p className="text-xs text-muted">
                        {formatMad(l.unitPrice, locale)} × {l.qty}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-sand">
                          <button
                            type="button"
                            aria-label={t(messages, "cart.qtyMinus")}
                            onClick={() => setQty(l.slug, l.qty - 1)}
                            className="h-7 w-7 text-sm font-semibold text-ink hover:text-emerald"
                          >
                            −
                          </button>
                          <span className="min-w-6 text-center text-sm font-semibold text-ink">
                            {l.qty}
                          </span>
                          <button
                            type="button"
                            aria-label={t(messages, "cart.qtyPlus")}
                            onClick={() => setQty(l.slug, l.qty + 1)}
                            className="h-7 w-7 text-sm font-semibold text-ink hover:text-emerald"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            track("remove_from_cart", { slug: l.slug });
                            remove(l.slug);
                          }}
                          className="text-xs text-muted underline-offset-2 hover:text-ink hover:underline"
                        >
                          {t(messages, "cart.remove")}
                        </button>
                      </div>
                    </div>
                    <p className="shrink-0 self-start text-sm font-semibold text-ink">
                      {formatMad(l.lineTotal, locale)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}

          {lines.length > 0 && crossSells.length > 0 && (
            <div className="mt-8">
              <CrossSellRow
                products={crossSells}
                locale={locale}
                messages={messages}
                title={t(messages, "crossSell.drawerTitle")}
                subtitle={t(messages, "crossSell.drawerSubtitle")}
                compact
              />
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-border bg-cream px-5 py-4">
            <div className="flex items-baseline justify-between">
              <p className="text-sm text-ink-soft">{t(messages, "cart.subtotal")}</p>
              <p className="font-serif text-2xl text-ink">
                {formatMad(subtotal, locale)}
              </p>
            </div>
            <p className="mt-1 text-xs text-muted">{messages.cart.payAtDoor}</p>
            <CheckoutCTA />

            <p className="mt-2 text-center text-[11px] text-muted">
              {messages.cart.checkoutMicro}
            </p>
          </footer>
        )}
      </aside>
    </>
  );
}
