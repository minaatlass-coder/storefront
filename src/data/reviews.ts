import type { ProductSlug } from "@/lib/types";

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  fr: { title: string; body: string };
  ar: { title: string; body: string };
  verified?: boolean;
}

export interface ProductReviews {
  average: number;
  count: number;
  distribution: { 5: number; 4: number; 3: number; 2: number; 1: number };
  items: Review[];
}

export const reviews: Record<ProductSlug, ProductReviews> = {
  vitalstride: {
    average: 4.7,
    count: 142,
    distribution: { 5: 108, 4: 24, 3: 7, 2: 2, 1: 1 },
    items: [
      {
        id: "vs-1",
        name: "Karim B.",
        city: "Casablanca",
        rating: 5,
        date: "2026-04-12",
        verified: true,
        fr: {
          title: "Routine sérieuse",
          body: "Après trois semaines de prise matin/soir, mes genoux sont moins raides le matin. Je marche plus facilement au quotidien. Je recommande.",
        },
        ar: {
          title: "روتين جدي",
          body: "بعد ثلاثة أسابيع من تناوله صباحًا ومساءً، أصبحت ركبتاي أقل تيبسًا في الصباح. أمشي بسهولة أكبر في اليوم. أنصح به.",
        },
      },
      {
        id: "vs-2",
        name: "Latifa M.",
        city: "Rabat",
        rating: 5,
        date: "2026-04-03",
        verified: true,
        fr: {
          title: "Soulagement net",
          body: "J'ai 54 ans et le dos qui tirait après une journée debout au travail. La formule m'a vraiment aidée. Le paiement à la livraison m'a aussi rassurée.",
        },
        ar: {
          title: "راحة واضحة",
          body: "عمري 54 سنة وكنت أشعر بشد في الظهر بعد يوم عمل واقفة. التركيبة ساعدتني فعلاً. والدفع عند الاستلام طمأنني كذلك.",
        },
      },
      {
        id: "vs-3",
        name: "Youssef A.",
        city: "Marrakech",
        rating: 4,
        date: "2026-03-22",
        verified: true,
        fr: {
          title: "Bon produit, effet progressif",
          body: "Effet progressif, il faut être régulier. Au bout d'un mois je sens vraiment la différence sur mes épaules. Conditionnement sérieux.",
        },
        ar: {
          title: "منتج جيد، تأثير تدريجي",
          body: "التأثير يأتي تدريجيًا، يجب الانتظام. بعد شهر أحس بفرق حقيقي في كتفي. التغليف جدّي.",
        },
      },
      {
        id: "vs-4",
        name: "Hassan E.",
        city: "Fès",
        rating: 5,
        date: "2026-03-15",
        verified: true,
        fr: {
          title: "Livraison rapide",
          body: "Commande reçue en 48h à Fès. Les ingrédients sont bien listés, on sait ce qu'on prend. Ma femme et moi en prenons ensemble.",
        },
        ar: {
          title: "توصيل سريع",
          body: "وصلني الطلب في 48 ساعة لفاس. المكونات مذكورة بوضوح، تعرف ما الذي تأخذه. أنا وزوجتي نتناوله معًا.",
        },
      },
      {
        id: "vs-5",
        name: "Naima Z.",
        city: "Tanger",
        rating: 5,
        date: "2026-02-28",
        verified: true,
        fr: {
          title: "Au-delà de mes attentes",
          body: "Je suis institutrice, je passe la journée debout. Après deux boîtes, le bas du dos est beaucoup plus libre. J'en commande une troisième.",
        },
        ar: {
          title: "فوق توقعاتي",
          body: "أشتغل معلمة وأقضي اليوم واقفة. بعد علبتين، أصبح أسفل الظهر مرتاحًا أكثر. سأطلب علبة ثالثة.",
        },
      },
    ],
  },
  restwave: {
    average: 4.8,
    count: 98,
    distribution: { 5: 79, 4: 14, 3: 3, 2: 1, 1: 1 },
    items: [
      {
        id: "rw-1",
        name: "Imane K.",
        city: "Casablanca",
        rating: 5,
        date: "2026-04-18",
        verified: true,
        fr: {
          title: "Nuits plus calmes",
          body: "Je me réveillais souvent la nuit. Depuis que je prends RestWave, mes soirées sont plus calmes et mes nuits plus régulières. Pas d'effet « assommé » au réveil.",
        },
        ar: {
          title: "ليالٍ أهدأ",
          body: "كنت أستيقظ كثيراً في الليل. منذ أن بدأت RestWave، أصبحت أمسياتي أهدأ ولياليّ أكثر انتظاماً. وبدون شعور بالتخدير عند الاستيقاظ.",
        },
      },
      {
        id: "rw-2",
        name: "Mehdi O.",
        city: "Salé",
        rating: 5,
        date: "2026-04-08",
        verified: true,
        fr: {
          title: "Sommeil et stress",
          body: "Période chargée au travail, je n'arrivais plus à décrocher le soir. Magnésium glycinate de bonne qualité, je sens la différence dès la première semaine.",
        },
        ar: {
          title: "النوم والتوتر",
          body: "فترة عمل مزدحمة، لم أعد أقدر على الاسترخاء مساءً. مغنيزيوم غليسينات من نوع جيد، الفرق ملحوظ من الأسبوع الأول.",
        },
      },
      {
        id: "rw-3",
        name: "Sara L.",
        city: "Agadir",
        rating: 5,
        date: "2026-03-30",
        verified: true,
        fr: {
          title: "Très bonne formule",
          body: "Pas d'odeur, pas de goût désagréable, et un endormissement plus calme. C'est ma deuxième commande.",
        },
        ar: {
          title: "تركيبة ممتازة",
          body: "بدون رائحة ولا طعم مزعج، والنوم يأتي بهدوء أكبر. هذا طلبي الثاني.",
        },
      },
      {
        id: "rw-4",
        name: "Brahim D.",
        city: "Meknès",
        rating: 4,
        date: "2026-03-12",
        verified: true,
        fr: {
          title: "Bon produit, prix correct",
          body: "Effet visible après une semaine. Le prix est correct pour la dose. Service client agréable au téléphone.",
        },
        ar: {
          title: "منتج جيد بسعر مقبول",
          body: "التأثير ظهر بعد أسبوع. السعر مناسب للجرعة. خدمة الزبائن لطيفة عبر الهاتف.",
        },
      },
      {
        id: "rw-5",
        name: "Fatima R.",
        city: "Oujda",
        rating: 5,
        date: "2026-02-20",
        verified: true,
        fr: {
          title: "Recommandé par une amie",
          body: "Mon amie m'a parlé de RestWave. Je dors mieux et je n'ai plus ces crampes dans les mollets la nuit. Excellent.",
        },
        ar: {
          title: "نصحتني به صديقتي",
          body: "صديقتي حدثتني عن RestWave. أنام بشكل أفضل ولم تعد تأتيني تشنجات الساق ليلاً. ممتاز.",
        },
      },
    ],
  },
  floraease: {
    average: 4.6,
    count: 76,
    distribution: { 5: 54, 4: 16, 3: 4, 2: 1, 1: 1 },
    items: [
      {
        id: "fe-1",
        name: "Amine S.",
        city: "Casablanca",
        rating: 5,
        date: "2026-04-22",
        verified: true,
        fr: {
          title: "Ventre plus léger",
          body: "Ballonnements après les repas qui ont vraiment diminué. Je continue la cure. Bonne formule.",
        },
        ar: {
          title: "بطن أخف",
          body: "الانتفاخ بعد الوجبات قلّ كثيرًا. سأكمل العلاج. تركيبة جيدة.",
        },
      },
      {
        id: "fe-2",
        name: "Khadija B.",
        city: "Tétouan",
        rating: 5,
        date: "2026-04-05",
        verified: true,
        fr: {
          title: "Très bien toléré",
          body: "Aucun désagrément, transit régulier dès la première semaine. Cure 30 jours bien dimensionnée.",
        },
        ar: {
          title: "يتحمّله الجسم جيدًا",
          body: "بدون أي إزعاج، الهضم منتظم من الأسبوع الأول. علاج 30 يومًا بمقدار مناسب.",
        },
      },
      {
        id: "fe-3",
        name: "Othmane J.",
        city: "Kénitra",
        rating: 4,
        date: "2026-03-18",
        verified: true,
        fr: {
          title: "Effet réel mais progressif",
          body: "Il faut être régulier. Au bout de 3 semaines, vraie différence. Je recommande à ceux qui ont les intestins sensibles.",
        },
        ar: {
          title: "تأثير حقيقي لكنه تدريجي",
          body: "يجب الانتظام في تناوله. بعد 3 أسابيع، فرق حقيقي. أنصح به لمن يعاني من حساسية الأمعاء.",
        },
      },
      {
        id: "fe-4",
        name: "Salma N.",
        city: "Marrakech",
        rating: 5,
        date: "2026-03-02",
        verified: true,
        fr: {
          title: "Sérieux",
          body: "J'apprécie qu'on liste les souches et les CFU. Ça change des marques qui ne disent rien. Très satisfaite.",
        },
        ar: {
          title: "جدّي",
          body: "أعجبني أنهم يذكرون السلالات والـ CFU. هذا يختلف عن العلامات التي لا تذكر شيئًا. راضية جدًا.",
        },
      },
      {
        id: "fe-5",
        name: "Rachid M.",
        city: "Rabat",
        rating: 5,
        date: "2026-02-14",
        verified: true,
        fr: {
          title: "Confort digestif au quotidien",
          body: "Je voyage beaucoup pour le travail, le transit varie selon les pays. Avec FloraEase, c'est beaucoup plus stable. Merci.",
        },
        ar: {
          title: "راحة هضمية يومية",
          body: "أسافر كثيرًا للعمل، والهضم يتغيّر حسب البلدان. مع FloraEase، أصبح أكثر استقرارًا. شكرًا.",
        },
      },
    ],
  },
};
