import type { Locale } from "@/i18n/config";
import { reviews as reviewsData } from "@/data/reviews";
import type { ProductSlug } from "@/lib/types";
import type { Messages } from "@/messages";
import { fillBrand, t } from "@/messages";

const FEATURED: { slug: ProductSlug; reviewId: string }[] = [
  { slug: "vitalstride", reviewId: "vs-2" },
  { slug: "restwave", reviewId: "rw-1" },
  { slug: "floraease", reviewId: "fe-4" },
];

export function HomeReviews({
  locale,
  messages,
  brand,
}: {
  locale: Locale;
  messages: Messages;
  brand: string;
}) {
  const rtl = locale === "ar";

  return (
    <section
      id="avis"
      className="border-y border-border bg-[#F5F1E9]"
      {...(rtl ? { lang: "ar", dir: "rtl" as const } : {})}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald">
            {t(messages, "home.reviewsKicker")}
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
            {t(messages, "home.reviewsTitle")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            {fillBrand(t(messages, "home.reviewsIntro"), brand)}
          </p>
        </header>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {FEATURED.map(({ slug, reviewId }) => {
            const data = reviewsData[slug];
            const item = data.items.find((r) => r.id === reviewId);
            if (!item) return null;
            const copy = rtl ? item.ar : item.fr;

            return (
              <li
                key={reviewId}
                className="relative flex flex-col rounded-2xl border border-border bg-cream p-6 sm:p-7"
              >
                <span
                  className={`pointer-events-none absolute top-5 font-serif text-4xl text-emerald/15 ${
                    rtl ? "left-5" : "right-5"
                  }`}
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="flex-1 text-sm leading-relaxed text-ink">
                  {copy.body}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-sm font-bold text-emerald"
                    aria-hidden
                  >
                    {item.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.name}</p>
                    <p className="text-xs text-muted">
                      {item.city} · {t(messages, "home.reviewsVerified")}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
