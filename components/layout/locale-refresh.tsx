"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

/** Soft-refreshes server components when the reader switches language. */
export function LocaleRefresh() {
  const router = useRouter();

  React.useEffect(() => {
    const onChange = () => router.refresh();
    window.addEventListener("locale-change", onChange);
    return () => window.removeEventListener("locale-change", onChange);
  }, [router]);

  return null;
}
