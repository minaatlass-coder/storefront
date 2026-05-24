"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { href } from "@/lib/href";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const raw = typeof params?.locale === "string" ? params.locale : "fr";
  const locale = isLocale(raw) ? raw : "fr";

  return (
    <div className="mx-auto flex min-h-[40vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-serif text-2xl text-ink">
        {locale === "ar" ? "حدث خطأ" : "Une erreur est survenue"}
      </h1>
      <p className="mt-3 text-sm text-ink-soft">
        {process.env.NODE_ENV === "development"
          ? error.message
          : locale === "ar"
            ? "حاولوا مرة أخرى."
            : "Réessayez dans un instant."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-sand transition hover:bg-emerald"
        >
          {locale === "ar" ? "إعادة المحاولة" : "Réessayer"}
        </button>
        <Link
          href={href(locale, "/")}
          className="rounded-full border border-border bg-cream px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink"
        >
          {locale === "ar" ? "الرئيسية" : "Accueil"}
        </Link>
      </div>
    </div>
  );
}
