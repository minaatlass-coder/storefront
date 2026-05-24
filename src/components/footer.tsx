import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { site, siteBrand } from "@/data/site";
import { href } from "@/lib/href";
import type { Messages } from "@/messages";
import { t } from "@/messages";
import { BrandMark } from "./brand-mark";

const columnKeys = [
  { titleKey: "footer.boutique" as const, links: site.footer.boutique },
  { titleKey: "footer.aide" as const, links: site.footer.aide },
  { titleKey: "footer.apropos" as const, links: site.footer.apropos },
] as const;

export function Footer({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  return (
    <footer className="mt-24 border-t border-border bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark className="h-9 w-9 shrink-0" />
              <p className="font-serif text-xl font-semibold text-ink">
                {siteBrand(locale)}
              </p>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {messages.brandTagline}
            </p>
            <ul className="mt-5 space-y-2 text-xs text-ink-soft">
              {site.trust.map((row) => (
                <li key={row.tkey} className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald" />
                  {t(messages, row.tkey)}
                </li>
              ))}
            </ul>
          </div>

          {columnKeys.map((col) => (
            <div key={col.titleKey}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                {t(messages, col.titleKey)}
              </p>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={href(locale, l.href)}
                      className="text-sm text-ink-soft transition hover:text-ink"
                    >
                      {t(messages, l.tkey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteBrand(locale)}.{" "}
            {t(messages, "footer.rights")}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.footer.legal.map((l) => (
              <li key={l.href}>
                <Link
                  href={href(locale, l.href)}
                  className="transition hover:text-ink"
                >
                  {t(messages, l.tkey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
