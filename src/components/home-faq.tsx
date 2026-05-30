import type { Locale } from "@/i18n/config";
import type { Messages } from "@/messages";
import { t } from "@/messages";

const FAQ_KEYS = ["1", "2", "3"] as const;

export function HomeFaq({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <header className="text-center">
        <h2 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
          {t(messages, "home.faq.title")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
          {t(messages, "home.faq.intro")}
        </p>
      </header>

      <ul className="mt-10 space-y-4">
        {FAQ_KEYS.map((n) => (
          <li
            key={n}
            className="rounded-2xl border border-border bg-[#F5F1E9] px-5 py-5 sm:px-6 sm:py-6"
          >
            <p className="text-sm font-semibold leading-snug text-ink sm:text-base">
              {t(messages, `home.faq.q${n}`)}
            </p>
            <p
              className="mt-2 text-sm leading-relaxed text-ink-soft"
              {...(locale === "ar" ? { lang: "ar", dir: "rtl" as const } : {})}
            >
              {t(messages, `home.faq.a${n}`)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
