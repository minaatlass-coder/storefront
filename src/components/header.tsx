import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { site, siteBrand } from "@/data/site";
import { href } from "@/lib/href";
import type { Messages } from "@/messages";
import { t } from "@/messages";
import { AnnouncementBar } from "./announcement-bar";
import { BrandMark } from "./brand-mark";
import { CartButton } from "./cart-button";
import { LangSwitch } from "./lang-switch";

export function Header({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const home = href(locale, "/");
  const navAria =
    locale === "ar" ? "التنقل الرئيسي" : "Navigation principale";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-sand/95 backdrop-blur supports-[backdrop-filter]:bg-sand/80">
      <AnnouncementBar text={messages.announcement} locale={locale} />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:py-4">
        <Link
          href={home}
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
          aria-label={`${siteBrand(locale)} — ${t(messages, "pdp.breadcrumbHome")}`}
        >
          <BrandMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
          <span className="flex min-w-0 items-baseline gap-2">
            <span className="font-serif text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {siteBrand(locale)}
            </span>
            <span className="hidden truncate text-[11px] uppercase tracking-[0.18em] text-muted sm:inline">
              {messages.brandSub}
            </span>
          </span>
        </Link>

        <nav
          aria-label={navAria}
          className="hidden items-center gap-8 md:flex"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={href(locale, item.href)}
              className="text-sm font-medium text-ink-soft transition hover:text-ink"
            >
              {t(messages, item.tkey)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LangSwitch />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
