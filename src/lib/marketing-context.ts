export interface MarketingContext {
  fbp?: string;
  fbc?: string;
  ttclid?: string;
  ttp?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const val = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  if (!val) return undefined;
  return decodeURIComponent(val.slice(name.length + 1));
}

function getParam(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const v = new URL(window.location.href).searchParams.get(name);
  return v ?? undefined;
}

export function getMarketingContext(): MarketingContext {
  const fbp = getCookie("_fbp");
  const fbc = getCookie("_fbc");
  const ttclid = getParam("ttclid") ?? getCookie("ttclid");
  const ttp = getCookie("_ttp");
  const gclid = getParam("gclid");
  const gbraid = getParam("gbraid");
  const wbraid = getParam("wbraid");
  return {
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
    ...(ttclid ? { ttclid } : {}),
    ...(ttp ? { ttp } : {}),
    ...(gclid ? { gclid } : {}),
    ...(gbraid ? { gbraid } : {}),
    ...(wbraid ? { wbraid } : {}),
    ...(getParam("utm_source") ? { utm_source: getParam("utm_source") } : {}),
    ...(getParam("utm_medium") ? { utm_medium: getParam("utm_medium") } : {}),
    ...(getParam("utm_campaign") ? { utm_campaign: getParam("utm_campaign") } : {}),
    ...(getParam("utm_content") ? { utm_content: getParam("utm_content") } : {}),
    ...(getParam("utm_term") ? { utm_term: getParam("utm_term") } : {}),
  };
}

