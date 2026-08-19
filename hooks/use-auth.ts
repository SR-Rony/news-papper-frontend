"use client";

import * as React from "react";
import type { User } from "@/types/user";
import { getAccessToken, getStoredUser, clearSession, setSession } from "@/lib/auth";
import { apiClient } from "@/lib/api-client";

/**
 * Reads the session persisted by lib/auth.ts (set on login/register) and
 * re-validates it against GET /auth/me so stale/expired tokens are cleared.
 */
export function useAuth() {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const stored = getStoredUser();
    const token = getAccessToken();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration of session from storage on mount
    if (stored && token) setUser(stored);

    if (!token) {
      setIsLoading(false);
      return;
    }

    apiClient
      .get<User>("/auth/me")
      .then((freshUser) => {
        setUser(freshUser);
        setSession(token, freshUser);
      })
      .catch(() => {
        clearSession();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const logout = React.useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  return { user, isLoading, isAuthenticated: !!user, logout };
}
