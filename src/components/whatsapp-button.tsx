"use client";

import { track } from "@/lib/analytics";
import { getMarketingContext } from "@/lib/marketing-context";

export function WhatsAppButton({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        track("whatsapp_click", {
          source_url: typeof window !== "undefined" ? window.location.href : "",
          context: getMarketingContext(),
        });
      }}
      className={className}
    >
      {label}
    </a>
  );
}

