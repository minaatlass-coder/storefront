"use client";

import { OpenDetailsLink } from "./open-details-link";

interface Props {
  ingredientsLabel: string;
  usageLabel: string;
}

export function PdpAccordionShortcuts({
  ingredientsLabel,
  usageLabel,
}: Props) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <OpenDetailsLink
        href="#pdp-ingredients"
        detailsId="pdp-ingredients"
        className="rounded-full border border-dashed border-border bg-cream px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted transition hover:border-emerald hover:text-emerald"
      >
        {ingredientsLabel}
      </OpenDetailsLink>
      <OpenDetailsLink
        href="#pdp-usage"
        detailsId="pdp-usage"
        className="rounded-full border border-dashed border-border bg-cream px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted transition hover:border-emerald hover:text-emerald"
      >
        {usageLabel}
      </OpenDetailsLink>
    </div>
  );
}
