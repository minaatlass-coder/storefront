"use client";

import Link from "next/link";
import { defaultLocale } from "@/i18n/config";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-serif text-2xl text-ink">Une erreur est survenue</h1>
      <p className="mt-3 text-sm text-ink-soft">
        {process.env.NODE_ENV === "development" ? error.message : "Réessayez dans un instant."}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-sand transition hover:bg-emerald"
        >
          Réessayer
        </button>
        <Link
          href={`/${defaultLocale}`}
          className="rounded-full border border-border bg-cream px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink"
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}
