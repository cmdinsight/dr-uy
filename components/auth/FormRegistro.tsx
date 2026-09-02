"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function FormRegistro() {
  const router = useRouter();
  const [f, setF] = useState({
    nombre: "",
    email: "",
    password: "",
    especialidad: "",
    institucion: "",
    region: "",
    sitio: "", // honeypot
  });
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    const data = await res.json().catch(() => ({}));
    setCargando(false);
    if (!res.ok) {
      setError(data.error || "No se pudo crear la cuenta.");
      return;
    }
    router.push("/app");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="label">Nombre y apellido</label>
        <input className="input" value={f.nombre} onChange={set("nombre")} required />
      </div>
      <div>
        <label className="label">Correo</label>
        <input
          type="email"
          autoComplete="email"
          className="input"
          value={f.email}
          onChange={set("email")}
          required
        />
      </div>
      <div>
        <label className="label">Contraseña (mínimo 8 caracteres)</label>
        <input
          type="password"
          autoComplete="new-password"
          className="input"
          value={f.password}
          onChange={set("password")}
          minLength={8}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Especialidad</label>
          <input className="input" value={f.especialidad} onChange={set("especialidad")} placeholder="Opcional" />
        </div>
        <div>
          <label className="label">Región</label>
          <input className="input" value={f.region} onChange={set("region")} placeholder="Opcional" />
        </div>
      </div>
      <div>
        <label className="label">Institución</label>
        <input className="input" value={f.institucion} onChange={set("institucion")} placeholder="Opcional" />
      </div>

      {/* honeypot */}
      <input
        type="text"
        name="sitio"
        value={f.sitio}
        onChange={set("sitio")}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {error && <p className="text-sm text-nivel-grave font-medium">{error}</p>}
      <button type="submit" className="btn btn-primary btn-block" disabled={cargando}>
        {cargando ? "Creando…" : "Crear cuenta"}
      </button>
    </form>
  );
}
