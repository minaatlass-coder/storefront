"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { productList, products } from "@/data/products";
import { site } from "@/data/site";
import { formatMad } from "@/lib/format";
import { href } from "@/lib/href";
import { getLineTitle } from "@/lib/product-locale";
import { track } from "@/lib/analytics";
import { fillName } from "@/messages";
import { CrossSellRow } from "@/components/cross-sell-row";
import { useMessages } from "./messages-context";

interface Props {
  orderId: string;
}

export function ThankYouContent({ orderId }: Props) {
  const { locale, messages: m } = useMessages();
  const lastOrder = useCart((s) => s.lastOrder);
  const hydrated = useCart((s) => s.hydrated);
  const clear = useCart((s) => s.clear);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    clear();
    track("thank_you_view", { order_id: orderId });
  }, [clear, orderId]);

  const matches =
    hydrated && lastOrder && lastOrder.order_id === orderId ? lastOrder : null;

  const orderedSlugs = new Set<string>();
  if (matches) {
    matches.items.forEach((i) => orderedSlugs.add(i.sku));
    if (matches.upsell) orderedSlugs.add(matches.upsell.sku);
  }
  const crossSells = productList.filter((p) => !orderedSlugs.has(p.slug));

  const showMetrics =
    site.metrics.confirmationRate > 0 ||
    site.metrics.deliveryRate > 0 ||
    site.metrics.deliveredThisMonth > 0;

  const steps = [
    { k: m.thankYou.step1k, t: m.thankYou.step1t, b: m.thankYou.step1b, n: 1 },
    { k: m.thankYou.step2k, t: m.thankYou.step2t, b: m.thankYou.step2b, n: 2 },
    { k: m.thankYou.step3k, t: m.thankYou.step3t, b: m.thankYou.step3b, n: 3 },
  ];

  const hours = locale === "ar" ? site.hoursAr : site.hours;
  const locTag = locale === "ar" ? "ar-MA" : "fr-MA";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <section className="rounded-3xl border border-border bg-cream p-6 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-7 w-7 text-emerald"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 5.296a1 1 0 0 1 0 1.414l-7.5 7.5a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 1 1 1.414-1.414L8.5 12.086l6.79-6.79a1 1 0 0 1 1.414 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
          {m.thankYou.title}
        </h1>
        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-emerald">
          {m.thankYou.ref} {orderId}
        </p>
        <p className="mx-auto mt-4 max-w-md text-base text-ink-soft">
          {matches ? (
            fillName(m.thankYou.introNamed, matches.name.split(" ")[0] ?? "")
          ) : (
            m.thankYou.introGeneric
          )}
        </p>
        <p className="mt-1 text-sm text-muted">{m.thankYou.payAtDoor}</p>
      </section>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="rounded-2xl border border-border bg-sand p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald">
              {s.k}
            </p>
            <p className="mt-1 text-sm font-semibold text-ink">{s.t}</p>
            <p className="mt-1 text-xs text-ink-soft">{s.b}</p>
          </div>
        ))}
      </section>

      {mounted && matches ? (
        <section className="mt-8 rounded-2xl border border-border bg-cream p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            {m.thankYou.orderTitle}
          </p>
          <ul className="mt-3 divide-y divide-border">
            {matches.items.map((it) => (
              <li
                key={it.sku}
                className="flex items-baseline justify-between gap-3 py-2 text-sm"
              >
                <span className="text-ink-soft">
                  {getLineTitle(products[it.sku], locale)}
                  <span className="text-muted"> × {it.qty}</span>
                </span>
                <span className="font-semibold text-ink">
                  {formatMad(it.line_total, locale)}
                </span>
              </li>
            ))}
            {matches.upsell && (
              <li className="flex items-baseline justify-between gap-3 py-2 text-sm">
                <span className="text-ink-soft">
                  {getLineTitle(products[matches.upsell.sku], locale)}
                  <span className="ml-1 rounded-full bg-warm/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-warm">
                    {m.thankYou.upsellTag}
                  </span>
                </span>
                <span className="font-semibold text-ink">
                  {formatMad(matches.upsell.unit_price, locale)}
                </span>
              </li>
            )}
          </ul>
          <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
            <span className="text-sm text-ink-soft">{m.thankYou.totalCod}</span>
            <span className="font-serif text-2xl text-ink">
              {formatMad(matches.total, locale)}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-muted">
            {m.thankYou.phoneNote} {matches.phone}.
          </p>
          <p className="mt-1 text-[11px] text-muted">
            {locale === "ar" ? "العنوان المسجل:" : "Adresse enregistree :"} {matches.address}
          </p>
        </section>
      ) : null}

      {showMetrics && (
        <section className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-border bg-cream p-5 text-center">
          {site.metrics.confirmationRate > 0 && (
            <div>
              <p className="font-serif text-2xl text-ink">
                {site.metrics.confirmationRate}%
              </p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                {m.thankYou.confirmRate}
              </p>
            </div>
          )}
          {site.metrics.deliveryRate > 0 && (
            <div>
              <p className="font-serif text-2xl text-ink">
                {site.metrics.deliveryRate}%
              </p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                {m.thankYou.deliveryRate}
              </p>
            </div>
          )}
          {site.metrics.deliveredThisMonth > 0 && (
            <div>
              <p className="font-serif text-2xl text-ink">
                {site.metrics.deliveredThisMonth.toLocaleString(locTag)}
              </p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                {m.thankYou.deliveredMonth}
              </p>
            </div>
          )}
        </section>
      )}

      {crossSells.length > 0 && (
        <section className="mt-12">
          <CrossSellRow
            products={crossSells}
            locale={locale}
            messages={m}
            title={m.thankYou.crossTitle}
            subtitle={m.thankYou.crossSub}
          />
        </section>
      )}

      <section className="mt-12 rounded-2xl border border-border bg-cream p-5 text-center sm:p-6">
        <p className="text-sm text-ink">{m.thankYou.question}</p>
        <p className="mt-1 text-sm text-ink-soft">
          {m.thankYou.callUs}{" "}
          <a
            href={`tel:${site.phoneCallable}`}
            className="font-semibold text-emerald underline-offset-2 hover:underline"
          >
            {site.phone}
          </a>{" "}
          — {hours}.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
          <Link
            href={href(locale, "/livraison")}
            className="rounded-full border border-border bg-sand px-3 py-1.5 text-ink hover:border-ink"
          >
            {m.thankYou.policyShip}
          </Link>
          <Link
            href={href(locale, "/retours")}
            className="rounded-full border border-border bg-sand px-3 py-1.5 text-ink hover:border-ink"
          >
            {m.thankYou.policyRet}
          </Link>
          <Link
            href={href(locale, "/boutique")}
            className="rounded-full bg-ink px-3 py-1.5 text-sand hover:bg-emerald"
          >
            {m.thankYou.backShop}
          </Link>
        </div>
      </section>
    </div>
  );
}
