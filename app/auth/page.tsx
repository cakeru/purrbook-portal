"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PortalAuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/portal/v1";
      const res = await fetch(`${base}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Login failed");
      localStorage.setItem("purrbook_portal_token", data.accessToken);
      localStorage.setItem("purrbook_portal_user", JSON.stringify(data.provider));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-label font-bold uppercase tracking-widest text-primary mb-2">Provider Portal</p>
          <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">PurrBook Portal</h1>
          <p className="text-on-surface-variant text-sm mt-2">Sign in to manage your sanctuary</p>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="shop@purrbook.ph"
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-label font-bold tracking-wide uppercase active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-3"
            >
              {loading ? <><span className="w-4 h-4 border-2 border-on-primary/40 border-t-on-primary rounded-full animate-spin" /> Signing in...</> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
