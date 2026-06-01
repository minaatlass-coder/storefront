import type { Locale } from "@/i18n/config";
import type { Product } from "@/lib/types";

function splitName(name: string) {
  const parts = name.split("—");
  return {
    title: parts[0]?.trim() ?? name,
    subtitle: parts[1]?.trim() ?? "",
  };
}

/** Nom produit : toujours en français (comme sur les emballages). */
export function getProductTitleShort(_product: Product, locale: Locale): string {
  void locale;
  return splitName(_product.nameFr).title;
}

/** Sous-titre sous le nom : français sur /fr, arabe sur /ar (nom produit reste en français). */
export function getProductSubtitle(product: Product, locale: Locale): string {
  return locale === "ar"
    ? splitName(product.nameAr).subtitle
    : splitName(product.nameFr).subtitle;
}

/** Nom français affiché dans une page /ar. */
export function productNameLangAttrs(locale: Locale) {
  return locale === "ar"
    ? ({ lang: "fr", dir: "ltr" as const })
    : ({} as Record<string, never>);
}

/** Attributs lang/dir du sous-titre (arabe uniquement sur /ar). */
export function productSubtitleLangAttrs(locale: Locale) {
  return locale === "ar"
    ? { lang: "ar", dir: "rtl" as const }
    : ({} as Record<string, never>);
}

/** Alignement à droite en page arabe (text-right, pas text-end : en RTL text-end = gauche). */
export function productNameClassName(locale: Locale): string {
  return locale === "ar" ? "block w-full text-right" : "";
}

/** Sous-titre arabe sous le nom, aligné à droite comme le titre. */
export function productSubtitleClassName(locale: Locale): string {
  return locale === "ar" ? "block w-full text-right" : "";
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
