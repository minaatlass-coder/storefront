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
      className="h-7 w-7 shrink-0"
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
      className="h-7 w-7 shrink-0"
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

export function HomeTrustBar({ messages }: { messages: Messages }) {
  const items = [
    {
      icon: ShieldIcon,
      titleKey: "home.trustBar.labTitle",
      bodyKey: "home.trustBar.labBody",
    },
    {
      icon: TruckIcon,
      titleKey: "home.trustBar.codTitle",
      bodyKey: "home.trustBar.codBody",
    },
  ] as const;

  return (
    <section
      aria-label={t(messages, "home.trustBar.aria")}
      className="bg-gradient-to-r from-emerald via-emerald to-emerald-deep text-cream"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:grid-cols-2 sm:py-10">
        {items.map(({ icon: Icon, titleKey, bodyKey }) => (
          <div key={titleKey} className="flex items-start gap-4">
            <Icon />
            <div>
              <p className="text-sm font-semibold sm:text-base">
                {t(messages, titleKey)}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-cream/85 sm:text-sm">
                {t(messages, bodyKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
