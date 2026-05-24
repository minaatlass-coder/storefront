import type { Locale } from "@/i18n/config";

/** Préfixe une route interne avec la locale (`/fr/boutique`, `/ar/contact`, …). */
export function href(locale: Locale, pathname: string): string {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (p === "/" || p === "") return `/${locale}`;
  return `/${locale}${p}`;
}
