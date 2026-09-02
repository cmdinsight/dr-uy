"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function FormSetup() {
  const router = useRouter();
  const [f, setF] = useState({ nombre: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    const res = await fetch("/api/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    const data = await res.json().catch(() => ({}));
    setCargando(false);
    if (!res.ok) {
      setError(data.error || "No se pudo completar la configuración.");
      return;
    }
    router.push("/app/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="label">Nombre</label>
        <input className="input" value={f.nombre} onChange={set("nombre")} required />
      </div>
      <div>
        <label className="label">Correo</label>
        <input type="email" className="input" value={f.email} onChange={set("email")} required />
      </div>
      <div>
        <label className="label">Contraseña (mínimo 8 caracteres)</label>
        <input
          type="password"
          className="input"
          value={f.password}
          onChange={set("password")}
          minLength={8}
          required
        />
      </div>
      {error && <p className="text-sm text-nivel-grave font-medium">{error}</p>}
      <button type="submit" className="btn btn-primary btn-block" disabled={cargando}>
        {cargando ? "Creando…" : "Crear administrador"}
      </button>
    </form>
  );
}
