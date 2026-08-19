import type { User } from "@/types/user";

/**
 * Client-side auth helpers. Session truth lives in the NestJS backend
 * (JWT); this module persists the token/user for the browser session and
 * gives components a synchronous way to read them.
 */

const TOKEN_KEY = "access_token";
const USER_KEY = "current_user";

export function setSession(token: string, user: User) {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function hasRole(user: Pick<User, "role"> | null | undefined, roles: User["role"][]) {
  if (!user) return false;
  return roles.includes(user.role);
}

// Frontend role checks are for UX only (hiding/showing controls).
// Real authorization is enforced by the NestJS API on every request.
