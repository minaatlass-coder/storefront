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
          className={`h-4 w-4 ${
            i <= rating ? "text-warm" : "text-border"
          }`}
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
  const isRtl = locale === "ar";
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "ar" ? "ar-MA" : "fr-MA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <section
      id="reviews"
      className="mt-20"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="rounded-3xl border border-border bg-cream p-6 sm:p-10">
        <div className="flex flex-col gap-6 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-emerald">
              {r.kicker}
            </p>
            <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
              {r.title}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">{r.subtitle}</p>
          </div>

          <div className="flex flex-col items-start gap-1 sm:items-end">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl text-ink">
                {data.average.toFixed(1)}
              </span>
              <span className="text-sm text-muted">/ 5</span>
            </div>
            <Stars rating={Math.round(data.average)} />
            <p className="text-xs text-muted">
              {r.basedOn.replace("{count}", String(data.count))}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {([5, 4, 3, 2, 1] as const).map((star) => {
            const count = data.distribution[star];
            const pct = data.count > 0 ? Math.round((count / data.count) * 100) : 0;
            return (
              <div
                key={star}
                className="flex items-center gap-2 rounded-xl border border-border bg-sand px-3 py-2"
              >
                <span className="text-xs font-semibold text-ink">
                  {star}★
                </span>
                <div className="flex-1 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-1.5 bg-warm"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-muted">{count}</span>
              </div>
            );
          })}
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {data.items.map((item) => {
            const copy = locale === "ar" ? item.ar : item.fr;
            return (
              <li
                key={item.id}
                className="rounded-2xl border border-border bg-sand p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted">{item.city}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Stars rating={item.rating} />
                    <span className="text-[11px] text-muted">
                      {formatDate(item.date)}
                    </span>
                  </div>
                </div>

                <h3 className="mt-3 font-serif text-base text-ink">
                  {copy.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {copy.body}
                </p>

                {item.verified ? (
                  <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3 w-3"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a.75.75 0 0 1 .006 1.06l-7.5 7.6a.75.75 0 0 1-1.07.01l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.965 2.964 6.97-7.064a.75.75 0 0 1 1.07-.01Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {r.verifiedBadge}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-center text-xs text-muted">{r.note}</p>
      </div>
    </section>
  );
}
