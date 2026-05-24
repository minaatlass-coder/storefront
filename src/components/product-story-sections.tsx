import type { Locale } from "@/i18n/config";
import type { Product } from "@/lib/types";
import {
  getProductSections,
  productSectionImagePaths,
  type ProductSectionContent,
} from "@/data/product-sections";
import { ProductSectionImage } from "./product-section-image";

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
    <section className="rounded-3xl border border-border bg-cream/80 p-6 sm:p-8 lg:p-10">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className={rtl ? "lg:order-2" : "lg:order-1"}>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald">
            {content.kicker}
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl">
            {content.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            {content.intro}
          </p>
          <ul className="mt-6 space-y-3">
            {content.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-border bg-sand px-4 py-3.5 text-sm text-ink"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p
            className={`mt-6 rounded-2xl border border-emerald/20 bg-emerald/5 px-4 py-4 text-sm font-medium text-ink ${
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
    </div>
  );
}
