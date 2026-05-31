import type { Locale } from "@/i18n/config";
import type { ProductSlug } from "@/lib/types";
import { reviews as reviewsData } from "@/data/reviews";
import { getMessages } from "@/messages";

interface Props {
  slug: ProductSlug;
  locale: Locale;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex" aria-label={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 ${i <= rating ? "text-warm" : "text-border"}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L10 18.354l-4.629 2.826c-.997.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.886-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </span>
  );
}

export function ProductReviews({ slug, locale }: Props) {
  const data = reviewsData[slug];
  if (!data) return null;

  const m = getMessages(locale);
  const r = m.reviews;
  const pdp = m.pdp;
  const isRtl = locale === "ar";
  const featured = data.items.slice(0, 3);
  const satisfiedCount =
    data.count >= 100 ? `${Math.floor(data.count / 10) * 10}+` : `${data.count}+`;

  return (
    <section
      id="reviews"
      className="mt-16 rounded-3xl bg-cream px-6 py-10 sm:px-10 sm:py-12"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald">{r.kicker}</p>
        <h2 className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl lg:text-4xl">
          {r.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
          {pdp.testimonialsSubtitle}
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
        <ul className="space-y-4">
          {featured.map((item) => {
            const copy = locale === "ar" ? item.ar : item.fr;
            return (
              <li
                key={item.id}
                className="relative rounded-2xl bg-[#F5F1E9] px-5 py-5 sm:px-6 sm:py-6"
              >
                <span
                  className={`pointer-events-none absolute top-4 font-serif text-3xl text-emerald/20 ${
                    isRtl ? "left-4" : "right-4"
                  }`}
                  aria-hidden
                >
                  &ldquo;
                </span>
                <div className="flex items-center justify-between gap-3">
                  <Stars rating={item.rating} />
                  {item.verified ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a.75.75 0 0 1 .006 1.06l-7.5 7.6a.75.75 0 0 1-1.07.01l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.965 2.964 6.97-7.064a.75.75 0 0 1 1.07-.01Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {r.verifiedBadge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink">{copy.body}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-border text-xs font-bold text-ink-soft"
                    aria-hidden
                  >
                    {item.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.name}</p>
                    <p className="text-xs text-muted">{item.city}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="relative">
          <div className="flex aspect-[4/5] items-center justify-center rounded-3xl border border-border bg-[#EBE6DC] p-8 text-center">
            <p className="text-sm leading-relaxed text-ink-soft">
              {locale === "ar"
                ? "تجارب عملائنا في المغرب"
                : "Expériences de nos clients au Maroc"}
            </p>
          </div>
          <div
            className={`absolute bottom-6 rounded-2xl border border-border bg-cream px-5 py-4 shadow-md ${
              isRtl ? "right-6" : "left-6"
            }`}
          >
            <p className="font-serif text-3xl font-bold text-ink">{satisfiedCount}</p>
            <p className="text-sm text-ink-soft">{pdp.satisfiedLabel}</p>
            <div className="mt-1">
              <Stars rating={Math.round(data.average)} />
            </div>
            <p className="mt-1 text-xs text-muted">
              {r.basedOn.replace("{count}", String(data.count))}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-muted">{r.note}</p>
    </section>
  );
}
