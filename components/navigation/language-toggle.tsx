"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/providers/locale-provider";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="font-bold"
      onClick={() => setLocale(locale === "en" ? "bn" : "en")}
      aria-label="Switch language"
    >
      {locale === "en" ? "বাং" : "EN"}
    </Button>
  );
}
