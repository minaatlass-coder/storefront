import Link from "next/link";
import { defaultLocale } from "@/i18n/config";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">404</p>
      <h1 className="mt-2 font-serif text-3xl text-ink">Page introuvable</h1>
      <p className="mt-3 text-sm text-ink-soft">
        Cette adresse n’existe pas ou a été déplacée.
      </p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-sand transition hover:bg-emerald"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
