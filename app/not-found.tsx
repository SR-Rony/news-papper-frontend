import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <Newspaper className="mb-4 size-10 text-foreground-muted" />
      <h1 className="mb-2 font-display text-3xl font-semibold">Page not found</h1>
      <p className="mb-6 max-w-sm text-foreground-muted">
        The story you&rsquo;re looking for may have been moved or no longer exists.
      </p>
      <Button asChild>
        <Link href="/">Back to homepage</Link>
      </Button>
    </div>
  );
}
