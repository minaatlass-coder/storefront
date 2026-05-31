import type { Locale } from "@/i18n/config";
import type { ProductSlug } from "@/lib/types";

export type ProductSectionId = "pain" | "ingredients" | "trust";

export interface ProductSectionFeature {
  title: string;
  body: string;
}

export interface ProductSectionContent {
  pain: {
    kicker: string;
    title: string;
    intro: string;
    items: string[];
    callout: string;
  };
  ingredients: {
    kicker: string;
    title: string;
    intro: string;
    caption: string;
    features: ProductSectionFeature[];
  };
  comparison: {
    title: string;
    subtitle: string;
    brandLabel: string;
    marketLabel: string;
    brandRows: string[];
    marketRows: string[];
  };
  trust: {
    kicker: string;
    title: string;
    intro: string;
    points: ProductSectionFeature[];
    guarantee: ProductSectionFeature;
    cardTitle: string;
    cardBody: string;
    badges: string[];
  };
}

const sectionsFr: Record<ProductSlug, ProductSectionContent> = {
  vitalstride: {
    pain: {
      kicker: "Vous vous reconnaissez ?",
      title: "Ces signaux, ce n'est pas « juste l'âge ».",
      intro:
        "Beaucoup de clients nous contactent après des années à « s'adapter » à des genoux raides, un dos tendu ou des épaules lourdes. VitalStride s'inscrit dans une routine quotidienne, pas dans une promesse miracle.",
      items: [
        "Genoux raides ou douloureux dès le réveil ?",
        "Dos qui se bloque après une journée debout ou assise ?",
        "Marche ou escaliers qui deviennent pénibles ?",
        "Vous évitez certaines activités par peur de « payer » le lendemain ?",
      ],
      callout:
        "Objectif : retrouver du confort au quotidien, avec une formule documentée et un paiement à la livraison.",
    },
    ingredients: {
      kicker: "Composition transparente",
      title: "Le secret, ce sont des actifs à dose utile",
      intro:
        "Chaque ingrédient est choisi pour son rôle dans le confort articulaire, à des concentrations affichées sur la fiche produit.",
      caption: "Ingrédients clés VitalStride",
      features: [
        {
          title: "Glucosamine & chondroïtine",
          body: "Associe les deux actifs les plus utilisés pour soutenir le confort des articulations au quotidien.",
        },
        {
          title: "MSM & curcuma standardisé",
          body: "Complète la routine avec des extraits reconnus pour accompagner mobilité et raideur matinale.",
        },
        {
          title: "Boswellia, vitamine C & manganèse",
          body: "Formule complète en une seule prise, matin et soir, avec un grand verre d'eau.",
        },
      ],
    },
    comparison: {
      title: "Pourquoi Sahhaonline est différent ?",
      subtitle:
        "Nous avons conçu une expérience transparente, honnête, pensée pour votre confort au Maroc.",
      brandLabel: "Sahhaonline",
      marketLabel: "Produits du marché classique",
      brandRows: [
        "Résultats progressifs, basés sur la régularité",
        "Ingrédients nommés et dosages affichés",
        "Paiement à la livraison, sans avance",
        "Équipe marocaine qui confirme chaque commande",
      ],
      marketRows: [
        "Promesses rapides et exagérées",
        "Compositions floues ou incomplètes",
        "Paiement en ligne obligatoire",
        "Support automatisé ou inexistant",
      ],
    },
    trust: {
      kicker: "Sécurité, qualité, transparence",
      title: "Une formule lisible, sans promesses excessives.",
      intro:
        "Complément alimentaire — pas un médicament. Nous listons les ingrédients et les dosages sur la fiche produit.",
      points: [
        {
          title: "Ingrédients nommés",
          body: "Glucosamine, chondroïtine, MSM, curcuma, boswellia, vitamine C, manganèse.",
        },
        {
          title: "Documentation laboratoire",
          body: "Fiches techniques disponibles sur demande avant ou après achat.",
        },
      ],
      guarantee: {
        title: "Satisfaction & retour 7 jours",
        body: "Si le produit ne vous convient pas (non ouvert), notre équipe vous guide pour le retour.",
      },
      cardTitle: "Confort articulaire documenté",
      cardBody:
        "VitalStride accompagne une routine de confort genoux, dos et épaules — avec transparence sur la composition.",
      badges: ["Ingrédients listés", "Cure 30 jours"],
    },
  },
  restwave: {
    pain: {
      kicker: "Vous vous reconnaissez ?",
      title: "Quand le corps ne « décroche » plus le soir.",
      intro:
        "Sommeil léger, tête qui tourne encore, tensions accumulées : RestWave est pensé comme rituel du soir, pas comme somnifère.",
      items: [
        "Difficulté à vous endormir même fatigué(e) ?",
        "Réveils nocturnes ou sommeil peu réparateur ?",
        "Crampes ou tensions musculaires le soir ?",
        "Journées stressantes qui empiètent sur la nuit ?",
      ],
      callout:
        "Magnésium bisglycinate + vitamine B6 : une routine du soir simple, payée à la livraison.",
    },
    ingredients: {
      kicker: "Composition transparente",
      title: "Une formule courte, pensée pour le soir",
      intro:
        "Pas de liste interminable : deux actifs utiles, une prise simple avant le coucher.",
      caption: "Actifs clés RestWave",
      features: [
        {
          title: "Magnésium bisglycinate",
          body: "Forme bien tolérée, adaptée à une prise quotidienne le soir sans inconfort digestif.",
        },
        {
          title: "Vitamine B6 (P-5-P)",
          body: "Complète le rituel nuit pour accompagner fatigue et tensions du quotidien.",
        },
        {
          title: "Gélule végétale",
          body: "Deux gélules, 30 minutes avant le coucher, avec un grand verre d'eau — environ 30 nuits par boîte.",
        },
      ],
    },
    comparison: {
      title: "Pourquoi Sahhaonline est différent ?",
      subtitle:
        "Une routine nuit claire, sans promesse de somnifère ni paiement avant réception.",
      brandLabel: "Sahhaonline",
      marketLabel: "Produits du marché classique",
      brandRows: [
        "Routine du soir progressive, sans effet « assommé »",
        "Forme magnésium expliquée (bisglycinate)",
        "Paiement à la livraison partout au Maroc",
        "Confirmation humaine avant expédition",
      ],
      marketRows: [
        "Présentés comme des somnifères naturels",
        "Magnésium bas de gamme mal absorbé",
        "Paiement carte obligatoire",
        "Aucun suivi après commande",
      ],
    },
    trust: {
      kicker: "Sécurité, qualité, transparence",
      title: "Un magnésium choisi pour le soir.",
      intro:
        "RestWave ne remplace pas un avis médical en cas de traitement ou de grossesse.",
      points: [
        {
          title: "Bisglycinate",
          body: "Forme bien tolérée, adaptée à une prise quotidienne le soir.",
        },
        {
          title: "Vitamine B6 (P-5-P)",
          body: "Complète le rituel nuit dans une formule courte et lisible.",
        },
      ],
      guarantee: {
        title: "Retour 7 jours",
        body: "Produit scellé non ouvert : nous vous accompagnons pour la procédure.",
      },
      cardTitle: "Routine nuit & détente",
      cardBody:
        "Aide à réduire fatigue et tensions, et soutient un sommeil de meilleure qualité — dans le cadre d'un mode de vie équilibré.",
      badges: ["Magnésium glycinate", "30 nuits"],
    },
  },
  floraease: {
    pain: {
      kicker: "Vous vous reconnaissez ?",
      title: "Quand la digestion ralentit le quotidien.",
      intro:
        "Ballonnements, lourdeurs, transit irrégulier : FloraEase complète une alimentation équilibrée, sans promesse de « reset » instantané.",
      items: [
        "Ventre gonflé après les repas ?",
        "Sensation de lourdeur digestive en fin de journée ?",
        "Transit irrégulier qui fatigue ?",
        "Vous cherchez une routine douce, pas un produit agressif ?",
      ],
      callout:
        "Probiotiques + fibres prébiotiques : une routine digestive claire, livrée en paiement à la livraison.",
    },
    ingredients: {
      kicker: "Composition transparente",
      title: "Des souches listées, pas une formule « secrète »",
      intro:
        "Probiotiques multi-souches et fibre prébiotique pour une routine digestive douce et lisible.",
      caption: "Actifs clés FloraEase",
      features: [
        {
          title: "Souches probiotiques nommées",
          body: "Transparence sur les familles utilisées — pas de mélange anonyme.",
        },
        {
          title: "Fibre prébiotique (inuline)",
          body: "Complète les souches pour une routine structurée, une prise par jour.",
        },
        {
          title: "Gélule gastro-résistante",
          body: "Pensée pour accompagner le confort digestif sans promesse de reset instantané.",
        },
      ],
    },
    comparison: {
      title: "Pourquoi Sahhaonline est différent ?",
      subtitle:
        "Attentes réalistes, composition affichée, livraison et paiement adaptés au Maroc.",
      brandLabel: "Sahhaonline",
      marketLabel: "Produits du marché classique",
      brandRows: [
        "Confort digestif progressif, routine douce",
        "Souches et fibres indiquées sur la fiche",
        "Paiement à la livraison, sans risque en ligne",
        "Conseil par téléphone avant envoi",
      ],
      marketRows: [
        "Promesses de détox ou reset en 48h",
        "Probiotiques « propriétaires » non détaillés",
        "Abonnements ou paiement immédiat",
        "FAQ générique, pas de contact local",
      ],
    },
    trust: {
      kicker: "Sécurité, qualité, transparence",
      title: "Composition affichée, attentes réalistes.",
      intro:
        "FloraEase est un complément alimentaire. En cas de pathologie digestive, consultez un professionnel de santé.",
      points: [
        {
          title: "Souches probiotiques listées",
          body: "Transparence sur les familles utilisées dans la formule.",
        },
        {
          title: "Fibre prébiotique",
          body: "L'inuline complète les souches probiotiques dans une routine digestive structurée.",
        },
      ],
      guarantee: {
        title: "Retour 7 jours",
        body: "Échange ou retour simple si le produit est intact et non ouvert.",
      },
      cardTitle: "Confort digestif au quotidien",
      cardBody:
        "FloraEase s'intègre dans une hygiène de vie : repas réguliers, hydratation et activité physique.",
      badges: ["Probiotiques", "Fibre prébiotique"],
    },
  },
};

const sectionsAr: Record<ProductSlug, ProductSectionContent> = {
  vitalstride: {
    pain: {
      kicker: "واش كتعرفو راسكم؟",
      title: "هاد العلامات ماشي « غير العمر ».",
      intro:
        "بزاف ديال الزبناء كيتاصلوا معانا من بعد سنين ديال التكيّف مع ركبتين مشدودين، ظهر متوتر أو كتاف ثقيلة. VitalStride جزء من روتين يومي، بلا وعود خيالية.",
      items: [
        "ركبتين مشدودين أو كيوجعوك من الصباح؟",
        "ظهر كيتبلوكا من بعد نهار واقف أو جالس؟",
        "المشي أو الدرج كيوجعوك؟",
        "كتتفادى نشاطات خوفاً من « تخلص غدا »؟",
      ],
      callout:
        "الهدف: راحة فالنهار مع تركيبة واضحة والدفع عند الاستلام.",
    },
    ingredients: {
      kicker: "تركيبة شفافة",
      title: "السر فالمكوّنات الفعّالة",
      intro:
        "كل مكوّن مختار لدوره فراحة المفاصل، بجرعات مذكورة فصفحة المنتوج.",
      caption: "مكوّنات أساسية VitalStride",
      features: [
        {
          title: "جلوكوزامين وكوندرويتين",
          body: "أشهر اثنين ديال المكوّنات لدعم راحة المفاصل فالنهار.",
        },
        {
          title: "MSM وكركم موحّد",
          body: "يكمّلوا الروتين للمرونة وتقليل الشد فالصباح.",
        },
        {
          title: "لبان الذكر، فيتامين C ومنغنيز",
          body: "تركيبة كاملة فجرعة واحدة، صباحاً ومساءً مع ماء كافي.",
        },
      ],
    },
    comparison: {
      title: "علاش صحة أونلاين مختلفة؟",
      subtitle:
        "صممنا تجربة شفافة وصادقة، مبنية على راحتكم فالمغرب.",
      brandLabel: "صحة أونلاين",
      marketLabel: "منتجات السوق العادية",
      brandRows: [
        "نتائج تدريجية مع الانتظام",
        "مكوّنات بالاسم والجرعات ظاهرة",
        "الدفع عند الاستلام بلا مقدم",
        "فريق مغربي يؤكد كل طلب",
      ],
      marketRows: [
        "وعود سريعة ومبالغ فيها",
        "تركيبات غامضة أو ناقصة",
        "دفع أونلاين إجباري",
        "دعم آلي أو معدوم",
      ],
    },
    trust: {
      kicker: "أمان، جودة، شفافية",
      title: "تركيبة واضحة، بلا مبالغة.",
      intro:
        "مكمّل غذائي — ماشي دواء. المكوّنات والجرعات مذكورة فصفحة المنتوج.",
      points: [
        {
          title: "مكوّنات بالاسم",
          body: "جلوكوزامين، كوندرويتين، MSM، كركم، لبان، فيتامين C، منغنيز.",
        },
        {
          title: "وثائق المختبر",
          body: "وراق تقنية متوفرة عند الطلب.",
        },
      ],
      guarantee: {
        title: "رضا وإرجاع 7 أيام",
        body: "إلا المنتوج ما عجبكش (ما متفتحش)، الفريق كيعاونك فالإرجاع.",
      },
      cardTitle: "راحة المفاصل موثّقة",
      cardBody:
        "VitalStride كتكمّل روتين راحة الركبتين والظهر والكتاف — مع شفافية فالتركيبة.",
      badges: ["مكوّنات مذكورة", "علاج 30 يوم"],
    },
  },
  restwave: {
    pain: {
      kicker: "واش كتعرفو راسكم؟",
      title: "فاش الجسم ما كيهداش بالليل.",
      intro:
        "نوم خفيف، رأس ما كيسكتش، توتر متراكم: RestWave روتين ديال الليل، ماشي منوم.",
      items: [
        "صعوبة فالنوم حتى وانت عيان؟",
        "فيقات بالليل أو نوم ما كيريحش؟",
        "تشنجات أو توتر عضلي فالليل؟",
        "نهار مقلق كيأثر على الليل؟",
      ],
      callout:
        "مغنيزيوم بيسغليسينات + B6: روتين ليلي بسيط، والدفع عند الاستلام.",
    },
    ingredients: {
      kicker: "تركيبة شفافة",
      title: "تركيبة قصيرة، مصممة لليل",
      intro:
        "بلا قائمة طويلة: مكوّنان مفيدان وجرعة بسيطة قبل النوم.",
      caption: "مكوّنات RestWave",
      features: [
        {
          title: "مغنيزيوم بيسغليسينات",
          body: "شكل محتمل جيداً للاستعمال الليلي بلا إزعاج هضمي.",
        },
        {
          title: "فيتامين B6 (P-5-P)",
          body: "يكمّل روتين المساء للتعب والتوتر.",
        },
        {
          title: "كبسولة نباتية",
          body: "كبسولتان قبل النوم بنحو 30 دقيقة — تقريباً 30 ليلة لكل علبة.",
        },
      ],
    },
    comparison: {
      title: "علاش صحة أونلاين مختلفة؟",
      subtitle:
        "روتين ليل واضح، بلا وعود منوم وبلا دفع قبل الاستلام.",
      brandLabel: "صحة أونلاين",
      marketLabel: "منتجات السوق العادية",
      brandRows: [
        "روتين تدريجي بلا « تخدير » صباحاً",
        "شكل المغنيزيوم موضّح (bisglycinate)",
        "الدفع عند الاستلام فالمغرب",
        "تأكيد بشري قبل الشحن",
      ],
      marketRows: [
        "يُباع كمنوم طبيعي",
        "مغنيزيوم رخيص ضعيف الامتصاص",
        "دفع بالبطاقة إجباري",
        "لا متابعة بعد الطلب",
      ],
    },
    trust: {
      kicker: "أمان، جودة، شفافية",
      title: "مغنيزيوم مختار لليل.",
      intro:
        "RestWave ما كيعوّضش استشارة طبية فحالة علاج أو حمل.",
      points: [
        {
          title: "Bisglycinate",
          body: "شكل محتمل جيداً للاستعمال الليلي.",
        },
        {
          title: "فيتامين B6 (P-5-P)",
          body: "يكمّل روتين النوم بتركيبة قصيرة وواضحة.",
        },
      ],
      guarantee: {
        title: "إرجاع 7 أيام",
        body: "منتوج مغلق: كنعاونوك فالإجراء.",
      },
      cardTitle: "روتين ليل وراحة",
      cardBody:
        "كيساعد على تقليل التعب والتوتر ويدعم نوماً أحسن — ضمن نمط حياة متوازن.",
      badges: ["مغنيزيوم غليسينات", "30 ليلة"],
    },
  },
  floraease: {
    pain: {
      kicker: "واش كتعرفو راسكم؟",
      title: "فاش الهضم كيبطئ الحياة اليومية.",
      intro:
        "انتفاخ، ثقل، عادات غير منتظمة: FloraEase كيكمّل أكل متوازن، بلا وعد بـ « reset » فوري.",
      items: [
        "كرش منفوخ من بعد الماكلة؟",
        "ثقل هضمي فآخر النهار؟",
        "عادات غير منتظمة كتعياك؟",
        "باغي روتين لطيف، ماشي منتوج قاسي؟",
      ],
      callout:
        "بروبيوتيك + ألياف قبلية: روتين هضمي واضح، والدفع عند الاستلام.",
    },
    ingredients: {
      kicker: "تركيبة شفافة",
      title: "سلالات مذكورة، ماشي « سر »",
      intro:
        "بروبيوتيك متعدد السلالات وألياف قبلية لروتين هضمي لطيف وواضح.",
      caption: "مكوّنات FloraEase",
      features: [
        {
          title: "سلالات بروبيوتيك بالاسم",
          body: "شفافية على العائلات — بلا خليط مجهول.",
        },
        {
          title: "ألياف قبلية (إينولين)",
          body: "تكمل السلالات لروتين منظم، مرة فالنهار.",
        },
        {
          title: "كبسولة مقاومة للمعدة",
          body: "لراحة الهضم بلا وعد بـ reset فوري.",
        },
      ],
    },
    comparison: {
      title: "علاش صحة أونلاين مختلفة؟",
      subtitle:
        "توقعات واقعية، تركيبة ظاهرة، توصيل ودفع مناسبين للمغرب.",
      brandLabel: "صحة أونلاين",
      marketLabel: "منتجات السوق العادية",
      brandRows: [
        "راحة هضمية تدريجية، روتين لطيف",
        "سلالات وألياف مذكورة",
        "الدفع عند الاستلام بلا مخاطرة أونلاين",
        "نصيحة بالتليفون قبل الإرسال",
      ],
      marketRows: [
        "وعود detox أو reset فـ 48 ساعة",
        "بروبيوتيك « خاص » بلا تفاصيل",
        "اشتراكات أو دفع فوري",
        "FAQ عامة بلا تواصل محلي",
      ],
    },
    trust: {
      kicker: "أمان، جودة، شفافية",
      title: "تركيبة ظاهرة، توقعات واقعية.",
      intro:
        "FloraEase مكمّل غذائي. فحالة مرض هضمي، استشيروا مختصاً.",
      points: [
        {
          title: "سلالات بروبيوتيك مذكورة",
          body: "شفافية على العائلات المستعملة.",
        },
        {
          title: "ألياف قبلية",
          body: "الإينولين يكمل سلالات البروبيوتيك ضمن روتين هضمي منظم.",
        },
      ],
      guarantee: {
        title: "إرجاع 7 أيام",
        body: "إرجاع بسيط إلا المنتوج سليم وما متفتحش.",
      },
      cardTitle: "راحة هضمية يومية",
      cardBody:
        "FloraEase كيدمج فحياة صحية: وجبات منتظمة، ماء ونشاط.",
      badges: ["بروبيوتيك", "ألياف قبلية"],
    },
  },
};

/** Chemins optionnels sous /public/products — null = placeholder gradient. */
/** Renseigner quand les fichiers existent sous public/products/ (sinon placeholder). */
export const productSectionImagePaths: Record<
  ProductSlug,
  Record<ProductSectionId, string | null>
> = {
  vitalstride: { pain: null, ingredients: null, trust: null },
  restwave: { pain: null, ingredients: null, trust: null },
  floraease: { pain: null, ingredients: null, trust: null },
};

export function getProductSections(
  slug: ProductSlug,
  locale: Locale,
): ProductSectionContent {
  return locale === "ar" ? sectionsAr[slug] : sectionsFr[slug];
}
