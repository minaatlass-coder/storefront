"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminLogin } from "@/lib/admin-api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await adminLogin(username, password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    router.replace("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#161b22] p-8 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
          Sahhaonline
        </p>
        <h1 className="mt-2 font-serif text-2xl text-white">Tableau de bord</h1>
        <p className="mt-2 text-sm text-white/60">
          Connexion administrateur — métriques trafic Maroc qualifié uniquement.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-xs font-medium text-white/70">Identifiant</span>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/15 bg-[#0f1419] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-white/70">Mot de passe</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/15 bg-[#0f1419] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
              required
            />
          </label>
          {error ? (
            <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{error}</p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
