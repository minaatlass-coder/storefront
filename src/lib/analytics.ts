import { getMarketingContext } from "./marketing-context";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      load: (id: string) => void;
      page: () => void;
      track: (event: string, payload?: Record<string, unknown>) => void;
    };
    gtag?: (...args: unknown[]) => void;
  }
}

export type TrackEvent =
  | "page_view"
  | "view_product"
  | "add_to_cart"
  | "remove_from_cart"
  | "open_cart"
  | "close_cart"
  | "open_checkout"
  | "close_checkout"
  | "submit_order_attempt"
  | "submit_order_success"
  | "submit_order_error"
  | "upsell_shown"
  | "upsell_accepted"
  | "upsell_skipped"
  | "upsell_timeout"
  | "thank_you_view"
  | "whatsapp_click"
  | "cross_sell_click"
  | "contact_submit_success"
  | "contact_submit_error";

function randomId() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

export function createEventId(prefix = "evt"): string {
  return `${prefix}_${Date.now()}_${randomId()}`;
}

function dispatchTrack(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("sahha:track", { detail: payload }));
}

/**
 * Vendor-agnostic dataLayer push.
 * GA4 / Meta / TikTok can subscribe to the same dataLayer without changing this code.
 */
export function track(event: TrackEvent, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const event_id =
    typeof props?.event_id === "string" ? props.event_id : createEventId(event);
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  const payload = {
    event,
    event_id,
    ts: Date.now(),
    source_url: window.location.href,
    context: getMarketingContext(),
    ...(props ?? {}),
  };
  window.dataLayer.push(payload);
  dispatchTrack(payload);
  void fetch("/api/track", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}
