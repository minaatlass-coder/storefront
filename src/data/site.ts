import type { Locale } from "@/i18n/config";

export const site = {
  brand: "Sahhaonline",
  /** Nom affiché en arabe (logo, textes {{brand}}, méta). */
  brandAr: "صحة أونلاين",
  /** Pictogramme unique (header / footer) — identique FR et AR. */
  logoMark: "/brand/logo-mark.svg",
  domain: "sahha.online",
  email: "contact@sahha.online",
  phone: "+212 5 00 00 00 00",
  phoneCallable: "+212500000000",
  hours: "Du lundi au samedi, 9h–19h",
  hoursAr: "من الاثنين إلى السبت، 9ص–7م",
  city: "Casablanca",
  address: "Casablanca, Maroc",
  addressAr: "الدار البيضاء، المغرب",

  trust: [
    { tkey: "trust.cod" as const },
    { tkey: "trust.lab" as const },
    { tkey: "trust.ingredients" as const },
    { tkey: "trust.returns" as const },
  ],

  /** Chemins sans préfixe locale — le layout ajoute `/fr` ou `/ar`. */
  nav: [
    { href: "/boutique", tkey: "nav.boutique" as const },
    { href: "/#approche", tkey: "nav.approach" as const },
    { href: "/contact", tkey: "nav.contact" as const },
  ],

  footer: {
    boutique: [
      { href: "/boutique", tkey: "footerLinks.allProducts" as const },
      { href: "/produit/vitalstride", tkey: "footerLinks.vitalstride" as const },
      { href: "/produit/restwave", tkey: "footerLinks.restwave" as const },
      { href: "/produit/floraease", tkey: "footerLinks.floraease" as const },
    ],
    aide: [
      { href: "/livraison", tkey: "footerLinks.livraison" as const },
      { href: "/retours", tkey: "footerLinks.retours" as const },
      { href: "/contact", tkey: "footerLinks.contact" as const },
      { href: "/#faq", tkey: "footerLinks.faq" as const },
    ],
    apropos: [
      { href: "/#approche", tkey: "footerLinks.approach" as const },
      { href: "/#approche", tkey: "footerLinks.quality" as const },
      { href: "/mentions-legales", tkey: "footerLinks.mentions" as const },
    ],
    legal: [
      { href: "/conditions", tkey: "footerLinks.conditions" as const },
      { href: "/confidentialite", tkey: "footerLinks.confidentialite" as const },
      { href: "/mentions-legales", tkey: "footerLinks.mentions" as const },
    ],
  },

  metrics: {
    confirmationRate: 0,
    deliveryRate: 0,
    deliveredThisMonth: 0,
  },

  legal: {
    company: "Sahhaonline (raison sociale à compléter)",
    companyAr: "صحة أونلاين (الشكل القانوني — قيد الإكمال)",
    ice: "À compléter",
    iceAr: "قيد الإكمال",
    rc: "À compléter",
    rcAr: "قيد الإكمال",
    director: "À compléter",
    directorAr: "قيد الإكمال",
  },
} as const;

export function siteBrand(locale: Locale): string {
  return locale === "ar" ? site.brandAr : site.brand;
}
