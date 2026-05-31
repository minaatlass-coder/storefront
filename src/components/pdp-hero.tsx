import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Product } from "@/lib/types";
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
import type { Messages } from "@/messages";
import { t } from "@/messages";
import { reviews as reviewsData } from "@/data/reviews";
import { AddToCartButton } from "./add-to-cart-button";
import { ProductImage } from "./product-image";

function ShieldBadge() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-4 w-4 shrink-0"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 ${
            i <= Math.round(rating) ? "text-warm" : "text-border"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L10 18.354l-4.629 2.826c-.997.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.886-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </span>
  );
}

export function PdpHero({
  product,
  locale,
  messages,
  categoryLabel,
}: {
  product: Product;
  locale: Locale;
  messages: Messages;
  categoryLabel: string;
}) {
  const rtl = locale === "ar";
  const copy = getProductCopy(product, locale);
  const titleShort = getProductTitleShort(product, locale);
  const subtitle = getProductSubtitle(product, locale);
  const review = reviewsData[product.slug];
  const trustPills = [
    messages.pdp.trustLab,
    messages.pdp.trustIng,
    messages.pdp.trustCod,
    messages.pdp.trustRet,
  ];
  const infoBars = [
    { icon: "truck" as const, text: messages.pdp.heroDelivery },
    { icon: "shield" as const, text: messages.pdp.heroQuality },
    { icon: "heart" as const, text: messages.pdp.heroGuarantee },
  ];

  return (
    <div
      className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14"
      {...(rtl ? { lang: "ar", dir: "rtl" as const } : {})}
    >
      <div className={`lg:sticky lg:top-28 lg:self-start ${rtl ? "lg:order-2" : ""}`}>
        <div className="relative">
          <ProductImage product={product} ratio="square" locale={locale} priority />
          <div
            className={`absolute bottom-4 flex items-center gap-2 rounded-2xl border border-border bg-cream/95 px-3 py-2 text-xs font-semibold text-ink shadow-sm backdrop-blur ${
              rtl ? "right-4" : "left-4"
            }`}
          >
            <span className="text-emerald">
              <ShieldBadge />
            </span>
            {messages.pdp.imageBadge}
          </div>
        </div>
      </div>

      <div className={rtl ? "lg:order-1" : ""}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald">
          {categoryLabel}
        </p>
        <h1
          {...productNameLangAttrs(locale)}
          className={`mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl ${productNameClassName(locale)}`}
        >
          {titleShort}
        </h1>
        {subtitle ? (
          <p
            {...productSubtitleLangAttrs()}
            className={`mt-1 text-base text-ink-soft ${productSubtitleClassName(locale)}`}
          >
            {subtitle}
          </p>
        ) : null}

        <div className="relative mt-5 rounded-2xl border border-border bg-[#F5F1E9] px-5 py-5">
          <span
            className={`pointer-events-none absolute top-3 font-serif text-4xl leading-none text-emerald/25 ${
              rtl ? "left-4" : "right-4"
            }`}
            aria-hidden
          >
            &ldquo;
          </span>
          <p className="text-sm leading-relaxed text-ink sm:text-base">{copy.tagline}</p>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {trustPills.map((label) => (
            <li
              key={label}
              className="rounded-full border border-border bg-cream px-3 py-1 text-[11px] font-semibold text-ink-soft"
            >
              {label}
            </li>
          ))}
        </ul>

        <a
          href="#reviews"
          className="mt-4 inline-flex flex-wrap items-center gap-2 text-sm text-ink-soft hover:text-emerald"
        >
          <Stars rating={review.average} />
          <span className="font-semibold text-ink">
            {messages.pdp.heroReviews
              .replace("{rating}", review.average.toFixed(1))
              .replace("{count}", String(review.count))}
          </span>
        </a>

        <ul className="mt-5 space-y-2.5">
          {infoBars.map((bar) => (
            <li
              key={bar.text}
              className="flex items-center gap-3 rounded-2xl border border-border bg-cream px-4 py-3 text-sm text-ink"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                {bar.icon === "heart" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219Z" />
                  </svg>
                ) : (
                  <ShieldBadge />
                )}
              </span>
              <span>{bar.text}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-baseline gap-3">
          <p className="font-serif text-3xl text-ink sm:text-4xl">
            {formatMad(product.price, locale)}
          </p>
          <span className="rounded-full bg-emerald px-2.5 py-0.5 text-[11px] font-semibold text-white">
            {messages.pdp.codBadge}
          </span>
        </div>

        <ul className="mt-5 space-y-2">
          {copy.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-ink-soft">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <AddToCartButton slug={product.slug} variant="primary" className="w-full sm:flex-1">
            {messages.pdp.ctaAdd} — {formatMad(product.price, locale)}
          </AddToCartButton>
          <Link
            href={href(locale, "/boutique")}
            className="inline-flex w-full items-center justify-center rounded-full border border-border bg-cream px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink sm:w-auto"
          >
            {messages.pdp.ctaSeeAll}
          </Link>
        </div>
        <p className="mt-2 text-center text-xs text-muted sm:text-start">
          {messages.pdp.ctaMicro}
        </p>
      </div>
    </div>
  );
}
