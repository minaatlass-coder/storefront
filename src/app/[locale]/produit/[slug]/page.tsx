import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  products,
  productList,
  productSlugs,
} from "@/data/products";
import type { ProductSlug } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { isLocale, locales } from "@/i18n/config";
import { formatMad } from "@/lib/format";
import { href } from "@/lib/href";
import {
  getProductCopy,
  getProductSubtitle,
  getProductTitleShort,
  productNameClassName,
  productNameLangAttrs,
  productSubtitleClassName,
  productSubtitleLangAttrs,
} from "@/lib/product-locale";
import { getMessages, t } from "@/messages";
import type { Messages } from "@/messages";
import { reviews as reviewsData } from "@/data/reviews";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { CrossSellRow } from "@/components/cross-sell-row";
import { ProductImage } from "@/components/product-image";
import { ProductBreadcrumb } from "@/components/product-breadcrumb";
import { ProductReviews } from "@/components/product-reviews";
import { TrackOnMount } from "@/components/track-on-mount";
import { ProductStorySections } from "@/components/product-story-sections";
import { PdpAccordionShortcuts } from "@/components/pdp-accordion-shortcuts";
import { getProductSections } from "@/data/product-sections";

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
  const subtitle = getProductSubtitle(product, locale);
  const crossSells = productList.filter((p) => p.slug !== product.slug);
  const catKey = `productCategory.${product.category}` as const;
  const [ingredientsBadge, usageBadge] = getProductSections(
    product.slug,
    locale,
  ).trust.badges;
  return (
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

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductImage product={product} ratio="square" locale={locale} />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <ProductImage product={product} ratio="square" className="opacity-70" locale={locale} />
            <ProductImage product={product} ratio="square" className="opacity-50" locale={locale} />
            <ProductImage product={product} ratio="square" className="opacity-30" locale={locale} />
          </div>
        </div>

        <div
          {...(locale === "ar" ? { lang: "ar", dir: "rtl" as const } : {})}
        >
          <p className="text-[11px] uppercase tracking-[0.18em] text-emerald">
            {t(m, catKey)}
          </p>
          <h1
            {...productNameLangAttrs(locale)}
            className={`mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl ${productNameClassName(locale)}`}
          >
            {titleShort}
          </h1>
          {subtitle ? (
            <p
              {...productSubtitleLangAttrs()}
              className={`mt-1 text-base text-ink-soft ${productSubtitleClassName(locale)}`}
            >
              {subtitle}
            </p>
          ) : null}

          <a
            href="#reviews"
            className="mt-3 inline-flex items-center gap-2 text-sm text-ink-soft hover:text-emerald"
          >
            <span className="inline-flex" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-4 w-4 ${
                    i <= Math.round(reviewsData[product.slug].average)
                      ? "text-warm"
                      : "text-border"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L10 18.354l-4.629 2.826c-.997.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.886-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </span>
            <span className="font-semibold text-ink">
              {reviewsData[product.slug].average.toFixed(1)}
            </span>
            <span className="text-muted">
              ({reviewsData[product.slug].count})
            </span>
          </a>

          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {copy.tagline}
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <p className="font-serif text-3xl text-ink">
              {formatMad(product.price, locale)}
            </p>
            <span className="rounded-full bg-emerald/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald">
              {m.pdp.codBadge}
            </span>
          </div>

          <ul className="mt-6 space-y-2.5">
            {copy.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <AddToCartButton
              slug={product.slug}
              variant="primary"
              className="flex-1 sm:flex-none"
            >
              {m.pdp.ctaAdd}
            </AddToCartButton>
            <Link
              href={href(locale, "/boutique")}
              className="inline-flex items-center justify-center rounded-full border border-border bg-cream px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink"
            >
              {m.pdp.ctaSeeAll}
            </Link>
          </div>
          <p className="mt-2 text-xs text-muted">
            {m.pdp.ctaMicro}
          </p>

          <PdpAccordionShortcuts
            ingredientsLabel={ingredientsBadge}
            usageLabel={usageBadge}
          />

          <div className="mt-10 space-y-3">
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
        </div>
      </div>

      <ProductStorySections product={product} locale={locale} />

      <ConversionCta
        slug={product.slug}
        title={titleShort}
        price={product.price}
        locale={locale}
        messages={m}
      />

      <ProductFaq slug={product.slug} locale={locale} messages={m} />

      <ProductReviews slug={product.slug} locale={locale} />

      <FinalOffer
        slug={product.slug}
        title={titleShort}
        price={product.price}
        locale={locale}
        messages={m}
      />

      <section className="mt-20">
        <CrossSellRow
          products={crossSells}
          locale={locale}
          messages={m}
          title={m.crossSell.defaultTitle}
          subtitle={m.crossSell.pdpSubtitle}
        />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-sand/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted">{titleShort}</p>
            <p className="text-base font-semibold text-ink">
              {formatMad(product.price, locale)}
            </p>
          </div>
          <AddToCartButton slug={product.slug} variant="primary" className="flex-1">
            {m.pdp.ctaAdd}
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
}

function ConversionCta({
  slug,
  title,
  price,
  locale,
  messages,
}: {
  slug: ProductSlug;
  title: string;
  price: number;
  locale: Locale;
  messages: Messages;
}) {
  return (
    <section className="mt-12 rounded-3xl border border-emerald/20 bg-gradient-to-br from-emerald via-emerald to-emerald-deep px-6 py-7 text-cream shadow-sm sm:px-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cream/80">
            {messages.pdp.codBadge}
          </p>
          <h2 className="mt-2 font-serif text-2xl text-cream">{title}</h2>
          <p className="mt-2 text-sm text-cream/90">
            {messages.pdp.ctaMicro}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <p className="font-serif text-3xl text-cream">{formatMad(price, locale)}</p>
          <AddToCartButton
            slug={slug}
            variant="secondary"
            className="w-full min-w-[12rem] border-transparent bg-sand !text-ink hover:border-transparent hover:bg-emerald hover:!text-white sm:w-auto"
          >
            {messages.pdp.ctaAdd}
          </AddToCartButton>
        </div>
      </div>
    </section>
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
  const items = getFaqItems(slug, locale);

  return (
    <section className="mt-16 rounded-3xl border border-border bg-sand p-6 sm:p-8 lg:p-10">
      <p className="text-xs uppercase tracking-[0.18em] text-emerald">
        {messages.pdp.faqKicker}
      </p>
      <h2 className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl">
        {messages.pdp.faqTitle}
      </h2>
      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {items.map((item, idx) => (
          <details
            key={item.q}
            open={idx === 0}
            className="group rounded-2xl border border-border bg-cream"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-ink list-none [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="text-muted transition group-open:rotate-180">v</span>
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-ink-soft">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalOffer({
  slug,
  title,
  price,
  locale,
  messages,
}: {
  slug: ProductSlug;
  title: string;
  price: number;
  locale: Locale;
  messages: Messages;
}) {
  return (
    <section className="mt-16 rounded-3xl border border-border bg-cream p-6 sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald">
            {messages.pdp.finalKicker}
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl">
            {messages.pdp.finalTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
            {messages.pdp.finalBody}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            {messages.pdp.finalTrust}
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-sand p-5">
          <p className="text-sm font-semibold text-ink">{title}</p>
          <p className="mt-2 font-serif text-3xl text-ink">
            {formatMad(price, locale)}
          </p>
          <AddToCartButton slug={slug} variant="primary" className="mt-4 w-full">
            {messages.pdp.ctaAdd}
          </AddToCartButton>
        </div>
      </div>
    </section>
  );
}

function getFaqItems(slug: ProductSlug, locale: Locale): Array<{ q: string; a: string }> {
  const commonFr = [
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
