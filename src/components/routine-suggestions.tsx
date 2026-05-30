"use client";

import { products } from "@/data/products";
import type { Locale } from "@/i18n/config";
import { getProductTitleShort } from "@/lib/product-locale";
import { useCart } from "@/lib/cart-store";
import { track } from "@/lib/analytics";
import type { ProductSlug } from "@/lib/types";
import { t } from "@/messages";
import { useMessages } from "./messages-context";

type BundleKey = "complete" | "mobilitySleep" | "sleepGut";

const BUNDLES: Array<{
  id: string;
  key: BundleKey;
  slugs: ProductSlug[];
  featured?: boolean;
}> = [
  {
    id: "routine_complete",
    key: "complete",
    slugs: ["vitalstride", "restwave", "floraease"],
    featured: true,
  },
  {
    id: "routine_mobility_sleep",
    key: "mobilitySleep",
    slugs: ["vitalstride", "restwave"],
  },
  {
    id: "routine_sleep_gut",
    key: "sleepGut",
    slugs: ["restwave", "floraease"],
  },
];

export function RoutineSuggestions({ locale }: { locale: Locale }) {
  const { messages: m } = useMessages();
  const add = useCart((s) => s.add);
  const openDrawer = useCart((s) => s.openDrawer);

  function addBundle(bundle: (typeof BUNDLES)[number]) {
    for (const slug of bundle.slugs) add(slug, 1);
    openDrawer();
    track("add_to_cart", {
      offer_id: bundle.id,
      bundle: true,
      items: bundle.slugs.map((slug) => ({ slug, qty: 1 })),
    });
  }

  return (
    <section className="mt-16 rounded-3xl bg-[#F5F1E9] px-4 py-10 sm:px-8 sm:py-14">
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-2xl leading-tight text-ink sm:text-3xl">
          {t(m, "boutique.routines.title")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
          {t(m, "boutique.routines.intro")}
        </p>
      </header>

      <ul className="mt-10 grid gap-5 lg:grid-cols-3">
        {BUNDLES.map((bundle) => {
          const titleKey = `boutique.routines.${bundle.key}.title` as const;
          const descKey = `boutique.routines.${bundle.key}.desc` as const;

          return (
            <li
              key={bundle.id}
              className="relative flex flex-col rounded-2xl border border-border bg-cream p-5 sm:p-6"
            >
              {bundle.featured ? (
                <span className="absolute end-4 top-4 rounded-md bg-emerald-deep px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream">
                  {t(m, "boutique.routines.featuredBadge")}
                </span>
              ) : null}

              <h3 className="pe-16 font-serif text-lg leading-snug text-ink sm:text-xl">
                {t(m, titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {t(m, descKey)}
              </p>

              <ul className="mt-5 flex flex-1 flex-col gap-2">
                {bundle.slugs.map((slug) => (
                  <li
                    key={slug}
                    className="rounded-xl bg-sand px-4 py-3 text-sm font-medium text-ink"
                  >
                    {getProductTitleShort(products[slug], locale)}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => addBundle(bundle)}
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-emerald px-4 py-3.5 text-sm font-semibold text-cream transition hover:bg-emerald-deep"
              >
                {t(m, "boutique.routines.cta")}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
