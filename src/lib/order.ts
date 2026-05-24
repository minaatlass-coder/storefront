import { randomBytes } from "node:crypto";
import type { ProductSlug } from "@/lib/types";

export type Items = Partial<Record<ProductSlug, number>>;

export function generateOrderId(date = new Date()): string {
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = randomBytes(2).toString("hex").toUpperCase();
  return `SAH-${ymd}-${rand}`;
}

const SLUGS: ProductSlug[] = ["vitalstride", "restwave", "floraease"];

/**
 * Implements §13 of the playbook: pick the single SKU most likely
 * to be added given current cart contents. Returns null when the cart
 * is empty or already contains all 3 SKUs.
 */
export function pickUpsell(items: Items): ProductSlug | null {
  const has = (s: ProductSlug) => (items[s] ?? 0) > 0;
  const inCart = SLUGS.filter(has);
  if (inCart.length === 0 || inCart.length === 3) return null;

  if (inCart.length === 1) {
    if (has("vitalstride")) return "restwave";
    if (has("restwave")) return "vitalstride";
    if (has("floraease")) return "vitalstride";
  }

  if (inCart.length === 2) {
    if (has("vitalstride") && has("restwave")) return "floraease";
    if (has("vitalstride") && has("floraease")) return "restwave";
    if (has("restwave") && has("floraease")) return "vitalstride";
  }

  return null;
}

export function isValidSlug(s: unknown): s is ProductSlug {
  return typeof s === "string" && (SLUGS as readonly string[]).includes(s);
}
