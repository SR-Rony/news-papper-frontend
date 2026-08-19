"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { hasRole } from "@/lib/auth";

const STAFF_ROLES = ["SUPER_ADMIN", "ADMIN", "EDITOR", "REPORTER"] as const;

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !hasRole(user, [...STAFF_ROLES])) {
      router.replace("/auth/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-foreground-muted" />
      </div>
    );
  }

  if (!hasRole(user, [...STAFF_ROLES])) return null;

  return <>{children}</>;
}
