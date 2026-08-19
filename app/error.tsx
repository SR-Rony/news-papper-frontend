"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="mb-4 size-10 text-signal" />
      <h1 className="mb-2 font-display text-2xl font-semibold">Something went wrong</h1>
      <p className="mb-6 max-w-sm text-foreground-muted">
        We hit an unexpected error loading this page. It has been logged and our team will take a look.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
