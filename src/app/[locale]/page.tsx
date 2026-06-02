import { siteBrand } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getMessages, localeFromUnknown } from "@/messages";
import { HomeCta } from "@/components/home-cta";
import { HomeFaq } from "@/components/home-faq";
import { HomeHero } from "@/components/home-hero";
import { HomeProducts } from "@/components/home-products";
import { HomeReviews } from "@/components/home-reviews";
import { HomeSteps } from "@/components/home-steps";
import { HomeWhy } from "@/components/home-why";
import { TrustStrip } from "@/components/trust-strip";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale: raw } = await params;
  const locale = localeFromUnknown(raw) as Locale;
  const m = getMessages(locale);
  const brand = siteBrand(locale);

  return (
    <div>
      <HomeHero locale={locale} messages={m} />
      <TrustStrip messages={m} locale={locale} />
      <HomeProducts locale={locale} messages={m} brand={brand} />
      <HomeWhy locale={locale} messages={m} brand={brand} />
      <HomeReviews locale={locale} messages={m} brand={brand} />
      <HomeSteps locale={locale} messages={m} />
      <HomeCta locale={locale} messages={m} />
      <HomeFaq locale={locale} messages={m} />
      <TrustStrip messages={m} locale={locale} />
    </div>
  );
}
