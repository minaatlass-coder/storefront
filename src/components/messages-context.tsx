"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/messages";

export type MessagesContextValue = {
  locale: Locale;
  messages: Messages;
};

const MessagesContext = createContext<MessagesContextValue | null>(null);

export function MessagesProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
} & MessagesContextValue) {
  return (
    <MessagesContext.Provider value={{ locale, messages }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages(): MessagesContextValue {
  const ctx = useContext(MessagesContext);
  if (!ctx) {
    throw new Error("useMessages must be used within MessagesProvider");
  }
  return ctx;
}
