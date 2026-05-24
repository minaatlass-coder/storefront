"use client";

import { useEffect } from "react";
import { createEventId, track } from "@/lib/analytics";

function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function mapEvent(event: string): { meta?: string; tiktok?: string; google?: string } {
  const map: Record<string, { meta?: string; tiktok?: string; google?: string }> = {
    page_view: { meta: "PageView", tiktok: "PageView", google: "page_view" },
    view_product: { meta: "ViewContent", tiktok: "ViewContent", google: "view_item" },
    add_to_cart: { meta: "AddToCart", tiktok: "AddToCart", google: "add_to_cart" },
    open_checkout: { meta: "InitiateCheckout", tiktok: "InitiateCheckout", google: "begin_checkout" },
    submit_order_success: { meta: "Purchase", tiktok: "Purchase", google: "purchase" },
    upsell_shown: { meta: "UpsellShown", tiktok: "UpsellShown", google: "upsell_shown" },
    upsell_accepted: { meta: "UpsellAccepted", tiktok: "UpsellAccepted", google: "upsell_accepted" },
    thank_you_view: { meta: "ThankYouView", tiktok: "ThankYouView", google: "thank_you_view" },
    whatsapp_click: { meta: "Contact", tiktok: "Contact", google: "whatsapp_click" },
  };
  return map[event] ?? {};
}

function normalizeGooglePhone(phone: unknown): string | undefined {
  if (typeof phone !== "string") return undefined;
  const digits = phone.replace(/\D/g, "");
  if (/^0[67]\d{8}$/.test(digits)) return `+212${digits.slice(1)}`;
  if (/^212[67]\d{8}$/.test(digits)) return `+${digits}`;
  return undefined;
}

function splitName(name: unknown): { first?: string; last?: string } {
  if (typeof name !== "string") return {};
  const clean = name.trim().toLowerCase().replace(/\s+/g, " ");
  if (!clean) return {};
  const [first, ...rest] = clean.split(" ");
  const last = rest.join(" ");
  return { first, last: last || undefined };
}

function setGoogleEnhancedUserData(detail: Record<string, unknown>) {
  if (detail.event !== "submit_order_success" || !window.gtag) return;
  const phoneNumber = normalizeGooglePhone(detail.phone);
  const names = splitName(detail.name);
  const userData: Record<string, unknown> = {};

  if (phoneNumber) userData.phone_number = phoneNumber;
  if (names.first || names.last) {
    userData.address = {
      ...(names.first ? { first_name: names.first } : {}),
      ...(names.last ? { last_name: names.last } : {}),
      country: "MA",
    };
  }

  if (Object.keys(userData).length > 0) {
    window.gtag("set", "user_data", userData);
  }
}

export function MarketingPixels() {
  useEffect(() => {
    const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
    const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;

    const setup = () => {
      if (metaPixelId) {
        // Meta pixel base code, loaded deferred.
        (function (f: Window & typeof globalThis, b: Document, e: string, v: string) {
          if (f.fbq) return;
          const n = function (...args: unknown[]) {
            (n as unknown as { callMethod?: (...m: unknown[]) => void; queue?: unknown[] }).callMethod
              ? (n as unknown as { callMethod: (...m: unknown[]) => void }).callMethod(...args)
              : ((n as unknown as { queue: unknown[] }).queue =
                  (n as unknown as { queue?: unknown[] }).queue || []).push(args);
          };
          (f.fbq as unknown) = n;
          (n as unknown as { push?: (...m: unknown[]) => void; loaded?: boolean; version?: string; queue?: unknown[] }).push = n;
          (n as unknown as { loaded: boolean }).loaded = true;
          (n as unknown as { version: string }).version = "2.0";
          (n as unknown as { queue: unknown[] }).queue = [];
          const t = b.createElement(e) as HTMLScriptElement;
          t.async = true;
          t.src = v;
          const s = b.getElementsByTagName(e)[0];
          s.parentNode?.insertBefore(t, s);
        })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
        window.fbq?.("init", metaPixelId);
      }

      if (tiktokPixelId) {
        loadScript("https://analytics.tiktok.com/i18n/pixel/events.js");
        const ttq = {
          load: () => {},
          page: () => {},
          track: () => {},
        };
        window.ttq = window.ttq ?? ttq;
        window.ttq.load(tiktokPixelId);
      }

      if (googleTagId) {
        loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`);
        window.dataLayer = window.dataLayer || [];
        window.gtag =
          window.gtag ||
          function (...args: unknown[]) {
            window.dataLayer?.push(args as unknown as Record<string, unknown>);
          };
        window.gtag("js", new Date());
        window.gtag("config", googleTagId, { send_page_view: false });
      }

      track("page_view", { event_id: createEventId("pv") });
    };

    const idle = window.setTimeout(setup, 1200);
    return () => window.clearTimeout(idle);
  }, []);

  useEffect(() => {
    function onTrack(ev: Event) {
      const detail = (ev as CustomEvent<Record<string, unknown>>).detail;
      if (!detail || typeof detail.event !== "string") return;
      const mapped = mapEvent(detail.event);
      const eventId =
        typeof detail.event_id === "string" ? detail.event_id : createEventId(detail.event);

      const params: Record<string, unknown> = {
        event_id: eventId,
        value: detail.total ?? detail.value,
        currency: detail.currency ?? "MAD",
      };
      if (mapped.meta && window.fbq) {
        window.fbq("track", mapped.meta, params, { eventID: eventId });
      }
      if (mapped.tiktok && window.ttq) {
        window.ttq.track(mapped.tiktok, params);
      }
      if (mapped.google && window.gtag) {
        setGoogleEnhancedUserData(detail);
        window.gtag("event", mapped.google, params);
      }
    }
    window.addEventListener("sahha:track", onTrack);
    return () => window.removeEventListener("sahha:track", onTrack);
  }, []);

  return null;
}

