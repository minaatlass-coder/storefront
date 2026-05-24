import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { isLocale, locales } from "@/i18n/config";
import { getMessages } from "@/messages";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppButton } from "@/components/whatsapp-button";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const m = getMessages(raw);
  return {
    title: m.contact.kicker,
    description: m.contact.intro,
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const m = getMessages(raw);
  const hours = raw === "ar" ? site.hoursAr : site.hours;
  const address = raw === "ar" ? site.addressAr : site.address;
  const waNumber = site.phoneCallable.replace(/\D/g, "");
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(raw === "ar" ? "سلام، بغيت نأكد الطلب ديالي." : "Salam, je veux confirmer ma commande.")}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald">
          {m.contact.kicker}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          {m.contact.h1}
        </h1>
        <p className="mt-4 text-base text-ink-soft">{m.contact.intro}</p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <aside className="space-y-6 rounded-2xl border border-border bg-cream p-6 sm:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              {m.contact.phoneL}
            </p>
            <p className="mt-1">
              <a
                href={`tel:${site.phoneCallable}`}
                className="font-serif text-2xl text-ink hover:text-emerald"
              >
                {site.phone}
              </a>
            </p>
            <p className="mt-1 text-xs text-ink-soft">{hours}</p>
            <WhatsAppButton
              href={waHref}
              label={raw === "ar" ? "راسلونا واتساب" : "Nous écrire sur WhatsApp"}
              className="mt-3 inline-flex items-center rounded-full bg-emerald px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-deep"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              {m.contact.emailL}
            </p>
            <p className="mt-1">
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-ink hover:text-emerald"
              >
                {site.email}
              </a>
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              {m.contact.addrL}
            </p>
            <p className="mt-1 text-sm text-ink-soft">{address}</p>
          </div>
          <ul className="space-y-1.5 border-t border-border pt-5 text-xs text-ink-soft">
            {m.contact.bullets.split("\n").map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </aside>

        <section>
          <h2 className="font-serif text-xl text-ink sm:text-2xl">
            {m.contact.formTitle}
          </h2>
          <p className="mt-2 text-sm text-ink-soft">{m.contact.formIntro}</p>
          <div className="mt-5">
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}
