"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { href } from "@/lib/href";

function localeFromPathname(pathname: string | null): "fr" | "ar" {
  const seg = pathname?.split("/").filter(Boolean)[0];
  if (seg && isLocale(seg)) return seg;
  return "fr";
}

export default function LocaleNotFound() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  return (
    <div className="mx-auto flex min-h-[40vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">404</p>
      <h1 className="mt-2 font-serif text-3xl text-ink">
        {locale === "ar" ? "الصفحة غير موجودة" : "Page introuvable"}
      </h1>
      <p className="mt-3 text-sm text-ink-soft">
        {locale === "ar"
          ? "هذا العنوان غير موجود أو نُقل."
          : "Cette page n’existe pas ou a été déplacée."}
      </p>
      <Link
        href={href(locale, "/")}
        className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-sand transition hover:bg-emerald"
      >
        {locale === "ar" ? "الرئيسية" : "Accueil"}
      </Link>
      <div className="mt-6 flex gap-3 text-xs text-muted">
        {locales.map((loc) => (
          <Link
            key={loc}
            href={href(loc, "/")}
            className={loc === locale ? "font-semibold text-ink" : "hover:text-ink"}
          >
            {loc.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
