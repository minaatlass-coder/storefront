"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ProductSlug } from "@/lib/types";
import { products } from "@/data/products";

type Items = Partial<Record<ProductSlug, number>>;

export interface LastOrderItem {
  sku: ProductSlug;
  name_fr: string;
  qty: number;
  unit_price: number;
  line_total: number;
}

export interface LastOrder {
  order_id: string;
  name: string;
  address: string;
  phone: string;
  created_at: string;
  items: LastOrderItem[];
  items_subtotal: number;
  upsell:
    | {
        sku: ProductSlug;
        name_fr: string;
        unit_price: number;
      }
    | null;
  total: number;
}

interface CartState {
  items: Items;
  drawerOpen: boolean;
  checkoutOpen: boolean;
  upsellOpen: boolean;
  pendingOrderId: string | null;
  pendingUpsellSlug: ProductSlug | null;
  lastOrder: LastOrder | null;
  hydrated: boolean;
  add: (slug: ProductSlug, qty?: number) => void;
  setQty: (slug: ProductSlug, qty: number) => void;
  remove: (slug: ProductSlug) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  openUpsell: (orderId: string, slug: ProductSlug) => void;
  closeUpsell: () => void;
  setLastOrder: (order: LastOrder | null) => void;
  applyUpsellAccepted: (slug: ProductSlug) => void;
  setHydrated: (v: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: {},
      drawerOpen: false,
      checkoutOpen: false,
      upsellOpen: false,
      pendingOrderId: null,
      pendingUpsellSlug: null,
      lastOrder: null,
      hydrated: false,
      add: (slug, qty = 1) =>
        set((s) => ({
          items: { ...s.items, [slug]: (s.items[slug] ?? 0) + qty },
        })),
      setQty: (slug, qty) =>
        set((s) => {
          const next = { ...s.items };
          if (qty <= 0) delete next[slug];
          else next[slug] = qty;
          return { items: next };
        }),
      remove: (slug) =>
        set((s) => {
          const next = { ...s.items };
          delete next[slug];
          return { items: next };
        }),
      clear: () => set({ items: {} }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      openCheckout: () => set({ checkoutOpen: true, drawerOpen: false }),
      closeCheckout: () => set({ checkoutOpen: false }),
      openUpsell: (orderId, slug) =>
        set({
          upsellOpen: true,
          pendingOrderId: orderId,
          pendingUpsellSlug: slug,
        }),
      closeUpsell: () =>
        set({
          upsellOpen: false,
          pendingOrderId: null,
          pendingUpsellSlug: null,
        }),
      setLastOrder: (order) => set({ lastOrder: order }),
      applyUpsellAccepted: (slug) =>
        set((s) => {
          if (!s.lastOrder) return {};
          const p = products[slug];
          return {
            lastOrder: {
              ...s.lastOrder,
              upsell: {
                sku: slug,
                name_fr: p.nameFr,
                unit_price: p.upsellPrice,
              },
              total: s.lastOrder.items_subtotal + p.upsellPrice,
            },
          };
        }),
      setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "sahha-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items, lastOrder: s.lastOrder }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

export interface CartLineView {
  slug: ProductSlug;
  qty: number;
  unitPrice: number;
  lineTotal: number;
  nameFr: string;
}

export function getCartLines(items: Items): CartLineView[] {
  return (Object.entries(items) as [ProductSlug, number][])
    .filter(([, qty]) => qty > 0)
    .map(([slug, qty]) => {
      const p = products[slug];
      return {
        slug,
        qty,
        unitPrice: p.price,
        lineTotal: p.price * qty,
        nameFr: p.nameFr,
      };
    });
}

export function getSubtotal(items: Items): number {
  return getCartLines(items).reduce((sum, l) => sum + l.lineTotal, 0);
}

export function getItemCount(items: Items): number {
  return Object.values(items).reduce((sum, q) => sum + (q ?? 0), 0);
}
