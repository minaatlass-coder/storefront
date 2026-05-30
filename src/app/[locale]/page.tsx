import Link from "next/link";
import { productList } from "@/data/products";
import { site, siteBrand } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { fillBrand, getMessages, localeFromUnknown, t } from "@/messages";
import { href } from "@/lib/href";
import { ProductCard } from "@/components/product-card";
import { HomeFaq } from "@/components/home-faq";
import { HomeTrustBar } from "@/components/home-trust-bar";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale: raw } = await params;
  const locale = localeFromUnknown(raw) as Locale;
  const m = getMessages(locale);

  const whyBlocks = [
    { title: m.home.why1t, body: m.home.why1b },
    { title: m.home.why2t, body: m.home.why2b },
    { title: m.home.why3t, body: m.home.why3b },
    { title: m.home.why4t, body: m.home.why4b },
  ];

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-cream px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald" />
              {m.home.badge}
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {m.home.h1a}
              <span className="block text-emerald">{m.home.h1b}</span>
            </h1>
            <p className="mt-5">
              <Link
                href={href(locale, "/#approche")}
                className={`text-xs font-semibold tracking-[0.18em] text-emerald transition hover:text-emerald-deep ${
                  locale === "ar" ? "normal-case" : "uppercase"
                }`}
              >
                {m.home.ctaApproach}
              </Link>
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {fillBrand(m.home.intro, siteBrand(locale))}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={href(locale, "/boutique")}
                className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-sand transition hover:bg-emerald"
              >
                {m.home.ctaShop}
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-ink-soft sm:grid-cols-4">
              {site.trust.map((row) => (
                <li key={row.tkey} className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald" />
                  {t(m, row.tkey)}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-[5/4] w-full rounded-3xl border border-border bg-gradient-to-br from-cream via-sand to-[#EEE8DA]" />
            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-border bg-cream p-5 shadow-sm sm:left-10 sm:right-10">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {m.home.docTitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {m.home.docBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="approche" className="border-y border-border bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald">
              {m.home.sectionProblem}
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
              {m.home.sectionProblemH}
            </h2>
            <p className="mt-3 text-base text-ink-soft">{m.home.sectionProblemP}</p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productList.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} locale={locale} />
              </li>
            ))}
          </ul>

        </div>
      </section>

      <section id="qualite" className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-emerald">
              {fillBrand(m.home.sectionWhy, siteBrand(locale))}
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
              {m.home.sectionWhyH}
            </h2>
            <p className="mt-4 text-base text-ink-soft">{m.home.sectionWhyP}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {whyBlocks.map((b) => (
              <li
                key={b.title}
                className="rounded-2xl border border-border bg-cream p-5"
              >
                <p className="text-sm font-semibold text-ink">{b.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HomeFaq locale={locale} messages={m} />
      <HomeTrustBar messages={m} />
    </div>
  );
}
