"use client";

import { useMemo } from "react";
import { useCart } from "@/lib/cart-store";
import { products } from "@/data/products";
import { formatMad } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";

interface Offer {
  id: string;
  title: string;
  subtitle: string;
  lines: Array<{ slug: keyof typeof products; qty: number }>;
  discountPct: number;
  scarcity: string;
}

const OFFERS: Offer[] = [
  {
    id: "duo_mobilite_sommeil",
    title: "Duo Mobilite + Sommeil",
    subtitle: "VitalStride + RestWave (2 boites)",
    lines: [
      { slug: "vitalstride", qty: 1 },
      { slug: "restwave", qty: 1 },
    ],
    discountPct: 8,
    scarcity: "Stock lot duo limite",
  },
  {
    id: "routine_complete_3",
    title: "Routine Complete 30 jours",
    subtitle: "Articulations + Sommeil + Digestion",
    lines: [
      { slug: "vitalstride", qty: 1 },
      { slug: "restwave", qty: 1 },
      { slug: "floraease", qty: 1 },
    ],
    discountPct: 12,
    scarcity: "Offre la plus choisie aujourd'hui",
  },
];

export function BundleOffers({ locale }: { locale: Locale }) {
  const add = useCart((s) => s.add);
  const openDrawer = useCart((s) => s.openDrawer);

  function applyOffer(offer: Offer) {
    for (const line of offer.lines) add(line.slug, line.qty);
    openDrawer();
    track("add_to_cart", {
      offer_id: offer.id,
      offer_title: offer.title,
      bundle: true,
      items: offer.lines,
    });
  }

  const priced = useMemo(
    () =>
      OFFERS.map((o) => {
        const base = o.lines.reduce((sum, l) => sum + products[l.slug].price * l.qty, 0);
        const final = Math.round(base * (1 - o.discountPct / 100));
        return { ...o, base, final };
      }),
    [],
  );

  return (
    <section className="rounded-3xl border border-border bg-cream p-5 sm:p-7">
      <p className="text-xs uppercase tracking-[0.18em] text-emerald">
        {locale === "ar" ? "عروض رفع قيمة الطلب" : "Offres panier moyen eleve"}
      </p>
      <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
        {locale === "ar" ? "اختاروا العرض اللي يناسبكم" : "Choisissez votre meilleure offre"}
      </h2>
      <p className="mt-2 text-sm text-ink-soft">
        {locale === "ar"
          ? "هاد العروض كيتضافو دابا فالسلة، والتخفيض كيتأكد عند مكالمة التاكيد."
          : "Ces bundles augmentent votre routine et passent en confirmation avec l'agent COD."}
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {priced.map((offer) => (
          <article key={offer.id} className="rounded-2xl border border-border bg-sand p-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-warm">{offer.scarcity}</p>
            <h3 className="mt-1 text-lg font-semibold text-ink">{offer.title}</h3>
            <p className="text-sm text-ink-soft">{offer.subtitle}</p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-sm text-muted line-through">{formatMad(offer.base, locale)}</span>
              <span className="font-serif text-2xl text-ink">{formatMad(offer.final, locale)}</span>
              <span className="rounded-full bg-emerald/10 px-2 py-0.5 text-[11px] font-semibold text-emerald">
                -{offer.discountPct}%
              </span>
            </div>
            <button
              type="button"
              onClick={() => applyOffer(offer)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-ink px-4 py-3 text-sm font-semibold text-sand transition hover:bg-emerald"
            >
              {locale === "ar" ? "ضيف العرض للسلة" : "Ajouter cette offre au panier"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

