export type ProductSlug = "vitalstride" | "restwave" | "floraease";

export type ProductCategory = "joints" | "sleep" | "gut";

export interface ProductCopyAr {
  tagline: string;
  problem: string;
  shortDescription: string;
  bullets: string[];
  /** قائمة المكوّنات بالعربية (صفحة /ar). */
  ingredients: string[];
  usage: string;
  warnings: string[];
  upsellHook: string;
}

export interface Product {
  slug: ProductSlug;
  category: ProductCategory;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  nameArTranslit: string;
  /** Texte marketing en arabe pour les pages /ar (titres produit : nameAr). */
  copyAr: ProductCopyAr;
  tagline: string;
  problem: string;
  shortDescription: string;
  bullets: string[];
  ingredients: string[];
  usage: string;
  warnings: string[];
  price: number;
  upsellPrice: number;
  upsellHook: string;
  /** Path under /public, e.g. "/products/vitalstride.jpg". Set to null to use the brand gradient placeholder. */
  image: string | null;
  /** Additional gallery images (optional). Falls back to the main image being shown multiple times. */
  gallery?: string[];
}

export interface CartLine {
  slug: ProductSlug;
  qty: number;
}

export interface OrderItem {
  sku: ProductSlug;
  name_fr: string;
  qty: number;
  unit_price: number;
  line_total: number;
}

export interface OrderPayload {
  event: "order_created" | "upsell_added";
  order_id: string;
  created_at?: string;
  name?: string;
  address?: string;
  phone_normalized?: string;
  phone_raw?: string;
  items?: OrderItem[];
  items_subtotal?: number;
  upsell?: {
    sku: ProductSlug;
    name_fr: string;
    unit_price: number;
    accepted: boolean;
  } | null;
  order_total?: number;
  new_order_total?: number;
  currency?: "MAD";
  source?: "website" | "contact";
  user_agent?: string;
  referrer?: string;
  ip_hash?: string;
}
