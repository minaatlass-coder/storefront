"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Product } from "@/lib/types";
import {
  getProductSubtitle,
  getProductTitleShort,
  productNameClassName,
  productNameLangAttrs,
  productSubtitleClassName,
  productSubtitleLangAttrs,
} from "@/lib/product-locale";

const gradientByCategory = {
  joints:
    "linear-gradient(135deg, #F4ECD8 0%, #E8D9B5 45%, #C28846 100%)",
  sleep:
    "linear-gradient(135deg, #E7E9F1 0%, #C8D0E1 45%, #4A5878 100%)",
  gut: "linear-gradient(135deg, #EAF2EA 0%, #C7DBC8 45%, #4A7A55 100%)",
} as const;

interface Props {
  product: Product;
  ratio?: "square" | "portrait" | "landscape";
  className?: string;
  priority?: boolean;
  locale?: Locale;
}

function Placeholder({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const titleShort = getProductTitleShort(product, locale);
  const titleSubtitle = getProductSubtitle(product, locale);

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center p-6 ${locale === "ar" ? "items-end text-end" : "items-center text-center"}`}
    >
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/80">
        {product.category === "joints"
          ? "Articulations"
          : product.category === "sleep"
            ? "Sommeil"
            : "Digestion"}
      </p>
      <p
        {...productNameLangAttrs(locale)}
        className={`mt-3 font-serif text-2xl leading-tight text-white drop-shadow-sm sm:text-3xl ${productNameClassName(locale)}`}
      >
        {titleShort}
      </p>
      {titleSubtitle ? (
        <p
          {...productSubtitleLangAttrs()}
          className={`mt-1 text-xs text-white/90 sm:text-sm ${productSubtitleClassName(locale)}`}
        >
          {titleSubtitle}
        </p>
      ) : null}
    </div>
  );
}

export function ProductImage({
  product,
  ratio = "square",
  className = "",
  priority = false,
  locale = "fr",
}: Props) {
  const aspect =
    ratio === "portrait"
      ? "aspect-[4/5]"
      : ratio === "landscape"
        ? "aspect-[5/4]"
        : "aspect-square";

  const titleShort = getProductTitleShort(product, locale);
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(product.image) && !failed;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border ${aspect} ${className}`}
      style={{ background: gradientByCategory[product.category] }}
      role="img"
      aria-label={titleShort}
    >
      {showPhoto ? (
        <Image
          src={product.image as string}
          alt={titleShort}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          priority={priority}
          onError={() => setFailed(true)}
        />
      ) : (
        <Placeholder product={product} locale={locale} />
      )}
    </div>
  );
}
