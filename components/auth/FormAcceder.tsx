"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function FormAcceder({ next }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    setCargando(false);
    if (!res.ok) {
      setError(data.error || "No se pudo ingresar.");
      return;
    }
    router.push(next || "/app");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="label" htmlFor="email">
          Correo
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="label" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-sm text-nivel-grave font-medium">{error}</p>}
      <button type="submit" className="btn btn-primary btn-block" disabled={cargando}>
        {cargando ? "Ingresando…" : "Ingresar"}
      </button>
    </form>
  );
}
