/**
 * Sahhaonline — Google Sheet (commandes + contacts + catalogue produits).
 * Déployer en Web App : Execute as Me / Who has access: Anyone.
 */
const ORDERS_TAB = "Orders";
const CONTACTS_TAB = "Contacts";
const PRODUCTS_TAB = "Products";
// Optional: paste the Sheet ID here if this script is not bound to the spreadsheet.
const SPREADSHEET_ID = "";

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
  "tracking_number",
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

const PRODUCTS_HEADERS = [
  "sku",
  "category",
  "name_fr",
  "name_en",
  "name_ar",
  "name_ar_translit",
  "price_mad",
  "upsell_price_mad",
  "tagline_fr",
  "problem_fr",
  "short_description_fr",
  "bullets_fr",
  "ingredients_fr",
  "usage_fr",
  "warnings_fr",
  "upsell_hook_fr",
  "tagline_ar",
  "short_description_ar",
  "bullets_ar",
  "ingredients_ar",
  "usage_ar",
  "warnings_ar",
];

/** Catalogue Sahhaonline (3 produits) — source: storefront/src/data/products.ts */
const DEFAULT_PRODUCTS = [
  {
    sku: "vitalstride",
    category: "joints",
    name_fr: "VitalStride — Confort articulations & dos",
    name_en: "VitalStride — Joint & Back Comfort System",
    name_ar: "خطوة حياة — راحة المفاصل والظهر",
    name_ar_translit: "Khatwat Hayah",
    price_mad: 279,
    upsell_price_mad: 219,
    tagline_fr: "Pour bouger sans payer le prix le lendemain.",
    problem_fr:
      "Genoux, dos et épaules raides au réveil, douleurs après la marche ou le travail debout.",
    short_description_fr:
      "Rituel quotidien pour le confort articulaire. Formule transparente, documentée laboratoire, sans promesses miracle.",
    bullets_fr:
      "Soutient le confort des genoux, du dos et des épaules au quotidien. | Formule articulaire complète à dose utile, ingrédients listés. | Cure d'environ 30 jours · à prendre matin et soir avec un grand verre d'eau.",
    ingredients_fr:
      "Glucosamine sulfate | Chondroïtine sulfate | MSM (méthylsulfonylméthane) | Curcuma (extrait standardisé en curcuminoïdes) | Boswellia serrata | Vitamine C | Manganèse",
    usage_fr:
      "2 gélules par jour, matin et soir, avec un grand verre d'eau, pendant les repas. Cure de 30 jours.",
    warnings_fr:
      "Complément alimentaire — ne remplace pas un traitement médical. | Déconseillé en cas de grossesse, d'allaitement ou de traitement anticoagulant sans avis médical. | Tenir hors de portée des enfants. Conserver dans un endroit sec à température ambiante.",
    upsell_hook_fr:
      "Les douleurs articulaires perturbent souvent le sommeil et créent des tensions musculaires — complétez votre routine.",
    tagline_ar: "لتتحركوا من دون أن تدفعوا الثمن في اليوم التالي.",
    short_description_ar:
      "طقس يومي لراحة المفاصل. تركيبة واضحة وموثّقة من المختبر، بدون وعود خيالية.",
    bullets_ar:
      "يدعم راحة الركبتين والظهر والأكتاف في اليوم. | تركيبة مفصلية كاملة بجرعة مفيدة، مع مكوّنات مذكورة. | علاج نحو 30 يومًا · صباحًا ومساءً مع كأس كبير من الماء.",
    ingredients_ar:
      "جلوكوزامين كبريتات | كوندرويتين كبريتات | ميثيل سلفونيل ميثان (MSM) | مستخلص الكركم (موحّد بالكركومينات) | مستخلص لبان الذكر (البوسوليا السرّاتية) | فيتامين ج | منغنيز",
    usage_ar:
      "كبسولتان في اليوم، صباحًا ومساءً، مع كأس كبير من الماء أثناء الوجبات. علاج 30 يومًا.",
    warnings_ar:
      "مكمّل غذائي — لا يعوّض العلاج الطبي. | يُنصح بعدم الاستعمال أثناء الحمل أو الرضاعة أو مع مميعات الدم دون استشارة طبية. | يُبعد عن متناول الأطفال. يُحفظ في مكان جاف بدرجة حرارة الغرفة.",
  },
  {
    sku: "restwave",
    category: "sleep",
    name_fr: "RestWave — Magnésium glycinate, formule nuit",
    name_en: "RestWave — Glycinate Night Complex",
    name_ar: "موجة راحة — مغنيزيوم نوم وليل",
    name_ar_translit: "Mawjat Rahah",
    price_mad: 189,
    upsell_price_mad: 139,
    tagline_fr: "Pour redescendre vraiment, le soir.",
    problem_fr:
      "Tête qui ne s'éteint pas, sommeil léger, crampes la nuit, tensions accumulées de la journée.",
    short_description_fr:
      "Magnésium bisglycinate bien toléré + vitamine B6, en routine du soir, pour aider le système nerveux à passer en mode repos.",
    bullets_fr:
      "Aide à réduire la fatigue, les tensions et soutient un sommeil de qualité. | Forme glycinate : meilleure tolérance digestive que l'oxyde ou le citrate. | Routine du soir simple · 30 nuits par boîte.",
    ingredients_fr: "Magnésium bisglycinate | Vitamine B6 (P-5-P) | Gélule végétale",
    usage_fr:
      "2 gélules par jour, le soir, environ 30 minutes avant le coucher, avec un grand verre d'eau.",
    warnings_fr:
      "Complément alimentaire — ne remplace pas un traitement médical. | En cas de grossesse, d'allaitement, de pathologie rénale ou de traitement, demandez l'avis d'un professionnel de santé. | Tenir hors de portée des enfants.",
    upsell_hook_fr:
      "Le stress qui ne descend pas la nuit aggrave les tensions du jour — ajoutez la routine du soir à votre commande.",
    tagline_ar: "لتهدأوا حقًا، مساءً.",
    short_description_ar:
      "مغنيزيوم بيسغليسينات يُحتمل جيدًا + فيتامين B6، في طقس مسائي، لمساعدة الجهاز العصبي على الانتقال لوضع الراحة.",
    bullets_ar:
      "يساعد على تقليل التعب والتوتر ويدعم نومًا أفضل. | شكل غليسينات: تحمّل هضمي أفضل من الأكسيد أو السترات. | طقس مسائي بسيط · 30 ليلة لكل علبة.",
    ingredients_ar: "مغنيزيوم بيسغليسينات | فيتامين ب6 (شكل P-5-P) | كبسولة نباتية",
    usage_ar:
      "كبسولتان في اليوم، مساءً، قبل النوم بنحو 30 دقيقة، مع كأس كبير من الماء.",
    warnings_ar:
      "مكمّل غذائي — لا يعوّض العلاج الطبي. | في حال الحمل أو الرضاعة أو أمراض الكلى أو العلاج، استشيروا مختصًا صحيًا. | يُبعد عن متناول الأطفال.",
  },
  {
    sku: "floraease",
    category: "gut",
    name_fr: "FloraEase — Confort digestif quotidien",
    name_en: "FloraEase — Daily Gut Comfort",
    name_ar: "راحة الفلورا — بطن مريح كل نهار",
    name_ar_translit: "Rahat al-Flora",
    price_mad: 199,
    upsell_price_mad: 149,
    tagline_fr: "Pour un ventre plus léger, sans drame.",
    problem_fr:
      "Ballonnements, ventre lourd après les repas, transit irrégulier, inconfort digestif que personne n'ose nommer.",
    short_description_fr:
      "Probiotiques multi-souches + fibre prébiotique pour soutenir la flore intestinale et le confort digestif au quotidien.",
    bullets_fr:
      "Soutient la flore intestinale et le confort digestif. | Souches multiples · fibre prébiotique · gélule gastro-résistante. | 1 prise par jour · 30 jours par boîte.",
    ingredients_fr:
      "Lactobacillus acidophilus | Bifidobacterium lactis | Lactobacillus plantarum | Lactobacillus rhamnosus | Inuline (fibre prébiotique) | Gélule gastro-résistante végétale",
    usage_fr:
      "1 gélule par jour, le matin à jeun ou avant un repas, avec un grand verre d'eau. Cure de 30 jours.",
    warnings_fr:
      "Complément alimentaire — ne remplace pas un traitement médical. | En cas d'immunodépression, de grossesse ou de pathologie chronique, demandez l'avis d'un professionnel de santé. | Conserver au sec, à température ambiante, à l'abri de la lumière.",
    upsell_hook_fr:
      "Le stress et la fatigue alourdissent la digestion — complétez le triangle confort : bouger, dormir, digérer.",
    tagline_ar: "لمعدة أخف، بلا مبالغة.",
    short_description_ar:
      "بروبيوتيك متعدد السلالات + ألياف مسبقة لدعم الفلورة المعوية والراحة الهضمية اليومية.",
    bullets_ar:
      "يدعم الفلورة المعوية والراحة الهضمية. | سلالات متعددة · ألياف مسبقة · كبسولة مقاومة للمعدة. | جرعة واحدة يوميًا · 30 يومًا لكل علبة.",
    ingredients_ar:
      "لاكتوباسيلوس أسيدوفيلوس | بيفيدوباكتيريوم لاكتيس | لاكتوباسيلوس بلنتاروم | لاكتوباسيلوس رامنوزوس | إينولين (ألياف مسبقة) | كبسولة نباتية مقاومة للمعدة",
    usage_ar:
      "كبسولة واحدة يوميًا، صباحًا على معدة فارغة أو قبل وجبة، مع كأس كبير من الماء. علاج 30 يومًا.",
    warnings_ar:
      "مكمّل غذائي — لا يعوّض العلاج الطبي. | في حال ضعف المناعة أو الحمل أو أمراض مزمنة، استشيروا مختصًا صحيًا. | يُحفظ في مكان جاف بدرجة حرارة الغرفة بعيدًا عن الضوء.",
  },
];

function ensureSheet_(name, headers) {
  const ss = getSpreadsheet_();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.setFrozenRows(1);
  }
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  sh.autoResizeColumns(1, headers.length);
  return sh;
}

function getSpreadsheet_() {
  if (SPREADSHEET_ID) return SpreadsheetApp.openById(SPREADSHEET_ID);
  const ss = SpreadsheetApp.getActive();
  if (!ss) throw new Error("No active spreadsheet. Set SPREADSHEET_ID in Code.gs.");
  return ss;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function findOrderRow_(sh, orderId) {
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return -1;
  const ids = sh.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) {
    if (ids[i][0] === orderId) return i + 2;
  }
  return -1;
}

function findOrderRowWithRetry_(sh, orderId) {
  let row = findOrderRow_(sh, orderId);
  for (let i = 0; row === -1 && i < 6; i++) {
    Utilities.sleep(500);
    SpreadsheetApp.flush();
    row = findOrderRow_(sh, orderId);
  }
  return row;
}

function findProductRow_(sh, sku) {
  const data = sh.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === sku) return i + 1;
  }
  return -1;
}

function productToRow_(product) {
  return PRODUCTS_HEADERS.map(function (key) {
    return product[key] != null ? product[key] : "";
  });
}

function productsFromBody_(body) {
  if (Array.isArray(body.products)) return body.products;
  if (body.product && typeof body.product === "object") return [body.product];
  if (body.sku) return [body];
  return [];
}

/**
 * Remplit l'onglet Products avec les 3 produits du store.
 * Exécuter depuis l'éditeur Apps Script (▶) ou via Web App ?action=seed_products
 */
function seedProductsCatalog_(products) {
  const list = products && products.length ? products : DEFAULT_PRODUCTS;
  const sh = ensureSheet_(PRODUCTS_TAB, PRODUCTS_HEADERS);

  sh.getRange(1, 1, 1, PRODUCTS_HEADERS.length).setValues([PRODUCTS_HEADERS]).setFontWeight("bold");
  sh.setFrozenRows(1);

  const lastRow = sh.getLastRow();
  if (lastRow > 1) {
    sh.deleteRows(2, lastRow - 1);
  }

  const rows = list.map(productToRow_);
  if (rows.length) {
    sh.getRange(2, 1, rows.length, PRODUCTS_HEADERS.length).setValues(rows);
  }
  sh.autoResizeColumns(1, PRODUCTS_HEADERS.length);
  return rows.length;
}

/** Menu / exécution manuelle dans Apps Script */
function setupProductsCatalog() {
  const count = seedProductsCatalog_();
  try {
    SpreadsheetApp.getUi().alert(
      "Catalogue Products mis à jour : " + count + " produit(s).",
    );
  } catch (_e) {
    // Pas d'UI si lancé hors contexte Sheet
  }
  return count;
}

function handleProductsSeed_() {
  const count = seedProductsCatalog_();
  return jsonResponse_({ ok: true, event: "products_seed", count: count });
}

function handleProductsUpsert_(body) {
  const items = productsFromBody_(body);
  if (!items.length) {
    return jsonResponse_({ ok: false, error: "no products in body" });
  }

  const sh = ensureSheet_(PRODUCTS_TAB, PRODUCTS_HEADERS);
  let upserted = 0;

  items.forEach(function (product) {
    if (!product.sku) return;
    const rowValues = productToRow_(product);
    const existingRow = findProductRow_(sh, product.sku);
    if (existingRow === -1) {
      sh.appendRow(rowValues);
    } else {
      sh.getRange(existingRow, 1, 1, PRODUCTS_HEADERS.length).setValues([rowValues]);
    }
    upserted++;
  });

  return jsonResponse_({ ok: true, event: "products_upsert", count: upserted });
}

function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu("Sahhaonline")
      .addItem("Remplir catalogue Products (3 produits)", "setupProductsCatalog")
      .addToUi();
  } catch (_e) {
    // Ignorer hors contexte UI
  }
}

function ctx_(body) {
  return body.context || {};
}

function itemsSummary_(items) {
  return (items || [])
    .map(function (it) {
      return it.sku + " x" + it.qty;
    })
    .join(" | ");
}

function handleOrderCreated_(body) {
  const sh = ensureSheet_(ORDERS_TAB, ORDERS_HEADERS);
  const c = ctx_(body);
  if (body.order_id && findOrderRow_(sh, body.order_id) !== -1) {
    return jsonResponse_({ ok: true, duplicate: true });
  }
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
    body.tracking_number || "",
  ]);
  return jsonResponse_({ ok: true });
}

function handleUpsellAdded_(body) {
  const sh = ensureSheet_(ORDERS_TAB, ORDERS_HEADERS);
  const row = findOrderRowWithRetry_(sh, body.order_id);
  if (row === -1) return jsonResponse_({ ok: false, error: "order_id not found" });
  const upsell = body.upsell || {};
  const currentTotal = Number(sh.getRange(row, 13).getValue() || 0);
  sh.getRange(row, 10, 1, 4).setValues([[
    upsell.sku || "",
    upsell.unit_price || 0,
    upsell.accepted === true,
    currentTotal + (Number(upsell.unit_price) || 0),
  ]]);
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
  if (!e || !e.postData || !e.postData.contents) {
    return jsonResponse_({ ok: false, error: "no body" });
  }
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
    if (body.event === "products_seed") return handleProductsSeed_();
    if (body.event === "products_upsert") return handleProductsUpsert_(body);
    return jsonResponse_({ ok: false, error: "unknown event" });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : "";
  if (action === "seed_products") return handleProductsSeed_();
  return jsonResponse_({
    ok: true,
    service: "sahhaonline-webhook",
    actions: ["seed_products"],
    ts: Date.now(),
  });
}
