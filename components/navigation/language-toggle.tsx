"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/providers/locale-provider";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const next = locale === "bn" ? "en" : "bn";

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("min-w-11 px-2.5 font-bold", className)}
      onClick={() => setLocale(next)}
      aria-label={t.common.switchLanguage}
      title={t.common.switchLanguage}
    >
      {locale === "bn" ? "EN" : "বাং"}
    </Button>
  );
}
