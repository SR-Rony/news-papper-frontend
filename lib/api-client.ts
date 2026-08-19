import { API_BASE_URL } from "./constants";
import type { ApiResponse, PaginationMeta } from "@/types/api";

/**
 * Centralized API client. Every network call to the NestJS backend goes
 * through here so auth headers, base URL, and error shape are handled
 * in exactly one place. Components/hooks should never call fetch() directly.
 */

export class ApiRequestError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.errors = errors;
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(path: string, params?: RequestOptions["params"]) {
  const url = new URL(path.replace(/^\//, ""), `${API_BASE_URL.replace(/\/?$/, "/")}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

function getAuthToken(): string | null {
  // Auth strategy (httpOnly cookie vs. bearer token) is finalized with the
  // NestJS backend. This indirection means the rest of the app never has
  // to know which strategy is active.
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("access_token");
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...rest } = options;
  const token = getAuthToken();

  const res = await fetch(buildUrl(path, params), {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    credentials: "include",
  });

  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

  if (!res.ok || !json || json.success === false) {
    const message = json && "message" in json ? json.message : "Something went wrong. Please try again.";
    const errors = json && "errors" in json ? json.errors : undefined;
    throw new ApiRequestError(message ?? "Request failed", res.status, errors);
  }

  return json.data;
}

async function requestRaw<T>(path: string, options: RequestOptions = {}): Promise<{ data: T; meta?: PaginationMeta }> {
  const { params, headers, ...rest } = options;
  const token = getAuthToken();

  const res = await fetch(buildUrl(path, params), {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    credentials: "include",
  });

  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

  if (!res.ok || !json || json.success === false) {
    const message = json && "message" in json ? json.message : "Something went wrong. Please try again.";
    const errors = json && "errors" in json ? json.errors : undefined;
    throw new ApiRequestError(message ?? "Request failed", res.status, errors);
  }

  return { data: json.data, meta: "meta" in json ? json.meta : undefined };
}

export const apiClient = {
  get: <T>(path: string, params?: RequestOptions["params"]) => request<T>(path, { method: "GET", params }),
  getPaginated: async <T>(path: string, params?: RequestOptions["params"]) => {
    const { data, meta } = await requestRaw<T[]>(path, { method: "GET", params });
    return { data, meta: meta ?? { page: 1, limit: data.length, total: data.length, totalPages: 1 } };
  },
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
