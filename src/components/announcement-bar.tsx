import type { Locale } from "@/i18n/config";

function AnnouncementLine({ text, locale }: { text: string; locale: Locale }) {
  const rtl = locale === "ar";
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-3 whitespace-nowrap px-8 sm:gap-4 sm:px-10 ${
        rtl ? "font-arabic leading-relaxed" : ""
      }`}
      {...(rtl ? { lang: "ar", dir: "rtl" as const } : {})}
    >
      {text}
    </span>
  );
}

export function AnnouncementBar({
  text,
  locale,
}: {
  text: string;
  locale: Locale;
}) {
  const aria =
    locale === "ar" ? "إعلان الموقع" : "Annonce Sahhaonline";

  return (
    <div
      role="region"
      aria-label={aria}
      className="bg-gradient-to-r from-emerald via-emerald to-emerald-deep text-cream text-[11px] sm:text-xs tracking-wide"
    >
      <div className="hidden flex-col items-center gap-1.5 px-4 py-2 text-center motion-reduce:flex">
        <AnnouncementLine text={text} locale={locale} />
      </div>

      <div className="announcement-marquee-wrap relative overflow-hidden py-2 motion-reduce:hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-emerald to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-emerald-deep to-transparent"
          aria-hidden
        />

        <div className="announcement-marquee-track flex w-max" aria-hidden>
          <AnnouncementLine text={text} locale={locale} />
          <AnnouncementLine text={text} locale={locale} />
        </div>
      </div>
    </div>
  );
}
