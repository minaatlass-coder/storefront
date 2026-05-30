import type { Locale } from "@/i18n/config";
import { site } from "@/data/site";
import type { Messages } from "@/messages";
import { t } from "@/messages";

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a49.902 49.902 0 0 0-.244-3.046 12.027 12.027 0 0 0-.9-2.864 2.25 2.25 0 0 0-1.423-1.183 11.959 11.959 0 0 0-4.064-.705m-6.8 0a11.96 11.96 0 0 0-4.064.705 2.25 2.25 0 0 0-1.423 1.183 12.027 12.027 0 0 0-.9 2.864 49.902 49.902 0 0 0-.244 3.046c-.039.62.469 1.124 1.09 1.124H9.375"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
      />
    </svg>
  );
}

const ICONS = {
  shield: ShieldIcon,
  truck: TruckIcon,
  list: ListIcon,
  return: ReturnIcon,
} as const;

export function TrustStrip({
  messages,
  locale,
  className = "",
}: {
  messages: Messages;
  locale: Locale;
  className?: string;
}) {
  const rtl = locale === "ar";
  const aria = rtl ? "مزايا الثقة" : "Garanties Sahhaonline";

  return (
    <section
      role="region"
      aria-label={aria}
      className={`w-full bg-[#0c3b2e] text-white ${className}`}
      {...(rtl ? { lang: "ar", dir: "rtl" as const } : {})}
    >
      <ul
        className={`mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/20 sm:grid-cols-2 sm:divide-x sm:divide-y lg:grid-cols-4 lg:divide-y-0 ${
          rtl ? "font-arabic sm:divide-x-reverse lg:divide-x-reverse" : ""
        }`}
      >
        {site.trust.map((row) => {
          const Icon = ICONS[row.icon];
          return (
            <li
              key={row.tkey}
              className="flex items-center justify-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4"
            >
              <Icon />
              <div className="min-w-0 text-start">
                <p className="text-sm font-bold leading-snug sm:text-[15px]">
                  {t(messages, row.tkey)}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-white/75 sm:text-[13px]">
                  {t(messages, row.bodyKey)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
