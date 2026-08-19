import { API_BASE_URL } from "./constants";
import type { ApiResponse } from "@/types/api";

/**
 * Server Component data fetching. Unlike api-client.ts (used from client
 * components/hooks), this has no browser storage dependency and is safe to
 * call directly inside async Server Components. Public endpoints only —
 * nothing here attaches a bearer token.
 */
export async function serverFetch<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
  options?: { revalidate?: number }
): Promise<T | null> {
  const url = new URL(path.replace(/^\//, ""), `${API_BASE_URL.replace(/\/?$/, "/")}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: options?.revalidate ?? 60 },
    });
    const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;
    if (!res.ok || !json || json.success === false) return null;
    return json.data;
  } catch {
    // Backend unreachable — callers fall back to empty/not-found states.
    return null;
  }
}

export interface PaginatedApiResult<T> {
  data: T[] | null;
  meta?: { page: number; limit: number; total: number; totalPages: number };
}

export async function serverFetchPaginated<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedApiResult<T>> {
  const url = new URL(path.replace(/^\//, ""), `${API_BASE_URL.replace(/\/?$/, "/")}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  try {
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json || json.success === false) return { data: null };
    return { data: json.data, meta: json.meta };
  } catch {
    return { data: null };
  }
}
