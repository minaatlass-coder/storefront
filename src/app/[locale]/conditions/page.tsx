import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PolicyPage, PolicySection } from "@/components/policy-page";
import { siteBrand } from "@/data/site";
import { isLocale, locales } from "@/i18n/config";
import { href } from "@/lib/href";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const brand = siteBrand(raw);
  return {
    title: raw === "ar" ? "الشروط" : "Conditions",
    description:
      raw === "ar"
        ? `الشروط العامة للبيع — ${brand}.`
        : `Conditions générales de vente — ${brand}.`,
  };
}

export default async function ConditionsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const brand = siteBrand(raw);

  if (raw === "ar") {
    return (
      <PolicyPage
        locale={raw}
        title="الشروط العامة للبيع"
        intro={`تحكم هذه الشروط الطلبات الممرّرة على موقع ${brand}.`}
      >
        <PolicySection title="طبيعة المنتجات">
          <p>
            المنتجات المعروضة على {brand} هي{" "}
            <strong>مكمّلات غذائية</strong>. ليست <strong>أدوية</strong> ولا
            تعوّض استشارة طبية أو صيدلانية.
          </p>
          <p>
            في حال الحمل أو الرضاعة أو مرض مزمن أو علاج، استشيروا مختصاً صحياً
            قبل الاستعمال.
          </p>
        </PolicySection>

        <PolicySection title="الأسعار">
          <p>
            الأسعار بالدرهم المغربي شاملة الضرائب. تُذكر رسوم التوصيل إن وُجدت
            عند الطلب.
          </p>
        </PolicySection>

        <PolicySection title="الطلب">
          <p>
            يُعتبر الطلب مؤكداً عند إدخال الاسم والهاتف في النموذج. يتصل بكم
            وكيل خلال 24 ساعة لتأكيد عنوان التوصيل.
          </p>
        </PolicySection>

        <PolicySection title="الدفع">
          <p>
            <strong>الدفع عند الاستلام فقط</strong>، نقداً بالدرهم. لا يُقبل أي
            دفع عبر الإنترنت.
          </p>
        </PolicySection>

        <PolicySection title="الانسحاب والإرجاع">
          <p>
            راجعوا{" "}
            <Link
              href={href(raw, "/retours")}
              className="text-emerald hover:underline"
            >
              سياسة الإرجاع
            </Link>
            : 7 أيام، منتج غير مفتوح.
          </p>
        </PolicySection>

        <PolicySection title="المسؤولية">
          <p>
            لا تتحمّل {brand} مسؤولية استخدام غير مطابق للمنتجات أو يخالف
            التحذيرات على العبوة أو يتعلق بحالة صحية سابقة.
          </p>
        </PolicySection>

        <PolicySection title="القانون الواجب التطبيق">
          <p>
            تخضع هذه الشروط للقانون المغربي. النزاعات للجهات المختصة حسب مقر
            الشركة.
          </p>
        </PolicySection>
      </PolicyPage>
    );
  }

  return (
    <PolicyPage
      locale={raw}
      title="Conditions générales de vente"
      intro={`Les présentes conditions encadrent les commandes passées sur le site ${brand}.`}
    >
      <PolicySection title="Nature des produits">
        <p>
          Les produits vendus sur {brand} sont des{" "}
          <strong>compléments alimentaires</strong>. Ils ne sont{" "}
          <strong>pas des médicaments</strong> et ne peuvent en aucun cas
          remplacer un traitement médical, un avis de votre médecin ou de votre
          pharmacien.
        </p>
        <p>
          En cas de grossesse, d'allaitement, de pathologie chronique ou de
          traitement en cours, consultez un professionnel de santé avant tout
          usage.
        </p>
      </PolicySection>

      <PolicySection title="Prix">
        <p>
          Les prix sont indiqués en MAD (dirham marocain), toutes taxes comprises.
          Les frais de livraison éventuels sont précisés au moment de la
          commande.
        </p>
      </PolicySection>

      <PolicySection title="Commande">
        <p>
          La commande est validée lorsque vous renseignez votre nom et votre
          téléphone sur le formulaire de commande. Un agent vous contacte sous
          24h pour confirmer l'adresse de livraison.
        </p>
      </PolicySection>

      <PolicySection title="Paiement">
        <p>
          <strong>Paiement à la livraison uniquement</strong>, en espèces, en
          MAD. Aucun paiement en ligne n'est requis ni accepté.
        </p>
      </PolicySection>

      <PolicySection title="Rétractation et retour">
        <p>
          Voir notre{" "}
          <Link
            href={href(raw, "/retours")}
            className="text-emerald hover:underline"
          >
            politique de retour
          </Link>{" "}
          : 7 jours, produit non ouvert.
        </p>
      </PolicySection>

      <PolicySection title="Responsabilité">
        <p>
          {brand} ne saurait être tenue responsable d'un usage non conforme
          des produits, d'une utilisation en contradiction avec les précautions
          indiquées sur l'emballage ou de tout effet lié à une condition médicale
          préexistante.
        </p>
      </PolicySection>

      <PolicySection title="Droit applicable">
        <p>
          Les présentes conditions sont régies par le droit marocain. Tout litige
          relèvera des juridictions compétentes du lieu du siège social de la
          société.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
