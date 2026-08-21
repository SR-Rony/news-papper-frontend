import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/dictionary";

export async function getServerLocale(): Promise<Locale> {
  const jar = await cookies();
  const value = jar.get("locale")?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
