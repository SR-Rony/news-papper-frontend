"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/providers/locale-provider";
import type { Dictionary } from "@/lib/i18n/dictionary";

type CommonKey = keyof Dictionary["common"];

export function LocalizedSectionHeader({
  titleKey,
  title,
  href,
}: {
  titleKey?: CommonKey;
  title?: string;
  href?: string;
}) {
  const { t } = useLocale();
  const resolvedTitle = titleKey ? t.common[titleKey] : (title ?? "");

  return (
    <div className="mb-5 flex items-end justify-between border-b-2 border-ink pb-2">
      <h2 className="font-display text-xl font-semibold sm:text-2xl">{resolvedTitle}</h2>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
        >
          {t.common.seeAll} <ArrowRight className="size-3.5" />
        </Link>
      )}
    </div>
  );
}
