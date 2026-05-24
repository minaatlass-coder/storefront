/**
 * Sahhaonline order webhook receiver.
 * Deploy as Web App (Execute as: Me / Who has access: Anyone).
 */
const ORDERS_TAB = "Orders";
const CONTACTS_TAB = "Contacts";

const ORDERS_HEADERS = [
  "order_id",
  "event_id",
  "created_at",
  "name",
  "address",
  "phone_raw",
  "phone_normalized",
  "items_summary",
  "items_subtotal",
  "upsell_sku",
  "upsell_price",
  "upsell_accepted",
  "order_total",
  "currency",
  "source",
  "source_url",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "fbp",
  "fbc",
  "ttclid",
  "gclid",
  "status",
  "note",
  "user_agent",
  "referrer",
  "ip_hash",
];

const CONTACTS_HEADERS = [
  "event_id",
  "created_at",
  "name",
  "phone_raw",
  "phone_normalized",
  "message",
  "source",
  "source_url",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "fbp",
  "fbc",
  "ttclid",
  "gclid",
  "user_agent",
  "referrer",
  "ip_hash",
];

function ensureSheet_(name, headers) {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sh.setFrozenRows(1);
    sh.autoResizeColumns(1, headers.length);
  }
  return sh;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function findOrderRow_(sh, orderId) {
  const data = sh.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === orderId) return i + 1;
  }
  return -1;
}

function ctx_(body) {
  return body.context || {};
}

function itemsSummary_(items) {
  return (items || []).map(function (it) { return it.sku + " x" + it.qty; }).join(" | ");
}

function handleOrderCreated_(body) {
  const sh = ensureSheet_(ORDERS_TAB, ORDERS_HEADERS);
  const c = ctx_(body);
  sh.appendRow([
    body.order_id,
    body.event_id || "",
    body.created_at || "",
    body.name || "",
    body.address || "",
    body.phone_raw || "",
    body.phone_normalized || "",
    itemsSummary_(body.items),
    body.items_subtotal || 0,
    "",
    "",
    "",
    body.order_total || 0,
    body.currency || "MAD",
    body.source || "website",
    body.source_url || "",
    c.utm_source || "",
    c.utm_medium || "",
    c.utm_campaign || "",
    c.fbp || "",
    c.fbc || "",
    c.ttclid || "",
    c.gclid || "",
    "a_appeler",
    "",
    body.user_agent || "",
    body.referrer || "",
    body.ip_hash || "",
  ]);
  return jsonResponse_({ ok: true });
}

function handleUpsellAdded_(body) {
  const sh = ensureSheet_(ORDERS_TAB, ORDERS_HEADERS);
  const row = findOrderRow_(sh, body.order_id);
  if (row === -1) return jsonResponse_({ ok: false, error: "order_id not found" });
  const upsell = body.upsell || {};
  sh.getRange(row, 10).setValue(upsell.sku || "");
  sh.getRange(row, 11).setValue(upsell.unit_price || 0);
  sh.getRange(row, 12).setValue(upsell.accepted === true);
  const currentTotal = Number(sh.getRange(row, 13).getValue() || 0);
  sh.getRange(row, 13).setValue(currentTotal + (Number(upsell.unit_price) || 0));
  return jsonResponse_({ ok: true });
}

function handleContactMessage_(body) {
  const sh = ensureSheet_(CONTACTS_TAB, CONTACTS_HEADERS);
  const c = ctx_(body);
  sh.appendRow([
    body.event_id || "",
    body.created_at || "",
    body.name || "",
    body.phone_raw || "",
    body.phone_normalized || "",
    body.message || "",
    body.source || "contact",
    body.source_url || "",
    c.utm_source || "",
    c.utm_medium || "",
    c.utm_campaign || "",
    c.fbp || "",
    c.fbc || "",
    c.ttclid || "",
    c.gclid || "",
    body.user_agent || "",
    body.referrer || "",
    body.ip_hash || "",
  ]);
  return jsonResponse_({ ok: true });
}

function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) return jsonResponse_({ ok: false, error: "no body" });
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (_err) {
    return jsonResponse_({ ok: false, error: "invalid json" });
  }
  try {
    if (body.event === "order_created") return handleOrderCreated_(body);
    if (body.event === "upsell_added") return handleUpsellAdded_(body);
    if (body.event === "contact_message") return handleContactMessage_(body);
    return jsonResponse_({ ok: false, error: "unknown event" });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: "sahhaonline-webhook", ts: Date.now() });
}

