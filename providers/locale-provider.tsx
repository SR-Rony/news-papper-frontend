"use client";

import * as React from "react";
import {
  dictionaries,
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isLocale,
  type Locale,
  type Dictionary,
} from "@/lib/i18n/dictionary";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

function writeLocaleCookie(locale: Locale) {
  document.cookie = `locale=${locale};path=/;max-age=31536000;samesite=lax`;
}

function applyDocumentLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.documentElement.dataset.locale = locale;
  writeLocaleCookie(locale);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(DEFAULT_LOCALE);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    const next = isLocale(stored) ? stored : DEFAULT_LOCALE;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from persisted locale once
    setLocaleState(next);
    applyDocumentLocale(next);
  }, []);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    applyDocumentLocale(next);
    // Refresh RSC tree so server-rendered titles/content pick up the cookie.
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("locale-change"));
    }
  }, []);

  const value = React.useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
