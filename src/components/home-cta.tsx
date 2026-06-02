import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/messages";
import { t } from "@/messages";
import { href } from "@/lib/href";

export function HomeCta({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  return (
    <section className="bg-gradient-to-br from-emerald via-emerald to-emerald-deep text-cream">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        <p className="text-xs uppercase tracking-[0.18em] text-cream/80">
          {t(messages, "home.ctaKicker")}
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
          {t(messages, "home.ctaTitle")}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-cream/90 sm:text-base">
          {t(messages, "home.ctaBody")}
        </p>
        <Link
          href={href(locale, "/#produits")}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-cream px-7 py-3 text-sm font-semibold text-emerald transition hover:bg-sand"
        >
          {t(messages, "home.ctaShop")}
        </Link>
        <p className="mt-6 text-xs text-cream/75 sm:text-sm">
          {t(messages, "home.ctaBadges")}
        </p>
      </div>
    </section>
  );
}
