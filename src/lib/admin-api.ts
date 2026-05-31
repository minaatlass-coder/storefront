export interface DashboardStats {
  range: { from: string; to: string };
  traffic_filter: string;
  funnel: {
    page_views: number;
    product_views: number;
    add_to_cart: number;
    open_checkout: number;
    submit_order_success: number;
    orders: number;
    upsells_accepted: number;
    contacts: number;
    whatsapp_clicks: number;
  };
  revenue: {
    orders_subtotal_mad: number;
    upsell_revenue_mad: number;
    total_mad: number;
    aov_mad: number;
  };
  conversion: {
    view_to_cart_pct: number;
    cart_to_checkout_pct: number;
    checkout_to_order_pct: number;
    overall_conversion_pct: number;
  };
  by_product: Array<{
    slug: string;
    views: number;
    add_to_cart: number;
    orders: number;
    revenue_mad: number;
  }>;
  by_day: Array<{
    date: string;
    page_views: number;
    orders: number;
    revenue_mad: number;
  }>;
}

export interface AdminOrder {
  order_id: string;
  created_at: string;
  name: string;
  phone_normalized: string;
  address: string;
  items: Array<{
    sku: string;
    name_fr: string;
    qty: number;
    unit_price: number;
    line_total: number;
  }>;
  items_subtotal: number;
  order_total: number;
  upsell: {
    sku: string;
    name_fr: string;
    unit_price: number;
  } | null;
  currency: string;
  source: string;
  source_url: string;
  context: Record<string, unknown>;
  traffic_valid_ma: boolean;
  ip_country: string | null;
}

const API_ERRORS: Record<number, string> = {
  401: "Session expirée ou identifiants incorrects.",
  502: "API admin indisponible — vérifiez API_URL et redéployez le backend.",
  503: "Admin non configuré sur le backend (ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SESSION_SECRET).",
  404: "Route admin introuvable — redéployez le backend avec le code admin.",
};

async function adminFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<{ ok: true; data: T } | { ok: false; error: string; status: number }> {
  let res: Response;
  try {
    res = await fetch(`/api/admin/${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(init?.headers ?? {}),
      },
      credentials: "same-origin",
    });
  } catch {
    return { ok: false, error: "Réseau indisponible.", status: 0 };
  }

  let json: { ok?: boolean; error?: string } & T;
  try {
    json = (await res.json()) as { ok?: boolean; error?: string } & T;
  } catch {
    return {
      ok: false,
      error: API_ERRORS[res.status] ?? `Erreur serveur (${res.status}).`,
      status: res.status,
    };
  }

  if (!res.ok || json.ok === false) {
    return {
      ok: false,
      error:
        json.error ??
        API_ERRORS[res.status] ??
        `Erreur (${res.status}).`,
      status: res.status,
    };
  }
  return { ok: true, data: json as T };
}

export async function adminLogin(username: string, password: string) {
  return adminFetch<{ ok: boolean }>("login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function adminMe() {
  return adminFetch<{ ok: boolean; user?: string }>("me");
}

export async function adminLogout() {
  return adminFetch<{ ok: boolean }>("logout", { method: "POST" });
}

export async function fetchStats(from: string, to: string) {
  const q = new URLSearchParams({ from, to });
  return adminFetch<{ stats: DashboardStats }>(`stats?${q}`);
}

export async function fetchOrders(from: string, to: string, page: number) {
  const q = new URLSearchParams({
    from,
    to,
    page: String(page),
    limit: "20",
  });
  return adminFetch<{
    orders: AdminOrder[];
    total: number;
    page: number;
    limit: number;
  }>(`orders?${q}`);
}

export async function fetchOrder(orderId: string) {
  return adminFetch<{ order: AdminOrder }>(`orders/${encodeURIComponent(orderId)}`);
}

export function formatMad(n: number): string {
  return `${n.toLocaleString("fr-MA")} MAD`;
}

export function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fr-MA", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Africa/Casablanca",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function utmLabel(ctx: Record<string, unknown>): string {
  const parts = [
    ctx.utm_source,
    ctx.utm_medium,
    ctx.utm_campaign,
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : "Direct / organique";
}
