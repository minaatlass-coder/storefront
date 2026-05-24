"use client";

import { useCart, getItemCount } from "@/lib/cart-store";
import { track } from "@/lib/analytics";
import { useMessages } from "./messages-context";

export function CartButton() {
  const { messages: m } = useMessages();
  const items = useCart((s) => s.items);
  const hydrated = useCart((s) => s.hydrated);
  const openDrawer = useCart((s) => s.openDrawer);
  const count = hydrated ? getItemCount(items) : 0;

  function onOpen() {
    track("open_cart", { trigger: "header_icon", count });
    openDrawer();
  }

  const aria =
    count > 1
      ? `${m.nav.openCart} (${count})`
      : `${m.nav.openCart} (${count})`;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={aria}
      className="relative inline-flex items-center gap-2 rounded-full border border-border bg-cream px-3 py-2 text-sm font-medium text-ink transition hover:border-ink hover:bg-ink hover:text-sand"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M3 5h2l2.4 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" />
        <circle cx="10" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
      </svg>
      <span className="hidden sm:inline">{m.nav.cart}</span>
      <span
        aria-hidden="true"
        className={`ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold transition ${
          count > 0
            ? "bg-emerald text-white"
            : "bg-border text-ink-soft"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
