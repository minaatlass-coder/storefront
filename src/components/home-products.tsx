import type { Locale } from "@/i18n/config";
import { productList } from "@/data/products";
import type { Messages } from "@/messages";
import { fillBrand, t } from "@/messages";
import { ProductCard } from "./product-card";

export function HomeProducts({
  locale,
  messages,
  brand,
}: {
  locale: Locale;
  messages: Messages;
  brand: string;
}) {
  return (
    <section id="produits" className="border-y border-border bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald">
            {t(messages, "home.productsKicker")}
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
            {t(messages, "home.productsTitle")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            {fillBrand(t(messages, "home.productsIntro"), brand)}
          </p>
        </header>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productList.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} locale={locale} showReviewCount />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
