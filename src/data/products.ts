import type { Product, ProductSlug } from "@/lib/types";

export const products: Record<ProductSlug, Product> = {
  vitalstride: {
    slug: "vitalstride",
    category: "joints",
    nameEn: "VitalStride — Joint & Back Comfort System",
    nameFr: "VitalStride — Confort articulations & dos",
    nameAr: "خطوة حياة — راحة المفاصل والظهر",
    nameArTranslit: "Khatwat Hayah",
    copyAr: {
      tagline: "لتتحركوا من دون أن تدفعوا الثمن في اليوم التالي.",
      problem:
        "ركبتان وظهر وأكتاف تشدّ عند الاستيقاظ، وآلام بعد المشي أو الوقوف لفترات.",
      shortDescription:
        "طقس يومي لراحة المفاصل. تركيبة واضحة وموثّقة من المختبر، بدون وعود خيالية.",
      bullets: [
        "يدعم راحة الركبتين والظهر والأكتاف في اليوم.",
        "تركيبة مفصلية كاملة بجرعة مفيدة، مع مكوّنات مذكورة.",
        "علاج نحو 30 يومًا · صباحًا ومساءً مع كأس كبير من الماء.",
      ],
      ingredients: [
        "جلوكوزامين كبريتات",
        "كوندرويتين كبريتات",
        "ميثيل سلفونيل ميثان (MSM)",
        "مستخلص الكركم (موحّد بالكركومينات)",
        "مستخلص لبان الذكر (البوسوليا السرّاتية)",
        "فيتامين ج",
        "منغنيز",
      ],
      usage:
        "كبسولتان في اليوم، صباحًا ومساءً، مع كأس كبير من الماء أثناء الوجبات. علاج 30 يومًا.",
      warnings: [
        "مكمّل غذائي — لا يعوّض العلاج الطبي.",
        "يُنصح بعدم الاستعمال أثناء الحمل أو الرضاعة أو مع مميعات الدم دون استشارة طبية.",
        "يُبعد عن متناول الأطفال. يُحفظ في مكان جاف بدرجة حرارة الغرفة.",
      ],
      upsellHook:
        "آلام المفاصل غالبًا ما تُخلّ بالنوم وتسبب شدًا عضليًا — أكملوا عادتكم.",
    },
    tagline: "Pour bouger sans payer le prix le lendemain.",
    problem:
      "Genoux, dos et épaules raides au réveil, douleurs après la marche ou le travail debout.",
    shortDescription:
      "Rituel quotidien pour le confort articulaire. Formule transparente, documentée laboratoire, sans promesses miracle.",
    bullets: [
      "Soutient le confort des genoux, du dos et des épaules au quotidien.",
      "Formule articulaire complète à dose utile, ingrédients listés.",
      "Cure d'environ 30 jours · à prendre matin et soir avec un grand verre d'eau.",
    ],
    ingredients: [
      "Glucosamine sulfate",
      "Chondroïtine sulfate",
      "MSM (méthylsulfonylméthane)",
      "Curcuma (extrait standardisé en curcuminoïdes)",
      "Boswellia serrata",
      "Vitamine C",
      "Manganèse",
    ],
    usage: "2 gélules par jour, matin et soir, avec un grand verre d'eau, pendant les repas. Cure de 30 jours.",
    warnings: [
      "Complément alimentaire — ne remplace pas un traitement médical.",
      "Déconseillé en cas de grossesse, d'allaitement ou de traitement anticoagulant sans avis médical.",
      "Tenir hors de portée des enfants. Conserver dans un endroit sec à température ambiante.",
    ],
    price: 279,
    upsellPrice: 219,
    upsellHook:
      "Les douleurs articulaires perturbent souvent le sommeil et créent des tensions musculaires — complétez votre routine.",
    image: "/products/vitalstride.jpg",
  },

  restwave: {
    slug: "restwave",
    category: "sleep",
    nameEn: "RestWave — Glycinate Night Complex",
    nameFr: "RestWave — Magnésium glycinate, formule nuit",
    nameAr: "موجة راحة — مغنيزيوم نوم وليل",
    nameArTranslit: "Mawjat Rahah",
    copyAr: {
      tagline: "لتهدأوا حقًا، مساءً.",
      problem:
        "رأس لا يهدأ، نوم خفيف، تشنجات ليلًا، وضغوط متراكمة من النهار.",
      shortDescription:
        "مغنيزيوم بيسغليسينات يُحتمل جيدًا + فيتامين B6، في طقس مسائي، لمساعدة الجهاز العصبي على الانتقال لوضع الراحة.",
      bullets: [
        "يساعد على تقليل التعب والتوتر ويدعم نومًا أفضل.",
        "شكل غليسينات: تحمّل هضمي أفضل من الأكسيد أو السترات.",
        "طقس مسائي بسيط · 30 ليلة لكل علبة.",
      ],
      ingredients: [
        "مغنيسيوم بيسغليسينات",
        "فيتامين ب6 (شكل P-5-P)",
        "كبسولة نباتية",
      ],
      usage:
        "كبسولتان في اليوم، مساءً، قبل النوم بنحو 30 دقيقة، مع كأس كبير من الماء.",
      warnings: [
        "مكمّل غذائي — لا يعوّض العلاج الطبي.",
        "في حال الحمل أو الرضاعة أو أمراض الكلى أو العلاج، استشيروا مختصًا صحيًا.",
        "يُبعد عن متناول الأطفال.",
      ],
      upsellHook:
        "التوتر الذي لا يهدأ ليلًا يزيد شد النهار — أضيفوا طقس المساء إلى طلبكم.",
    },
    tagline: "Pour redescendre vraiment, le soir.",
    problem:
      "Tête qui ne s'éteint pas, sommeil léger, crampes la nuit, tensions accumulées de la journée.",
    shortDescription:
      "Magnésium bisglycinate bien toléré + vitamine B6, en routine du soir, pour aider le système nerveux à passer en mode repos.",
    bullets: [
      "Aide à réduire la fatigue, les tensions et soutient un sommeil de qualité.",
      "Forme glycinate : meilleure tolérance digestive que l'oxyde ou le citrate.",
      "Routine du soir simple · 30 nuits par boîte.",
    ],
    ingredients: [
      "Magnésium bisglycinate",
      "Vitamine B6 (P-5-P)",
      "Gélule végétale",
    ],
    usage: "2 gélules par jour, le soir, environ 30 minutes avant le coucher, avec un grand verre d'eau.",
    warnings: [
      "Complément alimentaire — ne remplace pas un traitement médical.",
      "En cas de grossesse, d'allaitement, de pathologie rénale ou de traitement, demandez l'avis d'un professionnel de santé.",
      "Tenir hors de portée des enfants.",
    ],
    price: 189,
    upsellPrice: 139,
    upsellHook:
      "Le stress qui ne descend pas la nuit aggrave les tensions du jour — ajoutez la routine du soir à votre commande.",
    image: "/products/restwave.jpg",
  },

  floraease: {
    slug: "floraease",
    category: "gut",
    nameEn: "FloraEase — Daily Gut Comfort",
    nameFr: "FloraEase — Confort digestif quotidien",
    nameAr: "راحة الفلورا — بطن مريح كل نهار",
    nameArTranslit: "Rahat al-Flora",
    copyAr: {
      tagline: "لمعدة أخف، بلا مبالغة.",
      problem:
        "انتفاخ، ثقل بعد الوجبات، انتظام غير منتظم، إزعاج هضمي يصعب الحديث عنه.",
      shortDescription:
        "بروبيوتيك متعدد السلالات + ألياف مسبقة لدعم الفلورة المعوية والراحة الهضمية اليومية.",
      bullets: [
        "يدعم الفلورة المعوية والراحة الهضمية.",
        "سلالات متعددة · ألياف مسبقة · كبسولة مقاومة للمعدة.",
        "جرعة واحدة يوميًا · 30 يومًا لكل علبة.",
      ],
      ingredients: [
        "لاكتوباسيلوس أسيدوفيلوس",
        "بيفيدوباكتيريوم لاكتيس",
        "لاكتوباسيلوس بلنتاروم",
        "لاكتوباسيلوس رامنوزوس",
        "إينولين (ألياف مسبقة)",
        "كبسولة نباتية مقاومة للمعدة",
      ],
      usage:
        "كبسولة واحدة يوميًا، صباحًا على معدة فارغة أو قبل وجبة، مع كأس كبير من الماء. علاج 30 يومًا.",
      warnings: [
        "مكمّل غذائي — لا يعوّض العلاج الطبي.",
        "في حال ضعف المناعة أو الحمل أو أمراض مزمنة، استشيروا مختصًا صحيًا.",
        "يُحفظ في مكان جاف بدرجة حرارة الغرفة بعيدًا عن الضوء.",
      ],
      upsellHook:
        "التوتر والتعب يثقلان الهضم — أكملوا مثلث الراحة: الحركة، النوم، الهضم.",
    },
    tagline: "Pour un ventre plus léger, sans drame.",
    problem:
      "Ballonnements, ventre lourd après les repas, transit irrégulier, inconfort digestif que personne n'ose nommer.",
    shortDescription:
      "Probiotiques multi-souches + fibre prébiotique pour soutenir la flore intestinale et le confort digestif au quotidien.",
    bullets: [
      "Soutient la flore intestinale et le confort digestif.",
      "Souches multiples · fibre prébiotique · gélule gastro-résistante.",
      "1 prise par jour · 30 jours par boîte.",
    ],
    ingredients: [
      "Lactobacillus acidophilus",
      "Bifidobacterium lactis",
      "Lactobacillus plantarum",
      "Lactobacillus rhamnosus",
      "Inuline (fibre prébiotique)",
      "Gélule gastro-résistante végétale",
    ],
    usage: "1 gélule par jour, le matin à jeun ou avant un repas, avec un grand verre d'eau. Cure de 30 jours.",
    warnings: [
      "Complément alimentaire — ne remplace pas un traitement médical.",
      "En cas d'immunodépression, de grossesse ou de pathologie chronique, demandez l'avis d'un professionnel de santé.",
      "Conserver au sec, à température ambiante, à l'abri de la lumière.",
    ],
    price: 199,
    upsellPrice: 149,
    upsellHook:
      "Le stress et la fatigue alourdissent la digestion — complétez le triangle confort : bouger, dormir, digérer.",
    image: "/products/floraease.jpg",
  },
};

export const productList: Product[] = [
  products.vitalstride,
  products.restwave,
  products.floraease,
];

export const productSlugs: ProductSlug[] = ["vitalstride", "restwave", "floraease"];

export function getProduct(slug: ProductSlug): Product {
  return products[slug];
}
