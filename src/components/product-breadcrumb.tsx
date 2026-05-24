import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/href";
import type { Messages } from "@/messages";
import { t } from "@/messages";

const SEP = "\u203A";

export function ProductBreadcrumb({
  locale,
  messages,
  currentLabel,
}: {
  locale: Locale;
  messages: Messages;
  currentLabel: string;
}) {
  const rtl = locale === "ar";
  return (
    <nav
      aria-label={t(messages, "pdp.breadcrumbNav")}
      dir={rtl ? "rtl" : "ltr"}
      className="mb-6"
    >
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-1 gap-y-1 p-0 text-xs text-muted">
        <li className="min-w-0 shrink-0">
          <Link href={href(locale, "/")} className="hover:text-ink">
            {t(messages, "pdp.breadcrumbHome")}
          </Link>
        </li>
        <li aria-hidden className="shrink-0 select-none px-0.5 text-muted">
          {SEP}
        </li>
        <li className="min-w-0 shrink-0">
          <Link href={href(locale, "/boutique")} className="hover:text-ink">
            {t(messages, "pdp.breadcrumbShop")}
          </Link>
        </li>
        <li aria-hidden className="shrink-0 select-none px-0.5 text-muted">
          {SEP}
        </li>
        <li className="min-w-0 truncate text-ink-soft">{currentLabel}</li>
      </ol>
    </nav>
  );
}
