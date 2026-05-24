import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage, PolicySection } from "@/components/policy-page";
import { siteBrand } from "@/data/site";
import { isLocale, locales } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const title = raw === "ar" ? "التوصيل" : "Livraison";
  const desc =
    raw === "ar"
      ? "الدفع عند الاستلام في أنحاء المغرب، 24–72 ساعة حسب المدينة."
      : "Livraison COD partout au Maroc, 24–72h selon la ville. Paiement à la réception.";
  return { title, description: desc };
}

export default async function LivraisonPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const brand = siteBrand(raw);

  if (raw === "ar") {
    return (
      <PolicyPage
        locale={raw}
        title="التوصيل"
        intro="الدفع عند الاستلام في أنحاء المغرب. لا يوجد أي دفع عبر الإنترنت."
      >
        <PolicySection title="المناطق المغطاة">
          <p>
            {brand} يوصّل إلى <strong>جميع مدن المغرب</strong>، بما فيها
            المناطق الريفية التي يصلها شركاؤنا في الشحن.
          </p>
        </PolicySection>

        <PolicySection title="الآجال">
          <ul className="list-disc space-y-1 ps-5">
            <li>الدار البيضاء، الرباط، مراكش، طنجة: 24–48 ساعة عمل.</li>
            <li>مدن رئيسية أخرى: 48–72 ساعة عمل.</li>
            <li>مناطق ريفية: حتى 5 أيام عمل.</li>
          </ul>
          <p className="mt-2">
            تبدأ الآجال من تأكيد طلبكم هاتفياً من طرف وكيلنا.
          </p>
        </PolicySection>

        <PolicySection title="رسوم التوصيل">
          <p>
            تُعرض رسوم التوصيل عند الطلب أو تُدمج في السعر حسب العرض الساري.
          </p>
        </PolicySection>

        <PolicySection title="كيف يتم التوصيل؟">
          <ol className="list-decimal space-y-1 ps-5">
            <li>تطلبون على الموقع (3 حقول: الاسم + العنوان + الهاتف).</li>
            <li>يتصل بكم وكيلنا خلال 24 ساعة لتأكيد العنوان.</li>
            <li>يُحضَّر الطرد ويُسلَّم لشريك التوصيل.</li>
            <li>
              يتصل بكم الموزّع قبل التسليم. تدفعون نقداً عند الاستلام.
            </li>
          </ol>
        </PolicySection>

        <PolicySection title="رقم غير متاح">
          <p>
            إذا تعذّر الاتصال بكم بعد عدة محاولات، قد يُلغى الطلب تلقائياً بعد
            72 ساعة. تأكدوا من صحة الرقم عند الطلب.
          </p>
        </PolicySection>
      </PolicyPage>
    );
  }

  return (
    <PolicyPage
      locale={raw}
      title="Livraison"
      intro="Paiement à la livraison, partout au Maroc. Aucun paiement en ligne, jamais."
    >
      <PolicySection title="Zones couvertes">
        <p>
          {brand} livre dans <strong>toutes les villes du Maroc</strong>, y
          compris les zones rurales accessibles par nos partenaires logistiques.
        </p>
      </PolicySection>

      <PolicySection title="Délais">
        <ul className="list-disc space-y-1 ps-5">
          <li>Casablanca, Rabat, Marrakech, Tanger : 24–48h ouvrées.</li>
          <li>Autres villes principales : 48–72h ouvrées.</li>
          <li>Zones rurales : jusqu'à 5 jours ouvrés.</li>
        </ul>
        <p className="mt-2">
          Les délais courent à partir de la confirmation téléphonique de votre
          commande par notre agent.
        </p>
      </PolicySection>

      <PolicySection title="Frais de livraison">
        <p>
          Les frais de livraison sont indiqués au moment de la commande ou
          inclus dans le prix selon la promotion en cours.
        </p>
      </PolicySection>

      <PolicySection title="Comment se passe la livraison ?">
        <ol className="list-decimal space-y-1 ps-5">
          <li>Vous passez commande sur le site (3 champs : nom + adresse + téléphone).</li>
          <li>Notre agent vous appelle dans les 24h pour valider l'adresse.</li>
          <li>Le colis est préparé et confié à notre partenaire livreur.</li>
          <li>
            Le livreur vous appelle avant la livraison. Vous payez en espèces
            au moment de la réception.
          </li>
        </ol>
      </PolicySection>

      <PolicySection title="Numéro injoignable">
        <p>
          Si nous ne parvenons pas à vous joindre après plusieurs tentatives,
          la commande peut être annulée automatiquement après 72h. Vérifiez que
          votre numéro est correct au moment de la commande.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
