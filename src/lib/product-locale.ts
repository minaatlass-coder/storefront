import type { Locale } from "@/i18n/config";
import type { Product } from "@/lib/types";

function splitFrenchName(nameFr: string) {
  const parts = nameFr.split("—");
  return {
    title: parts[0]?.trim() ?? nameFr,
    subtitle: parts[1]?.trim() ?? "",
  };
}

/** Titres produit : en /ar on garde le français (comme sur les photos d’emballage). */
export function getProductTitleShort(product: Product, locale: Locale): string {
  if (locale === "ar") {
    return splitFrenchName(product.nameFr).title;
  }
  return splitFrenchName(product.nameFr).title;
}

export function getProductSubtitle(product: Product, locale: Locale): string {
  if (locale === "ar") {
    return splitFrenchName(product.nameFr).subtitle;
  }
  return splitFrenchName(product.nameFr).subtitle;
}

/** Attributs lang/dir pour afficher un nom produit français dans une page /ar. */
export function productNameLangAttrs(locale: Locale) {
  return locale === "ar"
    ? ({ lang: "fr", dir: "ltr" as const })
    : ({} as Record<string, never>);
}

export function getProductCopy(product: Product, locale: Locale) {
  if (locale === "ar") {
    const c = product.copyAr;
    return {
      tagline: c.tagline,
      problem: c.problem,
      shortDescription: c.shortDescription,
      bullets: c.bullets,
      ingredients: c.ingredients,
      usage: c.usage,
      warnings: c.warnings,
      upsellHook: c.upsellHook,
    };
  }
  return {
    tagline: product.tagline,
    problem: product.problem,
    shortDescription: product.shortDescription,
    bullets: product.bullets,
    ingredients: product.ingredients,
    usage: product.usage,
    warnings: product.warnings,
    upsellHook: product.upsellHook,
  };
}

export function getLineTitle(product: Product, locale: Locale): string {
  return getProductTitleShort(product, locale);
}
