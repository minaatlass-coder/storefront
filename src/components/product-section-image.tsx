import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Product } from "@/lib/types";
import type { ProductSectionId } from "@/data/product-sections";
import {
  getProductTitleShort,
  productNameClassName,
  productNameLangAttrs,
} from "@/lib/product-locale";

const gradientByCategory = {
  joints:
    "linear-gradient(135deg, #F4ECD8 0%, #E8D9B5 45%, #C28846 100%)",
  sleep:
    "linear-gradient(135deg, #E7E9F1 0%, #C8D0E1 45%, #4A5878 100%)",
  gut: "linear-gradient(135deg, #EAF2EA 0%, #C7DBC8 45%, #4A7A55 100%)",
} as const;

const sectionLabels: Record<ProductSectionId, { fr: string; ar: string }> = {
  pain: { fr: "Photo contexte", ar: "صورة السياق" },
  ingredients: { fr: "Photo ingrédients", ar: "صورة المكوّنات" },
  trust: { fr: "Photo qualité", ar: "صورة الجودة" },
};

interface Props {
  product: Product;
  section: ProductSectionId;
  src: string | null;
  locale: Locale;
  ratio?: "square" | "portrait" | "landscape";
  className?: string;
  priority?: boolean;
}

export function ProductSectionImage({
  product,
  section,
  src,
  locale,
  ratio = "portrait",
  className = "",
  priority = false,
}: Props) {
  const titleShort = getProductTitleShort(product, locale);
  const label = sectionLabels[section][locale];
  const useSrc = src;
  const aspect =
    ratio === "landscape"
      ? "aspect-[5/4]"
      : ratio === "square"
        ? "aspect-square"
        : "aspect-[4/5]";

  return (
    <div
      className={`relative ${aspect} overflow-hidden rounded-3xl border border-border shadow-sm ${className}`}
      style={{ background: gradientByCategory[product.category] }}
      role="img"
      aria-label={`${titleShort} — ${label}`}
    >
      {useSrc ? (
        <Image
          src={useSrc}
          alt={`${titleShort} — ${label}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div
          className={`absolute inset-0 flex flex-col justify-center p-8 ${locale === "ar" ? "items-start text-right" : "items-center text-center"}`}
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/85">
            {label}
          </p>
          <p
            {...productNameLangAttrs(locale)}
            className={`mt-4 font-serif text-2xl leading-tight text-white drop-shadow-sm sm:text-3xl ${productNameClassName(locale)}`}
          >
            {titleShort}
          </p>
          <p className="mt-3 max-w-xs text-xs text-white/80 sm:text-sm">
            {locale === "ar"
              ? "ضيف الصورة هنا: public/products/"
              : "Ajoutez la photo ici : public/products/"}
            <br />
            <span className="font-mono text-[10px] opacity-90">
              {product.slug}-section-{section}.jpg
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
