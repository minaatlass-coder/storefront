import Image from "next/image";
import Link from "next/link";
import { productList } from "@/data/products";
import { siteBrand } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { fillBrand, getMessages, localeFromUnknown } from "@/messages";
import { href } from "@/lib/href";
import { ProductCard } from "@/components/product-card";
import { HomeFaq } from "@/components/home-faq";
import { HomeTrustBar } from "@/components/home-trust-bar";
import { TrustStrip } from "@/components/trust-strip";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale: raw } = await params;
  const locale = localeFromUnknown(raw) as Locale;
  const m = getMessages(locale);
  const brand = siteBrand(locale);

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
              {fillBrand(m.home.intro, brand)}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={href(locale, "/boutique")}
                className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-sand transition hover:bg-emerald"
              >
                {m.home.ctaShop}
              </Link>
            </div>
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

      <TrustStrip messages={m} locale={locale} />

      <section id="approche" className="border-y border-border bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className={locale === "ar" ? "lg:order-2" : ""}>
              <p className="text-xs uppercase tracking-[0.18em] text-emerald">
                {m.home.approachKicker}
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
                {m.home.approachTitle}
              </h2>
              <p className="mt-5 text-base leading-[1.75] text-ink-soft sm:text-lg">
                {fillBrand(m.home.approachBody, brand)}
              </p>
              <Link
                href={href(locale, "/boutique")}
                className="mt-7 inline-flex items-center justify-center rounded-full border border-emerald bg-transparent px-6 py-3 text-sm font-semibold text-emerald transition hover:bg-emerald hover:text-cream"
              >
                {m.home.ctaShop}
              </Link>
            </div>

            <div
              className={`relative overflow-hidden rounded-3xl border border-border shadow-sm ${
                locale === "ar" ? "lg:order-1" : ""
              }`}
            >
              <div className="aspect-[4/5] sm:aspect-[5/4]">
                <Image
                  src="/brand/home-approach.jpg"
                  alt={m.home.approachImageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={false}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/50 to-transparent px-5 py-6">
                <p className="text-xs uppercase tracking-[0.18em] text-cream/80">
                  {m.home.docTitle}
                </p>
                <p className="mt-1 max-w-sm text-sm text-cream/95">
                  {m.home.docBody}
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productList.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} locale={locale} />
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
