import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productList } from "@/data/products";
import { site, siteBrand } from "@/data/site";
import { isLocale, locales } from "@/i18n/config";
import { fillBrand, getMessages, t } from "@/messages";
import { ProductCard } from "@/components/product-card";
import { RoutineSuggestions } from "@/components/routine-suggestions";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const m = getMessages(raw);
  const brand = siteBrand(raw);
  return {
    title: m.boutique.title,
    description: fillBrand(m.boutique.intro, brand),
  };
}

export default async function BoutiquePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const m = getMessages(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald">
          {m.boutique.kicker}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          {m.boutique.title}
        </h1>
        <p className="mt-4 text-base text-ink-soft">
          {fillBrand(m.boutique.intro, siteBrand(locale))}
        </p>
      </header>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productList.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} locale={locale} />
          </li>
        ))}
      </ul>

      <RoutineSuggestions locale={locale} />

      <section className="mt-16 rounded-3xl border border-border bg-cream p-6 sm:p-10">
        <div className="grid gap-6 sm:grid-cols-4">
          {site.trust.map((row) => (
            <div key={row.tkey} className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald" />
              <p className="text-sm font-semibold text-ink">{t(m, row.tkey)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
