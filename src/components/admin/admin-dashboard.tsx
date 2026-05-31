"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  adminLogout,
  adminMe,
  fetchOrders,
  fetchStats,
  formatDate,
  formatMad,
  utmLabel,
  type AdminOrder,
  type DashboardStats,
} from "@/lib/admin-api";

type Tab = "overview" | "orders" | "products";

const SLUG_LABELS: Record<string, string> = {
  vitalstride: "VitalStride",
  restwave: "RestWave",
  floraease: "FloraEase",
};

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

function presetRange(days: number): { from: string; to: string } {
  const to = endOfDay(new Date());
  const from = startOfDay(new Date());
  from.setDate(from.getDate() - (days - 1));
  return { from: from.toISOString(), to: to.toISOString() };
}

function KpiCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#161b22] p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-white/50">{label}</p>
      <p className={`mt-2 text-2xl font-semibold tabular-nums ${accent ?? "text-white"}`}>
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-white/45">{hint}</p> : null}
    </div>
  );
}

function FunnelBar({
  label,
  count,
  max,
  pct,
}: {
  label: string;
  count: number;
  max: number;
  pct: string;
}) {
  const width = max > 0 ? Math.max(4, (count / max) * 100) : 0;
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-white/80">{label}</span>
        <span className="tabular-nums text-white/50">
          {count.toLocaleString("fr-MA")} · {pct}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function OrderCard({
  order,
  onSelect,
}: {
  order: AdminOrder;
  onSelect: (o: AdminOrder) => void;
}) {
  const totalWithUpsell =
    order.order_total + (order.upsell?.unit_price ?? 0);
  const itemPreview = order.items.map((i) => i.name_fr.split("—")[0].trim()).join(", ");

  return (
    <button
      type="button"
      onClick={() => onSelect(order)}
      className="group w-full rounded-xl border border-white/10 bg-[#161b22] p-4 text-left transition hover:border-emerald-500/40 hover:bg-[#1c2128]"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-mono text-sm text-emerald-400">{order.order_id}</p>
          <p className="mt-1 font-medium text-white">{order.name}</p>
          <p className="text-sm text-white/50">{formatDate(order.created_at)}</p>
        </div>
        <div className="text-end">
          <p className="text-lg font-semibold tabular-nums text-white">
            {formatMad(totalWithUpsell)}
          </p>
          {order.upsell ? (
            <p className="text-xs text-amber-400/90">+ upsell</p>
          ) : null}
        </div>
      </div>
      <p className="mt-3 line-clamp-1 text-sm text-white/60">{itemPreview}</p>
      <p className="mt-2 text-xs text-white/40">{utmLabel(order.context)}</p>
    </button>
  );
}

function OrderDetail({
  order,
  onClose,
}: {
  order: AdminOrder;
  onClose: () => void;
}) {
  const totalWithUpsell =
    order.order_total + (order.upsell?.unit_price ?? 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 p-0 sm:p-4">
      <div className="flex h-full w-full max-w-lg flex-col overflow-hidden border-white/10 bg-[#161b22] sm:rounded-2xl sm:border">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="font-mono text-sm text-emerald-400">{order.order_id}</p>
            <p className="text-lg font-semibold text-white">{order.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm text-white/60 hover:bg-white/10 hover:text-white"
          >
            Fermer
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/45">
              Client
            </h3>
            <dl className="mt-2 space-y-2 text-sm">
              <div>
                <dt className="text-white/45">Téléphone</dt>
                <dd className="font-medium text-white">
                  <a href={`tel:${order.phone_normalized}`} className="hover:text-emerald-400">
                    {order.phone_normalized}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-white/45">Adresse</dt>
                <dd className="text-white/90">{order.address}</dd>
              </div>
            </dl>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/45">
              Articles
            </h3>
            <ul className="mt-3 space-y-3">
              {order.items.map((item) => (
                <li
                  key={`${item.sku}-${item.qty}`}
                  className="flex gap-3 rounded-lg border border-white/10 bg-[#0f1419] p-3"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-900/40 text-xs font-bold uppercase text-emerald-300">
                    {SLUG_LABELS[item.sku]?.slice(0, 2) ?? item.sku.slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">{item.name_fr}</p>
                    <p className="text-xs text-white/50">
                      {item.qty} × {formatMad(item.unit_price)}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold tabular-nums text-white">
                    {formatMad(item.line_total)}
                  </p>
                </li>
              ))}
              {order.upsell ? (
                <li className="flex gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase text-amber-400">Upsell</p>
                    <p className="text-sm font-medium text-white">{order.upsell.name_fr}</p>
                  </div>
                  <p className="text-sm font-semibold text-amber-200">
                    +{formatMad(order.upsell.unit_price)}
                  </p>
                </li>
              ) : null}
            </ul>
            <p className="mt-4 text-end text-lg font-semibold text-white">
              Total {formatMad(totalWithUpsell)}
            </p>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/45">
              Attribution
            </h3>
            <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
              {(["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const).map(
                (key) => {
                  const v = order.context[key];
                  if (!v) return null;
                  return (
                    <div key={key} className="rounded-lg bg-[#0f1419] px-2 py-1.5">
                      <dt className="text-[10px] uppercase text-white/40">{key}</dt>
                      <dd className="truncate text-white/90">{String(v)}</dd>
                    </div>
                  );
                },
              )}
            </dl>
            <p className="mt-2 text-xs text-white/40 truncate">{order.source_url}</p>
          </section>

          <section className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200/90">
            Trafic Maroc qualifié · pays {order.ip_country ?? "—"}
          </section>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [range, setRange] = useState(() => presetRange(30));
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [ordersTotal, setOrdersTotal] = useState(0);
  const [ordersPage, setOrdersPage] = useState(1);
  const [selected, setSelected] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const [statsRes, ordersRes] = await Promise.all([
      fetchStats(range.from, range.to),
      fetchOrders(range.from, range.to, ordersPage),
    ]);
    setLoading(false);
    if (!statsRes.ok) {
      if (statsRes.status === 401) {
        router.replace("/admin/login");
        return;
      }
      setError(statsRes.error);
      return;
    }
    setStats(statsRes.data.stats);
    if (ordersRes.ok) {
      setOrders(ordersRes.data.orders);
      setOrdersTotal(ordersRes.data.total);
    }
  }, [range.from, range.to, ordersPage, router]);

  useEffect(() => {
    void adminMe().then((res) => {
      if (!res.ok && res.status === 401) router.replace("/admin/login");
    });
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  const funnelMax = useMemo(() => {
    if (!stats) return 1;
    return Math.max(
      stats.funnel.page_views,
      stats.funnel.product_views,
      stats.funnel.add_to_cart,
      stats.funnel.open_checkout,
      stats.funnel.orders,
      1,
    );
  }, [stats]);

  async function logout() {
    await adminLogout();
    router.replace("/admin/login");
  }

  function applyPreset(days: number) {
    setRange(presetRange(days));
    setOrdersPage(1);
  }

  function applyCustom() {
    if (!customFrom || !customTo) return;
    const from = startOfDay(new Date(customFrom));
    const to = endOfDay(new Date(customTo));
    setRange({ from: from.toISOString(), to: to.toISOString() });
    setOrdersPage(1);
  }

  const dayChartMax = useMemo(() => {
    if (!stats?.by_day.length) return 1;
    return Math.max(...stats.by_day.map((d) => d.revenue_mad), 1);
  }, [stats]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1419]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Sahhaonline Admin
            </p>
            <p className="text-sm text-white/50">
              Métriques : IP Maroc · hors VPN/proxy/datacenter
            </p>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/70 hover:bg-white/10"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-end gap-3 rounded-xl border border-white/10 bg-[#161b22] p-4">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "7 jours", days: 7 },
              { label: "30 jours", days: 30 },
              { label: "90 jours", days: 90 },
            ].map((p) => (
              <button
                key={p.days}
                type="button"
                onClick={() => applyPreset(p.days)}
                className="rounded-lg border border-white/15 px-3 py-1.5 text-sm hover:border-emerald-500/50 hover:text-emerald-300"
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="rounded-lg border border-white/15 bg-[#0f1419] px-2 py-1.5"
            />
            <span className="text-white/40">→</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className="rounded-lg border border-white/15 bg-[#0f1419] px-2 py-1.5"
            />
            <button
              type="button"
              onClick={applyCustom}
              className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/15"
            >
              Appliquer
            </button>
          </div>
        </div>

        <nav className="mt-6 flex gap-1 border-b border-white/10">
          {(
            [
              ["overview", "Vue d'ensemble"],
              ["orders", "Commandes"],
              ["products", "Produits"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition ${
                tab === id
                  ? "border-emerald-500 text-emerald-300"
                  : "border-transparent text-white/50 hover:text-white/80"
              }`}
            >
              {label}
              {id === "orders" && stats ? (
                <span className="ms-2 rounded-full bg-white/10 px-2 py-0.5 text-xs tabular-nums">
                  {stats.funnel.orders}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        {error ? (
          <p className="mt-6 rounded-lg bg-red-500/15 px-4 py-3 text-sm text-red-300">{error}</p>
        ) : null}

        {loading && !stats ? (
          <p className="mt-12 text-center text-white/50">Chargement…</p>
        ) : null}

        {stats && tab === "overview" ? (
          <div className="mt-6 space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KpiCard
                label="Chiffre d'affaires"
                value={formatMad(stats.revenue.total_mad)}
                hint={`Panier moyen ${formatMad(stats.revenue.aov_mad)}`}
                accent="text-emerald-300"
              />
              <KpiCard
                label="Commandes"
                value={String(stats.funnel.orders)}
                hint={`${stats.funnel.upsells_accepted} upsells`}
              />
              <KpiCard
                label="Taux de conversion"
                value={`${stats.conversion.overall_conversion_pct} %`}
                hint="Commandes / pages vues (MA)"
              />
              <KpiCard
                label="Pages vues"
                value={stats.funnel.page_views.toLocaleString("fr-MA")}
                hint={`${stats.funnel.whatsapp_clicks} clics WhatsApp`}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#161b22] p-5 space-y-4">
                <h2 className="font-medium text-white">Entonnoir de conversion</h2>
                <FunnelBar
                  label="Pages vues"
                  count={stats.funnel.page_views}
                  max={funnelMax}
                  pct="100 %"
                />
                <FunnelBar
                  label="Vues produit"
                  count={stats.funnel.product_views}
                  max={funnelMax}
                  pct={`${stats.conversion.view_to_cart_pct} % → panier`}
                />
                <FunnelBar
                  label="Ajouts panier"
                  count={stats.funnel.add_to_cart}
                  max={funnelMax}
                  pct=""
                />
                <FunnelBar
                  label="Checkout ouvert"
                  count={stats.funnel.open_checkout}
                  max={funnelMax}
                  pct={`${stats.conversion.cart_to_checkout_pct} %`}
                />
                <FunnelBar
                  label="Commandes"
                  count={stats.funnel.orders}
                  max={funnelMax}
                  pct={`${stats.conversion.checkout_to_order_pct} % checkout→cmd`}
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-[#161b22] p-5">
                <h2 className="font-medium text-white">Revenus par jour</h2>
                <div className="mt-4 flex h-40 items-end gap-1">
                  {stats.by_day.map((d) => (
                    <div
                      key={d.date}
                      className="group flex flex-1 flex-col items-center justify-end"
                      title={`${d.date}: ${formatMad(d.revenue_mad)}`}
                    >
                      <div
                        className="w-full min-h-[2px] rounded-t bg-emerald-500/80 transition-all group-hover:bg-emerald-400"
                        style={{
                          height: `${Math.max(4, (d.revenue_mad / dayChartMax) * 100)}%`,
                        }}
                      />
                      <span className="mt-1 hidden text-[9px] text-white/40 sm:block rotate-[-45deg] origin-top">
                        {d.date.slice(5)}
                      </span>
                    </div>
                  ))}
                </div>
                {stats.by_day.length === 0 ? (
                  <p className="mt-4 text-sm text-white/40">Aucune donnée sur la période.</p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <KpiCard label="Contacts" value={String(stats.funnel.contacts)} />
              <KpiCard
                label="Revenu upsell"
                value={formatMad(stats.revenue.upsell_revenue_mad)}
              />
              <KpiCard
                label="Sous-total commandes"
                value={formatMad(stats.revenue.orders_subtotal_mad)}
              />
            </div>
          </div>
        ) : null}

        {stats && tab === "orders" ? (
          <div className="mt-6">
            <p className="mb-4 text-sm text-white/50">
              {ordersTotal} commande{ordersTotal !== 1 ? "s" : ""} (trafic Maroc qualifié)
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {orders.map((o) => (
                <OrderCard key={o.order_id} order={o} onSelect={setSelected} />
              ))}
            </div>
            {orders.length === 0 ? (
              <p className="py-12 text-center text-white/40">Aucune commande sur cette période.</p>
            ) : null}
            {ordersTotal > 20 ? (
              <div className="mt-6 flex justify-center gap-2">
                <button
                  type="button"
                  disabled={ordersPage <= 1}
                  onClick={() => setOrdersPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm disabled:opacity-40"
                >
                  Précédent
                </button>
                <span className="flex items-center text-sm text-white/50">
                  Page {ordersPage} / {Math.ceil(ordersTotal / 20)}
                </span>
                <button
                  type="button"
                  disabled={ordersPage * 20 >= ordersTotal}
                  onClick={() => setOrdersPage((p) => p + 1)}
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm disabled:opacity-40"
                >
                  Suivant
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {stats && tab === "products" ? (
          <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-white/10 bg-[#161b22] text-xs uppercase text-white/45">
                <tr>
                  <th className="px-4 py-3">Produit</th>
                  <th className="px-4 py-3 text-end">Vues</th>
                  <th className="px-4 py-3 text-end">Panier</th>
                  <th className="px-4 py-3 text-end">Commandes</th>
                  <th className="px-4 py-3 text-end">CA</th>
                </tr>
              </thead>
              <tbody>
                {stats.by_product.map((p) => (
                  <tr key={p.slug} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3 font-medium text-white">
                      {SLUG_LABELS[p.slug] ?? p.slug}
                    </td>
                    <td className="px-4 py-3 text-end tabular-nums">{p.views}</td>
                    <td className="px-4 py-3 text-end tabular-nums">{p.add_to_cart}</td>
                    <td className="px-4 py-3 text-end tabular-nums">{p.orders}</td>
                    <td className="px-4 py-3 text-end tabular-nums text-emerald-300">
                      {formatMad(p.revenue_mad)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </main>

      {selected ? (
        <OrderDetail order={selected} onClose={() => setSelected(null)} />
      ) : null}
    </div>
  );
}
