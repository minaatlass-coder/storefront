import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HtmlLang } from "@/components/html-lang";
import { MessagesProvider } from "@/components/messages-context";
import { CartDrawer } from "@/components/cart-drawer";
import { CheckoutModal } from "@/components/checkout-modal";
import { MarketingPixels } from "@/components/marketing-pixels";
import { UpsellModal } from "@/components/upsell-modal";
import { siteBrand } from "@/data/site";
import { isLocale, locales } from "@/i18n/config";
import { getMessages } from "@/messages";

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const m = getMessages(raw);
  const brand = siteBrand(raw);
  return {
    title: {
      default: `${brand} — ${m.meta.homeTitle}`,
      template: `%s — ${brand}`,
    },
    description: m.meta.homeDescription,
    openGraph: {
      type: "website",
      locale: raw === "ar" ? "ar_MA" : "fr_MA",
      siteName: brand,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const messages = getMessages(raw);

  return (
    <>
      <HtmlLang locale={raw} />
      <MessagesProvider locale={raw} messages={messages}>
        <Header locale={raw} messages={messages} />
        <main className="flex-1">{children}</main>
        <Footer locale={raw} messages={messages} />
        <CartDrawer />
        <CheckoutModal />
        <MarketingPixels />
        <UpsellModal />
      </MessagesProvider>
    </>
  );
}
