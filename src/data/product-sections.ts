import type { Locale } from "@/i18n/config";
import type { ProductSlug } from "@/lib/types";

export type ProductSectionId = "pain" | "routine" | "trust";

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
  routine: {
    kicker: string;
    title: string;
    intro: string;
    features: ProductSectionFeature[];
    highlights: string[];
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
    routine: {
      kicker: "Rituel VitalStride",
      title: "Une routine simple, matin et soir.",
      intro:
        "Deux gélules par jour avec un grand verre d'eau, pendant les repas. Une cure d'environ 30 jours pour installer l'habitude.",
      features: [
        {
          title: "Livraison 24–72h au Maroc",
          body: "Expédition après confirmation téléphonique de votre commande.",
        },
        {
          title: "Paiement à la livraison",
          body: "Vous payez en cash à la réception — aucun paiement en ligne.",
        },
        {
          title: "Retour 7 jours",
          body: "Produit non ouvert, procédure simple si le colis ne vous convient pas.",
        },
      ],
      highlights: ["30 jours de cure", "Matin + soir", "Ingrédients listés"],
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
    routine: {
      kicker: "Rituel RestWave",
      title: "30 minutes avant le coucher.",
      intro:
        "Deux gélules le soir avec de l'eau. Une boîte = environ 30 nuits de rituel.",
      features: [
        {
          title: "Livraison 24–72h au Maroc",
          body: "Confirmation par appel sous 24h, puis préparation du colis.",
        },
        {
          title: "Paiement à la livraison",
          body: "Aucune carte bancaire sur le site.",
        },
        {
          title: "Forme bisglycinate",
          body: "Meilleure tolérance digestive que certaines formes de magnésium.",
        },
      ],
      highlights: ["Rituel du soir", "30 nuits", "B6 incluse"],
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
    routine: {
      kicker: "Rituel FloraEase",
      title: "Une prise quotidienne, avec les repas.",
      intro:
        "Suivez la notice sur l'étiquette : généralement une à deux prises par jour avec un grand verre d'eau.",
      features: [
        {
          title: "Livraison 24–72h",
          body: "Partout au Maroc, après validation de votre commande.",
        },
        {
          title: "Paiement à la livraison",
          body: "Vous réglez le livreur à la réception.",
        },
        {
          title: "Routine douce",
          body: "Pensé pour accompagner le confort digestif au quotidien.",
        },
      ],
      highlights: ["Probiotiques", "Fibres prébiotiques", "Routine douce"],
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
        "بزاف ديال الزبناء كيتاصلوا معانا من بعد سنين ديال التكيّف مع ركبتين مشدودين، ظهر متوتر أو كتاف ثقيلة. خطوة حياة جزء من روتين يومي، بلا وعود خيالية.",
      items: [
        "ركبتين مشدودين أو كيوجعوك من الصباح؟",
        "ظهر كيتبلوكا من بعد نهار واقف أو جالس؟",
        "المشي أو الدرج كيوجعوك؟",
        "كتتفادى نشاطات خوفاً من « تخلص غدا »؟",
      ],
      callout:
        "الهدف: راحة فالنهار مع تركيبة واضحة والدفع عند الاستلام.",
    },
    routine: {
      kicker: "روتين خطوة حياة",
      title: "روتين بسيط: الصباح والمساء.",
      intro:
        "كبسولتان فالنهار مع كأس كبير ديال الماء، مع الوجبات. علاج ديال تقريباً 30 يوم.",
      features: [
        {
          title: "توصيل 24–72 ساعة فالمغرب",
          body: "الشحن من بعد تأكيد الطلب بالتليفون.",
        },
        {
          title: "الدفع عند الاستلام",
          body: "كتخلص نقداً عند التسليم — بلا دفع أونلاين.",
        },
        {
          title: "إرجاع 7 أيام",
          body: "المنتوج ما متفتحش: إجراء بسيط إلا ما عجبكش.",
        },
      ],
      highlights: ["30 يوم علاج", "صباح + مساء", "مكوّنات مذكورة"],
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
        "خطوة حياة كتكمّل روتين راحة الركبتين والظهر والكتاف — مع شفافية فالتركيبة.",
      badges: ["مكوّنات مذكورة", "علاج 30 يوم"],
    },
  },
  restwave: {
    pain: {
      kicker: "واش كتعرفو راسكم؟",
      title: "فاش الجسم ما كيهداش بالليل.",
      intro:
        "نوم خفيف، رأس ما كيسكتش، توتر متراكم: موجة راحة روتين ديال الليل، ماشي منوم.",
      items: [
        "صعوبة فالنوم حتى وانت عيان؟",
        "فيقات بالليل أو نوم ما كيريحش؟",
        "تشنجات أو توتر عضلي فالليل؟",
        "نهار مقلق كيأثر على الليل؟",
      ],
      callout:
        "مغنيزيوم بيسغليسينات + B6: روتين ليلي بسيط، والدفع عند الاستلام.",
    },
    routine: {
      kicker: "روتين موجة راحة",
      title: "30 دقيقة قبل النوم.",
      intro:
        "كبسولتان فالليل مع الماء. علبة = تقريباً 30 ليلة.",
      features: [
        {
          title: "توصيل 24–72 ساعة",
          body: "تأكيد بالتليفون ثم تحضير الطرد.",
        },
        {
          title: "الدفع عند الاستلام",
          body: "بلا بطاقة بنكية فالموقع.",
        },
        {
          title: "شكل bisglycinate",
          body: "تحمّل هضمي أحسن من بعض أشكال المغنيزيوم.",
        },
      ],
      highlights: ["روتين ليلي", "30 ليلة", "B6 مضمّنة"],
    },
    trust: {
      kicker: "أمان، جودة، شفافية",
      title: "مغنيزيوم مختار لليل.",
      intro:
        "موجة راحة ما كيعوّضش استشارة طبية فحالة علاج أو حمل.",
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
        "انتفاخ، ثقل، عادات غير منتظمة: فلورا إيز كيكمّل أكل متوازن، بلا وعد بـ « reset » فوري.",
      items: [
        "كرش منفوخ من بعد الماكلة؟",
        "ثقل هضمي فآخر النهار؟",
        "عادات غير منتظمة كتعياك؟",
        "باغي روتين لطيف، ماشي منتوج قاسي؟",
      ],
      callout:
        "بروبيوتيك + ألياف قبلية: روتين هضمي واضح، والدفع عند الاستلام.",
    },
    routine: {
      kicker: "روتين فلورا إيز",
      title: "مرة فالنهار، مع الوجبات.",
      intro:
        "اتبع التعليمات على العلبة: عادة مرة أو مرتين فالنهار مع ماء كافي.",
      features: [
        {
          title: "توصيل 24–72 ساعة",
          body: "فجميع مدن المغرب بعد تأكيد الطلب.",
        },
        {
          title: "الدفع عند الاستلام",
          body: "كتخلص للموزّع عند التسليم.",
        },
        {
          title: "روتين لطيف",
          body: "مصمم لراحة الهضم فالنهار.",
        },
      ],
      highlights: ["بروبيوتيك", "ألياف قبلية", "روتين لطيف"],
    },
    trust: {
      kicker: "أمان، جودة، شفافية",
      title: "تركيبة ظاهرة، توقعات واقعية.",
      intro:
        "فلورا إيز مكمّل غذائي. فحالة مرض هضمي، استشيروا مختصاً.",
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
        "فلورا إيز كيدمج فحياة صحية: وجبات منتظمة، ماء ونشاط.",
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
  vitalstride: { pain: null, routine: null, trust: null },
  restwave: { pain: null, routine: null, trust: null },
  floraease: { pain: null, routine: null, trust: null },
};

export function getProductSections(
  slug: ProductSlug,
  locale: Locale,
): ProductSectionContent {
  return locale === "ar" ? sectionsAr[slug] : sectionsFr[slug];
}
