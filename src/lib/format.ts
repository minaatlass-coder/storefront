import type { Locale } from "@/i18n/config";

export function formatMad(amount: number, locale: Locale = "fr"): string {
  const formatted = new Intl.NumberFormat(
    locale === "ar" ? "ar-MA" : "fr-MA",
    { maximumFractionDigits: 0 },
  ).format(amount);
  return locale === "ar" ? `${formatted}\u00A0د.م.` : `${formatted} MAD`;
}
