import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Product } from "@/lib/types";
import { formatMad } from "@/lib/format";
import { href } from "@/lib/href";
import {
  getProductCopy,
  getProductTitleShort,
  productNameClassName,
  productNameLangAttrs,
} from "@/lib/product-locale";
import type { Messages } from "@/messages";
import { t } from "@/messages";
import { AddToCartButton } from "./add-to-cart-button";
import { ProductImage } from "./product-image";

interface Props {
  products: Product[];
  locale: Locale;
  messages: Messages;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export function CrossSellRow({
  products,
  locale,
  messages,
  title,
  subtitle,
  compact = false,
}: Props) {
  if (products.length === 0) return null;

  const resolvedTitle = title ?? t(messages, "crossSell.defaultTitle");
  const resolvedSubtitle =
    subtitle ??
    (compact ? t(messages, "crossSell.drawerSubtitle") : undefined);

  return (
    <section
      aria-label={resolvedTitle}
      className={compact ? "" : "border-t border-border pt-10"}
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h2
          className={
            compact
              ? "text-sm font-semibold text-ink"
              : "font-serif text-2xl text-ink sm:text-3xl"
          }
        >
          {resolvedTitle}
        </h2>
        {resolvedSubtitle ? (
          <p className="text-xs text-muted">{resolvedSubtitle}</p>
        ) : null}
      </div>

      <div
        className={
          compact ? "space-y-3" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {products.map((p) =>
          compact ? (
            <CompactTile key={p.slug} product={p} locale={locale} messages={messages} />
          ) : (
            <FullTile key={p.slug} product={p} locale={locale} messages={messages} />
          ),
        )}
      </div>
    </section>
  );
}

function FullTile({
  product,
  locale,
  messages,
}: {
  product: Product;
  locale: Locale;
  messages: Messages;
}) {
  const path = `/produit/${product.slug}`;
  const copy = getProductCopy(product, locale);
  const title = getProductTitleShort(product, locale);
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-cream p-3">
      <Link href={href(locale, path)}>
        <ProductImage product={product} ratio="landscape" locale={locale} />
      </Link>
      <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
        <Link href={href(locale, path)}>
          <h3
            {...productNameLangAttrs(locale)}
            className={`font-serif text-lg text-ink hover:text-emerald ${productNameClassName(locale)}`}
          >
            {title}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs text-ink-soft">{copy.tagline}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-base font-semibold text-ink">
            {formatMad(product.price, locale)}
          </p>
          <AddToCartButton
            slug={product.slug}
            variant="primary"
            className="px-3 py-2 text-xs"
          >
            {messages.productCard.add}
          </AddToCartButton>
        </div>
      </div>
    </article>
  );
}

function CompactTile({
  product,
  locale,
  messages,
}: {
  product: Product;
  locale: Locale;
  messages: Messages;
}) {
  const path = `/produit/${product.slug}`;
  const copy = getProductCopy(product, locale);
  const title = getProductTitleShort(product, locale);
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-cream p-2.5">
      <Link href={href(locale, path)} className="shrink-0">
        <div className="h-16 w-16 overflow-hidden rounded-lg">
          <ProductImage product={product} ratio="square" locale={locale} />
        </div>
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={href(locale, path)}>
          <p
            {...productNameLangAttrs(locale)}
            className={`truncate text-sm font-semibold text-ink hover:text-emerald ${productNameClassName(locale)}`}
          >
            {title}
          </p>
        </Link>
        <p className="truncate text-xs text-ink-soft">{copy.tagline}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <p className="text-sm font-semibold text-ink">{formatMad(product.price, locale)}</p>
        <AddToCartButton slug={product.slug} variant="compact">
          {t(messages, "crossSell.add")}
        </AddToCartButton>
      </div>
    </div>
  );
}
