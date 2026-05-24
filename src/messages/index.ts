import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { ar } from "./ar";
import { fr } from "./fr";
import type { Messages } from "./fr";
import { pickString } from "./pick";

export type { Messages };

export function getMessages(locale: string): Messages {
  return isLocale(locale) && locale === "ar" ? ar : fr;
}

export function t(messages: Messages, path: string): string {
  return pickString(messages as unknown as Record<string, unknown>, path);
}

export function fillBrand(template: string, brand: string): string {
  return template.replaceAll("{{brand}}", brand);
}

export function fillName(template: string, firstName: string): string {
  return template.replaceAll("{name}", firstName);
}

export function localeFromUnknown(locale: string): Locale {
  return isLocale(locale) ? locale : "fr";
}
