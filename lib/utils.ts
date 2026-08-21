import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { dictionaries, type Locale } from "@/lib/i18n/dictionary";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string, locale: Locale = "bn") {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatFullDate(date: Date = new Date(), locale: Locale = "bn") {
  return new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatRelativeTime(iso: string, locale: Locale = "bn") {
  const t = dictionaries[locale].common;
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 1) return t.justNow;
  if (diffMins < 60) return t.minutesAgo.replace("{n}", String(diffMins));
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return t.hoursAgo.replace("{n}", String(diffHours));
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return t.daysAgo.replace("{n}", String(diffDays));
  return formatDate(iso, locale);
}

export function formatCompactNumber(value: number, locale: Locale = "bn") {
  return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-US", {
    notation: "compact",
  }).format(value);
}

export function formatNumber(value: number, locale: Locale = "bn") {
  return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-US").format(value);
}

export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}
