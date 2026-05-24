"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { href } from "@/lib/href";
import { t } from "@/messages";
import { useMessages } from "./messages-context";

function pathWithoutLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  const first = parts[0];
  if (isLocale(first)) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function LangSwitch() {
  const pathname = usePathname() ?? "/";
  const { locale, messages } = useMessages();
  const base = pathWithoutLocale(pathname);

  return (
    <div
      className="flex items-center rounded-full border border-border bg-cream p-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-soft"
      role="navigation"
      aria-label={locale === "ar" ? "اختيار اللغة" : "Changer de langue"}
    >
      {locales.map((loc) => {
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={href(loc, base === "/" ? "/" : base)}
            hrefLang={loc}
            className={`rounded-full px-2.5 py-1 transition ${
              active
                ? "bg-ink text-sand"
                : "hover:text-ink"
            }`}
            aria-current={active ? "true" : undefined}
          >
            {loc === "fr" ? t(messages, "nav.langFr") : t(messages, "nav.langAr")}
          </Link>
        );
      })}
    </div>
  );
}
