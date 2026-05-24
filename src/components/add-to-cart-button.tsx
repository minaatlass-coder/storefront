"use client";

import { useState, useTransition } from "react";
import type { ProductSlug } from "@/lib/types";
import { useCart } from "@/lib/cart-store";
import { products } from "@/data/products";
import { track } from "@/lib/analytics";
import { t } from "@/messages";
import { useMessages } from "./messages-context";

interface Props {
  slug: ProductSlug;
  qty?: number;
  variant?: "primary" | "secondary" | "compact";
  className?: string;
  children?: React.ReactNode;
}

export function AddToCartButton({
  slug,
  qty = 1,
  variant = "primary",
  className = "",
  children,
}: Props) {
  const { messages } = useMessages();
  const add = useCart((s) => s.add);
  const openDrawer = useCart((s) => s.openDrawer);
  const [added, setAdded] = useState(false);
  const [, startTransition] = useTransition();

  const base =
    "inline-flex items-center justify-center font-semibold transition focus-visible:outline-none disabled:cursor-not-allowed";

  const styles =
    variant === "primary"
      ? "rounded-full bg-ink px-6 py-3 text-sm text-sand hover:bg-emerald"
      : variant === "secondary"
        ? "rounded-full border border-border bg-cream px-6 py-3 text-sm text-ink hover:border-ink"
        : "rounded-full bg-emerald px-3 py-1.5 text-xs text-white hover:bg-emerald-deep";

  function onClick() {
    add(slug, qty);
    openDrawer();
    track("add_to_cart", {
      slug,
      qty,
      unit_price: products[slug].price,
    });
    track("open_cart", { trigger: "add_to_cart", slug });
    startTransition(() => {
      setAdded(true);
      setTimeout(() => setAdded(false), 1400);
    });
  }

  const label = children ?? t(messages, "pdp.ctaAdd");

  return (
    <button
      type="button"
      onClick={onClick}
      aria-live="polite"
      className={`${base} ${styles} ${className}`}
    >
      {added ? (
        <span className="inline-flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 5.296a1 1 0 0 1 0 1.414l-7.5 7.5a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 1 1 1.414-1.414L8.5 12.086l6.79-6.79a1 1 0 0 1 1.414 0Z"
              clipRule="evenodd"
            />
          </svg>
          {t(messages, "cart.added")}
        </span>
      ) : (
        label
      )}
    </button>
  );
}
