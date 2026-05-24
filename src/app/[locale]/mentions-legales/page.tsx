import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage, PolicySection } from "@/components/policy-page";
import { site, siteBrand } from "@/data/site";
import { isLocale, locales } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const brand = siteBrand(raw);
  return {
    title: raw === "ar" ? "الإشارات القانونية" : "Mentions légales",
    description:
      raw === "ar"
        ? `الإشارات القانونية — ${brand}.`
        : `Mentions légales — ${brand}.`,
  };
}

export default async function MentionsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const address = raw === "ar" ? site.addressAr : site.address;
  const brand = siteBrand(raw);

  if (raw === "ar") {
    return (
      <PolicyPage locale={raw} title="الإشارات القانونية">
        <PolicySection title="ناشر الموقع">
          <p>{site.legal.companyAr}</p>
          <p>العنوان: {address}</p>
          <p>
            الهاتف:{" "}
            <a
              href={`tel:${site.phoneCallable}`}
              className="font-semibold text-emerald hover:underline"
            >
              {site.phone}
            </a>
          </p>
          <p>
            البريد:{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-emerald hover:underline"
            >
              {site.email}
            </a>
          </p>
          <p>مسؤول النشر: {site.legal.directorAr}</p>
          <p>المعرّف الجماعي للمقاولة : {site.legal.iceAr}</p>
          <p>السجل التجاري : {site.legal.rcAr}</p>
        </PolicySection>

        <PolicySection title="الاستضافة">
          <p>المستضيف: يُكمَل قبل الإطلاق الإنتاجي.</p>
        </PolicySection>

        <PolicySection title="الملكية الفكرية">
          <p>
            محتوى الموقع (نصوص، صور، علامات، هوية بصرية) ملك {brand} أو
            شركائها. يُمنع الاستنساخ دون إذن.
          </p>
        </PolicySection>

        <PolicySection title="طبيعة المنتجات">
          <p>
            المنتجات المعروضة هي <strong>مكمّلات غذائية</strong> وليست أدوية.
            لا تعوّض نظاماً غذائياً متنوعاً ولا استشارة طبية.
          </p>
        </PolicySection>
      </PolicyPage>
    );
  }

  return (
    <PolicyPage locale={raw} title="Mentions légales">
      <PolicySection title="Éditeur du site">
        <p>{site.legal.company}</p>
        <p>Adresse : {address}</p>
        <p>
          Téléphone :{" "}
          <a
            href={`tel:${site.phoneCallable}`}
            className="font-semibold text-emerald hover:underline"
          >
            {site.phone}
          </a>
        </p>
        <p>
          Email :{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-emerald hover:underline"
          >
            {site.email}
          </a>
        </p>
        <p>Directeur de la publication : {site.legal.director}</p>
        <p>ICE : {site.legal.ice}</p>
        <p>RC : {site.legal.rc}</p>
      </PolicySection>

      <PolicySection title="Hébergement">
        <p>Hébergeur : à compléter avant mise en production.</p>
      </PolicySection>

      <PolicySection title="Propriété intellectuelle">
        <p>
          L'ensemble du contenu du site (textes, images, marques, identité
          graphique) est la propriété de {brand} ou de ses partenaires.
          Toute reproduction sans autorisation est interdite.
        </p>
      </PolicySection>

      <PolicySection title="Nature des produits">
        <p>
          Les produits proposés sont des <strong>compléments alimentaires</strong>
          , et non des médicaments. Ils ne se substituent pas à une alimentation
          variée et équilibrée, ni à un avis médical.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
