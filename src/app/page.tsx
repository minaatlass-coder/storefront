import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

/** Redirection explicite si le middleware n’intervient pas (proxy, cache, etc.). */
export default function RootRedirectPage() {
  redirect(`/${defaultLocale}`);
}
