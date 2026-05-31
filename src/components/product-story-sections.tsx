import type { Locale } from "@/i18n/config";
import type { Product } from "@/lib/types";
import { siteBrand } from "@/data/site";
import {
  getProductSections,
  productSectionImagePaths,
  type ProductSectionContent,
} from "@/data/product-sections";
import { ProductSectionImage } from "./product-section-image";

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a.75.75 0 0 1 .006 1.06l-7.5 7.6a.75.75 0 0 1-1.07.01l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.965 2.964 6.97-7.064a.75.75 0 0 1 1.07-.01Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ShieldLarge() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className="mx-auto h-14 w-14 text-emerald"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );
}

function PainSection({
  product,
  locale,
  content,
  imageSrc,
}: {
  product: Product;
  locale: Locale;
  content: ProductSectionContent["pain"];
  imageSrc: string | null;
}) {
  const rtl = locale === "ar";

  return (
    <section className="rounded-3xl bg-cream px-6 py-10 sm:px-10 sm:py-12">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className={rtl ? "lg:order-2" : "lg:order-1"}>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald">
            {content.kicker}
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl lg:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            {content.intro}
          </p>
          <ul className="mt-6 space-y-3">
            {content.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-[#F5F1E9] px-4 py-4 text-sm leading-relaxed text-ink"
              >
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p
            className={`mt-6 rounded-2xl border border-emerald/25 bg-emerald/5 px-5 py-4 text-sm font-medium leading-relaxed text-ink ${
              rtl ? "border-r-4 border-r-emerald" : "border-l-4 border-l-emerald"
            }`}
          >
            {content.callout}
          </p>
        </div>
        <div className={rtl ? "lg:order-1" : "lg:order-2"}>
          <ProductSectionImage
            product={product}
            section="pain"
            src={imageSrc}
            locale={locale}
          />
        </div>
      </div>
    </section>
  );
}

function IngredientsSection({
  product,
  locale,
  content,
  imageSrc,
}: {
  product: Product;
  locale: Locale;
  content: ProductSectionContent["ingredients"];
  imageSrc: string | null;
}) {
  const rtl = locale === "ar";

  return (
    <section className="rounded-3xl bg-cream px-6 py-10 sm:px-10 sm:py-12">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className={rtl ? "lg:order-2" : "lg:order-1"}>
          <ProductSectionImage
            product={product}
            section="ingredients"
            src={imageSrc}
            locale={locale}
            ratio="landscape"
          />
          <p className="mt-2 text-center text-xs font-medium text-emerald sm:text-start">
            {content.caption}
          </p>
        </div>
        <div className={rtl ? "lg:order-1" : "lg:order-2"}>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald">
            {content.kicker}
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl lg:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            {content.intro}
          </p>
          <ul className="mt-6 space-y-3">
            {content.features.map((f) => (
              <li
                key={f.title}
                className="rounded-2xl bg-[#F5F1E9] px-4 py-4 sm:px-5 sm:py-5"
              >
                <div className="flex items-start gap-2">
                  <span className="text-emerald" aria-hidden>
                    ★
                  </span>
                  <div>
                    <p className="text-sm font-bold text-emerald">{f.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {f.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection({
  locale,
  content,
}: {
  locale: Locale;
  content: ProductSectionContent["comparison"];
}) {
  const rtl = locale === "ar";
  const brand = siteBrand(locale);

  return (
    <section className="rounded-3xl bg-[#F5F1E9] px-6 py-10 sm:px-10 sm:py-14">
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-2xl leading-tight text-ink sm:text-3xl lg:text-4xl">
          {content.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
          {content.subtitle}
        </p>
      </header>

      <div
        className="mx-auto mt-8 grid max-w-4xl overflow-hidden rounded-3xl border border-border shadow-sm sm:grid-cols-2"
        {...(rtl ? { dir: "rtl" as const } : {})}
      >
        <div className="bg-emerald text-white">
          <div className="flex items-center justify-center gap-2 border-b border-white/20 px-4 py-4 text-center text-sm font-bold sm:text-base">
            <span aria-hidden>★</span>
            {content.brandLabel || brand}
          </div>
          <ul>
            {content.brandRows.map((row, i) => (
              <li
                key={row}
                className={`flex items-center gap-3 px-4 py-3.5 text-sm ${
                  i % 2 === 0 ? "bg-emerald" : "bg-emerald-deep/90"
                }`}
              >
                <CheckIcon className="h-5 w-5 shrink-0 text-white/90" />
                <span>{row}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-cream">
          <div className="border-b border-border px-4 py-4 text-center text-sm font-bold text-ink-soft sm:text-base">
            {content.marketLabel}
          </div>
          <ul>
            {content.marketRows.map((row, i) => (
              <li
                key={row}
                className={`px-4 py-3.5 text-sm text-ink-soft ${
                  i % 2 === 0 ? "bg-cream" : "bg-[#F5F1E9]"
                }`}
              >
                {row}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TrustSection({
  product,
  locale,
  content,
  imageSrc,
}: {
  product: Product;
  locale: Locale;
  content: ProductSectionContent["trust"];
  imageSrc: string | null;
}) {
  const rtl = locale === "ar";

  return (
    <section className="rounded-3xl bg-[#F5F1E9] px-6 py-10 sm:px-10 sm:py-12">
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className={rtl ? "lg:order-2" : "lg:order-1"}>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald">
            {content.kicker}
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl">
            {content.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            {content.intro}
          </p>
          <ul className="mt-6 space-y-5">
            {content.points.map((point) => (
              <li key={point.title} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald text-white">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{point.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {point.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-border bg-cream px-5 py-5">
            <p className="flex items-center gap-2 text-sm font-bold text-ink">
              <span className="text-warm" aria-hidden>
                ♥
              </span>
              {content.guarantee.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {content.guarantee.body}
            </p>
          </div>
        </div>
        <div className={`${rtl ? "lg:order-1" : "lg:order-2"} space-y-4`}>
          <div className="rounded-3xl border border-border bg-cream p-8 text-center shadow-sm sm:p-10">
            <ShieldLarge />
            <h3 className="mt-4 font-serif text-xl text-ink sm:text-2xl">
              {content.cardTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
              {content.cardBody}
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {content.badges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-dashed border-border px-4 py-2 text-xs font-semibold text-muted"
                >
                  {badge}
                </li>
              ))}
            </ul>
          </div>
          <ProductSectionImage
            product={product}
            section="trust"
            src={imageSrc}
            locale={locale}
            ratio="landscape"
            className="hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
}

export function ProductStorySections({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const content = getProductSections(product.slug, locale);
  const images = productSectionImagePaths[product.slug];

  return (
    <div className="mt-14 space-y-8 sm:space-y-10">
      <PainSection
        product={product}
        locale={locale}
        content={content.pain}
        imageSrc={images.pain}
      />
      <IngredientsSection
        product={product}
        locale={locale}
        content={content.ingredients}
        imageSrc={images.ingredients}
      />
      <ComparisonSection locale={locale} content={content.comparison} />
      <TrustSection
        product={product}
        locale={locale}
        content={content.trust}
        imageSrc={images.trust}
      />
    </div>
  );
}
