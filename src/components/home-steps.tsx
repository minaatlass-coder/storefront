import type { Locale } from "@/i18n/config";
import type { Messages } from "@/messages";
import { t } from "@/messages";

const STEPS = ["1", "2", "3"] as const;

export function HomeSteps({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const rtl = locale === "ar";

  return (
    <section id="comment" className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald">
          {t(messages, "home.stepsKicker")}
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          {t(messages, "home.stepsTitle")}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
          {t(messages, "home.stepsIntro")}
        </p>
      </header>

      <ol className="mt-12 grid gap-8 sm:grid-cols-3">
        {STEPS.map((n) => (
          <li
            key={n}
            className="relative text-center"
            {...(rtl ? { lang: "ar", dir: "rtl" as const } : {})}
          >
            <span
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald font-serif text-xl font-bold text-cream"
              aria-hidden
            >
              {rtl ? ["١", "٢", "٣"][Number(n) - 1] : n}
            </span>
            <h3 className="mt-5 font-serif text-xl leading-snug text-ink">
              {t(messages, `home.step${n}Title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {t(messages, `home.step${n}Body`)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
