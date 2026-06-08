import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  products,
  productSlugs,
} from "@/data/products";
import type { ProductSlug } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { isLocale, locales } from "@/i18n/config";
import { formatMad } from "@/lib/format";
import {
  getProductCopy,
  getProductTitleShort,
} from "@/lib/product-locale";
import { getMessages, t } from "@/messages";
import type { Messages } from "@/messages";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { CrossSellRow } from "@/components/cross-sell-row";
import { ProductBreadcrumb } from "@/components/product-breadcrumb";
import { ProductReviews } from "@/components/product-reviews";
import { TrackOnMount } from "@/components/track-on-mount";
import { ProductStorySections } from "@/components/product-story-sections";
import { PdpAccordionShortcuts } from "@/components/pdp-accordion-shortcuts";
import { PdpHero } from "@/components/pdp-hero";
import { getProductSections } from "@/data/product-sections";

/** Produits affichés dans « Souvent ajouté ensemble » sur chaque PDP. */
const PDP_CROSS_SELL_SLUGS: ProductSlug[] = ["vitalstride", "floraease"];

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    productSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const product = products[slug as ProductSlug];
  if (!product) return {};
  const copy = getProductCopy(product, locale);
  return {
    title: getProductTitleShort(product, locale),
    description: copy.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  if (!(slug in products)) notFound();
  const product = products[slug as ProductSlug];
  const m = getMessages(locale);
  const copy = getProductCopy(product, locale);
  const titleShort = getProductTitleShort(product, locale);
  const crossSells = PDP_CROSS_SELL_SLUGS.filter((s) => s !== product.slug).map(
    (s) => products[s],
  );
  const catKey = `productCategory.${product.category}` as const;
  const [ingredientsBadge, usageBadge] = getProductSections(
    product.slug,
    locale,
  ).trust.badges;

  return (
    <div className="pb-24 lg:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <TrackOnMount
          event="view_product"
          props={{ slug: product.slug, price: product.price }}
        />
        <ProductBreadcrumb
          locale={locale}
          messages={m}
          currentLabel={titleShort}
        />

        <PdpHero
          product={product}
          locale={locale}
          messages={m}
          categoryLabel={t(m, catKey)}
        />

        <section className="mt-10">
          <PdpAccordionShortcuts
            ingredientsLabel={ingredientsBadge}
            usageLabel={usageBadge}
          />
          <div className="mt-4 space-y-3">
            <Accordion title={m.pdp.tabDesc} defaultOpen>
              <p className="text-sm leading-relaxed text-ink-soft">
                {copy.shortDescription}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                <strong className="text-ink">{m.pdp.whoFor}</strong> {copy.problem}
              </p>
            </Accordion>

            <Accordion id="pdp-ingredients" title={m.pdp.tabIng}>
              <ul className="space-y-1.5 text-sm text-ink-soft">
                {copy.ingredients.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-ink-soft" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </Accordion>

            <Accordion id="pdp-usage" title={m.pdp.tabUse}>
              <p className="text-sm leading-relaxed text-ink-soft">{copy.usage}</p>
            </Accordion>

            <Accordion title={m.pdp.tabWarn}>
              <ul className="space-y-1.5 text-sm text-ink-soft">
                {copy.warnings.map((w) => (
                  <li key={w} className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-warm" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </Accordion>
          </div>
        </section>

        <ProductStorySections product={product} locale={locale} />

        {crossSells.length > 0 ? (
          <section className="mt-16">
            <CrossSellRow
              products={crossSells}
              locale={locale}
              messages={m}
              title={m.crossSell.defaultTitle}
              subtitle={m.crossSell.pdpSubtitle}
            />
          </section>
        ) : null}

        <ProductReviews slug={product.slug} locale={locale} />

        <ProductFaq slug={product.slug} locale={locale} messages={m} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-cream/95 px-4 py-3 shadow-[0_-4px_24px_rgba(15,27,45,0.08)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-ink">{titleShort}</p>
            <p className="truncate text-xs text-muted">
              {m.pdp.stickyFrom.replace("{price}", formatMad(product.price, locale))}
            </p>
          </div>
          <AddToCartButton
            slug={product.slug}
            variant="primary"
            className="shrink-0 !bg-emerald hover:!bg-emerald-deep"
          >
            {m.pdp.ctaAdd} — {formatMad(product.price, locale)}
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
}

function ProductFaq({
  slug,
  locale,
  messages,
}: {
  slug: ProductSlug;
  locale: Locale;
  messages: Messages;
}) {
  const items = getFaqItems(slug, locale, messages);
  const isRtl = locale === "ar";

  return (
    <section
      className="mt-16 rounded-3xl bg-[#F5F1E9] px-6 py-10 sm:px-10 sm:py-14"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald">
          {messages.pdp.faqKicker}
        </p>
        <h2 className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl lg:text-4xl">
          {messages.pdp.faqTitle}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
          {messages.pdp.faqSubtitle}
        </p>
      </header>
      <ul className="mx-auto mt-8 max-w-3xl space-y-2">
        {items.map((item) => (
          <li key={item.q}>
            <details className="group rounded-2xl border border-border bg-cream">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-ink list-none [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 flex-1 text-start">{item.q}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-180"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.13l3.71-3.9a.75.75 0 1 1 1.08 1.04l-4.24 4.45a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>
              <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-ink-soft">
                {item.a}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}

function getFaqItems(
  slug: ProductSlug,
  locale: Locale,
  messages: Messages,
): Array<{ q: string; a: string }> {
  const commonFr = [
    {
      q: messages.pdp.packagingFaqQ,
      a: messages.pdp.packagingFaqA,
    },
    {
      q: "Est-ce que je paie en ligne ?",
      a: "Non. Vous laissez vos coordonnées, notre équipe confirme la commande par téléphone, puis vous payez à la réception du colis.",
    },
    {
      q: "Quand vais-je recevoir ma commande ?",
      a: "La livraison se fait généralement sous 24–72h selon la ville, après confirmation téléphonique.",
    },
    {
      q: "Puis-je retourner le produit ?",
      a: "Oui, le retour est possible sous 7 jours si le produit est non ouvert et intact.",
    },
    {
      q: "Est-ce un médicament ?",
      a: "Non. Il s'agit d'un complément alimentaire. Il ne remplace pas un diagnostic, un traitement ou l'avis d'un professionnel de santé.",
    },
  ];
  const commonAr = [
    {
      q: messages.pdp.packagingFaqQ,
      a: messages.pdp.packagingFaqA,
    },
    {
      q: "هل أدفع عبر الإنترنت؟",
      a: "لا. تتركون معلوماتكم، يؤكد الفريق الطلب عبر الهاتف، وتدفعون عند استلام الطرد.",
    },
    {
      q: "متى يصل الطلب؟",
      a: "عادة يتم التوصيل خلال 24–72 ساعة حسب المدينة، بعد تأكيد الطلب عبر الهاتف.",
    },
    {
      q: "هل يمكنني إرجاع المنتج؟",
      a: "نعم، يمكن الإرجاع خلال 7 أيام إذا كان المنتج غير مفتوح وسليماً.",
    },
    {
      q: "هل هذا دواء؟",
      a: "لا. هذا مكمل غذائي ولا يعوض التشخيص أو العلاج أو رأي مختص صحي.",
    },
  ];

  const productFr: Record<ProductSlug, Array<{ q: string; a: string }>> = {
    vitalstride: [
      {
        q: "Pour qui VitalStride est-il pensé ?",
        a: "Pour les adultes qui cherchent une routine de confort pour les genoux, le dos ou les épaules, surtout quand la raideur revient au quotidien.",
      },
      {
        q: "Quand ressentir la différence ?",
        a: "Les routines articulaires sont progressives. L'important est la régularité sur plusieurs semaines, en respectant les précautions.",
      },
    ],
    restwave: [
      {
        q: "RestWave est-il un somnifère ?",
        a: "Non. C'est une routine du soir à base de magnésium bisglycinate et vitamine B6. Elle ne doit pas être présentée comme un somnifère.",
      },
      {
        q: "Est-ce que je serai assommé au réveil ?",
        a: "La formule est pensée pour accompagner le calme du soir, sans promesse d'effet sédatif. Si vous suivez un traitement, demandez avis médical.",
      },
    ],
    floraease: [
      {
        q: "Que contient FloraEase ?",
        a: "Une formule probiotiques multi-souches avec fibre prébiotique. Les souches sont listées sur la page et la fiche technique peut être demandée.",
      },
      {
        q: "Quand le prendre ?",
        a: "La routine indiquée est une prise quotidienne, de préférence le matin à jeun ou avant un repas, avec un grand verre d'eau.",
      },
    ],
  };

  const productAr: Record<ProductSlug, Array<{ q: string; a: string }>> = {
    vitalstride: [
      {
        q: "لمن صُمم VitalStride؟",
        a: "للكبار الذين يبحثون عن روتين راحة للركبتين أو الظهر أو الكتفين، خصوصاً عندما يتكرر الشد في اليوم.",
      },
      {
        q: "متى يمكن ملاحظة الفرق؟",
        a: "روتينات المفاصل تكون تدريجية. المهم هو الانتظام لعدة أسابيع مع احترام الاحتياطات.",
      },
    ],
    restwave: [
      {
        q: "هل RestWave منوم؟",
        a: "لا. هو روتين مسائي بمغنيسيوم بيسغليسينات وفيتامين B6، ولا يجب تقديمه كمنوم.",
      },
      {
        q: "هل يسبب ثقلاً عند الاستيقاظ؟",
        a: "التركيبة مخصصة لمرافقة هدوء المساء بدون وعد بتأثير مهدئ قوي. إذا كنتم تتبعون علاجاً، اطلبوا رأي طبي.",
      },
    ],
    floraease: [
      {
        q: "ماذا يحتوي FloraEase؟",
        a: "تركيبة بروبيوتيك متعددة السلالات مع ألياف قبلية. السلالات مذكورة في الصفحة ويمكن طلب الوثائق التقنية.",
      },
      {
        q: "متى أتناوله؟",
        a: "الروتين المذكور هو جرعة يومية، صباحاً على معدة فارغة أو قبل وجبة، مع كأس كبير من الماء.",
      },
    ],
  };

  return locale === "ar"
    ? [...productAr[slug], ...commonAr]
    : [...productFr[slug], ...commonFr];
}

function Accordion({
  id,
  title,
  children,
  defaultOpen = false,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      id={id}
      className="group rounded-2xl border border-border bg-cream open:bg-cream"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-ink list-none [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 flex-1">{title}</span>
        <span className="shrink-0 text-muted transition group-open:rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.13l3.71-3.9a.75.75 0 1 1 1.08 1.04l-4.24 4.45a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </summary>
      <div className="px-5 pb-5">{children}</div>
    </details>
  );
}
