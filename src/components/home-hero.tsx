import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { site } from "@/data/site";
import type { Messages } from "@/messages";
import { t } from "@/messages";
import { href } from "@/lib/href";
import { BrandImage } from "./brand-image";

const BADGE_KEYS = ["lab", "ingredients", "cod", "returns"] as const;

export function HomeHero({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const rtl = locale === "ar";

  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 pb-14 sm:pt-16 sm:pb-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p
            className={`text-xs leading-relaxed text-muted sm:text-sm ${
              rtl ? "font-arabic" : "tracking-wide"
            }`}
          >
            {t(messages, "home.heroTrustLine")}
          </p>

          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-cream px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald" />
            {t(messages, "home.badge")}
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            {t(messages, "home.h1a")}
            <span className="block text-emerald">{t(messages, "home.h1b")}</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {t(messages, "home.intro")}
          </p>

          <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {BADGE_KEYS.map((key) => (
              <li
                key={key}
                className="rounded-xl border border-border bg-cream px-3 py-3 text-center"
              >
                <p className="text-xs font-bold text-emerald sm:text-sm">
                  {t(messages, `home.heroBadges.${key}`)}
                </p>
                <p className="mt-0.5 text-[10px] leading-snug text-muted sm:text-[11px]">
                  {t(messages, `home.heroBadges.${key}Sub`)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={href(locale, "/#produits")}
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-sand transition hover:bg-emerald"
            >
              {t(messages, "home.ctaShop")}
            </Link>
            <p className="text-xs text-muted sm:text-sm">
              {t(messages, "home.ctaGuarantee")}
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl border border-border">
            <BrandImage
              src={site.images.homeHero}
              alt={t(messages, "home.heroImageAlt")}
              priority
            />
          </div>
          <div
            className={`absolute bottom-4 rounded-2xl border border-border bg-cream px-4 py-3 shadow-sm sm:bottom-6 sm:px-5 sm:py-4 ${
              rtl ? "right-4 sm:right-8" : "left-4 sm:left-8"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald sm:text-xs">
              {t(messages, "home.heroImageBadge")}
            </p>
            <p className="mt-1 text-xs text-ink-soft sm:text-sm">
              {t(messages, "home.heroImageBadgeSub")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
