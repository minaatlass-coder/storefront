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
    title: raw === "ar" ? "الإرجاع" : "Retours",
    description:
      raw === "ar"
        ? "سياسة الإرجاع: منتج غير مفتوح، 7 أيام."
        : "Politique de retour : produit non ouvert, 7 jours, procédure simple.",
  };
}

export default async function RetoursPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  if (raw === "ar") {
    return (
      <PolicyPage
        locale={raw}
        title="الإرجاع"
        intro="يمكنكم إرجاع منتج غير مفتوح خلال 7 أيام من الاستلام."
      >
        <PolicySection title="شروط الأهلية">
          <ul className="list-disc space-y-1 ps-5">
            <li>
              منتج <strong>غير مفتوح</strong>، العبوة الأصلية سليمة.
            </li>
            <li>
              طلب الإرجاع خلال <strong>7 أيام</strong> من التوصيل.
            </li>
            <li>مرجع الطلب متاح (يبدأ بـ SAH-…).</li>
          </ul>
        </PolicySection>

        <PolicySection title="الإجراء">
          <ol className="list-decimal space-y-1 ps-5">
            <li>
              اتصلوا بنا على{" "}
              <a
                href={`tel:${site.phoneCallable}`}
                className="font-semibold text-emerald hover:underline"
              >
                {site.phone}
              </a>{" "}
              أو عبر صفحة الاتصال.
            </li>
            <li>اذكروا مرجع الطلب والسبب.</li>
            <li>نرتّب استلام الطرد مع شريكنا.</li>
            <li>بعد استلام المنتج وفحصه، تُعالَج عملية الاسترداد.</li>
          </ol>
        </PolicySection>

        <PolicySection title="رسوم الإرجاع">
          <p>
            رسوم الإرجاع على حساب الزبون، إلا في حالة منتج معيب أو خطأ من
            جهتنا — عندها نتحمّل كل التكاليف.
          </p>
        </PolicySection>

        <PolicySection title="منتجات غير قابلة للإرجاع">
          <p>
            لأسباب صحية وأمن غذائي، أي مكمّل غذائي <strong>مفتوح</strong> لا
            يُعاد. تحققوا من طلبكم عند التسليم.
          </p>
        </PolicySection>
      </PolicyPage>
    );
  }

  return (
    <PolicyPage
      locale={raw}
      title="Retours"
      intro="Vous pouvez retourner un produit non ouvert dans les 7 jours suivant la réception."
    >
      <PolicySection title="Conditions d'éligibilité">
        <ul className="list-disc space-y-1 ps-5">
          <li>
            Produit <strong>non ouvert</strong>, emballage d'origine intact.
          </li>
          <li>
            Demande de retour dans les <strong>7 jours</strong> suivant la
            livraison.
          </li>
          <li>Référence de commande disponible (SAH-…).</li>
        </ul>
      </PolicySection>

      <PolicySection title="Procédure">
        <ol className="list-decimal space-y-1 ps-5">
          <li>
            Appelez-nous au{" "}
            <a
              href={`tel:${site.phoneCallable}`}
              className="font-semibold text-emerald hover:underline"
            >
              {site.phone}
            </a>{" "}
            ou écrivez via la page contact.
          </li>
          <li>Indiquez la référence de commande et le motif.</li>
          <li>Nous organisons la récupération du colis avec notre partenaire.</li>
          <li>
            Une fois le produit reçu et contrôlé, le remboursement est traité.
          </li>
        </ol>
      </PolicySection>

      <PolicySection title="Frais de retour">
        <p>
          Les frais de retour sont à la charge du client, sauf en cas de produit
          défectueux ou d'erreur de notre part — auquel cas nous prenons tout en
          charge.
        </p>
      </PolicySection>

      <PolicySection title="Produits non retournables">
        <p>
          Pour des raisons d'hygiène et de sécurité alimentaire, tout complément
          alimentaire <strong>ouvert</strong> ne peut être repris. Vérifiez
          bien votre commande à la livraison.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
