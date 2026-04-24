const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/portal/v1";

const TOKEN_KEY = "purrbook_portal_token";
const USER_KEY = "purrbook_portal_user";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser<T>(): T | null {
  if (typeof window === "undefined") return null;
  try {
    const s = localStorage.getItem(USER_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: unknown): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const fetchOpts: RequestInit = {
    ...init,
    headers: { ...headers, ...(init?.headers as Record<string, string> ?? {}) },
    credentials: "include",
  };

  let res = await fetch(`${BASE}${path}`, fetchOpts);

  if (res.status === 401 && token) {
    const refresh = await fetch(`${BASE}/auth/refresh`, { method: "POST", credentials: "include" });
    if (refresh.ok) {
      const data = await refresh.json();
      setToken(data.accessToken);
      fetchOpts.headers = { ...headers, Authorization: `Bearer ${data.accessToken}` };
      res = await fetch(`${BASE}${path}`, fetchOpts);
    } else {
      clearToken();
      window.location.href = "/auth";
      throw new Error("Session expired");
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as any).error ?? res.statusText);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
