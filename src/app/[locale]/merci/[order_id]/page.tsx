import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThankYouContent } from "@/components/thank-you-content";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/messages";

type Props = { params: Promise<{ locale: string; order_id: string }> };

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const m = getMessages(raw);
  return {
    title: m.thankYou.title,
    description: m.thankYou.introGeneric,
    robots: { index: false, follow: false },
  };
}

export default async function ThankYouPage({ params }: Props) {
  const { locale: raw, order_id } = await params;
  if (!isLocale(raw)) notFound();
  return <ThankYouContent orderId={order_id} />;
}
