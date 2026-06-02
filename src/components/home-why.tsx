import type { Locale } from "@/i18n/config";
import type { Messages } from "@/messages";
import { fillBrand, t } from "@/messages";

const PILLAR_KEYS = ["lab", "ingredients", "formulas", "cod"] as const;

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6 shrink-0 text-emerald"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );
}

export function HomeWhy({
  locale,
  messages,
  brand,
}: {
  locale: Locale;
  messages: Messages;
  brand: string;
}) {
  return (
    <section id="approche" className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald">
          {fillBrand(t(messages, "home.whyKicker"), brand)}
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          {t(messages, "home.whyTitle")}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
          {fillBrand(t(messages, "home.whyIntro"), brand)}
        </p>
      </header>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {PILLAR_KEYS.map((key) => (
          <li
            key={key}
            className="rounded-2xl border border-border bg-cream p-6 sm:p-7"
            {...(locale === "ar" ? { lang: "ar", dir: "rtl" as const } : {})}
          >
            <ShieldIcon />
            <h3 className="mt-4 font-serif text-xl leading-snug text-ink">
              {t(messages, `home.whyPillars.${key}Title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {t(messages, `home.whyPillars.${key}Body`)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
