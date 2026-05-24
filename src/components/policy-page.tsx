import type { Locale } from "@/i18n/config";

interface Props {
  title: string;
  intro?: string;
  children: React.ReactNode;
  /** Affiche l’entête / la date de bas de page dans la bonne langue (pages /ar). */
  locale?: Locale;
}

export function PolicyPage({ title, intro, children, locale = "fr" }: Props) {
  const kicker =
    locale === "ar" ? "نص قانوني" : "Information légale";
  const updatedLabel =
    locale === "ar" ? "آخر تحديث" : "Dernière mise à jour";
  const dateStr = new Date().toLocaleDateString(
    locale === "ar" ? "ar-MA" : "fr-MA",
  );

  return (
    <div
      className="mx-auto max-w-3xl px-4 py-12 sm:py-16"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-emerald">
        {kicker}
      </p>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-4 text-base text-ink-soft">{intro}</p>
      ) : null}
      <div className="prose-policy mt-10 space-y-7 text-ink-soft">
        {children}
      </div>
      <p className="mt-12 text-xs text-muted">
        {updatedLabel} : {dateStr}.
      </p>
    </div>
  );
}

export function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-xl text-ink sm:text-2xl">{title}</h2>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}
