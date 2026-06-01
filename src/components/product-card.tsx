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
import { getMessages, t } from "@/messages";
import { AddToCartButton } from "./add-to-cart-button";
import { ProductImage } from "./product-image";

interface Props {
  product: Product;
  locale: Locale;
  hideCategory?: boolean;
}

export function ProductCard({ product, locale, hideCategory = false }: Props) {
  const m = getMessages(locale);
  const copy = getProductCopy(product, locale);
  const title = getProductTitleShort(product, locale);
  const subtitle = getProductSubtitle(product, locale);
  const catKey = `productCategory.${product.category}` as const;
  const pdpPath = `/produit/${product.slug}`;
  const aria = `${t(m, "productCard.viewAria")} ${title}`;

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-cream p-3 transition hover:border-ink sm:p-4">
      <Link href={href(locale, pdpPath)} className="block" aria-label={aria}>
        <ProductImage product={product} ratio="square" locale={locale} />
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
        {!hideCategory && (
          <p className="text-[10px] uppercase tracking-[0.18em] text-emerald">
            {t(m, catKey)}
          </p>
        )}
        <Link href={href(locale, pdpPath)} className="mt-1.5">
          <h3
            {...productNameLangAttrs(locale)}
            className={`font-serif text-xl leading-tight text-ink transition group-hover:text-emerald sm:text-2xl ${productNameClassName(locale)}`}
          >
            {title}
          </h3>
        </Link>
        {subtitle ? (
          <p
            {...productSubtitleLangAttrs(locale)}
            className={`mt-0.5 text-sm text-ink-soft ${productSubtitleClassName(locale)}`}
          >
            {subtitle}
          </p>
        ) : null}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {copy.tagline}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-lg font-semibold text-ink">
            {formatMad(product.price, locale)}
          </p>
          <AddToCartButton
            slug={product.slug}
            variant="primary"
            className="px-4 py-2 text-xs"
          >
            {m.productCard.add}
          </AddToCartButton>
        </div>
      </div>
    </article>
  );
}
