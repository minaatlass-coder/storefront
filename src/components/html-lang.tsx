"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "ar" ? "ar" : "fr";
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);
  return null;
}
