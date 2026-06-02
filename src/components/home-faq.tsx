"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/messages";
import { t } from "@/messages";

const FAQ_KEYS = ["1", "2", "3", "4", "5", "6"] as const;

export function HomeFaq({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const [open, setOpen] = useState<string | null>("1");
  const rtl = locale === "ar";

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald">
          {t(messages, "home.faq.kicker")}
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          {t(messages, "home.faq.title")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
          {t(messages, "home.faq.intro")}
        </p>
      </header>

      <ul className="mt-10 divide-y divide-border rounded-2xl border border-border bg-cream">
        {FAQ_KEYS.map((n) => {
          const isOpen = open === n;
          const panelId = `faq-panel-${n}`;
          const buttonId = `faq-button-${n}`;

          return (
            <li key={n}>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : n)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start transition hover:bg-sand/50 sm:px-6"
              >
                <span className="text-sm font-semibold leading-snug text-ink sm:text-base">
                  {t(messages, `home.faq.q${n}`)}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-lg leading-none text-emerald transition ${
                    isOpen ? "rotate-45 bg-emerald/5" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              {isOpen ? (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 pb-5 sm:px-6 sm:pb-6"
                >
                  <p
                    className="text-sm leading-relaxed text-ink-soft"
                    {...(rtl ? { lang: "ar", dir: "rtl" as const } : {})}
                  >
                    {t(messages, `home.faq.a${n}`)}
                  </p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
