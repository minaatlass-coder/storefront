import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage, PolicySection } from "@/components/policy-page";
import { site } from "@/data/site";
import { isLocale, locales } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return {
    title: raw === "ar" ? "الخصوصية" : "Confidentialité",
    description:
      raw === "ar"
        ? "البيانات المجمعة، الاستخدام، الحفظ، حقوقكم."
        : "Données collectées, usage, conservation, vos droits.",
  };
}

export default async function ConfidentialitePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  if (raw === "ar") {
    return (
      <PolicyPage
        locale={raw}
        title="سياسة الخصوصية"
        intro="لا نجمع إلا ما نحتاجه للتوصيل. لا أكثر."
      >
        <PolicySection title="البيانات المجمعة">
          <p>لمعالجة الطلب نجمع فقط:</p>
          <ul className="list-disc space-y-1 ps-5">
            <li>
              <strong>اسمكم الكامل</strong>.
            </li>
            <li>
              <strong>رقم هاتفكم المحمول المغربي</strong>.
            </li>
            <li>
              <strong>عنوان التوصيل</strong>، يُبلَّغ شفهياً لوكيلنا أثناء
              مكالمة التأكيد.
            </li>
          </ul>
          <p>
            لا بريد إلكتروني للطلب، ولا كلمة مرور، ولا دفع عبر الإنترنت: يُدفع
            نقداً عند الاستلام.
          </p>
        </PolicySection>

        <PolicySection title="استخدام بياناتكم">
          <ul className="list-disc space-y-1 ps-5">
            <li>تأكيد الطلب بالهاتف.</li>
            <li>تحضير الطرد والتوصيل.</li>
            <li>الاتصال بكم عند مشكلة في التوصيل.</li>
            <li>متابعة الجودة (مكالمات نادرة بعد التسليم).</li>
          </ul>
        </PolicySection>

        <PolicySection title="المشاركة مع أطراف ثالثة">
          <p>
            تُشارك بياناتكم <strong>فقط</strong> مع شركة الشحن لأجل التوصيل.
            لا بيع، ولا مشاركة تجارية.
          </p>
        </PolicySection>

        <PolicySection title="الاحتفاظ">
          <p>
            تُحفظ البيانات للمدة اللازمة للمعالجة وخدمة العملاء (نحو 12 شهراً)،
            ثم تُؤرشف عند الالتزام القانوني.
          </p>
        </PolicySection>

        <PolicySection title="حقوقكم">
          <p>
            يمكنكم طلب الوصول أو التصحيح أو الحذف عبر{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-emerald hover:underline"
            >
              {site.email}
            </a>{" "}
            أو{" "}
            <a
              href={`tel:${site.phoneCallable}`}
              className="font-semibold text-emerald hover:underline"
            >
              {site.phone}
            </a>
            .
          </p>
        </PolicySection>

        <PolicySection title="ملفات تعريف الارتباط والتحليل">
          <p>
            يستخدم الموقع تخزيناً محلياً بسيطاً (سلة قيد الشراء) وإن وُجدت
            أدوات تحليل إحصائية مجهولة. لا ملف تعريف إعلاني باسمكم.
          </p>
        </PolicySection>
      </PolicyPage>
    );
  }

  return (
    <PolicyPage
      locale={raw}
      title="Politique de confidentialité"
      intro="On ne collecte que ce dont on a besoin pour vous livrer. Pas plus."
    >
      <PolicySection title="Données collectées">
        <p>Pour traiter une commande, nous collectons uniquement :</p>
        <ul className="list-disc space-y-1 ps-5">
          <li>
            Votre <strong>nom complet</strong>.
          </li>
          <li>
            Votre <strong>numéro de téléphone mobile marocain</strong>.
          </li>
          <li>
            Votre <strong>adresse de livraison</strong>, communiquée oralement à
            notre agent lors de l'appel de confirmation.
          </li>
        </ul>
        <p>
          Aucun email, aucun mot de passe, aucun moyen de paiement en ligne : la
          commande se règle en espèces à la livraison.
        </p>
      </PolicySection>

      <PolicySection title="Utilisation de vos données">
        <ul className="list-disc space-y-1 ps-5">
          <li>Confirmer votre commande par téléphone.</li>
          <li>Préparer et livrer votre colis.</li>
          <li>Vous rappeler en cas de souci de livraison.</li>
          <li>Suivi qualité (rares appels après livraison).</li>
        </ul>
      </PolicySection>

      <PolicySection title="Partage avec des tiers">
        <p>
          Vos coordonnées sont partagées <strong>uniquement</strong> avec le
          transporteur partenaire pour la livraison. Aucune revente, aucun partage
          commercial.
        </p>
      </PolicySection>

      <PolicySection title="Conservation">
        <p>
          Données conservées pour la durée nécessaire au traitement et au service
          client (typiquement 12 mois), puis archivées en cas d'obligation
          légale.
        </p>
      </PolicySection>

      <PolicySection title="Vos droits">
        <p>
          Vous pouvez à tout moment demander l'accès, la rectification ou la
          suppression de vos données en contactant{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-emerald hover:underline"
          >
            {site.email}
          </a>{" "}
          ou{" "}
          <a
            href={`tel:${site.phoneCallable}`}
            className="font-semibold text-emerald hover:underline"
          >
            {site.phone}
          </a>
          .
        </p>
      </PolicySection>

      <PolicySection title="Cookies et analyse">
        <p>
          Le site utilise un stockage local minimal (panier en cours) et, si
          activés, des outils d'analyse statistique anonyme. Aucun profilage
          publicitaire à votre nom n'est effectué.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
