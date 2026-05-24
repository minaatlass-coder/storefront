import type { Locale } from "@/i18n/config";
import type { Product } from "@/lib/types";

export function getProductTitleShort(product: Product, locale: Locale): string {
  if (locale === "ar") {
    return product.nameAr.split("—")[0]?.trim() ?? product.nameAr;
  }
  return product.nameFr.split("—")[0]?.trim() ?? product.nameFr;
}

/** Sous-titre : affiche la partie descriptive après « — » en fonction de la locale. */
export function getProductSubtitle(product: Product, locale: Locale): string {
  if (locale === "ar") {
    const parts = product.nameAr.split("—");
    return parts[1]?.trim() ?? "";
  }
  const parts = product.nameFr.split("—");
  return parts[1]?.trim() ?? "";
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
